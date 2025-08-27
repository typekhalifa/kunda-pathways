
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
    console.log('Index useEffect - Full URL:', window.location.href);
    console.log('Index useEffect - Hash:', window.location.hash);
    
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    const accessToken = hashParams.get('access_token');
    
    console.log('Index useEffect - Parsed params:', { 
      type, 
      hasAccessToken: !!accessToken 
    });
    
    // If it's a recovery type, redirect to admin reset password
    if (type === 'recovery') {
      console.log('Password reset callback detected, redirecting to admin reset password');
      navigate('/admin/reset-password' + window.location.hash);
      return;
    }
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
