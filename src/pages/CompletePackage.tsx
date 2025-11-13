import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone, Building, CreditCard, GraduationCap, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { usePaymentDetails } from "@/hooks/usePaymentDetails";

const CompletePackage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [packageData, setPackageData] = useState<any>(null);
  const [studyAbroadServices, setStudyAbroadServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { paymentDetails } = usePaymentDetails();

  useEffect(() => {
    fetchPackageData();
    fetchStudyAbroadServices();
  }, []);

  const fetchPackageData = async () => {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .eq("category", "study-abroad")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1);
    
    if (data && data.length > 0) {
      setPackageData(data[0]);
    }
  };

  const fetchStudyAbroadServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("category", "study-abroad")
      .eq("is_active", true);
    
    if (data) {
      setStudyAbroadServices(data);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate total price dynamically from all Study Abroad services with dynamic discount
  const calculateTotalPrice = () => {
    if (studyAbroadServices.length === 0) return 452; // fallback
    const originalTotal = studyAbroadServices.reduce((sum, service) => sum + Number(service.price), 0);
    const discountPercentage = packageData?.discount_percentage || 29;
    return Math.round(originalTotal * (1 - discountPercentage / 100));
  };

  const totalPrice = calculateTotalPrice();
  const serviceName = packageData?.name || "Complete Korean Study Package";
  
  const rwfRate = parseFloat(paymentDetails.rwf_exchange_rate);
  const rwfAmount = totalPrice * rwfRate;


  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.from("study_abroad_bookings").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service: [serviceName],
        message: formData.message || null,
        preferred_date: null,
        preferred_time: null,
        total_price: totalPrice,
        status: "pending",
        payment_status: "unpaid",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).select();

      if (error) {
        console.error("❌ Error saving booking:", error.message);
        alert("There was an error submitting your request.");
        setLoading(false);
        return;
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            bookingId: data[0]?.id || Date.now().toString(),
            bookingType: 'study_abroad_package',
            name: formData.fullName,
            email: formData.email,
            services: [serviceName],
            totalPrice: totalPrice,
            preferredDate: null,
            preferredTime: null
          }
        });
        console.log("✅ Confirmation email sent successfully");
      } catch (emailError) {
        console.error("❌ Email sending error:", emailError);
      }

      setCurrentStep(2);
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-8">
          <Link to="/">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>

          {currentStep === 1 ? (
            <Card className="p-6 rounded-xl shadow-lg bg-card space-y-6">
              <CardHeader>
                <CardTitle className="text-3xl text-center text-primary flex items-center justify-center">
                  <GraduationCap className="mr-3 text-primary" size={32} />
                  {serviceName} – ${totalPrice}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Fill in your details to start the full package process.
                </p>

                <Input
                  placeholder="Full Name"
                  className="w-full rounded-xl"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-xl"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  className="w-full rounded-xl"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <Textarea
                  placeholder="Your message (optional)"
                  className="w-full rounded-xl"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />

                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Continue to Payment"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90 dark:bg-slate-800/90 p-6 rounded-xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                  <GraduationCap className="mr-3 text-green-600" />
                  Booking Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Thank you <strong>{formData.fullName}</strong>! Your request has been received.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Total to pay: <span className="text-green-600 font-bold">${totalPrice}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Please pay <strong>${totalPrice}</strong> which is approximately <strong>{rwfAmount.toLocaleString()} RWF</strong> to <strong>{paymentDetails.mobile_money.replace(/\s/g, '').replace('+', '')}</strong>.
                  <br />
                  Dial: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">*182*1*1*{paymentDetails.mobile_money.replace(/\s/g, '').replace('+', '')}*{Math.round(rwfAmount)}#</code>
                </p>
                <ul className="space-y-2 text-sm text-slate-800 dark:text-white pl-4 list-none">
                  For further modes
                  <li className="flex items-center"><Smartphone className="mr-2 w-4 h-4" /> <strong>Mobile Money:</strong> {paymentDetails.mobile_money}</li>
                  <li className="flex items-center"><Building className="mr-2 w-4 h-4" /> <strong>Bank of Kigali:</strong> {paymentDetails.bank_of_kigali}</li>
                  <li className="flex items-center"><Building className="mr-2 w-4 h-4" /> <strong>Equity Bank:</strong> {paymentDetails.equity_bank}</li>
                </ul>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                  Need a quick reach out? We’re one message away.
                </p>

                <a
                  href={`https://wa.me/250788214751?text=Hello! I’ve paid for the Study Abroad Full Package. My name is ${encodeURIComponent(formData.fullName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-3 flex items-center justify-center">
                    <Mail className="mr-2 w-4 h-4" />
                    Message Us on WhatsApp
                  </Button>
                </a>

                <Link to="/">
                  <Button variant="outline" className="w-full mt-4">
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompletePackage;
