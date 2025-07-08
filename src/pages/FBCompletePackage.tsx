import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FBCompletePackage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    alert(`Payment processed via ${method}. Your F&B Market Entry booking has been submitted.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <Link to="/">
            <Button variant="outline" className="rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>

          <Card className="p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 border-0 text-center space-y-4">
            <h2 className="text-3xl font-bold text-green-700">🥢 F&B Market Entry Complete Package</h2>
            <p className="text-slate-600 dark:text-slate-300">
              All the tools to take your food product into the Korean/Asian market.
            </p>

            <ul className="text-left space-y-2 text-slate-700 dark:text-slate-200">
              <li>✅ Market Entry Strategy</li>
              <li>✅ Regulatory Compliance Support</li>
              <li>✅ Product Development Guidance</li>
              <li>✅ Supply Chain Optimization</li>
              <li>✅ Brand Localization</li>
              <li>✅ Partnership Distribution Setup</li>
            </ul>

            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl">
              <p className="text-lg font-semibold text-slate-800 dark:text-white">Normal Price: <span className="line-through">$16,000</span></p>
              <p className="text-2xl font-bold text-green-600">Now: $12,000 only 💼</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">(25% Discount Included)</p>
            </div>

            <div className="space-y-4">
              <Button onClick={() => handlePayment("Credit Card")} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex items-center justify-center">
                <CreditCard className="mr-3" size={20} />
                Pay with Credit/Debit Card
              </Button>
              <Button onClick={() => handlePayment("Mobile Money")} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center">
                <Smartphone className="mr-3" size={20} />
                Pay with Mobile Money
              </Button>
              <Button onClick={() => handlePayment("Bank Transfer")} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center">
                <Building className="mr-3" size={20} />
                Pay with Bank Transfer
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FBCompletePackage;
