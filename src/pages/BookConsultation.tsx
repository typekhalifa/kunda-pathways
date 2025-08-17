import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  category: string;
  is_active: boolean;
}

const BookConsultation = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    selectedServices: [] as string[],
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Force refresh when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 100);
    return () => clearTimeout(timer);
  }, []);


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const getSelectedServicesDetails = () => {
    return formData.selectedServices
      .map((id) => services.find((s) => s.id === id))
      .filter(Boolean);
  };

  const getTotalPrice = () => {
    return getSelectedServicesDetails().reduce((sum, s) => sum + (s?.price || 0), 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const serviceData = getSelectedServicesDetails();

      const { error } = await supabase.from("consultation_bookings").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || "N/A", // 👈 This line
          services: formData.selectedServices,
          message: formData.message,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          total_price: getTotalPrice(),
          status: "pending",
          payment_status: "unpaid",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

      ]);

      if (error) {
        console.error("❌ Supabase insertion error:", error.message);
        alert("There was an error submitting your request.");
      } else {
        alert("✅ Booking submitted successfully!");
        setCurrentStep(2);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("Unexpected error occurred.");
    }
  };

  const selectedServices = getSelectedServicesDetails();
  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 ? (
            <>
              <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
                Book Consultation
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl shadow-lg border-0">

                {/* Full Name, Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <Input 
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                                text-slate-800 dark:text-white placeholder:text-slate-500 
                                dark:placeholder:text-slate-400 rounded-xl"
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
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                                text-slate-800 dark:text-white placeholder:text-slate-500 
                                dark:placeholder:text-slate-400 rounded-xl"
                    />
                  </div>
                </div>

                {/* Phone and Company */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Phone Number
                    </label>
                    <Input 
                      type="tel"
                      placeholder="+250 7xx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                                text-slate-800 dark:text-white placeholder:text-slate-500 
                                dark:placeholder:text-slate-400 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Company Name <span className="text-xs text-slate-400">(Optional)</span>
                    </label>
                    <Input 
                      placeholder="e.g. ABC Global Ltd."
                      value={(formData as any).company || ""}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                                text-slate-800 dark:text-white placeholder:text-slate-500 
                                dark:placeholder:text-slate-400 rounded-xl"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Select Services (Choose multiple)
                  </label>
                  <div className="grid gap-3">
                    {loading ? (
                      <div className="text-center py-4">Loading services...</div>
                    ) : (
                      services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.selectedServices.includes(service.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-slate-800 dark:text-white">{service.name}</span>
                          <span className="text-blue-600 font-bold">
                            {service.currency === 'USD' ? '$' : service.currency === 'EUR' ? '€' : ''}
                            {service.price.toLocaleString()} {service.currency}
                          </span>
                        </div>
                      </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Preferred Date
                    </label>
                    <Input 
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                                text-slate-800 dark:text-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Preferred Time
                    </label>
                    <Input 
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                                text-slate-800 dark:text-white rounded-xl"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us more about your needs or specific questions..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 
                              text-slate-800 dark:text-white placeholder:text-slate-500 
                              dark:placeholder:text-slate-400 rounded-xl"
                  />
                </div>

                {/* Total Price and Submit */}
                {formData.selectedServices.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-bold text-slate-800 dark:text-white">
                    Total: <span className="text-blue-600">${getTotalPrice().toLocaleString()}</span>
                  </div>
                )}

                <Button 
                  type="submit"
                  disabled={formData.selectedServices.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Consultation Request
                </Button>
              </form>

            </>
          ) : (
            <>
              <Card className="bg-white/90 dark:bg-slate-800/90 p-6 rounded-xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                    <Smartphone className="mr-3 text-blue-600" />
                    Booking Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Thank you <strong>{formData.fullName}</strong>! Your request has been received.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    Total to pay: <span className="text-blue-600 font-bold">${total}</span>
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

                  <a
                    href={`https://wa.me/250788214751?text=Hello! I've paid for the consultation services. My name is ${encodeURIComponent(formData.fullName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-3">
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookConsultation;