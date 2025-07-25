
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Utensils, TrendingUp, Globe, BarChart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const FBConsulting = () => {
  const { translations } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServiceIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'market entry strategy':
        return <Globe className="w-8 h-8 text-blue-600" />;
      case 'regulatory compliance':
        return <Shield className="w-8 h-8 text-green-600" />;
      case 'food product development':
        return <TrendingUp className="w-8 h-8 text-purple-600" />;
      case 'supply chain optimization':
        return <BarChart className="w-8 h-8 text-orange-600" />;
      case 'brand localization':
        return <Users className="w-8 h-8 text-pink-600" />;
      case 'partnership & distribution':
        return <Utensils className="w-8 h-8 text-red-600" />;
      default:
        return <Globe className="w-8 h-8 text-blue-600" />;
    }
  };

  const getServiceFeatures = (name) => {
    switch (name.toLowerCase()) {
      case 'market entry strategy':
        return [
          translations.marketSizing || "Market size analysis",
          translations.competitorAnalysis || "Competitor landscape mapping", 
          translations.strategyDevelopment || "Entry strategy development",
          "Risk assessment",
          "Timeline and milestones"
        ];
      case 'regulatory compliance':
        return [
          "Regulatory requirements analysis",
          "Documentation preparation",
          "Compliance roadmap",
          "Certification guidance",
          "Ongoing support"
        ];
      case 'food product development':
        return [
          "Consumer preference research",
          "Recipe adaptation",
          "Nutritional optimization",
          "Food quality control",
          "Packaging design guidance",
          "Test market strategy"
        ];
      case 'supply chain optimization':
        return [
          "Supplier identification",
          "Cost optimization",
          "Quality assurance",
          "Logistics planning",
          "Risk mitigation"
        ];
      case 'brand localization':
        return [
          "Cultural adaptation strategy",
          "Brand messaging localization",
          "Visual identity adjustment",
          "Marketing channel selection",
          "Launch campaign planning"
        ];
      case 'partnership & distribution':
        return [
          "Partner identification",
          "Due diligence support",
          "Contract negotiation guidance",
          "Distribution strategy",
          "Relationship management"
        ];
      default:
        return ["Service details", "Professional support", "Expert guidance"];
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('category', 'fb-consulting')
          .eq('is_active', true);

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
              {translations.fbConsulting || "F&B Consulting"} <span className="text-green-600">{translations.services || "Services"}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {translations.fbConsultingDescription || "Expert guidance for Food & Beverage businesses expanding into Asian markets"}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="text-slate-600 dark:text-slate-400">Loading services...</div>
              </div>
            ) : (
              services.map((service) => (
              <Card key={service.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {getServiceIcon(service.name)}
                    <span className="text-2xl font-bold text-green-600">${service.price}</span>
                  </div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white mb-2">
                    {service.name}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Duration: {service.duration}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {getServiceFeatures(service.name).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to={`/book-fb-consultation?service=${service.id}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              ))
            )}
          </div>

          {/* Package Deal */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Complete Market Entry Package</h2>
            <p className="text-xl mb-6 opacity-90">
              Get all services at a 25% discount - Perfect for comprehensive market entry
            </p>
            <div className="flex items-center justify-center mb-6">
              <span className="text-4xl font-bold mr-4">$12,000</span>
              <span className="text-2xl line-through opacity-70">$16,000</span>
            </div>
            <Link to="/fb-complete-package">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                Get Complete Package
              </Button>
            </Link>
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                  Food Science & Tech Expert
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Master of Science in Food Science and Technology with specialisation in Asian markets
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                  5+ Years Experience
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Extensive experience helping businesses succeed in Asian F&B markets
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                  17+ Successful Projects
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Proven track record of successful F&B market entries and expansions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FBConsulting;
