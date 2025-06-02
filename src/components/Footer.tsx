
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              Kunda<span className="text-blue-400">Pathways</span>
            </div>
            <p className="text-slate-400 dark:text-slate-300 leading-relaxed mb-6">
              {translations.footerDescription}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-700 rounded-full">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-700 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-700 rounded-full">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-700 rounded-full">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{translations.quickLinks}</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">{translations.aboutUs}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{translations.studyInKorea}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{translations.fbConsulting}</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">{translations.resourcesBlog}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{translations.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{translations.services}</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#services" className="hover:text-white transition-colors">{translations.scholarshipGuidance}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{translations.universityAdmissions}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{translations.fbMarketAnalysis}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{translations.visitsHelp}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{translations.legal}</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{translations.privacyPolicy}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">{translations.termsOfService}</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors">{translations.sitemap}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{translations.contactInfo}</h4>
            <div className="space-y-3 text-slate-400 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@kundapathways.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+82-10-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{translations.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 dark:border-slate-600 pt-8 text-center">
          <p className="text-slate-400 dark:text-slate-300">
            © {currentYear} Kunda Pathways. {translations.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
