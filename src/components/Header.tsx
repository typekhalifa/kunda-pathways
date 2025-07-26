
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: "Home", href: "/", type: "link" },
    { name: "About", href: "#about", type: "scroll" },
    { name: "Services", href: "#services", type: "scroll" },
    { name: "Resources", href: "/resources", type: "link" },
    { name: "Contact", href: "#contact", type: "scroll" },
  ];

  const handleNavClick = (href: string, type: string) => {
    if (type === "scroll" && href.startsWith("#")) {
      // Handle scroll navigation
      if (location.pathname !== "/") {
        // If not on home page, navigate to home first then scroll
        window.location.href = `/${href}`;
      } else {
        // If on home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (type === "link") {
      // Handle regular navigation
      if (href === "/" && location.pathname === "/") {
        // If already on home, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Let React Router handle the navigation for other cases
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f220c9e1-8cfe-42b0-af8c-5cbf33524148.png" 
              alt="Kunda Pathways Logo" 
              className="h-12 md:h-16 w-auto object-contain filter dark:brightness-150 dark:contrast-125 dark:saturate-200 dark:hue-rotate-15 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              item.type === "link" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <Link to="/book-consultation">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6">
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                item.type === "link" ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-left py-2"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-left py-2"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <ThemeToggle />
                </div>
              </div>
              <Link to="/book-consultation" className="pt-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  Book Consultation
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
