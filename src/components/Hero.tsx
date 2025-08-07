
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountingAnimation } from "@/hooks/useCountingAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const Hero = () => {
  const { translations } = useLanguage();
  const [aboutContent, setAboutContent] = useState(null);
  
  // Counting animations for statistics
  const studentsCount = useCountingAnimation(53, 2000, 500);
  const countriesCount = useCountingAnimation(13, 2000, 700);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('section_key', 'main')
        .maybeSingle();

      if (error) throw error;
      setAboutContent(data);
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  };

  // Safe handling of heroTitle to prevent undefined error
  const heroTitle = aboutContent?.title || translations.heroTitle || "Your Gateway to Global Education and Business Success";
  const heroTitleParts = heroTitle.split(' ');
  const mainTitle = heroTitleParts.slice(0, -2).join(' ');
  const highlightedTitle = heroTitleParts.slice(-2).join(' ');

  console.log('Hero component rendering with translations:', { heroTitle, translations });

  return (
    <section 
      id="home" 
      className="pt-24 pb-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {mainTitle}
            <span className="text-blue-400"> {highlightedTitle}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-semibold">
            {aboutContent?.description || translations.heroSubtitle || "Expert guidance for Korean university admissions, scholarships, and F&B business consulting"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/study-programs">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg font-semibold rounded-xl hover:scale-105 transition-all duration-300">
                {translations.exploreStudyPrograms || "Explore Study Programs"}
              </Button>
            </Link>
            <Link to="/fb-consulting">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 text-lg shadow-lg bg-black/20 backdrop-blur-sm font-semibold rounded-xl hover:scale-105 transition-all duration-300"
              >
                {translations.fbConsulting || "F&B Consulting"}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{studentsCount}+</div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">{translations.studentsAssisted || "Students Assisted"}</div>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">{countriesCount}+</div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">{translations.countriesReached || "Countries Reached"}</div>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">MSc</div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">{translations.foodScienceExpert || "Food Science & Tech Expert"}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto text-white" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
