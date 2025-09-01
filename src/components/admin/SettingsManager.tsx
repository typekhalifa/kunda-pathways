import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, KeyRound, User, Shield, Save, Upload, Edit, UserPlus, Users, Globe, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateMetaTags } from '@/utils/updateMetaTags';

const SettingsManager = () => {
  const { profile, updatePassword } = useAuth();
  const { settings, loading: settingsLoading, updateSetting, updateNestedSetting, uploadFile } = useWebsiteSettings();
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
  const [userManagementLoading, setUserManagementLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [newUserData, setNewUserData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'user' as 'admin' | 'user'
  });
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
    analytics: {
      google_analytics_id: '',
      google_tag_manager_id: '',
      facebook_pixel_id: '',
      custom_css: ''
    },
    contact: {
      email: 'info@kundapathways.com',
      phone: '+82-10-1234-5678',
      whatsapp: '+82-10-1234-5678',
      location: 'Seoul, South Korea',
      business_hours: {
        weekday: '9:00 AM - 6:00 PM KST',
        saturday: '10:00 AM - 4:00 PM KST',
        sunday: 'Closed'
      }
    },
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#'
    }
  });

  React.useEffect(() => {
    if (settings) {
      setFormData({
        ...formData,
        ...settings,
        contact: {
          ...formData.contact,
          ...settings.contact
        },
        social: {
          ...formData.social,
          ...settings.social
        }
      });
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

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserManagementLoading(true);

    try {
      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserData.email,
        password: newUserData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: newUserData.fullName
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update the user's role in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            role: newUserData.role,
            full_name: newUserData.fullName
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;
      }

      toast.success(`${newUserData.role === 'admin' ? 'Admin' : 'User'} created successfully!`);
      setNewUserData({ email: '', password: '', fullName: '', role: 'user' });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    } finally {
      setUserManagementLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast.success('User role updated successfully!');
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user role');
    }
  };

  const handleUpdateUserEmail = async (userId: string, newEmail: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-update-user', {
        body: {
          userId,
          email: newEmail,
          action: 'update-email'
        }
      });

      if (error) throw error;

      toast.success('User email updated successfully!');
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user email');
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    
    try {
      // Update email using admin edge function if it changed
      if (profileData.email !== profile?.email) {
        console.log('Calling admin-update-user with:', {
          userId: profile?.id,
          email: profileData.email,
          action: 'update-email'
        });
        
        const { data, error: authError } = await supabase.functions.invoke('admin-update-user', {
          body: {
            userId: profile?.id,
            email: profileData.email,
            action: 'update-email'
          }
        });
        
        console.log('Edge function response:', { data, authError });
        
        if (authError) {
          console.error('Edge function error:', authError);
          throw authError;
        }
        
        if (data?.error) {
          console.error('Function returned error:', data.error);
          throw new Error(data.error);
        }
        
        toast.success('Email updated successfully! Please log in with your new email.');
      }

      // Update profile data
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          email: profileData.email
        })
        .eq('id', profile?.id);

      if (error) throw error;
      
      if (profileData.email === profile?.email) {
        toast.success('Profile updated successfully!');
      }
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
      
      // Save the setting immediately
      await updateSetting('branding', {
        ...formData.branding,
        [`${type}_url`]: url
      });
      
      if (type === 'favicon') {
        // Update the favicon in the HTML head
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (link) {
          link.href = url;
        } else {
          const newLink = document.createElement('link');
          newLink.type = 'image/png';
          newLink.rel = 'icon';
          newLink.href = url;
          document.getElementsByTagName('head')[0].appendChild(newLink);
        }
      }
    }
  };

  const handleSaveSettings = async () => {
    setSaveLoading(true);
    try {
      await Promise.all([
        updateSetting('site_info', formData.site_info),
        updateSetting('branding', formData.branding),
        updateSetting('analytics', formData.analytics),
        updateSetting('contact', formData.contact),
        updateSetting('social', formData.social)
      ]);

      // Update meta tags immediately
      if (formData.site_info.title && formData.site_info.description) {
        updateMetaTags(
          formData.site_info.title,
          formData.site_info.description,
          "https://khalilconsultings.com/consulting-meta-image.jpg",
          "https://khalilconsultings.com/"
        );
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* Profile Information */}
        <TabsContent value="profile">
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
        </TabsContent>

        {/* Change Password */}
        <TabsContent value="password">
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
        </TabsContent>

        {/* Admin User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Admin User Management
              </CardTitle>
              <CardDescription>
                Create and manage admin users and their access levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Create New User */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create New User
                </h4>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-user-email">Email</Label>
                      <Input
                        id="new-user-email"
                        type="email"
                        placeholder="user@example.com"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-user-password">Password</Label>
                      <Input
                        id="new-user-password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={newUserData.password}
                        onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-user-name">Full Name</Label>
                      <Input
                        id="new-user-name"
                        placeholder="User's full name"
                        value={newUserData.fullName}
                        onChange={(e) => setNewUserData({ ...newUserData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-user-role">Role</Label>
                      <Select 
                        value={newUserData.role} 
                        onValueChange={(value: 'admin' | 'user') => setNewUserData({ ...newUserData, role: value })}
                      >
                        <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-white dark:bg-slate-800 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2 bg-white dark:bg-slate-800 shadow-xl z-[9999]">
                          <SelectItem value="user" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>User</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="admin" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              <span>Admin</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={userManagementLoading}
                    className="w-full md:w-auto"
                  >
                    {userManagementLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create User
                  </Button>
                </form>
              </div>

              <hr className="border-slate-200" />

              {/* Existing Users */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Existing Users</h4>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full">
                          {user.role === 'admin' ? (
                            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {user.full_name || 'No name set'}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            Created: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                        {user.id !== profile?.id && (
                          <Select 
                            value={user.role} 
                            onValueChange={(newRole: 'admin' | 'user') => handleUpdateUserRole(user.id, newRole)}
                          >
                            <SelectTrigger className="w-32 h-8 text-xs rounded-lg border border-slate-300 dark:border-slate-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg border bg-white dark:bg-slate-800 shadow-xl z-[9999]">
                              <SelectItem value="user" className="text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                                User
                              </SelectItem>
                              <SelectItem value="admin" className="text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                                Admin
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        {user.id === profile?.id && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            (You)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                      No users found
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Settings */}
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Website Settings
              </CardTitle>
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
            </CardContent>
          </Card>
          
          {/* Save Button for Website Settings */}
          <div className="flex justify-end">
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
        </TabsContent>

        {/* Content Management */}
        <TabsContent value="content">
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Manage the contact details displayed on your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email-display">Display Email</Label>
                    <Input
                      id="contact-email-display"
                      type="email"
                      placeholder="info@yourcompany.com"
                      value={formData.contact.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input
                      id="contact-phone"
                      placeholder="+82-10-1234-5678"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-whatsapp">WhatsApp Number</Label>
                    <Input
                      id="contact-whatsapp"
                      placeholder="+82-10-1234-5678"
                      value={formData.contact.whatsapp}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, whatsapp: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-location">Location</Label>
                    <Input
                      id="contact-location"
                      placeholder="Seoul, South Korea"
                      value={formData.contact.location}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, location: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Business Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weekday-hours">Weekdays</Label>
                      <Input
                        id="weekday-hours"
                        placeholder="9:00 AM - 6:00 PM KST"
                        value={formData.contact.business_hours.weekday}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            business_hours: {
                              ...prev.contact.business_hours,
                              weekday: e.target.value
                            }
                          }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saturday-hours">Saturday</Label>
                      <Input
                        id="saturday-hours"
                        placeholder="10:00 AM - 4:00 PM KST"
                        value={formData.contact.business_hours.saturday}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            business_hours: {
                              ...prev.contact.business_hours,
                              saturday: e.target.value
                            }
                          }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sunday-hours">Sunday</Label>
                      <Input
                        id="sunday-hours"
                        placeholder="Closed"
                        value={formData.contact.business_hours.sunday}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            business_hours: {
                              ...prev.contact.business_hours,
                              sunday: e.target.value
                            }
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Social Media Links
                </CardTitle>
                <CardDescription>
                  Configure social media links for your footer and contact sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-url">Facebook URL</Label>
                    <Input
                      id="facebook-url"
                      placeholder="https://facebook.com/yourpage"
                      value={formData.social.facebook}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, facebook: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter-url">Twitter/X URL</Label>
                    <Input
                      id="twitter-url"
                      placeholder="https://twitter.com/yourhandle"
                      value={formData.social.twitter}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                    <Input
                      id="linkedin-url"
                      placeholder="https://linkedin.com/company/yourcompany"
                      value={formData.social.linkedin}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram-url">Instagram URL</Label>
                    <Input
                      id="instagram-url"
                      placeholder="https://instagram.com/yourhandle"
                      value={formData.social.instagram}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings} 
                disabled={saveLoading || settingsLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saveLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;