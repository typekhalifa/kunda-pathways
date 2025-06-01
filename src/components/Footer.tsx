
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              Global<span className="text-blue-400">Connect</span>
            </div>
            <p className="text-slate-400 dark:text-slate-300 leading-relaxed mb-6">
              Your partner for education and business in Korea & Asia.
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
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Study in Korea</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">F&B Consulting</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Resources/Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#services" className="hover:text-white transition-colors">Scholarship Guidance</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">University Admissions</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">F&B Market Analysis</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Visits Help & Relocations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-slate-400 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@globalconnect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+82-10-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Seoul, South Korea</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 dark:border-slate-600 pt-8 text-center">
          <p className="text-slate-400 dark:text-slate-300">
            &copy; 2024 GlobalConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
