
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-800 dark:text-white">
            Global<span className="text-blue-600">Connect</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
            <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a>
            <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#blog" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</a>
            <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Book Consultation
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button 
              className="text-slate-800 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#blog" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full">
                Book Consultation
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
