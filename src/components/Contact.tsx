
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const { translations } = useLanguage();
  const { settings } = useWebsiteSettings();
  
  // Get contact info from settings
  const contactInfo = settings?.contact || {
    email: "info@kundapathways.com",
    phone: "+82-10-1234-5678",
    whatsapp: "+82-10-1234-5678",
    location: "Seoul, South Korea"
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      toast.success(translations.messageSent || 'Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.contact || "Contact Us"}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {translations.readyToTakeNextStep || "Ready to take the next step in your journey? We're here to help you every step of the way."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                  <Send className="mr-3 text-blue-600" />
                  {translations.sendUsMessage || "Send us a message"}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-300">
                  {translations.fillFormBelow || "Fill out the form below and we'll get back to you within 24 hours."}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      {translations.yourName || "Your Name"}
                    </label>
                    <Input 
                      placeholder={translations.yourName || "Your Name"}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                    />
                  </div>
                  
                   <div>
                     <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                       {translations.yourEmail || "Your Email"}
                     </label>
                     <Input 
                       type="email" 
                       placeholder={translations.yourEmail || "Your Email"}
                       value={formData.email}
                       onChange={(e) => handleInputChange('email', e.target.value)}
                       required
                       className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                       {translations.phoneNumber || "Phone Number (Optional)"}
                     </label>
                     <Input 
                       type="tel" 
                       placeholder={translations.phoneNumber || "Phone Number"}
                       value={formData.phone}
                       onChange={(e) => handleInputChange('phone', e.target.value)}
                       className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                     />
                   </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      {translations.subject || "Subject"}
                    </label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{translations.selectSubject || "Select a subject"}</option>
                      <option value="general">{translations.generalInquiry || "General Inquiry"}</option>
                      <option value="study">{translations.studyAbroadRelocation || "Study Abroad & Relocation"}</option>
                      <option value="fb">{translations.fbConsultingService || "F&B Consulting Services"}</option>
                      <option value="both">{translations.bothServices || "Both Services"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      {translations.message || "Message"}
                    </label>
                    <Textarea 
                      placeholder={translations.tellUsAboutGoals || "Tell us about your goals and how we can help you achieve them..."}
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                    />
                  </div>

                   <Button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl"
                   >
                     {isSubmitting ? 'Sending...' : (translations.sendMessage || "Send Message")}
                   </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                    <MessageCircle className="mr-3 text-green-600" />
                    {translations.quickContact || "Quick Contact"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">Email</h4>
                      <p className="text-slate-600 dark:text-slate-300">{contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{translations.phoneKorea || "Phone (Korea)"}</h4>
                      <p className="text-slate-600 dark:text-slate-300">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{translations.whatsapp || "WhatsApp"}</h4>
                      <p className="text-slate-600 dark:text-slate-300">{contactInfo.whatsapp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{translations.location || "Location"}</h4>
                      <p className="text-slate-600 dark:text-slate-300">{contactInfo.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{translations.bookAConsultation || "Book a Consultation"}</h3>
                  <p className="mb-4 opacity-90">
                    {translations.scheduleFreeConsultation || "Schedule a free 15-minute consultation to discuss your goals."}
                  </p>
                  <Link to="/book-consultation">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold shadow-lg">
                      {translations.scheduleConsultation || "Schedule Consultation"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 dark:text-white flex items-center">
                    <Clock className="mr-3 text-blue-600" />
                    {translations.businessHours || "Business Hours"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{translations.mondayFriday || "Monday - Friday"}</span>
                    <span className="text-slate-800 dark:text-white font-medium">9:00 AM - 6:00 PM KST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{translations.saturday || "Saturday"}</span>
                    <span className="text-slate-800 dark:text-white font-medium">10:00 AM - 4:00 PM KST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{translations.sunday || "Sunday"}</span>
                    <span className="text-slate-800 dark:text-white font-medium">{translations.closed || "Closed"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
