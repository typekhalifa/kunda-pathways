
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, MapPin, Calendar, Users, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutAdvisor = () => {
  const { translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            {translations.backToHome}
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-8xl font-bold shadow-xl border-8 border-white dark:border-slate-700">
                <GraduationCap size={120} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.advisorName}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
              {translations.advisorTitle}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {translations.advisorFullDescription}
            </p>
          </div>

          {/* Biography Section */}
          <Card className="mb-12 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Users className="mr-3 text-blue-600" size={32} />
                {translations.biography}
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{translations.biographyP1}</p>
                <p>{translations.biographyP2}</p>
                <p>{translations.biographyP3}</p>
              </div>
            </CardContent>
          </Card>

          {/* Education & Qualifications */}
          <Card className="mb-12 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <GraduationCap className="mr-3 text-green-600" size={32} />
                {translations.educationQualifications}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">{translations.mscFoodScience}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{translations.seoulNationalUniversity}</p>
                      <p className="text-sm text-slate-500">{translations.graduationYear}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="text-green-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">{translations.bscNutrition}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{translations.universityOfRwanda}</p>
                      <p className="text-sm text-slate-500">{translations.undergraduateYear}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="text-purple-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">{translations.kgspScholar}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{translations.koreanGovernment}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="text-orange-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">{translations.businessCertification}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{translations.koreanChamberCommerce}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Experience */}
          <Card className="mb-12 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <TrendingUp className="mr-3 text-purple-600" size={32} />
                {translations.professionalExperience}
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{translations.consultantTitle}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{translations.consultantCompany}</p>
                  <p className="text-sm text-slate-500 mb-2">{translations.consultantPeriod}</p>
                  <p className="text-slate-600 dark:text-slate-300">{translations.consultantDescription}</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{translations.educationSpecialistTitle}</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">{translations.freelanceWork}</p>
                  <p className="text-sm text-slate-500 mb-2">{translations.specialistPeriod}</p>
                  <p className="text-slate-600 dark:text-slate-300">{translations.specialistDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.readyToStart}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {translations.contactCallToAction}
            </p>
            <Link to="/book-consultation">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg rounded-xl">
                {translations.bookConsultation}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutAdvisor;
