
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
    // Check if this is a password reset callback
    console.log('🚀 Index useEffect - Full URL:', window.location.href);
    console.log('🚀 Index useEffect - Hash:', window.location.hash);
    console.log('🚀 Index useEffect - Search params:', window.location.search);
    
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const searchParams = new URLSearchParams(window.location.search);
    const type = hashParams.get('type') || searchParams.get('type');
    const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
    
    console.log('🚀 Index useEffect - Parsed params:', { 
      type, 
      hasAccessToken: !!accessToken,
      hashParams: Object.fromEntries(hashParams),
      searchParams: Object.fromEntries(searchParams)
    });
    
    // For ANY password reset tokens (regardless of type), redirect to admin reset password
    if (accessToken) {
      console.log('🔥 Password reset tokens detected, redirecting to admin reset password');
      const fullParams = window.location.hash || window.location.search;
      console.log('🔥 About to navigate to:', '/admin/reset-password' + fullParams);
      
      // Immediate redirect without setTimeout
      navigate('/admin/reset-password' + fullParams, { replace: true });
      return;
    }
    
    console.log('🚀 No password reset tokens detected, continuing with normal page load');
  }, [navigate]);
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
