
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Newsletter from "@/components/Newsletter";
import Partners from "@/components/Partners";
import ChatBot from "@/components/ChatBot";
import WhatsAppConsultationButton from "@/components/WhatsAppConsultationButton";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🚀 Index useEffect running');
    console.log('🚀 Full URL:', window.location.href);
    console.log('🚀 Hash:', window.location.hash);
    
    // Check for access_token in URL hash (Supabase auth callback format)
    const hash = window.location.hash;
    if (hash && hash.includes('access_token=')) {
      console.log('🔥 Access token found in URL, redirecting to admin reset password');
      // Preserve the entire hash for the admin reset password page
      window.location.href = '/admin/reset-password' + hash;
      return;
    }
    
    console.log('🚀 No access token found, normal page load');
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      <Hero />
      <Services />
      <About />
      <Partners />
      <Testimonials />
      <section id="resources">
        <BlogPreview />
      </section>
      <Newsletter />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
};

export default Index;
