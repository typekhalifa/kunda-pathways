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
      console.log('Fetching website settings...');
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Raw data from supabase:', data);

      const settingsObj: any = {};
      data?.forEach(({ setting_key, setting_value }) => {
        settingsObj[setting_key] = setting_value;
      });

      console.log('Processed settings object:', settingsObj);
      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load website settings');
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

  const updateNestedSetting = async (parentKey: keyof WebsiteSettings, childKey: string, value: any) => {
    try {
      const currentParentValue = settings?.[parentKey] || {};
      const updatedParentValue = { ...currentParentValue, [childKey]: value };
      
      const { error } = await supabase
        .from('website_settings')
        .upsert({ 
          setting_key: parentKey,
          setting_value: updatedParentValue 
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setSettings(prev => prev ? { 
        ...prev, 
        [parentKey]: updatedParentValue 
      } : null);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating nested setting:', error);
      toast.error('Failed to update settings');
    }
  };

  const uploadFile = async (file: File, type: 'logo' | 'favicon') => {
    try {
      const fileName = `${type}_${Date.now()}_${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);
      
      return publicUrl;
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
    updateNestedSetting,
    uploadFile,
    refetch: fetchSettings
  };
};