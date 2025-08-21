import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { GraduationCap, Briefcase, Trophy, Globe, FileText } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  slug: string;
  is_published: boolean;
  featured_image_url?: string;
  reading_time?: number;
  content?: string;
}

const BlogPreview = () => {
  const { translations } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, category, created_at, slug, is_published, featured_image_url, reading_time, content')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education': return <GraduationCap className="w-4 h-4" />;
      case 'business': return <Briefcase className="w-4 h-4" />;
      case 'scholarships': return <Trophy className="w-4 h-4" />;
      case 'study-abroad': return <Globe className="w-4 h-4" />;
      case 'korean-culture': return <Globe className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = (post: BlogPost) => {
    if (post.reading_time) return post.reading_time;
    const wordsPerMinute = 200;
    const text = post.content || post.excerpt || '';
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading latest posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {translations.latest} <span className="text-blue-600">{translations.resources}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {translations.resourcesDescription}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No blog posts yet</h3>
            <p className="text-slate-500 dark:text-slate-500">Check back soon for the latest updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800 hover:scale-[1.02] cursor-pointer">
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  {post.featured_image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 dark:text-blue-400">{getCategoryIcon(post.category)}</span>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium capitalize">
                          {post.category.replace('-', ' ')}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {calculateReadingTime(post)} min read
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all">
                      {translations.readMore} →
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/resources">
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-xl shadow-lg">
              {translations.viewAllResources}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
