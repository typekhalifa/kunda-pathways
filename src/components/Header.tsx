import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { translations } = useLanguage();
  const navigate = useNavigate();

  const studyServices = [
    { name: translations.scholarshipGuidance || "Scholarship Guidance", path: "/study-programs" },
    { name: translations.universityAdmissions || "University Admissions", path: "/study-programs" }, 
    { name: translations.visaApplication || "Visa Application", path: "/study-programs" },
    { name: translations.koreanLanguageTraining || "Korean Language Training", path: "/study-programs" },
    { name: translations.visitsHelp || "Study Visits", path: "/study-programs" }
  ];

  const fbServices = [
    { name: translations.businessConsultation || "Business Consultation", path: "/fb-consulting" },
    { name: translations.fbMarketAnalysis || "Market Analysis", path: "/fb-consulting" }, 
    { name: translations.productDevelopment || "Product Development", path: "/fb-consulting" },
    { name: translations.regulatoryCompliance || "Regulatory Compliance", path: "/fb-consulting" }
  ];

  const handleNavigation = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleResourcesClick = () => {
    handleNavigation('blog-preview');
  };

  const handleLogoClick = () => {
    handleNavigation('home');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={handleLogoClick} className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            {/* Easily replaceable logo section */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white hidden sm:block">
              Kunda<span className="text-blue-600">Pathways</span>
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.home || "Home"}
            </button>
            
            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button 
                onClick={() => handleNavigation('services')}
                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.services || "Services"}
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-4 z-50 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4 px-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{translations.studyInKorea || "Study in Korea"}</h4>
                      <ul className="space-y-1">
                        {studyServices.map((service, index) => (
                          <li key={index}>
                            <Link 
                              to={service.path}
                              className="block text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">{translations.fbConsulting || "F&B Consulting"}</h4>
                      <ul className="space-y-1">
                        {fbServices.map((service, index) => (
                          <li key={index}>
                            <Link 
                              to={service.path}
                              className="block text-sm text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-1"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => handleNavigation('about')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.about || "About"}
            </button>
            <button 
              onClick={handleResourcesClick}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.resources || "Resources"}
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.contact || "Contact"}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/book-consultation">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-xl shadow-lg text-white">
                {translations.bookConsultation || "Book Consultation"}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button 
              className="text-slate-800 dark:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.home || "Home"}
              </button>
              <button 
                onClick={() => handleNavigation('services')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.services || "Services"}
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.about || "About"}
              </button>
              <button 
                onClick={handleResourcesClick}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.resources || "Resources"}
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.contact || "Contact"}
              </button>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <ThemeToggle />
              </div>
              <Link to="/book-consultation">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full rounded-xl shadow-lg text-white">
                  {translations.bookConsultation || "Book Consultation"}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
