
import { useLanguage } from "@/contexts/LanguageContext";
import { Map, Home, Briefcase, User, Mail, FileText, Shield, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sitemap = () => {
  const { translations } = useLanguage();

  const siteLinks = [
    {
      category: translations.mainPages || "Main Pages",
      icon: Home,
      links: [
        { name: translations.home || "Home", path: "/", description: translations.homepageDescription || "Homepage with company overview" },
        { name: translations.about || "About", path: "/#about", description: translations.aboutDescription || "Learn about our company and mission" },
        { name: translations.services || "Services", path: "/#services", description: translations.servicesDescription || "Our educational and business services" },
        { name: translations.contact || "Contact", path: "/#contact", description: translations.contactDescription || "Get in touch with our team" },
      ]
    },
    {
      category: translations.resources || "Resources",
      icon: FileText,
      links: [
        { name: translations.blogResources || "Blog/Resources", path: "/#blog", description: translations.blogDescription || "Latest articles and educational resources" },
        { name: translations.successStories || "Success Stories", path: "/#testimonials", description: translations.successStoriesDescription || "Client testimonials and case studies" },
        { name: translations.newsletter || "Newsletter", path: "/#newsletter", description: translations.newsletterDescription || "Subscribe to our updates" },
      ]
    },
    {
      category: translations.legal || "Legal",
      icon: Scale,
      links: [
        { name: translations.privacyPolicy || "Privacy Policy", path: "/privacy-policy", description: translations.privacyPolicyDescription || "How we handle your data" },
        { name: translations.termsOfService || "Terms of Service", path: "/terms-of-service", description: translations.termsOfServiceDescription || "Terms and conditions of service" },
        { name: translations.sitemap || "Sitemap", path: "/sitemap", description: translations.sitemapDescription || "Complete site navigation" },
      ]
    },
    {
      category: translations.services || "Services",
      icon: Briefcase,
      links: [
        { name: translations.studyInKorea || "Study in Korea", path: "/#services", description: translations.studyInKoreaDescription || "Educational consulting and scholarship guidance" },
        { name: translations.fbConsulting || "F&B Consulting", path: "/#services", description: translations.fbConsultingDescription || "Food & beverage business consulting" },
        { name: translations.universityAdmissions || "University Admissions", path: "/#services", description: translations.universityAdmissionsDescription || "Assistance with university applications" },
        { name: translations.marketAnalysis || "Market Analysis", path: "/#services", description: translations.marketAnalysisDescription || "Business market research and analysis" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Map className="mx-auto mb-6 text-blue-600" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.sitemapTitle || "Site Map"}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {translations.sitemapSubtitle || "Complete navigation guide to all pages and sections of our website."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteLinks.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                    <category.icon className="text-blue-600" size={24} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                        <Link 
                          to={link.path}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium block transition-colors"
                        >
                          {link.name}
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {link.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Mail className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  {translations.needHelpFinding || "Need Help Finding Something?"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {translations.cantFindWhatLooking || "Can't find what you're looking for? Our team is here to help you navigate our services."}
                </p>
                <Link 
                  to="/#contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {translations.contactSupport || "Contact Support"}
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {translations.lastUpdatedMarch2024 || "Last updated: March 2024"} | {translations.allPagesMobileResponsive || "All pages are mobile-responsive and accessibility-friendly"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;
