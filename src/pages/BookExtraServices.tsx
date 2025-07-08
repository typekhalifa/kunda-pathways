import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Building, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BookExtraServices = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedServices: [] as string[],
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const extraServices = [
    { id: 'hotel', name: 'Hotel Booking Assistance', price: 60 },
    { id: 'phone', name: 'Phone Consultation', price: 20 },
    { id: 'airport', name: 'Airport Pickup Service', price: 50 },
    { id: 'orientation', name: 'Cultural Orientation', price: 120 }
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
    return formData.selectedServices.reduce((total, id) => {
      const service = extraServices.find(s => s.id === id);
      return total + (service?.price || 0);
    }, 0);
  };

  const getSelectedServiceDetails = () => {
    return formData.selectedServices.map(id => 
      extraServices.find(s => s.id === id)
    ).filter(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePayment = (method: string) => {
    alert(`Payment via ${method} processed! Your service request has been received.`);
  };

  const selected = getSelectedServiceDetails();
  const total = getTotalPrice();

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <Link to="/">
              <Button variant="outline" className="mb-8 rounded-xl bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white">
                <ArrowLeft size={16} className="mr-2" />
                {translations.backToHome || "Back to Home"}
              </Button>
            </Link>

            <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
              Review Your Additional Services Request
            </h1>

            <Card className="bg-white/80 dark:bg-slate-800/80 p-8 shadow-lg mb-8 border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                  <Plane className="mr-3 text-purple-600" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                </div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div>
                  <strong>Selected Services:</strong>
                  <ul className="mt-2 space-y-1">
                    {selected.map(s => (
                      <li key={s?.id} className="flex justify-between text-sm bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">
                        <span>{s?.name}</span>
                        <span className="font-bold text-purple-600">${s?.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div><strong>Message:</strong> {formData.message}</div>
                <div className="text-lg font-bold pt-4 flex justify-between">
                  <span>Total:</span>
                  <span className="text-purple-600">${total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 p-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-white">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => handlePayment("Credit Card")} className="w-full bg-blue-600 text-white">
                  <CreditCard className="mr-2" /> Pay with Card
                </Button>
                <Button onClick={() => handlePayment("Mobile Money")} className="w-full bg-green-600 text-white">
                  <Smartphone className="mr-2" /> Pay with Mobile Money
                </Button>
                <Button onClick={() => handlePayment("Bank Transfer")} className="w-full bg-purple-600 text-white">
                  <Building className="mr-2" /> Pay with Bank Transfer
                </Button>
                <Button onClick={() => setCurrentStep(1)} variant="outline" className="w-full">
                  Back to Edit
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || "Back to Home"}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            Book Additional Services
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl shadow-lg border-0">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Full Name" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
              <Input type="email" label="Email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
              <Input type="tel" label="Phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Services</label>
              <div className="grid gap-3">
                {extraServices.map(service => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.selectedServices.includes(service.id)
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{service.name}</span>
                      <span className="text-purple-600 font-bold">${service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input type="date" label="Preferred Date" value={formData.preferredDate} onChange={(e) => handleInputChange('preferredDate', e.target.value)} />
              <Input type="time" label="Preferred Time" value={formData.preferredTime} onChange={(e) => handleInputChange('preferredTime', e.target.value)} />
            </div>

            <Textarea 
              label="Message" 
              value={formData.message} 
              onChange={(e) => handleInputChange('message', e.target.value)} 
              placeholder="Add notes or special requests..." 
              rows={4} 
            />

            {formData.selectedServices.length > 0 && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl font-bold text-slate-800 dark:text-white">
                Total: <span className="text-purple-600">${total.toLocaleString()}</span>
              </div>
            )}

            <Button 
              type="submit"
              disabled={formData.selectedServices.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Review Request
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookExtraServices;
