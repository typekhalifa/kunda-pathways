
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, Users, Globe, ArrowRight, CheckCircle, Star, Sparkles, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import WhatsAppConsultationButton from "@/components/WhatsAppConsultationButton";

const Services = () => {
  const { translations } = useLanguage();

  // Hardcoded services data
  const studyServices = [
    {
      title: "Scholarship Guidance",
      description: "Expert guidance for finding and applying to scholarships in Korea",
      features: [
        translations.scholarshipSearch || "Scholarship search",
        translations.applicationAssistance || "Application assistance", 
        translations.documentPreparation || "Document preparation"
      ],
      price: "100"
    },
    {
      title: "University Admissions", 
      description: "Complete support for Korean university admission process",
      features: [
        translations.universitySelection || "University selection",
        translations.applicationReview || "Application review",
        translations.interviewPreparation || "Interview preparation"
      ],
      price: "70"
    },
    {
      title: "Visa Application Assistance",
      description: "Professional help with Korean student visa applications", 
      features: [
        translations.documentPreparation || "Document preparation",
        translations.applicationFiling || "Application filing",
        translations.interviewCoaching || "Interview coaching"
      ],
      price: "100"
    },
    {
      title: "Korean Language Preparation",
      description: "Comprehensive Korean language preparation program",
      features: [
        translations.topikPreparation || "TOPIK preparation",
        translations.conversationPractice || "Conversation practice", 
        translations.culturalOrientation || "Cultural orientation"
      ],
      price: "80"
    }
  ];

  const fbServices = [
    {
      title: "Market Entry Strategy",
      description: "Strategic market analysis and entry planning for Korean F&B market",
      features: [
        translations.marketResearch || "Market research",
        translations.businessPlanning || "Business planning",
        translations.strategyDevelopment || "Strategy development"
      ],
      price: "200"
    },
    {
      title: "Regulatory Compliance",
      description: "Food safety and regulatory compliance guidance",
      features: [
        translations.safetyStandards || "Safety standards", 
        translations.certificationSupport || "Certification support",
        translations.complianceAudits || "Compliance audits"
      ],
      price: "150"
    },
    {
      title: "Food Product Development", 
      description: "Product development and innovation support",
      features: [
        translations.recipeDevelopment || "Recipe development",
        translations.productTesting || "Product testing",
        translations.regulatoryCompliance || "Regulatory compliance"
      ],
      price: "250"
    },
    {
      title: "Supply Chain Optimization",
      description: "Optimize your supply chain for the Korean market",
      features: [
        "Supplier identification",
        "Cost optimization",
        "Quality assurance"
      ],
      price: "180"
    }
  ];

  const getServiceIcon = (title) => {
    switch (title.toLowerCase()) {
      case 'scholarship guidance':
        return <Award className="w-6 h-6 text-blue-600" />;
      case 'university admissions':
        return <GraduationCap className="w-6 h-6 text-green-600" />;
      case 'visa application assistance':
        return <Globe className="w-6 h-6 text-purple-600" />;
      case 'korean language preparation':
        return <Users className="w-6 h-6 text-orange-600" />;
      default:
        return <GraduationCap className="w-6 h-6 text-blue-600" />;
    }
  };

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
    <section id="services" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {renderStyledTitle(translations.ourServices || "Our Services")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {translations.servicesDescription || "Comprehensive support for your educational and business goals"}
          </p>
        </div>

        {/* Study in Korea Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {translations.studyInKorea || "Study in Korea"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {studyServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card dark:bg-card hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {getServiceIcon(service.title)}
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">{service.title}</h4>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
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
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {translations.fbConsulting || "F&B Consulting"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {fbServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card dark:bg-card hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">{service.title}</h4>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
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
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {translations.letsStartYourJourney || "Let's Start Your Journey"}
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {translations.journeyDescription || "Ready to take the next step? Get personalized guidance for your goals."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <WhatsAppConsultationButton className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4" />
            <Link to="/book-consultation">
              <Button 
                size="lg" 
                className="px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Star className="mr-2" size={16} />
                {translations.getFullConsultation || "Get Full Consultation"}
              </Button>
            </Link>
          </div>
        </div>

        {/* View All Packages with 25% off */}
        <div className="text-center mt-12">
          <Link to="/all-services">
            <Button 
              variant="outline" 
              size="lg"
              className="px-4 sm:px-8 py-4 text-xs sm:text-sm md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2" size={20} />
              {translations.viewAllPackagesPricing || "View All Packages & Pricing"} - Get 25% Off!
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
