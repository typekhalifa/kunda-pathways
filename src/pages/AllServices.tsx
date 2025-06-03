
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, Utensils, Plane, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AllServices = () => {
  const { translations } = useLanguage();

  const studyServices = [
    { name: "Scholarship Guidance", price: "$150", duration: "1-2 weeks", description: "Complete guidance for finding and applying to scholarships" },
    { name: "University Admissions", price: "$200", duration: "2-3 weeks", description: "End-to-end university application support" },
    { name: "Visa Application Help", price: "$100", duration: "1 week", description: "Expert assistance with student visa applications" },
    { name: "Korean Language Training", price: "$80/month", duration: "Ongoing", description: "Personalized Korean language lessons" },
    { name: "Visits Help & Relocations", price: "$120", duration: "1-2 weeks", description: "Support for academic visits and relocations" },
  ];

  const fbServices = [
    { name: "Market Entry Strategy", price: "$2,500", duration: "2-3 weeks", description: "Comprehensive market analysis and entry strategy" },
    { name: "Regulatory Compliance", price: "$1,800", duration: "1-2 weeks", description: "Navigate food safety regulations" },
    { name: "Product Development", price: "$3,200", duration: "4-6 weeks", description: "Develop products for Asian markets" },
    { name: "Supply Chain Optimization", price: "$2,200", duration: "2-4 weeks", description: "Optimize supply chain efficiency" },
    { name: "Brand Localization", price: "$1,500", duration: "1-3 weeks", description: "Adapt brand for local markets" },
    { name: "Partnership & Distribution", price: "$2,800", duration: "3-5 weeks", description: "Connect with local partners" },
  ];

  const additionalServices = [
    { name: "Hotel Booking Assistance", price: "$50", duration: "1-3 days", description: "Help with accommodation bookings" },
    { name: "Phone Consultation", price: "$75/hour", duration: "1 hour", description: "Direct consultation via phone call" },
    { name: "Airport Pickup Service", price: "$80", duration: "1 day", description: "Arrange airport pickup in Korea" },
    { name: "Cultural Orientation", price: "$150", duration: "1 week", description: "Prepare for cultural adaptation" },
  ];

  const packages = [
    {
      name: "Study Abroad Complete Package",
      originalPrice: 650,
      discountedPrice: 520,
      discount: "20% OFF",
      services: ["Scholarship Guidance", "University Admissions", "Visa Application", "Korean Language (1 month)", "Cultural Orientation"],
      popular: true
    },
    {
      name: "F&B Market Entry Complete",
      originalPrice: 16000,
      discountedPrice: 12000,
      discount: "25% OFF",
      services: ["Market Entry Strategy", "Regulatory Compliance", "Product Development", "Supply Chain", "Brand Localization", "Partnership Support"],
      popular: false
    },
    {
      name: "Student + F&B Combo",
      originalPrice: 800,
      discountedPrice: 600,
      discount: "25% OFF",
      services: ["Study Abroad Package", "Basic F&B Consultation", "Cultural Orientation", "Business Networking"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-white/20 dark:border-white/20 bg-white/10 dark:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 shadow-lg">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              All Services & <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Comprehensive solutions for your educational and business needs
            </p>
          </div>

          {/* Package Deals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">
              🎯 Special Package Deals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 dark:text-white text-center">
                      {pkg.name}
                    </CardTitle>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-blue-600">${pkg.discountedPrice}</span>
                      <span className="text-lg line-through text-slate-500 ml-2">${pkg.originalPrice}</span>
                      <div className="text-green-600 font-bold text-sm mt-1">{pkg.discount}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {pkg.services.map((service, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle size={16} className="mr-2 text-green-500" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <Link to="/book-consultation">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        Book Package
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Study Abroad Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-blue-600" size={32} />
              Study Abroad Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyServices.map((service, index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-800 dark:text-white">{service.name}</h3>
                      <span className="text-blue-600 font-bold text-lg">{service.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{service.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Duration: {service.duration}</p>
                    <Link to="/book-consultation">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* F&B Consulting Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
              <Utensils className="mr-3 text-green-600" size={32} />
              F&B Consulting Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fbServices.map((service, index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-800 dark:text-white">{service.name}</h3>
                      <span className="text-green-600 font-bold text-lg">{service.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{service.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Duration: {service.duration}</p>
                    <Link to="/book-fb-consultation">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
              <Plane className="mr-3 text-purple-600" size={32} />
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-3">
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{service.name}</h3>
                      <span className="text-purple-600 font-bold text-xl">{service.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 text-center mb-2">{service.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-4">Duration: {service.duration}</p>
                    <Link to="/book-consultation">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Contact us for personalized packages and enterprise solutions
            </p>
            <Link to="/book-consultation">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllServices;
