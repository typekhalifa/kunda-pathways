import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, KeyRound, User, Shield, Save, Upload, Edit } from 'lucide-react';

const SettingsManager = () => {
  const { profile, updatePassword } = useAuth();
  const { settings, loading: settingsLoading, updateSetting, uploadFile } = useWebsiteSettings();
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [formData, setFormData] = useState({
    site_info: {
      title: '',
      description: '',
      contact_email: ''
    },
    branding: {
      logo_url: '',
      favicon_url: '',
      primary_color: '#3b82f6'
    },
    seo: {
      meta_title: '',
      meta_description: '',
      meta_keywords: ''
    },
    analytics: {
      google_analytics_id: '',
      google_tag_manager_id: '',
      facebook_pixel_id: '',
      custom_css: ''
    }
  });

  React.useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  React.useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        email: profile.email || ''
      });
    }
  }, [profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          email: profileData.email
        })
        .eq('id', profile?.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    const { error } = await updatePassword(passwordData.newPassword);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    }
    
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadFile(file, type);
    if (url) {
      setFormData(prev => ({
        ...prev,
        branding: {
          ...prev.branding,
          [`${type}_url`]: url
        }
      }));
      
      if (type === 'favicon') {
        // Update the favicon in the HTML head
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  };

  const handleSaveSettings = async () => {
    setSaveLoading(true);
    try {
      await Promise.all([
        updateSetting('site_info', formData.site_info),
        updateSetting('branding', formData.branding),
        updateSetting('seo', formData.seo),
        updateSetting('analytics', formData.analytics)
      ]);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Your account details and role information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600">Role</Label>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-lg capitalize bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {profile?.role}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={profileLoading}
              className="w-full md:w-auto"
            >
              {profileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Edit className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <KeyRound className="w-5 h-5 mr-2" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your account password for better security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password (min. 6 characters)"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full md:w-auto" 
              disabled={loading || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Website Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Website Settings</CardTitle>
          <CardDescription>
            Configure your website's global settings and appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Site Information</h4>
              <div className="space-y-2">
                <Label htmlFor="site-title">Site Title</Label>
                <Input
                  id="site-title"
                  placeholder="Your Website Title"
                  value={formData.site_info.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    site_info: { ...prev.site_info, title: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  placeholder="Brief description of your website"
                  value={formData.site_info.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    site_info: { ...prev.site_info, description: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="contact@yoursite.com"
                  value={formData.site_info.contact_email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    site_info: { ...prev.site_info, contact_email: e.target.value }
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Branding</h4>
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logo Upload</Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'logo')}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.branding.logo_url && (
                  <p className="text-sm text-muted-foreground">Current: {formData.branding.logo_url}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon-upload">Favicon Upload</Label>
                <Input
                  id="favicon-upload"
                  type="file"
                  accept="image/x-icon,image/png,image/jpg,image/jpeg"
                  onChange={(e) => handleFileUpload(e, 'favicon')}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.branding.favicon_url && (
                  <p className="text-sm text-muted-foreground">Current: {formData.branding.favicon_url}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  type="color"
                  value={formData.branding.primary_color}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    branding: { ...prev.branding, primary_color: e.target.value }
                  }))}
                  className="h-12 w-full"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">SEO Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  placeholder="SEO optimized title"
                  value={formData.seo.meta_title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    seo: { ...prev.seo, meta_title: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={formData.seo.meta_keywords}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    seo: { ...prev.seo, meta_keywords: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea
                id="meta-description"
                placeholder="SEO meta description (150-160 characters)"
                value={formData.seo.meta_description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  seo: { ...prev.seo, meta_description: e.target.value }
                }))}
                rows={3}
              />
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">Technical Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input
                  id="google-analytics"
                  placeholder="GA-XXXXXXXXX-X"
                  value={formData.analytics.google_analytics_id}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, google_analytics_id: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
                <Input
                  id="google-tag-manager"
                  placeholder="GTM-XXXXXXX"
                  value={formData.analytics.google_tag_manager_id}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, google_tag_manager_id: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                <Input
                  id="facebook-pixel"
                  placeholder="000000000000000"
                  value={formData.analytics.facebook_pixel_id}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, facebook_pixel_id: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea
                  id="custom-css"
                  placeholder="/* Custom CSS styles */"
                  value={formData.analytics.custom_css}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, custom_css: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSaveSettings} 
              disabled={saveLoading || settingsLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saveLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Website Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;