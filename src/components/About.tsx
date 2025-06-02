
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { translations } = useLanguage();

  return (
    <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {translations.meetYourGlobalAdvisor.split(' ').slice(0, -2).join(' ')} <span className="text-blue-600">{translations.meetYourGlobalAdvisor.split(' ').slice(-2).join(' ')}</span>
          </h2>
          
          {/* Professional Photo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg border-4 border-white dark:border-slate-700">
              {/* Placeholder for professional photo - you can replace this with an actual image */}
              <GraduationCap size={80} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {translations.advisorName}
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
            {translations.advisorTitle}
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
            {translations.advisorDescription}
          </p>
          
          <Link to="/about-advisor">
            <Button variant="outline" className="mt-4 rounded-xl border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              {translations.readMoreAboutMe}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.educationExpert}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.educationExpertDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.fbConsultant}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.fbConsultantDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.studentsHelped}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.studentsHelpedDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{translations.countriesReached}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {translations.countriesReachedDesc}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
