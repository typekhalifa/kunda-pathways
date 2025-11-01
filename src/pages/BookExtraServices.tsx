import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BookExtraServices = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [extraServices, setExtraServices] = useState<Array<{id: string, name: string, price: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedServices: [] as string[],
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  useEffect(() => {
    fetchExtraServices();
  }, []);

  const fetchExtraServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category', 'extra-services')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      const formattedServices = data.map(service => ({
        id: service.id,
        name: service.name,
        price: Number(service.price)
      }));

      setExtraServices(formattedServices);
    } catch (error) {
      console.error('Error fetching extra services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const getTotalPrice = () => {
    return formData.selectedServices.reduce((total, id) => {
      const service = extraServices.find(s => s.id === id);
      return total + (service?.price || 0);
    }, 0);
  };

  const getSelectedServiceDetails = () => {
    return formData.selectedServices.map(id =>
      extraServices.find(s => s.id === id)
    ).filter(Boolean);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
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
    const { data, error } = await supabase.from("extra_service_bookings").insert([
      {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        services: getSelectedServiceDetails(),
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message,
        total_price: getTotalPrice()
      }
    ]);

    if (error) {
      console.error("Supabase error:", error.message);
      alert("There was an error submitting your request.");
      return;
    }
    
    // Send confirmation email
    const serviceNames = getSelectedServiceDetails().map(s => s.name);
    const { data: emailData, error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
      body: {
        bookingId: Date.now().toString(),
        bookingType: 'extra_service',
        name: formData.fullName,
        email: formData.email,
        services: serviceNames,
        totalPrice: getTotalPrice(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime
      }
    });
    
    if (emailError) {
      console.error("❌ Email sending error:", emailError);
      alert("✅ Booking submitted! However, there was an issue sending the confirmation email. Please check your spam folder or contact us.");
    } else {
      console.log("✅ Email sent successfully:", emailData);
      alert("✅Booking submitted successfully! Check your email for confirmation.");
    }
    
    setCurrentStep(2);
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("An unexpected error occurred.");
  }
};


  const handlePayment = async (method: string) => {
  try {
    const { error } = await supabase.from("extra_service_bookings").insert({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      services: getSelectedServiceDetails(),
      message: formData.message,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      payment_method: method,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("❌ Error saving to Supabase:", error);
      alert("Something went wrong while saving your request.");
    } else {
      alert(`✅ Payment via ${method} successful! Booking saved.`);
      // You can reset form here if you want:
      // setFormData({ ...initialState });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error occurred!");
  }
};


  const selected = getSelectedServiceDetails();
  const total = getTotalPrice();

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <Link to="/">
              <Button variant="outline" className="mb-8 rounded-xl bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white">
                <ArrowLeft size={16} className="mr-2" />
                {translations.backToHome || "Back to Home"}
              </Button>
            </Link>

            <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
              Review Your Additional Services Request
            </h1>

            <Card className="bg-white/80 dark:bg-slate-800/80 p-8 shadow-lg mb-8 border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                  <Plane className="mr-3 text-purple-600" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                </div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div>
                  <strong>Selected Services:</strong>
                  <ul className="mt-2 space-y-1">
                    {selected.map(s => (
                      <li key={s?.id} className="flex justify-between text-sm bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">
                        <span>{s?.name}</span>
                        <span className="font-bold text-purple-600">${s?.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div><strong>Message:</strong> {formData.message}</div>
                <div className="text-lg font-bold pt-4 flex justify-between">
                  <span>Total:</span>
                  <span className="text-purple-600">${total.toLocaleString()}</span>
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
                  Total to pay: <span className="text-purple-600 font-bold">${total}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Please pay <strong>${total}</strong> which is approximately <strong>{(total * 1437.5).toLocaleString()} RWF</strong> to <strong>0788214751</strong>.
                  <br />
                  Dial: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">*182*1*1*0788214751*{total * 1437.5}#</code>
                </p>
                <ul className="space-y-2 text-sm text-slate-800 dark:text-white pl-4 list-disc">
                  For further modes
                  <li>📱 <strong>Mobile Money:</strong> +250 788 214 751</li>
                  <li>🏦 <strong>Bank of Kigali:</strong> 00005677XXXXXXX</li>
                  <li>🏦 <strong>Equity Bank:</strong> 4065373xxxxxxxxxxxxx</li>
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
      href={`https://wa.me/250788214751?text=${encodeURIComponent(
        `Hello! I’ve just paid for extra services: ${selected
          .map((s) => s?.name)
          .join(", ")}. My name is ${formData.fullName}.`
      )}`}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || "Back to Home"}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            Book Additional Services
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl shadow-lg border-0">
            {/* Full Name, Email, Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
                <Input
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Phone Number</label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            {/* Services Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Select Services</label>
              <div className="grid gap-3">
                {extraServices.map(service => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.selectedServices.includes(service.id)
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-800 dark:text-white">{service.name}</span>
                      <span className="text-purple-600 font-bold">${service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Preferred Date</label>
                <Input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Preferred Time</label>
                <Input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Add notes or special requests</label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="e.g. Arriving at night. Please ensure airport pickup."
                rows={4}
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            {formData.selectedServices.length > 0 && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl font-bold text-slate-800 dark:text-white">
                Total: <span className="text-purple-600">${total.toLocaleString()}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={formData.selectedServices.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Request
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookExtraServices;
