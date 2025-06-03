
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
    translations.scholarshipGuidance,
    translations.universityAdmissions, 
    "Visa Application",
    "Korean Language Training",
    translations.visitsHelp
  ];

  const fbServices = [
    "Business Consultation",
    translations.fbMarketAnalysis, 
    "Product Development",
    "Regulatory Compliance"
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-slate-800 dark:text-white hover:scale-105 transition-transform duration-300">
            Kunda<span className="text-blue-600">Pathways</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.home}
            </button>
            
            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button 
                onClick={() => handleNavigation('services')}
                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.services}
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-4 z-50 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4 px-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{translations.studyInKorea}</h4>
                      <ul className="space-y-1">
                        {studyServices.map((service, index) => (
                          <li key={index}>
                            <button 
                              onClick={() => handleNavigation('services')}
                              className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {service}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">{translations.fbConsulting}</h4>
                      <ul className="space-y-1">
                        {fbServices.map((service, index) => (
                          <li key={index}>
                            <button 
                              onClick={() => handleNavigation('services')}
                              className="text-sm text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                              {service}
                            </button>
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
              {translations.about}
            </button>
            <button 
              onClick={() => handleNavigation('blog-preview')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.resources}
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {translations.contact}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/book-consultation">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-xl shadow-lg">
                {translations.bookConsultation}
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
                {translations.home}
              </button>
              <button 
                onClick={() => handleNavigation('services')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.services}
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.about}
              </button>
              <button 
                onClick={() => handleNavigation('blog-preview')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.resources}
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {translations.contact}
              </button>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <ThemeToggle />
              </div>
              <Link to="/book-consultation">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full rounded-xl shadow-lg">
                  {translations.bookConsultation}
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
