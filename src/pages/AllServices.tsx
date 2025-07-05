
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
    { 
      name: translations.scholarshipGuidanceService || "Scholarship Guidance", 
      price: "$100", 
      duration: translations.oneToTwoWeeks || "1-2 weeks", 
      description: translations.scholarshipGuidanceDesc || "Complete guidance for finding and applying to scholarships" 
    },
    { 
      name: translations.universityAdmissionsService || "University Admissions", 
      price: "$70", 
      duration: translations.twoToThreeWeeks || "2-3 weeks", 
      description: translations.universityAdmissionsDesc || "End-to-end university application support" 
    },
    { 
      name: translations.visaApplicationHelpService || "Visa Application Help", 
      price: "$100", 
      duration: translations.oneWeek || "1 week", 
      description: translations.visaApplicationHelpDesc || "Expert assistance with student visa applications" 
    },
    { 
      name: translations.koreanLanguageTrainingService || "Korean Language Training", 
      price: `$80${translations.perMonth || "/month"}`, 
      duration: translations.ongoing || "Ongoing", 
      description: translations.koreanLanguageTrainingDesc || "Personalized Korean language lessons" 
    },
    { 
      name: translations.visitsHelpRelocationsService || "Visits Help & Relocations", 
      price: "$100", 
      duration: translations.oneToTwoWeeks || "1-2 weeks", 
      description: translations.visitsHelpRelocationsDesc || "Support for academic visits and relocations" 
    },
  ];

  const fbServices = [
    { 
      name: translations.marketEntryStrategyService || "Market Entry Strategy", 
      price: "$2,500", 
      duration: translations.twoToThreeWeeks || "2-3 weeks", 
      description: translations.marketEntryStrategyDesc || "Comprehensive market analysis and entry strategy" 
    },
    { 
      name: translations.regulatoryComplianceService || "Regulatory Compliance", 
      price: "$1,800", 
      duration: translations.oneToTwoWeeks || "1-2 weeks", 
      description: translations.regulatoryComplianceDesc || "Navigate food safety regulations" 
    },
    { 
      name: translations.productDevelopmentService || "Product Development", 
      price: "$3,200", 
      duration: translations.fourToSixWeeks || "4-6 weeks", 
      description: translations.productDevelopmentDesc || "Develop products for Asian markets" 
    },
    { 
      name: translations.supplyChainOptimizationService || "Supply Chain Optimization", 
      price: "$2,200", 
      duration: translations.twoToFourWeeks || "2-4 weeks", 
      description: translations.supplyChainOptimizationDesc || "Optimize supply chain efficiency" 
    },
    { 
      name: translations.brandLocalizationService || "Brand Localization", 
      price: "$1,500", 
      duration: translations.oneToThreeWeeks || "1-3 weeks", 
      description: translations.brandLocalizationDesc || "Adapt brand for local markets" 
    },
    { 
      name: translations.partnershipDistributionService || "Partnership & Distribution", 
      price: "$2,800", 
      duration: translations.threeToFiveWeeks || "3-5 weeks", 
      description: translations.partnershipDistributionDesc || "Connect with local partners" 
    },
  ];

  const additionalServices = [
    { 
      name: translations.hotelBookingAssistanceService || "Hotel Booking Assistance", 
      price: "$60", 
      duration: translations.oneToThreeDays || "1-3 days", 
      description: translations.hotelBookingAssistanceDesc || "Help with accommodation bookings" 
    },
    { 
      name: translations.phoneConsultationService || "Phone Consultation", 
      price: `$20${translations.perHour || "/hour"}`, 
      duration: translations.oneHour || "1 hour", 
      description: translations.phoneConsultationDesc || "Direct consultation via phone call" 
    },
    { 
      name: translations.airportPickupService || "Airport Pickup Service", 
      price: "$50", 
      duration: translations.oneDay || "1 day", 
      description: translations.airportPickupDesc || "Arrange airport pickup in Korea" 
    },
    { 
      name: translations.culturalOrientationService || "Cultural Orientation", 
      price: "$120", 
      duration: translations.oneWeek || "1 week", 
      description: translations.culturalOrientationDesc || "Prepare for cultural adaptation" 
    },
  ];

  const packages = [
    {
      name: translations.studyAbroadCompletePackage || "Study Abroad Complete Package",
      originalPrice: 500,
      discountedPrice: 320,
      discount: translations.twentyPercentOff || "38% OFF",
      services: [
        translations.scholarshipGuidance || "Scholarship Guidance", 
        translations.universityAdmissions || "University Admissions", 
        translations.visaApplicationAssistance || "Visa Application", 
        `${translations.koreanLanguagePreparation || "Korean Language"} (1 ${translations.perMonth?.replace('/', '') || "month"})`, 
        translations.culturalOrientation || "Cultural Orientation"
      ],
      popular: true
    },
    {
      name: translations.fbMarketEntryComplete || "F&B Market Entry Complete",
      originalPrice: 16000,
      discountedPrice: 12000,
      discount: translations.twentyFivePercentOff || "25% OFF",
      services: [
        translations.marketEntryStrategyService || "Market Entry Strategy", 
        translations.regulatoryComplianceService || "Regulatory Compliance", 
        translations.productDevelopmentService || "Product Development", 
        translations.supplyChainOptimizationService || "Supply Chain", 
        translations.brandLocalizationService || "Brand Localization", 
        translations.partnershipDistributionService || "Partnership Support"
      ],
      popular: false
    },
    {
      name: translations.studentFbCombo || "Student + F&B Combo",
      originalPrice: 800,
      discountedPrice: 600,
      discount: translations.twentyFivePercentOff || "25% OFF",
      services: [
        translations.studyAbroadCompletePackage || "Study Abroad Package", 
        translations.basicFbConsultation || "Basic F&B Consultation", 
        translations.culturalOrientation || "Cultural Orientation", 
        translations.businessNetworking || "Business Networking"
      ],
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
              {translations.allServicesTitle || "All Services & "}<span className="text-blue-600">{translations.allServicesTitle?.includes('&') ? translations.allServicesTitle.split('&')[1].trim() : "Pricing"}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {translations.allServicesSubtitle || "Comprehensive solutions for your educational and business needs"}
            </p>
          </div>

          {/* Package Deals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">
              🎯 {translations.specialPackageDeals || "Special Package Deals"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {translations.mostPopular || "MOST POPULAR"}
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
                        {translations.bookPackage || "Book Package"}
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
              {translations.studyAbroadServices || "Study Abroad Services"}
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
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{translations.duration || "Duration"}: {service.duration}</p>
                    <Link to="/book-consultation">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        {translations.bookNow || "Book Now"}
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
              {translations.fbConsultingServices || "F&B Consulting Services"}
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
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{translations.duration || "Duration"}: {service.duration}</p>
                    <Link to="/book-fb-consultation">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                        {translations.bookNow || "Book Now"}
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
              {translations.additionalServices || "Additional Services"}
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
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-4">{translations.duration || "Duration"}: {service.duration}</p>
                    <Link to="/book-consultation">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                        {translations.bookNow || "Book Now"}
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
              {translations.needCustomSolution || "Need a Custom Solution?"}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {translations.contactForCustom || "Contact us for personalized packages and enterprise solutions"}
            </p>
            <Link to="/book-consultation">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                {translations.getCustomQuote || "Get Custom Quote"}
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
