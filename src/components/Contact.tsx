
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { translations } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-slate-100 dark:bg-slate-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {translations.letsStartYourJourney || "Let's Start Your Journey"}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {translations.readyToTakeNextStep || 'Ready to take the next step? Get in touch for a free consultation'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-white">
                {translations.sendUsMessage || 'Send us a Message'}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                {translations.fillFormBelow || 'Fill out the form below and we\'ll respond within 24 hours'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    {translations.yourName || 'Your Name'}
                  </label>
                  <Input
                    placeholder={translations.yourName || "Your Name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    {translations.yourEmail || 'Your Email'}
                  </label>
                  <Input
                    type="email"
                    placeholder={translations.yourEmail || "Your Email"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    {translations.selectService || 'Select Service'}
                  </label>
                  <select
                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                  >
                    <option value="">{translations.generalInquiry || 'General Inquiry'}</option>
                    <option value="study-abroad">{translations.studyAbroadRelocation || 'Study Abroad & Relocation'}</option>
                    <option value="fb-consulting">{translations.fbConsultingService || 'F&B Consulting'}</option>
                    <option value="both">{translations.bothServices || 'Both Services'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    {translations.message || 'Message'}
                  </label>
                  <Textarea
                    placeholder={translations.tellUsAboutGoals || "Tell us about your goals and how we can help..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  {translations.sendMessage || 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
                  {translations.quickContact || 'Quick Contact'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-slate-800 dark:text-white font-medium">
                        {translations.email || 'Email'}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">info@globalconnect.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-slate-800 dark:text-white font-medium">
                        {translations.phoneKorea || 'Phone (Korea)'}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">+82-10-1234-5678</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-slate-800 dark:text-white font-medium">
                        {translations.whatsapp || 'WhatsApp'}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">+82-10-1234-5678</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Consultation */}
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                  {translations.bookAConsultation || 'Book a Consultation'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {translations.scheduleFreeConsultation || 'Schedule a free 15-minute consultation to discuss your goals and get personalized advice.'}
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  {translations.scheduleConsultation || 'Schedule Free Consultation'}
                </Button>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-orange-600" />
                  {translations.officeHours || 'Office Hours'}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">
                      {translations.mondayFriday || 'Monday - Friday:'}
                    </span>
                    <span className="text-slate-800 dark:text-white font-medium">9:00 AM - 6:00 PM (KST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">
                      {translations.saturday || 'Saturday:'}
                    </span>
                    <span className="text-slate-800 dark:text-white font-medium">10:00 AM - 4:00 PM (KST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">
                      {translations.sunday || 'Sunday:'}
                    </span>
                    <span className="text-slate-800 dark:text-white font-medium">
                      {translations.closed || 'Closed'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
