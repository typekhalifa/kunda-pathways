
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { translations } = useLanguage();

  // Safe function to split text and style the last word
  const renderStyledTitle = (text: string) => {
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
    <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {renderStyledTitle(translations.meetYourGlobalAdvisor || "Meet Your Global Advisor")}
          </h2>
          
          {/* Professional Photo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg border-4 border-white dark:border-slate-700">
              {/* Placeholder for professional photo - you can replace this with an actual image */}
              <GraduationCap size={80} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {translations.advisorName || "Dr. Sarah Johnson"}
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
            {translations.advisorTitle || "International Education & F&B Consultant"}
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
            {translations.advisorDescription || "With over 10 years of experience connecting African students to Korean universities and helping food businesses expand globally."}
          </p>
          
          <Link to="/about-advisor">
            <Button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            >
              {translations.readMoreAboutMe || "Read More About Me"}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.educationExpert || "Education Expert"}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.educationExpertDesc || "Specialized guidance for Korean university admissions"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.fbConsultant || "F&B Consultant"}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.fbConsultantDesc || "Expert advice for food & beverage businesses"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.studentsHelped || "500+ Students Helped"}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.studentsHelpedDesc || "Successfully guided students to Korean universities"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.countriesReached || "15+ Countries Reached"}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.countriesReachedDesc || "Students from across Africa benefited"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
