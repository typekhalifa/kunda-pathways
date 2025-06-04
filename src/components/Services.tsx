
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, Users, Globe, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import WhatsAppConsultationButton from "@/components/WhatsAppConsultationButton";

const Services = () => {
  const { translations } = useLanguage();

  const studyServices = [
    {
      title: translations.scholarshipGuidance || "Scholarship Guidance",
      description: "Complete guidance for finding and applying to scholarships",
      features: ["Scholarship search", "Application assistance", "Document preparation"]
    },
    {
      title: translations.universityAdmissions || "University Admissions",
      description: "End-to-end university admission support",
      features: ["University selection", "Application review", "Interview preparation"]
    },
    {
      title: "Visa Application",
      description: "Comprehensive visa application assistance",
      features: ["Document preparation", "Application filing", "Interview coaching"]
    },
    {
      title: "Korean Language Training",
      description: "Professional Korean language preparation",
      features: ["TOPIK preparation", "Conversation practice", "Cultural orientation"]
    }
  ];

  const fbServices = [
    {
      title: "Business Consultation",
      description: "Strategic business planning and market entry",
      features: ["Market research", "Business planning", "Strategy development"]
    },
    {
      title: translations.fbMarketAnalysis || "Market Analysis",
      description: "In-depth market analysis and competitive intelligence",
      features: ["Market sizing", "Competitor analysis", "Trend identification"]
    },
    {
      title: "Product Development",
      description: "Food product development and innovation",
      features: ["Recipe development", "Product testing", "Regulatory compliance"]
    },
    {
      title: "Regulatory Compliance",
      description: "Navigate food safety and regulatory requirements",
      features: ["Safety standards", "Certification support", "Compliance audits"]
    }
  ];

  // Safe function to split text and style the last word
  const renderStyledTitle = (text) => {
    if (!text || typeof text !== 'string') return text || '';
    const words = text.split(' ');
    if (words.length <= 1) return text;
    
    const mainText = words.slice(0, -1).join(' ');
    const lastWord = words.slice(-1)[0];
    
    return (
      <>
        {mainText} <span className="text-blue-600">{lastWord}</span>
      </>
    );
  };

  return (
    <section id="services" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {renderStyledTitle(translations.ourServices || "Our Services")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {translations.servicesDescription || "Comprehensive support for your educational and business goals"}
          </p>
        </div>

        {/* Study in Korea Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {translations.studyInKorea || "Study in Korea"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {studyServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800 hover:scale-105">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-white">{service.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle size={14} className="text-blue-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/study-programs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {translations.startYourJourney || "Start Your Journey"}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* F&B Consulting Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {translations.fbConsulting || "F&B Consulting"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {fbServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800 hover:scale-105">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-white">{service.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle size={14} className="text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/fb-consulting">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {translations.getExpertConsultation || "Get Expert Consultation"}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Let's Start Your Journey Section */}
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
            {translations.letsStartYourJourney || "Let's Start Your Journey"}
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            {translations.journeyDescription || "Ready to take the next step? Get personalized guidance for your goals."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <WhatsAppConsultationButton className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4" />
            <Link to="/book-consultation">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Star className="mr-2" size={16} />
                {translations.startYourJourney || "Start Your Journey"}
              </Button>
            </Link>
          </div>
        </div>

        {/* View All Packages */}
        <div className="text-center mt-12">
          <Link to="/all-services">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {translations.viewAllPackagesPricing || "View All Packages & Pricing"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
