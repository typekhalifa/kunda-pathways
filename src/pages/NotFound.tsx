import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { translations } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-slate-800 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            {translations.pageNotFound || "Page Not Found"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            {translations.pageNotFoundDesc || "The page you're looking for doesn't exist or has been moved."}
          </p>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3">
              {translations.returnHome || "Return to Home"}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
