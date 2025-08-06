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

const ContentManager = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [content, setContent] = useState({
    hero: {
      title: 'Professional Educational Consulting',
      subtitle: 'Expert guidance for your academic journey',
      description: 'Get personalized advice for studying abroad and educational opportunities.'
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
    { id: 'about', label: 'About Section', icon: Info },
    { id: 'services', label: 'Services Section', icon: Briefcase },
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
              <Input
                id="hero-subtitle"
                value={content.hero.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, subtitle: e.target.value }
                })}
                placeholder="Enter subtitle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-description">Description</Label>
              <Textarea
                id="hero-description"
                value={content.hero.description}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, description: e.target.value }
                })}
                placeholder="Enter description"
                rows={3}
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

      {activeTab === 'about' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              About Section
            </CardTitle>
            <CardDescription>
              Edit the about section content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="about-title">Section Title</Label>
              <Input
                id="about-title"
                value={content.about.title}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, title: e.target.value }
                })}
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-description">Description</Label>
              <Textarea
                id="about-description"
                value={content.about.description}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, description: e.target.value }
                })}
                placeholder="Enter about description"
                rows={6}
              />
            </div>
            <Button 
              onClick={() => handleSave('About')} 
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save About Content
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'services' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Services Section
            </CardTitle>
            <CardDescription>
              Edit the services section content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="services-title">Section Title</Label>
              <Input
                id="services-title"
                value={content.services.title}
                onChange={(e) => setContent({
                  ...content,
                  services: { ...content.services, title: e.target.value }
                })}
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services-description">Description</Label>
              <Textarea
                id="services-description"
                value={content.services.description}
                onChange={(e) => setContent({
                  ...content,
                  services: { ...content.services, description: e.target.value }
                })}
                placeholder="Enter services description"
                rows={4}
              />
            </div>
            <Button 
              onClick={() => handleSave('Services')} 
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Services Content
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