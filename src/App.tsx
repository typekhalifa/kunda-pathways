import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
import BlogPost from "./pages/BlogPost";
import AdminSettings from "./pages/AdminSettings";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminNewsletter from "./pages/AdminNewsletter";
import AdminConsultations from "./pages/AdminConsultations";
import ContentManager from '@/components/admin/ContentManager';
import MessagesManager from '@/components/admin/MessagesManager';
import ConsultationsManager from '@/components/admin/ConsultationsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import BookStudyAbroadConsultation from '@/pages/BookStudyAbroadConsultation';
import CompletePackage from '@/pages/CompletePackage';
import FBCompletePackage from '@/pages/FBCompletePackage';
import BookExtraServices from "./pages/BookExtraServices";
import CustomQuote from "@/pages/CustomQuote";

// Admin page wrappers
const AdminContent = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Content Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your website content and settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <ContentManager />
    </div>
  </div>
);

const AdminMessages = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Contact Messages
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                View and manage all contact form submissions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <MessagesManager />
    </div>
  </div>
);


const AdminServices = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Services Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage all your website services and pricing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
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
              <Route 
                path="/admin/consultations" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminConsultations />
                  </ProtectedRoute>
                } 
              />
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
              <Route path="/book/fb-package" element={<FBCompletePackage />} />
              <Route path="/book/extra-services" element={<BookExtraServices />} />
              <Route path="/custom-quote" element={<CustomQuote />} />
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
                path="/admin/services" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminServices />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/analytics" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminAnalytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/newsletter" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminNewsletter />
                  </ProtectedRoute>
                } 
              />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;