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
import { SecurityProvider } from "@/components/SecurityProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Scholarships from "./pages/Scholarships";
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
import ResetPassword from "./pages/ResetPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
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
import ScholarshipsManager from '@/components/admin/ScholarshipsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import PackagesManager from '@/components/admin/PackagesManager';
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
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Content Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage website content and sections
            </p>
          </div>
          <Link to="/admin/dashboard">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
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
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Contact Messages
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              View and respond to customer inquiries
            </p>
          </div>
          <Link to="/admin/dashboard">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <MessagesManager />
    </div>
  </div>
);

const AdminServices = () => {
  const [activeTab, setActiveTab] = React.useState("services");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Services Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage consultation services, packages, and pricing
              </p>
            </div>
            <Link to="/admin/dashboard">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-6 flex space-x-1">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "services"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Individual Services
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "packages"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Package Deals
          </button>
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "general"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            General Services
          </button>
        </div>
        
        {activeTab === "services" ? <ServicesManager filterCategory="individual" /> : activeTab === "packages" ? <PackagesManager /> : <ServicesManager filterCategory="general" />}
      </div>
    </div>
  );
};

// Admin Scholarships page wrapper
const AdminScholarships = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Scholarships Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage scholarship opportunities and applications
            </p>
          </div>
          <Link to="/admin/dashboard">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <ScholarshipsManager />
    </div>
  </div>
);

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SecurityProvider>
          <LanguageProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin/reset-password" element={<AdminResetPassword />} />
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
                <Route path="/book-study-abroad-consultation" element={<BookStudyAbroadConsultation />} />
                <Route path="/book/study-abroad" element={<BookStudyAbroadConsultation />} />
                <Route path="/complete-package" element={<CompletePackage />} />
                <Route path="/fb-complete-package" element={<FBCompletePackage />} />
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
                 <Route 
                  path="/admin/scholarships" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminScholarships />
                    </ProtectedRoute>
                  } 
                 />
                 <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </LanguageProvider>
        </SecurityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;