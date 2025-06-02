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
      category: "Main Pages",
      icon: Home,
      links: [
        { name: translations.home, path: "/", description: "Homepage with company overview" },
        { name: translations.about, path: "/#about", description: "Learn about our company and mission" },
        { name: translations.services, path: "/#services", description: "Our educational and business services" },
        { name: translations.contact, path: "/#contact", description: "Get in touch with our team" },
      ]
    },
    {
      category: "Resources",
      icon: FileText,
      links: [
        { name: "Blog/Resources", path: "/#blog", description: "Latest articles and educational resources" },
        { name: "Success Stories", path: "/#testimonials", description: "Client testimonials and case studies" },
        { name: "Newsletter", path: "/#newsletter", description: "Subscribe to our updates" },
      ]
    },
    {
      category: "Legal",
      icon: Scale,
      links: [
        { name: translations.privacyPolicy, path: "/privacy-policy", description: "How we handle your data" },
        { name: translations.termsOfService, path: "/terms-of-service", description: "Terms and conditions of service" },
        { name: translations.sitemap, path: "/sitemap", description: "Complete site navigation" },
      ]
    },
    {
      category: "Services",
      icon: Briefcase,
      links: [
        { name: "Study in Korea", path: "/#services", description: "Educational consulting and scholarship guidance" },
        { name: "F&B Consulting", path: "/#services", description: "Food & beverage business consulting" },
        { name: "University Admissions", path: "/#services", description: "Assistance with university applications" },
        { name: "Market Analysis", path: "/#services", description: "Business market research and analysis" },
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
              {translations.sitemapTitle}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Complete navigation guide to all pages and sections of our website.
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
                  Need Help Finding Something?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Can't find what you're looking for? Our team is here to help you navigate our services.
                </p>
                <Link 
                  to="/#contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Support
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Last updated: March 2024 | All pages are mobile-responsive and accessibility-friendly
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;
