
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import BookConsultation from "./pages/BookConsultation";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";
import AboutAdvisor from "./pages/AboutAdvisor";
import StudyPrograms from "./pages/StudyPrograms";
import FBConsulting from "./pages/FBConsulting";
import BookFBConsultation from "./pages/BookFBConsultation";
import AllServices from "./pages/AllServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/book-fb-consultation" element={<BookFBConsultation />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/study-programs" element={<StudyPrograms />} />
            <Route path="/fb-consulting" element={<FBConsulting />} />
            <Route path="/all-services" element={<AllServices />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/about-advisor" element={<AboutAdvisor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
