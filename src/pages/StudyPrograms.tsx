
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, MapPin, Clock, DollarSign, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const StudyPrograms = () => {
  const { translations } = useLanguage();

  const publicUniversities = [
    {
      id: 1,
      name: "Seoul National University",
      country: translations.southKorea || "South Korea",
      program: translations.computerScienceEngineering || "Computer Science & Engineering",
      duration: translations.fourYears || "4 years",
      tuition: "$8,000/year",
      requirements: [
        translations.topikLevel4Plus || "TOPIK Level 4+", 
        "SAT 1400+", 
        translations.englishProficiency || "English Proficiency", 
        translations.academicTranscripts || "Academic Transcripts"
      ],
      ranking: translations.numberOneInKorea || "#1 in Korea",
      scholarships: translations.fullPartialAvailable || "Full & Partial Available"
    },
    {
      id: 2,
      name: "University of Tokyo",
      country: translations.japan || "Japan",
      program: translations.internationalBusiness || "International Business",
      duration: translations.fourYears || "4 years",
      tuition: "$10,000/year",
      requirements: [
        "JLPT N2+", 
        "TOEFL 90+", 
        translations.academicExcellence || "Academic Excellence", 
        translations.interview || "Interview"
      ],
      ranking: translations.numberOneInJapan || "#1 in Japan",
      scholarships: translations.mextScholarshipAvailable || "MEXT Scholarship Available"
    },
    {
      id: 3,
      name: "Peking University",
      country: translations.china || "China",
      program: translations.internationalRelations || "International Relations",
      duration: translations.fourYears || "4 years",
      tuition: "$6,000/year",
      requirements: [
        "HSK Level 6", 
        "IELTS 7.0+", 
        translations.academicRecords || "Academic Records", 
        translations.personalStatement || "Personal Statement"
      ],
      ranking: translations.numberOneInChina || "#1 in China",
      scholarships: translations.chineseGovernmentScholarship || "Chinese Government Scholarship"
    }
  ];

  const privateUniversities = [
    {
      id: 4,
      name: "Yonsei University",
      country: translations.southKorea || "South Korea",
      program: translations.globalMBA || "Global MBA",
      duration: translations.twoYears || "2 years",
      tuition: "$25,000/year",
      requirements: [
        "GMAT 650+", 
        translations.workExperience3Plus || "Work Experience 3+ years", 
        "TOEFL 100+", 
        translations.lettersOfRecommendation || "Letters of Recommendation"
      ],
      ranking: translations.top3PrivateInKorea || "Top 3 Private in Korea",
      scholarships: translations.meritBasedAvailable || "Merit-based Available"
    },
    {
      id: 5,
      name: "Waseda University",
      country: translations.japan || "Japan",
      program: translations.internationalLiberalStudies || "International Liberal Studies",
      duration: translations.fourYears || "4 years",
      tuition: "$35,000/year",
      requirements: [
        "SAT 1300+", 
        "TOEFL 90+", 
        translations.essay || "Essay", 
        translations.interview || "Interview"
      ],
      ranking: translations.topPrivateInJapan || "Top Private in Japan",
      scholarships: translations.internationalStudentScholarships || "International Student Scholarships"
    },
    {
      id: 6,
      name: "Korea University",
      country: translations.southKorea || "South Korea",
      program: translations.foodScienceTechnology || "Food Science & Technology",
      duration: translations.fourYears || "4 years",
      tuition: "$20,000/year",
      requirements: [
        translations.topikLevel5Plus || "TOPIK Level 5+", 
        translations.scienceBackground || "Science Background", 
        "TOEFL 85+", 
        translations.portfolio || "Portfolio"
      ],
      ranking: translations.top3PrivateInKorea || "Top 3 Private in Korea",
      scholarships: translations.industryPartnershipScholarships || "Industry Partnership Scholarships"
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
              {translations.studyProgramsTitle || "Study Programs in"} <span className="text-blue-600">{translations.eastAsia || "East Asia"}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {translations.studyProgramsDescription || "Discover world-class education opportunities at top universities across Korea, Japan, and China"}
            </p>
          </div>

          {/* Public Universities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-blue-600" size={32} />
              {translations.publicUniversities || "Public Universities"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicUniversities.map((university) => (
                <Card key={university.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                        {university.ranking}
                      </span>
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <MapPin size={14} className="mr-1" />
                        {university.country}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-slate-800 dark:text-white">
                      {university.name}
                    </CardTitle>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {university.program}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-slate-600 dark:text-slate-300">
                        <Clock size={16} className="mr-2 text-green-600" />
                        <span>{university.duration}</span>
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-slate-300">
                        <DollarSign size={16} className="mr-2 text-green-600" />
                        <span>{university.tuition}</span>
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        💰 {university.scholarships}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{translations.requirements || "Requirements"}:</h4>
                      <div className="space-y-1">
                        {university.requirements.map((req, index) => (
                          <div key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle size={12} className="mr-2 text-green-500" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                      {translations.seeMoreDetails || "See More Details"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Private Universities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-purple-600" size={32} />
              {translations.privateUniversities || "Private Universities"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privateUniversities.map((university) => (
                <Card key={university.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                        {university.ranking}
                      </span>
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <MapPin size={14} className="mr-1" />
                        {university.country}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-slate-800 dark:text-white">
                      {university.name}
                    </CardTitle>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold">
                      {university.program}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-slate-600 dark:text-slate-300">
                        <Clock size={16} className="mr-2 text-green-600" />
                        <span>{university.duration}</span>
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-slate-300">
                        <DollarSign size={16} className="mr-2 text-green-600" />
                        <span>{university.tuition}</span>
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        💰 {university.scholarships}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{translations.requirements || "Requirements"}:</h4>
                      <div className="space-y-1">
                        {university.requirements.map((req, index) => (
                          <div key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle size={12} className="mr-2 text-green-500" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                      {translations.seeMoreDetails || "See More Details"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              {translations.readyToStartAcademicJourney || "Ready to Start Your Academic Journey?"}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {translations.getPersonalizedGuidanceSupport || "Get personalized guidance and support for your university application process"}
            </p>
            <Link to="/book-consultation">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                {translations.scheduleConsultation150 || "Schedule Consultation - $150"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudyPrograms;
