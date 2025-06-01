
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Clock, Star, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const BookConsultation = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const services = [
    {
      id: "study-abroad",
      title: "Study Abroad & Relocation",
      description: "Complete guidance for international education",
      icon: "🎓",
      plans: [
        { id: "basic", name: "Basic Consultation", price: 49, duration: "30 min", features: ["Initial assessment", "University recommendations", "Basic guidance"] },
        { id: "standard", name: "Standard Package", price: 149, duration: "2 sessions", features: ["Detailed consultation", "Application assistance", "Visa guidance", "Document review"] },
        { id: "premium", name: "Premium Package", price: 299, duration: "Full support", features: ["Complete application support", "Interview preparation", "Visa assistance", "Relocation guidance", "3-month follow-up"] }
      ]
    },
    {
      id: "fb-consulting",
      title: "Food & Beverage Consulting",
      description: "Business consultation for F&B industry",
      icon: "🍽️",
      plans: [
        { id: "startup", name: "Startup Consultation", price: 99, duration: "45 min", features: ["Market analysis", "Basic business plan", "Initial guidance"] },
        { id: "business", name: "Business Development", price: 249, duration: "3 sessions", features: ["Detailed market research", "Business strategy", "Product development", "Regulatory guidance"] },
        { id: "enterprise", name: "Enterprise Solution", price: 499, duration: "Full package", features: ["Complete business setup", "Market entry strategy", "Regulatory compliance", "6-month support", "Partnership facilitation"] }
      ]
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedPlan("");
    setStep(2);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking Confirmed!",
      description: "We'll contact you within 24 hours to schedule your consultation.",
    });
    
    setLoading(false);
    setStep(4);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedPlanData = selectedServiceData?.plans.find(p => p.id === selectedPlan);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 animate-fade-in">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Book Your <span className="text-blue-600">Consultation</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Choose your service and get personalized guidance
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= num ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'} transition-all duration-300`}>
                    {step > num ? <Check className="w-5 h-5" /> : num}
                  </div>
                  {num < 4 && <div className={`w-16 h-1 ${step > num ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'} transition-all duration-300`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="animate-scale-in">
              <h2 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">Select Your Service</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <Card 
                    key={service.id} 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <CardTitle className="text-xl dark:text-white">{service.title}</CardTitle>
                      <CardDescription className="dark:text-slate-300">{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {step === 2 && selectedServiceData && (
            <div className="animate-scale-in">
              <h2 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">
                Choose Your {selectedServiceData.title} Plan
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedServiceData.plans.map((plan, index) => (
                  <Card 
                    key={plan.id}
                    className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 animate-fade-in ${
                      index === 1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'hover:border-blue-500'
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <CardHeader className="text-center">
                      {index === 1 && (
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 mx-auto w-fit">
                          Most Popular
                        </div>
                      )}
                      <CardTitle className="text-xl dark:text-white">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600 mt-4">${plan.price}</div>
                      <CardDescription className="dark:text-slate-300 flex items-center justify-center mt-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {plan.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-slate-600 dark:text-slate-300">
                            <Check className="w-4 h-4 text-green-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Contact Details & Payment */}
          {step === 3 && selectedPlanData && (
            <div className="animate-scale-in">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl dark:text-white">Your Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="dark:bg-slate-700 dark:text-white"
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="dark:bg-slate-700 dark:text-white"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="dark:bg-slate-700 dark:text-white"
                      />
                      <Textarea
                        placeholder="Tell us about your goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="dark:bg-slate-700 dark:text-white"
                      />
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Proceed to Payment (${selectedPlanData.price})
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl dark:text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h3 className="font-semibold dark:text-white">{selectedServiceData?.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300">{selectedPlanData.name}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-slate-600 dark:text-slate-300">Duration:</span>
                          <span className="dark:text-white">{selectedPlanData.duration}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium dark:text-white">Included:</h4>
                        {selectedPlanData.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <Check className="w-3 h-3 text-green-600 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span className="dark:text-white">Total:</span>
                          <span className="text-blue-600">${selectedPlanData.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                Thank you for booking with GlobalConnect. We'll contact you within 24 hours to schedule your consultation.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Return to Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
