import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Save, X, BookOpen, Eye, Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  is_published: boolean;
  language_code: string;
  created_at: string;
  updated_at: string;
}

const BlogManager = () => {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'general',
    tags: [],
    is_published: false,
    language_code: 'EN'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const postData = {
        ...editingPost,
        title: editingPost.title || '',
        content: editingPost.content || '',
        slug: editingPost.slug || editingPost.title?.toLowerCase().replace(/\s+/g, '-') || ''
      };

      if (editingPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
        toast.success('Post updated successfully');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);
        
        if (error) throw error;
        toast.success('Post created successfully');
      }

      setIsEditing(false);
      setEditingPost({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'general',
        tags: [],
        is_published: false,
        language_code: 'EN'
      });
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'general',
      tags: [],
      is_published: false,
      language_code: 'EN'
    });
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-600">Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { value: 'general', label: 'General', icon: '📝', color: 'from-slate-500 to-slate-600' },
    { value: 'education', label: 'Education', icon: '🎓', color: 'from-blue-500 to-blue-600' },
    { value: 'business', label: 'Business', icon: '💼', color: 'from-green-500 to-green-600' },
    { value: 'scholarships', label: 'Scholarships', icon: '🏆', color: 'from-yellow-500 to-yellow-600' },
    { value: 'study-abroad', label: 'Study Abroad', icon: '🌍', color: 'from-purple-500 to-purple-600' },
    { value: 'korean-culture', label: 'Korean Culture', icon: '🇰🇷', color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            Blog Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Create and manage your blog posts and resources</p>
        </div>
        <Button 
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {isEditing && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-lg">
          <CardHeader className="border-b border-blue-100 dark:border-slate-700">
            <CardTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center">
                <Edit className="w-5 h-5 mr-2 text-blue-600" />
                {editingPost.id ? 'Edit Blog Post' : 'Create New Blog Post'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="rounded-xl hover:bg-red-50 text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              {editingPost.id ? 'Update your existing blog post' : 'Create engaging content for your audience'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Post Title</Label>
                <Input
                  id="title"
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="Enter an engaging title..."
                  className="rounded-xl border-2 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-semibold text-slate-700 dark:text-slate-300">URL Slug</Label>
                <Input
                  id="slug"
                  value={editingPost.slug || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                  className="rounded-xl border-2 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={editingPost.excerpt || ''}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder="Write a compelling summary that will appear in previews..."
                rows={3}
                className="rounded-xl border-2 focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Content</Label>
              <Textarea
                id="content"
                value={editingPost.content || ''}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                placeholder="Write your blog post content here. You can use markdown formatting..."
                rows={12}
                className="rounded-xl border-2 focus:border-blue-500 transition-colors resize-none font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</Label>
                <Select
                  value={editingPost.category || ''}
                  onValueChange={(value) => setEditingPost({ ...editingPost, category: value })}
                >
                  <SelectTrigger className="rounded-xl border-2 focus:border-blue-500 bg-background">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-background shadow-xl z-50">
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.value} 
                        value={category.value}
                        className="rounded-lg hover:bg-accent focus:bg-accent cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Language</Label>
                <Select
                  value={editingPost.language_code || 'EN'}
                  onValueChange={(value) => setEditingPost({ ...editingPost, language_code: value })}
                >
                  <SelectTrigger className="rounded-xl border-2 focus:border-blue-500 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-background shadow-xl z-50">
                    <SelectItem value="EN" className="rounded-lg hover:bg-accent focus:bg-accent cursor-pointer">
                      🇺🇸 English
                    </SelectItem>
                    <SelectItem value="KO" className="rounded-lg hover:bg-accent focus:bg-accent cursor-pointer">
                      🇰🇷 Korean
                    </SelectItem>
                    <SelectItem value="FR" className="rounded-lg hover:bg-accent focus:bg-accent cursor-pointer">
                      🇫🇷 French
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3 mt-8">
                <Switch
                  id="published"
                  checked={editingPost.is_published || false}
                  onCheckedChange={(checked) => setEditingPost({ ...editingPost, is_published: checked })}
                  className="data-[state=checked]:bg-green-600"
                />
                <Label htmlFor="published" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {editingPost.is_published ? 'Published' : 'Draft'}
                </Label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="rounded-xl border-2 hover:bg-slate-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingPost.id ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="text-center py-12 rounded-3xl border-2 border-dashed border-slate-300">
            <CardContent>
              <BookOpen className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No blog posts yet</h3>
              <p className="text-slate-500 mb-6">Create your first blog post to get started</p>
              <Button onClick={() => setIsEditing(true)} className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="rounded-3xl border-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-bold text-lg text-slate-800 dark:text-white">{post.title}</h3>
                      <Badge 
                        variant={post.is_published ? "default" : "secondary"}
                        className="rounded-full px-3 py-1"
                      >
                        {post.is_published ? (
                          <><Eye className="w-3 h-3 mr-1" /> Published</>
                        ) : (
                          <><Edit className="w-3 h-3 mr-1" /> Draft</>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="rounded-full">
                        <Tag className="w-3 h-3 mr-1" />
                        {categories.find(c => c.value === post.category)?.label || post.category}
                      </Badge>
                      <Badge variant="outline" className="rounded-full">
                        {post.language_code === 'EN' ? '🇺🇸' : post.language_code === 'KO' ? '🇰🇷' : '🇫🇷'} {post.language_code}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Created: {new Date(post.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(post)}
                      className="rounded-xl hover:bg-blue-50 border-blue-200 text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(post.id)}
                      className="rounded-xl hover:bg-red-50 border-red-200 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager;