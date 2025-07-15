import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const BookConsultation = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "scholarship-guidance",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const services = [
    { id: "scholarship-guidance", name: translations.scholarshipGuidance || "Scholarship Guidance", price: 100 },
    { id: "university-admissions", name: translations.universityAdmissions || "University Admissions", price: 70 },
    { id: "visa-application", name: translations.visaApplicationAssistance || "Visa Application Support", price: 100 },
    { id: "korean-language", name: translations.koreanLanguagePreparation || "Korean Language Training", price: 80 },
    { id: "phone-consultation", name: translations.phoneConsultation || "Phone Consultation", price: 20 },
  ];

  const selectedService = services.find((s) => s.id === formData.service);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      ]);

      if (error) {
        console.error("❌ Supabase insertion error:", error.message);
        alert("There was an error submitting your request.");
      } else {
        alert("✅ Booking submitted successfully!");
        setCurrentStep(2); // Go to confirmation page
      }
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
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Please pay <span className="text-blue-600 font-bold">${total}</span> via:
                </p>
                <ul className="list-disc pl-6 text-sm text-slate-800 dark:text-white">
                  <li>📱 <strong>MTN Mobile Money:</strong> +250 788 214 751</li>
                  <li>🏦 <strong>Bank Transfer:</strong> We'll share details upon request.</li>
                </ul>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  After paying, you can contact us on WhatsApp with your name and service.
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

                <Button onClick={() => setCurrentStep(1)} variant="outline" className="w-full mt-4">
                  Back to Edit
                </Button>
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
