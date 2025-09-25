import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save, Edit, Home, Info, Briefcase, Users, MessageSquare, Building } from 'lucide-react';
import PartnersManager from './PartnersManager';
import AboutContentManager from './AboutContentManager';
import TestimonialsManager from './TestimonialsManager';
import FileUpload from './FileUpload';

const ContentManager = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [content, setContent] = useState({
  hero: {
    title: 'Your Gateway to Global Education and Business Success',
    subtitle: 'Expert guidance for Korean university admissions, scholarships, and F&B business consulting',
    backgroundImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
    about: {
      title: 'About Our Services',
      description: 'We provide comprehensive educational consulting services...'
    },
    services: {
      title: 'Our Services',
      description: 'Comprehensive educational consulting services tailored to your needs.'
    }
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Here you would implement the actual save functionality with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      toast.success(`${section} content updated successfully!`);
    } catch (error) {
      toast.error('Failed to update content');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'partners', label: 'Partners', icon: Building },
    { id: 'about-content', label: 'About Content', icon: Users },
    { id: 'testimonials', label: 'Success Stories', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Hero Section
            </CardTitle>
            <CardDescription>
              Edit the main hero section content on your homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Main Title</Label>
              <Input
                id="hero-title"
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                placeholder="Enter main title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={content.hero.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, subtitle: e.target.value }
                })}
                placeholder="Enter subtitle"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <FileUpload
                label="Background Image"
                currentUrl={content.hero.backgroundImage}
                onUpload={(url) => setContent({
                  ...content,
                  hero: { ...content.hero, backgroundImage: url }
                })}
                accept="image/*"
                folder="hero"
              />
            </div>
            <Button 
              onClick={() => handleSave('Hero')} 
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Hero Content
            </Button>
          </CardContent>
        </Card>
      )}


      {activeTab === 'partners' && <PartnersManager />}
      
      {activeTab === 'about-content' && <AboutContentManager />}
      
      {activeTab === 'testimonials' && <TestimonialsManager />}
    </div>
  );
};

export default ContentManager;