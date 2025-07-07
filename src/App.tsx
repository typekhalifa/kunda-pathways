
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminSettings from "./pages/AdminSettings";
import ContentManager from '@/components/admin/ContentManager';
import MessagesManager from '@/components/admin/MessagesManager';
import ConsultationsManager from '@/components/admin/ConsultationsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import BookStudyAbroadConsultation from '@/pages/BookStudyAbroadConsultation';
import CompletePackage from "@/pages/book/CompletePackage";

// Admin page wrappers
const AdminContent = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Website Content Management</h1>
      <ContentManager />
    </div>
  </div>
);

const AdminMessages = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      <MessagesManager />
    </div>
  </div>
);

const AdminConsultations = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Consultation Management</h1>
      <ConsultationsManager />
    </div>
  </div>
);

const AdminServices = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Services Management</h1>
      <ServicesManager />
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLogin />} />
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
              <Route path="/book/study-abroad" element={<BookStudyAbroadConsultation />} />
              <Route path="/book/complete-package" element={<CompletePackage />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/blog" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminBlog />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminSettings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/content" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminContent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/messages" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminMessages />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/consultations" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminConsultations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminServices />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
