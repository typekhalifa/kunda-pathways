import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
            Manage your website configuration and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-500 mb-4">Website settings panel coming soon...</p>
            <p className="text-sm text-slate-400">
              This will include site title, description, contact information, and other global settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;