
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have reset tokens in the URL hash (from Supabase redirect)
    const hash = window.location.hash;
    if (hash.includes('access_token=') && hash.includes('type=recovery')) {
      console.log('Detected password reset tokens on homepage, redirecting...');
      // Preserve the hash and redirect to admin reset page
      navigate('/admin/reset-password' + hash);
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
