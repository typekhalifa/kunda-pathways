import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { translations } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              {translations.about || "About"} <span className="text-blue-600">Kunda Pathways</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {translations.aboutDescription || "Empowering dreams through education and business excellence. We bridge cultures and create opportunities for global success."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                {translations.ourMission || "Our Mission"}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {translations.missionDescription || "To provide comprehensive, personalized guidance that transforms educational aspirations and business ventures into successful realities. We believe in the power of quality education and strategic business planning to change lives."}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <span className="text-slate-600 dark:text-slate-300">{translations.personalizedGuidance || "Personalized guidance tailored to your unique goals"}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <span className="text-slate-600 dark:text-slate-300">{translations.expertConsultation || "Expert consultation with proven track record"}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <span className="text-slate-600 dark:text-slate-300">{translations.endToEndSupport || "End-to-end support throughout your journey"}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {translations.meetYourGlobalAdvisor || "Meet Your Global Advisor"}
              </h4>
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/lovable-uploads/khali.jpg" 
                  alt="Global Advisor" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
                />
                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-white">{translations.advisorName || "Kunda John Kim"}</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{translations.advisorTitle || "International Education & F&B Expert"}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {translations.advisorDescription || "With over 8 years of experience in international education consulting and MSc in Food Science, our team has helped over 500 students achieve their academic dreams and numerous businesses expand globally."}
              </p>
              <Link to="/about-advisor">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  {translations.learnMore || "Learn More"}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">500+</h3>
                <p className="text-slate-600 dark:text-slate-300">{translations.successfulStudents || "Successful Students"}</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">50+</h3>
                <p className="text-slate-600 dark:text-slate-300">{translations.businessesHelped || "Businesses Helped"}</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">85%</h3>
                <p className="text-slate-600 dark:text-slate-300">{translations.scholarshipSuccessRate || "Scholarship Success Rate"}</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-600 mb-2">8+</h3>
                <p className="text-slate-600 dark:text-slate-300">{translations.yearsExperience || "Years Experience"}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
