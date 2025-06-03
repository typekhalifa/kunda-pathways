
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BookFBConsultation = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
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

  const fbServices = [
    { id: 'market-entry', name: 'Market Entry Strategy', price: 2500 },
    { id: 'regulatory', name: 'Regulatory Compliance', price: 1800 },
    { id: 'product-dev', name: 'Product Development', price: 3200 },
    { id: 'supply-chain', name: 'Supply Chain Optimization', price: 2200 },
    { id: 'brand-local', name: 'Brand Localization', price: 1500 },
    { id: 'partnership', name: 'Partnership & Distribution', price: 2800 },
    { id: 'complete-package', name: 'Complete Market Entry Package', price: 12000 }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePayment = (method: string) => {
    console.log(`Processing payment via ${method}`);
    alert(`Payment processed via ${method}. Your F&B consultation request has been sent!`);
  };

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
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => handlePayment('Credit Card')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex items-center justify-center"
                >
                  <CreditCard className="mr-3" size={20} />
                  Pay with Credit/Debit Card
                </Button>
                <Button 
                  onClick={() => handlePayment('Mobile Money')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex items-center justify-center"
                >
                  <Smartphone className="mr-3" size={20} />
                  Pay with Mobile Money
                </Button>
                <Button 
                  onClick={() => handlePayment('Bank Transfer')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center"
                >
                  <Building className="mr-3" size={20} />
                  Pay with Bank Transfer
                </Button>
                <Button 
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="w-full py-4 rounded-xl border-slate-300 dark:border-slate-600 bg-white/10 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/20"
                >
                  Back to Edit Details
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
