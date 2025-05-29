
import { useState } from "react";
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

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    // Here you would implement actual language switching logic
    console.log(`Switching to ${langCode}`);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLang}</span>
        <ChevronDown size={14} />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg py-1 min-w-[120px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center space-x-2 text-sm"
            >
              <span>{lang.flag}</span>
              <span className="text-slate-700 dark:text-slate-300">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
