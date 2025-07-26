import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  created_at: string;
  updated_at: string;
  slug: string;
  tags: string[];
  is_published: boolean;
  language_code: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { translations } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Post not found');
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

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/resources">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <article className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/resources">
            <Button variant="outline" className="mb-8 rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToResources || 'Back to Resources'}
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="secondary" className="rounded-full px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                <span className="mr-2">{getCategoryIcon(post.category)}</span>
                {post.category.replace('-', ' ').toUpperCase()}
              </Badge>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.created_at)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {estimateReadTime(post.content)} min read
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-8">
                <Tag className="w-4 h-4 text-slate-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="rounded-full text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                className="rounded-xl"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border-0">
              <div 
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {post.content}
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Last updated: {formatDate(post.updated_at)}
              </div>
              <Link to="/resources">
                <Button variant="outline" className="rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Articles
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;