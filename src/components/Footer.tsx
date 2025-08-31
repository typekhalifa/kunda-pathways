
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

const Footer = () => {
  console.log('Footer component rendering...');
  const { translations } = useLanguage();
  const { settings } = useWebsiteSettings();
  const currentYear = new Date().getFullYear();
  
  // Get contact and social settings with fallbacks
  const contactInfo = settings?.contact || {
    email: "info@kundapathways.com",
    phone: "+82-10-1234-5678",
    whatsapp: "+82-10-1234-5678",
    location: "Seoul, South Korea"
  };
  
  const socialLinks = settings?.social || {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  };

  return (
    <div style={{backgroundColor: 'red', color: 'white', padding: '20px', textAlign: 'center'}}>
      <h1 style={{fontSize: '24px'}}>FOOTER IS BROKEN - TESTING CODE CHANGES</h1>
      <p>Phone: {contactInfo.phone}</p>
      <p>Settings: {JSON.stringify(settings)}</p>
    </div>
  );
};

export default Footer;
