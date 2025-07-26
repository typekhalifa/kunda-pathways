
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  slug: string;
  is_published: boolean;
  tags: string[];
}

const Resources = () => {
  const { translations } = useLanguage();
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, category, created_at, slug, is_published, tags')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education': return '🎓';
      case 'business': return '💼';
      case 'scholarships': return '🏆';
      case 'study-abroad': return '🌍';
      case 'korean-culture': return '🇰🇷';
      default: return '📝';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string = '') => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No articles published yet</h3>
              <p className="text-slate-500 dark:text-slate-500">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="group bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <Link to={`/blog/${article.slug}`} className="block h-full">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getCategoryIcon(article.category)}</span>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full capitalize">
                            {article.category.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                          <Clock size={14} className="mr-1" />
                          {estimateReadTime(article.excerpt)} min read
                        </div>
                      </div>
                      <CardTitle className="text-lg text-slate-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex items-center space-x-1 mb-4">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="text-xs text-slate-400">+{article.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{formatDate(article.created_at)}</span>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl group-hover:bg-blue-700 transition-colors">
                        {translations.readMore || 'Read More'} →
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {translations.newsletterTitle || 'Stay Updated with Global Opportunities'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {translations.newsletterDescription || 'Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.'}
            </p>
            <Newsletter />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
