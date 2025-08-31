
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
    console.log('🚀🚀🚀 Index useEffect STARTED');
    console.log('🚀 Full URL:', window.location.href);
    console.log('🚀 Hash:', window.location.hash);
    console.log('🚀 Search:', window.location.search);
    console.log('🚀 Pathname:', window.location.pathname);
    
    // Check for access_token in URL hash (Supabase auth callback format)
    const hash = window.location.hash;
    console.log('🔍 Hash check:', { 
      hasHash: !!hash, 
      hashLength: hash?.length, 
      includesToken: hash?.includes('access_token='),
      firstChars: hash?.substring(0, 50) 
    });
    
    if (hash && hash.includes('access_token=')) {
      console.log('🔥🔥🔥 ACCESS TOKEN DETECTED - REDIRECTING NOW');
      console.log('🔥 About to redirect to:', '/admin/reset-password' + hash);
      
      // Force immediate redirect
      try {
        window.location.href = '/admin/reset-password' + hash;
        console.log('🔥 Redirect command executed');
      } catch (error) {
        console.error('🔥 Redirect failed:', error);
      }
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
