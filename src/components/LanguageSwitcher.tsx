
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "RW", name: "Kinyarwanda", flag: "🇷🇼" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "KO", name: "한국어", flag: "🇰🇷" },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "EN";
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    localStorage.setItem("language", langCode);
    
    // Dispatch a custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }));
    
    console.log(`Language switched to ${langCode}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative language-switcher">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLang}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg py-1 min-w-[140px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center space-x-2 text-sm transition-colors ${
                currentLang === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
