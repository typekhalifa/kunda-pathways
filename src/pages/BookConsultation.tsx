
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BookConsultation = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const services = [
    { id: 'study-abroad', name: translations.studyAbroadRelocation || 'Study Abroad & Relocation', price: 150 },
    { id: 'fb-consulting', name: translations.fbConsultingService || 'F&B Consulting', price: 200 },
    { id: 'visa-application', name: translations.visaApplication || 'Visa Application Help', price: 100 },
    { id: 'hotel-booking', name: translations.hotelBooking || 'Hotel Booking Assistance', price: 50 },
    { id: 'phone-consultation', name: translations.phoneConsultation || 'Phone Consultation', price: 75 },
    { id: 'both-services', name: translations.bothServices || 'Study Abroad + F&B Consulting', price: 300 }
  ];

  const selectedService = services.find(s => s.id === formData.service);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePayment = (method: string) => {
    console.log(`Processing payment via ${method}`);
    alert(`Payment processed via ${method}. Your consultation request has been sent!`);
  };

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <Link to="/">
              <Button variant="outline" className="mb-8 rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                <ArrowLeft size={16} className="mr-2" />
                {translations.backToHome || 'Back to Home'}
              </Button>
            </Link>

            <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
              {translations.reviewConsultation || 'Review Your Consultation Request'}
            </h1>

            <Card className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg mb-8 border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">
                  {translations.consultationDetails || 'Consultation Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {translations.fullName || 'Full Name'}
                    </label>
                    <p className="text-slate-800 dark:text-white">{formData.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {translations.email || 'Email'}
                    </label>
                    <p className="text-slate-800 dark:text-white">{formData.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {translations.selectedService || 'Selected Service'}
                  </label>
                  <p className="text-slate-800 dark:text-white">{selectedService?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {translations.message || 'Message'}
                  </label>
                  <p className="text-slate-800 dark:text-white">{formData.message}</p>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-slate-800 dark:text-white">{translations.totalPrice || 'Total Price'}:</span>
                    <span className="text-blue-600">${selectedService?.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">
                  {translations.paymentMethods || 'Payment Methods'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => handlePayment('Credit Card')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex items-center justify-center"
                >
                  <CreditCard className="mr-3" size={20} />
                  {translations.payWithCard || 'Pay with Credit/Debit Card'}
                </Button>
                <Button 
                  onClick={() => handlePayment('Mobile Money')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex items-center justify-center"
                >
                  <Smartphone className="mr-3" size={20} />
                  {translations.payWithMobile || 'Pay with Mobile Money'}
                </Button>
                <Button 
                  onClick={() => handlePayment('Bank Transfer')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center"
                >
                  <Building className="mr-3" size={20} />
                  {translations.payWithBank || 'Pay with Bank Transfer'}
                </Button>
                <Button 
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="w-full py-4 rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {translations.backToEdit || 'Back to Edit Details'}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            {translations.bookConsultation || 'Book Consultation'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.fullName || 'Full Name'}
                </label>
                <Input 
                  placeholder={translations.fullName || "Your full name"}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.email || 'Email'}
                </label>
                <Input 
                  type="email" 
                  placeholder={translations.email || "your.email@example.com"}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                {translations.phone || 'Phone Number'}
              </label>
              <Input 
                type="tel" 
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                {translations.selectService || 'Select Service'}
              </label>
              <select 
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                required
              >
                <option value="">{translations.selectService || 'Select a service'}</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.preferredDate || 'Preferred Date'}
                </label>
                <Input 
                  type="date" 
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {translations.preferredTime || 'Preferred Time'}
                </label>
                <Input 
                  type="time" 
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                {translations.message || 'Message'}
              </label>
              <Textarea 
                placeholder={translations.tellUsAboutGoals || "Tell us about your goals and how we can help..."}
                rows={5} 
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                className="bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              {translations.reviewConsultationRequest || 'Review Consultation Request'}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookConsultation;
