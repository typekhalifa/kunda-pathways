import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, BookOpen, Briefcase, MapPin, Star, FileText, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutAdvisorContent = () => {
  const { translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-6xl font-bold">
              JD
            </div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.advisorName || 'John Doe, MSc'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
              {translations.advisorTitle || 'Food Science & Technology | Korean Education Expert'}
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-500">
              {translations.advisorFullDescription || 'A passionate advocate for global education and cross-cultural business development'}
            </p>
          </div>

          {/* Biography Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <BookOpen className="mr-3 text-blue-600" />
              {translations.biography || 'Biography'}
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>{translations.biographyP1 || 'Born and raised in Rwanda...'}</p>
              <p>{translations.biographyP2 || 'During his time in Korea...'}</p>
              <p>{translations.biographyP3 || 'After graduation...'}</p>
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <Award className="mr-3 text-green-600" />
              {translations.educationQualifications || 'Education & Qualifications'}
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {translations.mscFoodScience || 'MSc in Food Science & Technology'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {translations.seoulNationalUniversity || 'Seoul National University, Korea'}
                </p>
                <p className="text-sm text-slate-500">
                  {translations.graduationYear || '2019 - 2021'}
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {translations.bscNutrition || 'BSc in Nutrition Science'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {translations.universityOfRwanda || 'University of Rwanda'}
                </p>
                <p className="text-sm text-slate-500">
                  {translations.undergraduateYear || '2014 - 2018'}
                </p>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <Star className="mr-3 text-yellow-600" />
              {translations.skillsExpertise || 'Skills & Expertise'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                  {translations.educationConsulting || 'Education Consulting'}
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• {translations.scholarshipApplications || 'Scholarship Applications'}</li>
                  <li>• {translations.universitySelection || 'University Selection'}</li>
                  <li>• {translations.visaGuidance || 'Visa Guidance'}</li>
                  <li>• {translations.culturalAdaptation || 'Cultural Adaptation'}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                  {translations.businessConsulting || 'Business Consulting'}
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• {translations.marketResearch || 'Market Research'}</li>
                  <li>• {translations.productDevelopment || 'Product Development'}</li>
                  <li>• {translations.regulatoryAffairs || 'Regulatory Affairs'}</li>
                  <li>• {translations.businessStrategy || 'Business Strategy'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications & Training */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <Award className="mr-3 text-purple-600" />
              {translations.certificationsTraining || 'Certifications & Training'}
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {translations.haccp || 'HACCP Food Safety Certification'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {translations.haccpIssuer || 'Korean Food Safety Authority'}
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {translations.topik || 'TOPIK Level 6 (Korean Proficiency)'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {translations.topikIssuer || 'National Institute for International Education'}
                </p>
              </div>
            </div>
          </div>

          {/* Papers & Publications */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <FileText className="mr-3 text-indigo-600" />
              {translations.papersPublications || 'Papers & Publications'}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {translations.paper1 || 'Food Safety Standards in Korean F&B Industry'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {translations.paper1Journal || 'Asian Food Science Journal, 2022'}
                </p>
                <p className="text-sm text-slate-500">
                  {translations.paper1Description || 'Comprehensive analysis of food safety regulations and their impact on international business.'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {translations.paper2 || 'Educational Pathways for African Students in Korea'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {translations.paper2Journal || 'International Education Review, 2021'}
                </p>
                <p className="text-sm text-slate-500">
                  {translations.paper2Description || 'Study on challenges and opportunities for African students in Korean higher education.'}
                </p>
              </div>
            </div>
          </div>

          {/* Projects & Initiatives */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <Lightbulb className="mr-3 text-orange-600" />
              {translations.projectsInitiatives || 'Projects & Initiatives'}
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {translations.project1 || 'Korea-Africa Student Exchange Program'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {translations.project1Period || '2020 - Present'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {translations.project1Description || 'Founded and led a program connecting African students with Korean universities, facilitating over 200 successful placements.'}
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {translations.project2 || 'African Food Innovation Lab'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {translations.project2Period || '2021 - Present'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {translations.project2Description || 'Established a research initiative to adapt traditional African foods for Asian markets using modern food technology.'}
                </p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
              <Briefcase className="mr-3 text-purple-600" />
              {translations.professionalExperience || 'Professional Experience'}
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {translations.consultantTitle || 'Senior F&B Consultant'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {translations.consultantCompany || 'Korea-Africa Trade Council'}
                </p>
                <p className="text-sm text-slate-500 mb-2">
                  {translations.consultantPeriod || '2021 - Present'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {translations.consultantDescription || 'Leading market analysis and business development initiatives...'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {translations.educationSpecialistTitle || 'Education Consultant'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {translations.freelanceWork || 'Freelance'}
                </p>
                <p className="text-sm text-slate-500 mb-2">
                  {translations.specialistPeriod || '2020 - Present'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {translations.specialistDescription || 'Providing comprehensive guidance to African students...'}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {translations.readyToStart || 'Ready to Start Your Journey?'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {translations.contactCallToAction || 'Let\'s discuss how I can help you achieve your goals in Korea and Asia.'}
            </p>
            <Link to="/book-consultation">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold">
                {translations.bookConsultation || 'Book Consultation'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const AboutAdvisor = () => {
  return (
    <LanguageProvider>
      <AboutAdvisorContent />
    </LanguageProvider>
  );
};

export default AboutAdvisor;
