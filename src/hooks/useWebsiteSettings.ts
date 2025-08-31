import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WebsiteSettings {
  site_info: {
    title: string;
    description: string;
    contact_email: string;
  };
  branding: {
    logo_url: string;
    favicon_url: string;
    primary_color: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
  analytics: {
    google_analytics_id: string;
    google_tag_manager_id: string;
    facebook_pixel_id: string;
    custom_css: string;
  };
  contact?: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    business_hours: {
      weekday: string;
      saturday: string;
      sunday: string;
    };
  };
  social?: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      const settingsObj: any = {};
      data?.forEach(({ setting_key, setting_value }) => {
        settingsObj[setting_key] = setting_value;
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Don't show error toast on initial load to avoid UI noise
      if (settings !== null) {
        toast.error('Failed to load website settings');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof WebsiteSettings, value: any) => {
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({ 
          setting_key: key,
          setting_value: value 
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, [key]: value } : null);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating setting:', error);
      toast.error('Failed to update settings');
    }
  };

  const uploadFile = async (file: File, type: 'logo' | 'favicon') => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // For now, we'll just return a placeholder URL
      // In a real implementation, you'd upload to Supabase Storage
      const fileName = `${type}_${Date.now()}_${file.name}`;
      const url = `/lovable-uploads/${fileName}`;
      
      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    updateSetting,
    uploadFile,
    refetch: fetchSettings
  };
};