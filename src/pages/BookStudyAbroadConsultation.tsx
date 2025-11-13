import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePaymentDetails } from "@/hooks/usePaymentDetails";

const BookConsultation = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [services, setServices] = useState<Array<{id: string, name: string, price: number}>>([]);
  const [loading, setLoading] = useState(true);
  const { paymentDetails } = usePaymentDetails();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  useEffect(() => {
    fetchStudyAbroadServices();
  }, []);

  const fetchStudyAbroadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category', 'study-abroad')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      const formattedServices = data.map(service => ({
        id: service.id,
        name: service.name,
        price: Number(service.price)
      }));

      setServices(formattedServices);
      
      // Set first service as default if available
      if (formattedServices.length > 0) {
        setFormData(prev => ({ ...prev, service: formattedServices[0].id }));
      }
    } catch (error) {
      console.error('Error fetching study abroad services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((s) => s.id === formData.service);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-300">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("study_abroad_bookings").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: {
            id: formData.service,
            name: services.find((s) => s.id === formData.service)?.name || "",
            price: services.find((s) => s.id === formData.service)?.price || 0,
          },
          preferred_date: formData.preferredDate || null,
          preferred_time: formData.preferredTime || null,
          message: formData.message,
          status: "pending",
          payment_status: "unpaid",
          total_price: services.find((s) => s.id === formData.service)?.price || 0,
        },
      ]).select();

      if (error) {
        console.error("❌ Supabase insertion error:", error.message);
        alert("There was an error submitting your request.");
        return;
      }

      // Save the booking ID
      if (data && data[0]) {
        setBookingId(data[0].id);
      }
      
      // Send confirmation email
      const selectedService = services.find((s) => s.id === formData.service);
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          bookingId: Date.now().toString(),
          bookingType: 'study_abroad',
          name: formData.fullName,
          email: formData.email,
          services: [selectedService?.name || ''],
          totalPrice: selectedService?.price || 0,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime
        }
      });
      
      if (emailError) {
        console.error("❌ Email sending error:", emailError);
        alert("✅ Booking submitted! However, there was an issue sending the confirmation email. Please check your spam folder or contact us.");
      } else {
        console.log("✅ Email sent successfully:", emailData);
        alert("✅ Booking submitted successfully! Check your email for confirmation.");
      }
      
      setCurrentStep(2);
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handlePayment = async (method: string) => {
      if (!bookingId) {
        alert("Booking not found. Cannot process payment.");
        return;
      }

      try {
        const { error } = await supabase
          .from("study_abroad_bookings")
          .update({
            payment_method: method,
            payment_status: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId);

        if (error) {
          console.error("❌ Payment update error:", error.message);
          alert("Failed to update payment status. Please try again.");
        } else {
          alert(`✅ Payment via ${method} successful!`);
        }
      } catch (err) {
        console.error("❌ Payment error:", err);
        alert("Unexpected error occurred.");
      }
  };

  const total = selectedService?.price ?? 0;

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
              {translations.reviewConsultation || "Review Your Consultation Request"}
            </h1>

            <Card className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg mb-8 border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div><strong>Full Name:</strong> {formData.fullName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>Service:</strong> {selectedService?.name}</div>
                <div><strong>Preferred Date:</strong> {formData.preferredDate}</div>
                <div><strong>Preferred Time:</strong> {formData.preferredTime}</div>
                <div><strong>Message:</strong> {formData.message}</div>
                <div className="text-xl font-bold text-blue-600">
                  Total: ${total.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 p-8 shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">Payment Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Thank you <strong>{formData.fullName}</strong>! Your request has been received.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Total to pay: <span className="text-blue-600 font-bold">${total}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Please pay <strong>${total}</strong> which is approximately <strong>{(total * parseFloat(paymentDetails.rwf_exchange_rate)).toLocaleString()} RWF</strong> to <strong>{paymentDetails.mobile_money.replace(/\s/g, '').replace('+', '')}</strong>.
                  <br />
                  Dial: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">*182*1*1*{paymentDetails.mobile_money.replace(/\s/g, '').replace('+', '')}*{Math.round(total * parseFloat(paymentDetails.rwf_exchange_rate))}#</code>
                </p>
                <ul className="space-y-2 text-sm text-slate-800 dark:text-white pl-4 list-disc">
                  For further modes
                  <li>📱 <strong>Mobile Money:</strong> {paymentDetails.mobile_money}</li>
                  <li>🏦 <strong>Bank of Kigali:</strong> {paymentDetails.bank_of_kigali}</li>
                  <li>🏦 <strong>Equity Bank:</strong> {paymentDetails.equity_bank}</li>
                </ul>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                  Need a quick reach out? We're one message away.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 p-8 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">Mark Payment Done</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => handlePayment("Mobile Money")} className="w-full bg-green-600 text-white">
                  I’ve Paid via Mobile Money
                </Button>

                <a
                  href={`https://wa.me/250788214751?text=Hello! I’ve just paid for the study abroad service (${selectedService?.name}). My name is ${encodeURIComponent(formData.fullName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-blue-600 text-white mt-3">
                    📩 Message Us on WhatsApp
                  </Button>
                </a>

                <Link to="/">
                  <Button variant="outline" className="w-full mt-4">
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            Book Study Abroad Consultation
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.fullName || 'Full Name'}
                </label>
                <Input 
                  placeholder={translations.fullName || "Your full name"}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.email || 'Email'}
                </label>
                <Input 
                  type="email" 
                  placeholder={translations.email || "your.email@example.com"}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                {translations.phone || 'Phone Number'}
              </label>
              <Input 
                type="tel" 
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                {translations.selectService || 'Select Service'}
              </label>
              <select 
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                required
              >
                <option value="">{translations.selectService || 'Select a service'}</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.preferredDate || 'Preferred Date'}
                </label>
                <Input 
                  type="date" 
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.preferredTime || 'Preferred Time'}
                </label>
                <Input 
                  type="time" 
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                {translations.message || 'Message'}
              </label>
              <Textarea 
                placeholder={translations.tellUsAboutGoals || "Tell us about your goals and how we can help..."}
                rows={5} 
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              {translations.reviewConsultationRequest || 'Review Consultation Request'}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookConsultation;
