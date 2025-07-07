
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, CheckCircle, Users, Award, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const StudyPrograms = () => {
  const { translations } = useLanguage();

  const programs = [
    {
      id: 1,
      title: translations.scholarshipGuidance,
      price: "$100",
      duration: "1-2 weeks",
      icon: <Award className="w-8 h-8 text-blue-600" />,
      description: translations.scholarshipGuidanceDesc,
      features: [
        translations.scholarshipSearch,
        translations.applicationAssistance,
        translations.documentPreparation
      ]
    },
    {
      id: 2,
      title: translations.universityAdmissions,
      price: "$70", 
      duration: "2-3 weeks",
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      description: translations.universityAdmissionSupportDesc,
      features: [
        translations.universitySelection,
        translations.applicationReview,
        translations.interviewPreparation
      ]
    },
    {
      id: 3,
      title: translations.visaApplicationAssistance,
      price: "$100",
      duration: "1 week", 
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      description: translations.visaApplicationAssistanceDesc,
      features: [
        translations.documentPreparation,
        translations.applicationFiling,
        translations.interviewCoaching
      ]
    },
    {
      id: 4,
      title: translations.koreanLanguagePreparation,
      price: "$80/month",
      duration: "Ongoing",
      icon: <Users className="w-8 h-8 text-orange-600" />,
      description: translations.languagePreparationDesc,
      features: [
        translations.topikPreparation,
        translations.conversationPractice,
        translations.culturalOrientation
      ]
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
              {translations.backToHome}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.studyProgramsTitle}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {translations.studyProgramsSubtitle}
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {programs.map((program) => (
              <Card key={program.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {program.icon}
                    <span className="text-2xl font-bold text-blue-600">{program.price}</span>
                  </div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white mb-2">
                    {program.title}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Duration: {program.duration}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {program.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle size={16} className="mr-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to="/book/study-abroad">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                      {translations.bookConsultation}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Complete Package */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Complete Study Abroad Package</h2>
            <p className="text-xl mb-6 opacity-90">
              Get all services at a 20% discount - Perfect for your Korean education journey
            </p>
            <div className="flex items-center justify-center mb-6">
              <span className="text-4xl font-bold mr-4">$250</span>
              <span className="text-2xl line-through opacity-70">$350</span>
            </div>
            <Link to="/book/complete-package">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
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
                  87% Success Rate
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  High success rate in scholarship applications and university admissions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                  53+ Students Helped
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Successfully guided students from across Africa to Korean universities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                  13+ Countries
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Students from over 13 African countries have benefited from our services
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

export default StudyPrograms;
