import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CustomQuote = () => {
  const { translations } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { name, email, phone, message } = form;

    if (!message || !name || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    const encoded = encodeURIComponent(
      `*New Custom Quote Request*\n\n` +
      `👤 Name: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📞 Phone: ${phone || "Not provided"}\n\n` +
      `📝 Message:\n${message}`
    );

    window.open(`https://wa.me/821026077012?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl bg-white/10 dark:bg-white/10 text-slate-800 dark:text-white">
              <ArrowLeft className="mr-2" size={16} />
              {translations.backToHome || "Back to Home"}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-6 text-slate-800 dark:text-white">
            {translations.customQuote || "Request Custom Quote"}
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-10">
            {translations.describeNeeds || "Tell us more about what you need or suggest custom services"}
          </p>

          <Card className="bg-white/80 dark:bg-slate-800/80 p-8 border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 dark:text-white mb-2">
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Input
                placeholder="Full Name"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                required
              />
              <Input
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={e => handleChange("phone", e.target.value)}
                className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
              />
              <Textarea
                rows={5}
                placeholder="Describe your service needs or any suggestions..."
                value={form.message}
                onChange={e => handleChange("message", e.target.value)}
                className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                required
              />

              <Button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-xl"
              >
                <Send className="mr-2" size={18} />
                Send via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomQuote;
