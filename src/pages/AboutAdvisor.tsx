
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, TrendingUp, Users, Globe, Mail, Phone, MapPin, Clock, Star, Award, BookOpen, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import WhatsAppConsultationButton from "@/components/WhatsAppConsultationButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutAdvisor = () => {
  const { translations } = useLanguage();

  const handleEmailClick = () => {
    window.location.href = "mailto:info@kundapathways.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+821012345678";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || "Back to Home"}
            </Button>
          </Link>

          {/* Professional Photo and Introduction */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg border-4 border-white dark:border-slate-700">
                <GraduationCap size={80} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.advisorName || "Mr. Jean HAGABA"}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
              {translations.advisorTitle || "Global Education & F&B Consultant"}
            </p>
          </div>

          {/* Professional Summary */}
          <Card className="mb-8 bg-white dark:bg-slate-800 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                <Star className="mr-3 text-blue-600" size={24} />
                {translations.professionalSummary || "Professional Summary"}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {translations.advisorDescription || "With over 5 years of experience in international education consulting and F&B business development, I specialize in helping students achieve their academic dreams in Korea while also supporting entrepreneurs in navigating the Asian F&B market. My dual expertise in education and Food Science and Technology (MSc) allows me to provide comprehensive guidance for both academic and business ventures."}
              </p>
            </CardContent>
          </Card>

          {/* Expertise Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <GraduationCap className="mr-3 text-blue-600" size={20} />
                  {translations.educationExpertise || "Education Expertise"}
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• {translations.koreanGovernmentScholarshipProgram || "Korean Government Scholarship Program (KGSP)"}</li>
                  <li>• {translations.universityAdmissionStrategies || "University admission strategies"}</li>
                  <li>• {translations.visaApplicationGuidance || "Visa application guidance"}</li>
                  <li>• {translations.koreanLanguagePreparation || "Korean language preparation"}</li>
                  <li>• {translations.culturalAdaptationSupport || "Cultural adaptation support"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="mr-3 text-green-600" size={20} />
                  {translations.fbExpertise || "F&B Expertise"}
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• {translations.marketAnalysisEntryStrategies || "Market analysis & entry strategies"}</li>
                  <li>• {translations.productDevelopmentInnovation || "Product development & innovation"}</li>
                  <li>• {translations.regulatoryCompliance || "Regulatory compliance"}</li>
                  <li>• {translations.supplyChainOptimization || "Supply chain optimization"}</li>
                  <li>• {translations.businessPlanningFunding || "Business planning & funding"}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mb-8 bg-white dark:bg-slate-800 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Award className="mr-3 text-yellow-600" size={24} />
                {translations.keyAchievements || "Key Achievements"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-slate-600 dark:text-slate-300">{translations.studentsAssisted || "Students Assisted"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-slate-600 dark:text-slate-300">{translations.scholarshipSuccessRate || "Scholarship Success Rate"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                  <div className="text-slate-600 dark:text-slate-300">{translations.countriesReached || "Countries Reached"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 bg-white dark:bg-slate-800 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                {translations.getInTouch || "Get in Touch"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <Mail size={20} className="mr-3 text-blue-600" />
                    <button 
                      onClick={handleEmailClick}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
                    >
                      info@kundapath.com
                    </button>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <Phone size={20} className="mr-3 text-green-600" />
                    <button 
                      onClick={handlePhoneClick}
                      className="hover:text-green-600 dark:hover:text-green-400 transition-colors underline"
                    >
                      +82-10-1234-5678
                    </button>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <MapPin size={20} className="mr-3 text-purple-600" />
                    <span>{translations.location || "Seoul, South Korea"}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                    <Clock size={20} className="mr-2 text-orange-600" />
                    {translations.officeHours || "Office Hours"}
                  </h3>
                  <div className="space-y-2 text-slate-600 dark:text-slate-300">
                    <div>{translations.mondayToFriday || "Monday to Friday"}: 9:00 AM - 5:00 PM</div>
                    <div>{translations.saturdaySunday || "Saturday & Sunday"}: {translations.closed || "Closed"}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      ({translations.koreanTime || "Korean Standard Time"})
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <WhatsAppConsultationButton className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4" />
              </div>
            </CardContent>
          </Card>

          {/* Personal Mission */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center justify-center">
                <Target className="mr-3 text-blue-600" size={24} />
                {translations.myMission || "My Mission"}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                {translations.missionStatement || "To bridge cultures and create opportunities by guiding students towards world-class education in Korea and helping entrepreneurs build successful food businesses that connect global markets."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutAdvisor;
