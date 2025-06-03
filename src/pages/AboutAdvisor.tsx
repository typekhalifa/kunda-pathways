
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, Award, FileText, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutAdvisor = () => {
  const { translations } = useLanguage();

  const skills = [
    "International Education Consulting",
    "Korean Language Proficiency",
    "Food Science & Technology",
    "Market Research & Analysis",
    "Cross-cultural Communication",
    "Business Development"
  ];

  const certifications = [
    "MSc Food Science - Seoul National University",
    "TOPIK Level 6 (Korean Proficiency)",
    "International Education Consultant Certification",
    "Project Management Professional (PMP)"
  ];

  const publications = [
    "Asian Market Entry Strategies for F&B Companies (2023)",
    "Korean Education System: A Guide for International Students (2022)",
    "Food Safety Regulations in East Asian Markets (2021)"
  ];

  const projects = [
    "Helped 500+ students secure scholarships to Korean universities",
    "Consulted for 50+ F&B companies entering Asian markets",
    "Developed partnership programs with 15+ Korean institutions",
    "Created comprehensive relocation guides for 20+ countries"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-white/20 dark:border-white/20 bg-white/10 dark:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 shadow-lg">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          {/* Professional Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white dark:border-slate-700">
                <GraduationCap size={60} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.advisorName || 'Dr. Sarah Kunda'}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
              {translations.advisorTitle || 'Global Education & F&B Consultant'}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {translations.advisorDescription || 'With over 8 years of experience in international education consulting and food & beverage market analysis, I help students achieve their academic dreams and businesses expand into Asian markets.'}
            </p>
          </div>

          {/* Skills & Expertise */}
          <Card className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-slate-800 dark:text-white">
                <Briefcase className="mr-3 text-blue-600" size={28} />
                {translations.skillsExpertise || 'Skills & Expertise'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-slate-700 dark:text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications & Training */}
          <Card className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-slate-800 dark:text-white">
                <Award className="mr-3 text-green-600" size={28} />
                {translations.certificationsTraining || 'Certifications & Training'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-500">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Papers & Publications */}
          <Card className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-slate-800 dark:text-white">
                <FileText className="mr-3 text-purple-600" size={28} />
                {translations.papersPublications || 'Papers & Publications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publications.map((publication, index) => (
                  <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <span className="text-slate-700 dark:text-slate-300">{publication}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects & Initiatives */}
          <Card className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-slate-800 dark:text-white">
                <GraduationCap className="mr-3 text-orange-600" size={28} />
                {translations.projectsInitiatives || 'Projects & Initiatives'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <span className="text-slate-700 dark:text-slate-300">{project}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="text-center">
            <Link to="/book-consultation">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {translations.bookConsultation || 'Book a Consultation'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutAdvisor;
