
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

const BookConsultationContent = () => {
  const { translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            {translations.bookConsultation || 'Book Consultation'}
          </h1>
          <form className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Service Interest
              </label>
              <select className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600">
                <option>Study Abroad Consultation</option>
                <option>F&B Business Consulting</option>
                <option>Both Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Message
              </label>
              <Textarea placeholder="Tell us about your goals and how we can help..." rows={5} />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
              Send Consultation Request
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const BookConsultation = () => {
  return (
    <LanguageProvider>
      <BookConsultationContent />
    </LanguageProvider>
  );
};

export default BookConsultation;
