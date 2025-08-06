import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stat {
  label: string;
  value: string;
  color: string;
}

interface AboutContent {
  id: string;
  title: string | null;
  description: string | null;
  mission_text: string | null;
  advisor_name: string | null;
  advisor_title: string | null;
  advisor_description: string | null;
  advisor_image_url: string | null;
  stats: Stat[];
}

const AboutContentManager = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('section_key', 'main')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setContent({
          ...data,
          stats: Array.isArray(data.stats) ? data.stats as unknown as Stat[] : []
        });
      } else {
        // Create default content if none exists
        setContent({
          id: '',
          title: 'About Kunda Pathways',
          description: 'Empowering dreams through education and business excellence.',
          mission_text: 'To provide comprehensive, personalized guidance that transforms educational aspirations into successful realities.',
          advisor_name: 'Kunda John',
          advisor_title: 'International Education & F&B Expert',
          advisor_description: 'With over 5 years of experience in international education consulting.',
          advisor_image_url: '/lovable-uploads/khali.jpg',
          stats: [
            { label: 'Successful Students', value: '53+', color: 'blue' },
            { label: 'Businesses Helped', value: '42+', color: 'green' },
            { label: 'Scholarship Success Rate', value: '87%', color: 'purple' },
            { label: 'Years Experience', value: '5+', color: 'orange' }
          ]
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    try {
      setSaving(true);
      
      const saveData = {
        section_key: 'main',
        title: content.title,
        description: content.description,
        mission_text: content.mission_text,
        advisor_name: content.advisor_name,
        advisor_title: content.advisor_title,
        advisor_description: content.advisor_description,
        advisor_image_url: content.advisor_image_url,
        stats: content.stats as any
      };

      if (content.id) {
        // Update existing
        const { error } = await supabase
          .from('about_content')
          .update(saveData)
          .eq('id', content.id);

        if (error) throw error;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('about_content')
          .insert(saveData)
          .select()
          .maybeSingle();

        if (error) throw error;
        if (data) setContent({ ...content, id: data.id });
      }

      toast.success('About content updated successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    if (!content) return;
    
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
  };

  const addStat = () => {
    if (!content) return;
    
    setContent({
      ...content,
      stats: [...content.stats, { label: '', value: '', color: 'blue' }]
    });
  };

  const removeStat = (index: number) => {
    if (!content) return;
    
    const newStats = content.stats.filter((_, i) => i !== index);
    setContent({ ...content, stats: newStats });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">About Content Management</h2>
        <p className="text-muted-foreground">Manage the About section content, advisor info, and statistics</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Main Content</CardTitle>
          <CardDescription>Main title and description for the About section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="About Kunda Pathways"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={content.description || ''}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              placeholder="Main description..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="mission">Mission Text</Label>
            <Textarea
              id="mission"
              value={content.mission_text || ''}
              onChange={(e) => setContent({ ...content, mission_text: e.target.value })}
              placeholder="Mission statement..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Global Advisor Information</CardTitle>
          <CardDescription>Information about the advisor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="advisor-name">Advisor Name</Label>
              <Input
                id="advisor-name"
                value={content.advisor_name || ''}
                onChange={(e) => setContent({ ...content, advisor_name: e.target.value })}
                placeholder="Kunda John"
              />
            </div>
            <div>
              <Label htmlFor="advisor-title">Advisor Title</Label>
              <Input
                id="advisor-title"
                value={content.advisor_title || ''}
                onChange={(e) => setContent({ ...content, advisor_title: e.target.value })}
                placeholder="International Education Expert"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="advisor-image">Advisor Image URL</Label>
            <Input
              id="advisor-image"
              value={content.advisor_image_url || ''}
              onChange={(e) => setContent({ ...content, advisor_image_url: e.target.value })}
              placeholder="/lovable-uploads/khali.jpg"
            />
          </div>
          <div>
            <Label htmlFor="advisor-description">Advisor Description</Label>
            <Textarea
              id="advisor-description"
              value={content.advisor_description || ''}
              onChange={(e) => setContent({ ...content, advisor_description: e.target.value })}
              placeholder="Bio and experience..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Statistics
            <Button onClick={addStat} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </CardTitle>
          <CardDescription>Key statistics displayed in the About section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Successful Students"
                />
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  placeholder="53+"
                />
              </div>
              <div>
                <Label>Color</Label>
                <select
                  value={stat.color}
                  onChange={(e) => updateStat(index, 'color', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default AboutContentManager;