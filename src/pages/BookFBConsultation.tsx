
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BookFBConsultation = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [fbServices, setFbServices] = useState<Array<{id: string, name: string, price: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    selectedServices: [] as string[],
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  useEffect(() => {
    fetchFBServices();
  }, []);

  const fetchFBServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category', 'fb-consulting')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      const formattedServices = data.map(service => ({
        id: service.id,
        name: service.name,
        price: Number(service.price)
      }));

      setFbServices(formattedServices);
    } catch (error) {
      console.error('Error fetching FB services:', error);
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
    return formData.selectedServices.reduce((total, serviceId) => {
      const service = fbServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const getSelectedServicesDetails = () => {
    return formData.selectedServices.map(serviceId => 
      fbServices.find(s => s.id === serviceId)
    ).filter(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("fb_consultation_bookings").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          services: formData.selectedServices, // or JSON.stringify(...) if text column
          preferred_date: formData.preferredDate || null,
          preferred_time: formData.preferredTime || null,
          message: formData.message,
          status: "pending",
          payment_status: "unpaid",
          total_price: getTotalPrice(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error("❌ Supabase insert error:", error);
        alert(`❌ Error: ${error.message}`);
      } else {
        // Send confirmation email
        const serviceNames = getSelectedServicesDetails().map(s => s.name);
        await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            bookingId: Date.now().toString(),
            bookingType: 'fb_consultation',
            name: formData.fullName,
            email: formData.email,
            services: serviceNames,
            totalPrice: getTotalPrice(),
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime
          }
        });
        
        alert("✅ Your request was submitted successfully! Check your email for confirmation.");
        setCurrentStep(2);
      }
    } catch (err: any) {
      console.error("❌ Unexpected error:", err);
      alert(`Unexpected error: ${err.message}`);
    }
  };



  const handlePayment = (method: string) => {
    console.log(`Processing payment via ${method}`);
    alert(`Payment processed via ${method}. Your F&B consultation request has been sent!`);
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

  if (currentStep === 2) {
    const selectedServices = getSelectedServicesDetails();
    const totalPrice = getTotalPrice();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <Link to="/">
              <Button variant="outline" className="mb-8 rounded-xl border-white/20 dark:border-white/20 bg-white/10 dark:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 shadow-lg">
                <ArrowLeft size={16} className="mr-2" />
                {translations.backToHome || 'Back to Home'}
              </Button>
            </Link>

            <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
              Review Your F&B Consultation Request
            </h1>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8 border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                  <Utensils className="mr-3 text-green-600" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Full Name
                    </label>
                    <p className="text-slate-800 dark:text-white">{formData.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Email
                    </label>
                    <p className="text-slate-800 dark:text-white">{formData.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Company
                  </label>
                  <p className="text-slate-800 dark:text-white">{formData.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Selected Services
                  </label>
                  <div className="space-y-2 mt-2">
                    {selectedServices.map((service) => (
                      <div key={service?.id} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <span className="text-slate-800 dark:text-white">{service?.name}</span>
                        <span className="text-green-600 font-bold">${service?.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Message
                  </label>
                  <p className="text-slate-800 dark:text-white">{formData.message}</p>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-slate-800 dark:text-white">Total Price:</span>
                    <span className="text-green-600">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">
                  Booking Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="space-y-4 mt-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Thank you <strong>{formData.fullName}</strong>! Your request has been received.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    Total to pay: <span className="text-green-600 font-bold">${totalPrice}</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Please pay <strong>${totalPrice}</strong> which is approximately <strong>{(totalPrice * 1437.5).toLocaleString()} RWF</strong> to <strong>0788214751</strong>.
                    <br />
                    Dial: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">*182*1*1*0788214751*{totalPrice * 1437.5}#</code>
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
                </div>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-800 dark:text-white">Confirm Your Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={() => alert("✅ Payment marked as completed. We'll reach out to you shortly.")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                    >
                      ✅ I’ve Paid Successfully
                    </Button>

                    <a
                      href={`https://wa.me/250788214751?text=Hello! I’ve paid for the F&B services: ${getSelectedServicesDetails()
                        .map((s) => s?.name)
                        .join(", ")}. My name is ${encodeURIComponent(formData.fullName)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                       <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-3 transition-all duration-300">
                         💬 Message Us on WhatsApp
                       </Button>
                    </a>
                  </CardContent>
                </Card>

                 <Link to="/">
                   <Button 
                     variant="outline"
                     className="w-full py-4 rounded-xl border-slate-300 dark:border-slate-600 bg-white/10 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/20"
                   >
                     <ArrowLeft size={16} className="mr-2" />
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
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-white/20 dark:border-white/20 bg-white/10 dark:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 shadow-lg">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            Book F&B Consultation
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <Input 
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <Input 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <Input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Company Name
                </label>
                <Input 
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4 text-slate-700 dark:text-slate-300">
                Select Services (You can choose multiple)
              </label>
              <div className="grid grid-cols-1 gap-3">
                {fbServices.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.selectedServices.includes(service.id)
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800 dark:text-white">{service.name}</span>
                      <span className="text-green-600 font-bold">${service.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Preferred Date
                </label>
                <Input 
                  type="date" 
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Preferred Time
                </label>
                <Input 
                  type="time" 
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Message
              </label>
              <Textarea 
                placeholder="Tell us about your business goals and how we can help you expand into Asian F&B markets..."
                rows={5} 
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            {formData.selectedServices.length > 0 && (
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-slate-800 dark:text-white">Total:</span>
                  <span className="text-green-600">${getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            )}

            <Button 
              type="submit"
              disabled={formData.selectedServices.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Consultation Request
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookFBConsultation;
