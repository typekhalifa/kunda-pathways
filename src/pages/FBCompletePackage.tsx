import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone, Building, CreditCard, Briefcase, Utensils, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const FBCompletePackage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState<any>(null);
  const [fbServices, setFbServices] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    fetchPackageData();
    fetchFBServices();
  }, []);

  const fetchPackageData = async () => {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .eq("category", "fb-consulting")
      .eq("is_active", true)
      .single();
    
    if (data) {
      setPackageData(data);
    }
  };

  const fetchFBServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("category", "fb-consulting")
      .eq("is_active", true);
    
    if (data) {
      setFbServices(data);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate total price dynamically from all FB services with 25% discount
  const calculateTotalPrice = () => {
    if (fbServices.length === 0) return 1052; // fallback with realistic pricing
    const originalTotal = fbServices.reduce((sum, service) => sum + Number(service.price), 0);
    return Math.round(originalTotal * 0.75); // 25% discount
  };

  const totalPrice = calculateTotalPrice();
  const rwfRate = 1437.5;
  const rwfAmount = totalPrice * rwfRate;
  const serviceName = packageData?.name || "F&B Market Entry Complete Package";

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from("fb_consultation_bookings").insert({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || null,
      services: [serviceName],
      message: formData.message || null,
      preferred_date: null,
      preferred_time: null,
      total_price: totalPrice,
      status: "pending",
      payment_status: "unpaid",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      console.error("❌ Error:", error.message);
      alert("There was an error submitting your request.");
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-8">
          <Link to="/">
            <Button variant="outline" className="rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>

          {currentStep === 1 ? (
            <Card className="p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 border-0 space-y-6">
              <CardHeader>
                <CardTitle className="text-3xl text-center text-green-700 dark:text-white flex items-center justify-center">
                  <Utensils className="mr-3 text-green-600" size={32} />
                  F&B Complete Package – ${totalPrice}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 text-center">
                  Kindly fill out your details to proceed with the full package.
                </p>

                <Input
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <Input
                  placeholder="Company (optional)"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
                <Textarea
                  placeholder="Your message (optional)"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
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
                  <Briefcase className="mr-3 text-green-600" />
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
                  Please pay <strong>${totalPrice}</strong> (~<strong>{rwfAmount.toLocaleString()} RWF</strong>) to <strong>0788214751</strong><br />
                  Dial: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">*182*1*1*0788214751*{rwfAmount}#</code>
                </p>

                <ul className="text-sm text-slate-800 dark:text-white pl-4 list-none space-y-1">
                  For other payment details
                  <li className="flex items-center"><Smartphone className="mr-2 w-4 h-4" /> <strong>Mobile Money:</strong> +250 788 214 751</li>
                  <li className="flex items-center"><Building className="mr-2 w-4 h-4" /> <strong>Bank of Kigali:</strong> 00005677XXXXXXX</li>
                  <li className="flex items-center"><Building className="mr-2 w-4 h-4" /> <strong>Equity Bank:</strong> 4065373xxxxxxxxxxxxx</li>
                </ul>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                  Need a quick reach out? We’re one message away.
                </p>

                <a
                  href={`https://wa.me/250788214751?text=Hello! I’ve paid for the F&B Complete Package. My name is ${encodeURIComponent(formData.fullName)}.`}
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

export default FBCompletePackage;
