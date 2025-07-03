import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, KeyRound, User, Shield } from 'lucide-react';

const SettingsManager = () => {
  const { profile, updatePassword } = useAuth();
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-600">Full Name</Label>
              <p className="text-lg">{profile?.full_name || 'Not set'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-600">Email</Label>
              <p className="text-lg">{profile?.email}</p>
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
                  defaultValue="Africa-Korea Connect"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  placeholder="Brief description of your website"
                  defaultValue="Educational consulting and cultural bridge between Africa and Korea"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="contact@yoursite.com"
                  defaultValue="info@africa-korea-connect.com"
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
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon-upload">Favicon Upload</Label>
                <Input
                  id="favicon-upload"
                  type="file"
                  accept="image/x-icon,image/png"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  type="color"
                  defaultValue="#3b82f6"
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
                  defaultValue="Africa-Korea Connect - Educational Consulting"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  placeholder="keyword1, keyword2, keyword3"
                  defaultValue="korea, education, consulting, study abroad"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea
                id="meta-description"
                placeholder="SEO meta description (150-160 characters)"
                defaultValue="Professional educational consulting services connecting African students with Korean universities and opportunities."
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
                <Input
                  id="google-tag-manager"
                  placeholder="GTM-XXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                <Input
                  id="facebook-pixel"
                  placeholder="000000000000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea
                  id="custom-css"
                  placeholder="/* Custom CSS styles */"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Website Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;