
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Resources = () => {
  const { translations } = useLanguage();

  const articles = [
    {
      id: 1,
      title: translations.blogPost1Title || 'Top 10 Korean Universities Offering Scholarships for African Students',
      excerpt: translations.blogPost1Excerpt || 'Discover the best opportunities for funded education in South Korea...',
      category: translations.education || 'Education',
      readTime: '8 min read',
      date: 'March 15, 2024',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: translations.blogPost2Title || 'Breaking into the Korean F&B Market: A Complete Guide',
      excerpt: translations.blogPost2Excerpt || 'Everything you need to know about food business regulations in Korea...',
      category: translations.business || 'Business',
      readTime: '12 min read',
      date: 'March 10, 2024',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: translations.blogPost3Title || 'KGSP 2024: Application Tips and Deadlines',
      excerpt: translations.blogPost3Excerpt || 'Get insider tips for the Korean Government Scholarship Program...',
      category: translations.scholarships || 'Scholarships',
      readTime: '6 min read',
      date: 'March 5, 2024',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Visa Application Process for Korean Universities',
      excerpt: 'Step-by-step guide to successfully obtaining your student visa for Korea...',
      category: translations.education || 'Education',
      readTime: '10 min read',
      date: 'February 28, 2024',
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Food Safety Regulations in Asian Markets',
      excerpt: 'Understanding compliance requirements for F&B businesses expanding into Asia...',
      category: translations.business || 'Business',
      readTime: '15 min read',
      date: 'February 20, 2024',
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Cultural Adaptation Guide for International Students',
      excerpt: 'Essential tips for adapting to Korean culture and academic environment...',
      category: translations.education || 'Education',
      readTime: '7 min read',
      date: 'February 15, 2024',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.resourcesBlog || 'Resources & Articles'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {translations.resourcesDescription || 'Stay updated with scholarship opportunities, industry insights, and success tips'}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-slate-800 dark:text-white line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-500 text-sm">
                      <User size={14} className="mr-1" />
                      John Doe
                    </div>
                    <span className="text-slate-500 text-sm">{article.date}</span>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    {translations.readMore || 'Read More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {translations.newsletterTitle || 'Stay Updated with Global Opportunities'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {translations.newsletterDescription || 'Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.'}
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={translations.enterEmailAddress || 'Enter your email address'}
                className="flex-1 px-4 py-3 rounded-xl text-slate-800 border-0"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold">
                {translations.subscribe || 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
