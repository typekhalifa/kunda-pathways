import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

interface HeroContent {
  title: string;
  subtitle: string;
  studentsCount: number;
  countriesCount: number;
  backgroundImage: string;
}

const HeroStatsManager = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Your Gateway to Global Education and Business Success",
    subtitle: "Expert guidance for Korean university admissions, scholarships, and F&B business consulting",
    studentsCount: 53,
    countriesCount: 13,
    backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', 'hero')
        .eq('language_code', 'EN');

      if (error) throw error;

      if (data && data.length > 0) {
        const content = data.reduce((acc: any, item) => {
          acc[item.content_key] = item.content_value;
          return acc;
        }, {} as any);

        setHeroContent({
          title: content.title || heroContent.title,
          subtitle: content.subtitle || heroContent.subtitle,
          studentsCount: content.studentsCount || heroContent.studentsCount,
          countriesCount: content.countriesCount || heroContent.countriesCount,
          backgroundImage: content.backgroundImage || heroContent.backgroundImage
        });
      }
    } catch (error: any) {
      console.error('Error fetching hero content:', error);
      toast.error('Failed to load hero content');
    } finally {
      setLoading(false);
    }
  };

  const saveHeroContent = async () => {
    setSaveLoading(true);
    try {
      // Delete existing hero content for this language
      await supabase
        .from('website_content')
        .delete()
        .eq('section', 'hero')
        .eq('language_code', 'EN');

      // Insert new content
      const contentEntries = [
        {
          section: 'hero',
          content_key: 'title',
          content_value: heroContent.title,
          language_code: 'EN'
        },
        {
          section: 'hero',
          content_key: 'subtitle',
          content_value: heroContent.subtitle,
          language_code: 'EN'
        },
        {
          section: 'hero',
          content_key: 'studentsCount',
          content_value: heroContent.studentsCount,
          language_code: 'EN'
        },
        {
          section: 'hero',
          content_key: 'countriesCount',
          content_value: heroContent.countriesCount,
          language_code: 'EN'
        },
        {
          section: 'hero',
          content_key: 'backgroundImage',
          content_value: heroContent.backgroundImage,
          language_code: 'EN'
        }
      ];

      const { error } = await supabase
        .from('website_content')
        .insert(contentEntries);

      if (error) throw error;

      toast.success('Hero content updated successfully!');
      
      // Dispatch custom event to update hero section without full page reload
      window.dispatchEvent(new CustomEvent('hero-content-updated'));
      
      // Still refresh after a short delay as fallback
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error saving hero content:', error);
      toast.error('Failed to save hero content');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading hero content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Hero Title</Label>
            <Input
              id="hero-title"
              placeholder="Your Gateway to Global Education..."
              value={heroContent.title}
              onChange={(e) => setHeroContent(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              placeholder="Expert guidance for Korean university admissions..."
              value={heroContent.subtitle}
              onChange={(e) => setHeroContent(prev => ({ ...prev, subtitle: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="background-image">Background Image URL</Label>
            <Input
              id="background-image"
              placeholder="https://images.unsplash.com/..."
              value={heroContent.backgroundImage}
              onChange={(e) => setHeroContent(prev => ({ ...prev, backgroundImage: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800">Statistics</h4>
          
          <div className="space-y-2">
            <Label htmlFor="students-count">Students Assisted</Label>
            <Input
              id="students-count"
              type="number"
              min="0"
              placeholder="53"
              value={heroContent.studentsCount}
              onChange={(e) => setHeroContent(prev => ({ ...prev, studentsCount: parseInt(e.target.value) || 0 }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="countries-count">Countries Reached</Label>
            <Input
              id="countries-count"
              type="number"
              min="0"
              placeholder="13"
              value={heroContent.countriesCount}
              onChange={(e) => setHeroContent(prev => ({ ...prev, countriesCount: parseInt(e.target.value) || 0 }))}
            />
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Preview Statistics</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{heroContent.studentsCount}+</div>
                <div className="text-slate-600">Students Assisted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{heroContent.countriesCount}+</div>
                <div className="text-slate-600">Countries Reached</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={saveHeroContent}
          disabled={saveLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {saveLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Hero Content
        </Button>
      </div>
    </div>
  );
};

export default HeroStatsManager;