
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Save, CreditCard, Globe, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const SettingsManager = () => {
  const { updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    paypal_email: '',
    flutterwave_public_key: '',
    stripe_public_key: '',
    currency_default: 'USD',
    payment_methods_enabled: {
      paypal: true,
      flutterwave: false,
      stripe: false,
    },
  });

  const [websiteSettings, setWebsiteSettings] = useState({
    site_title: 'Kunda Pathways',
    site_description: 'Your pathway to global opportunities',
    contact_email: '',
    contact_phone: '',
    whatsapp_number: '',
    business_address: '',
    social_links: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });

  const [bookingSettings, setBookingSettings] = useState({
    auto_confirm_bookings: false,
    require_payment_upfront: true,
    booking_window_days: 30,
    cancellation_policy: '',
    booking_instructions: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', 'admin_settings');

      if (error) throw error;

      // Process the fetched settings and update state with proper type casting
      data?.forEach((setting) => {
        const value = setting.content_value;
        switch (setting.content_key) {
          case 'payment_settings':
            if (typeof value === 'object' && value !== null) {
              setPaymentSettings(value as typeof paymentSettings);
            }
            break;
          case 'website_settings':
            if (typeof value === 'object' && value !== null) {
              setWebsiteSettings(value as typeof websiteSettings);
            }
            break;
          case 'booking_settings':
            if (typeof value === 'object' && value !== null) {
              setBookingSettings(value as typeof bookingSettings);
            }
            break;
        }
      });
    } catch (error: any) {
      console.log('Settings not found, using defaults');
    }
  };

  const saveSettings = async (section: string, data: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          section: 'admin_settings',
          content_key: section,
          content_value: data,
          language_code: 'EN',
        });

      if (error) throw error;
      toast.success('Settings saved successfully!');
    } catch (error: any) {
      toast.error('Failed to save settings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { error } = await updatePassword(passwordData.newPassword);
      
      if (error) throw error;
      
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast.error('Failed to update password: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-600">Manage your application settings and preferences</p>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Update your admin password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Settings
          </CardTitle>
          <CardDescription>
            Configure payment methods and processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paypal-email">PayPal Email</Label>
              <Input
                id="paypal-email"
                type="email"
                value={paymentSettings.paypal_email}
                onChange={(e) => setPaymentSettings({
                  ...paymentSettings,
                  paypal_email: e.target.value
                })}
                placeholder="your-paypal@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-currency">Default Currency</Label>
              <Input
                id="default-currency"
                value={paymentSettings.currency_default}
                onChange={(e) => setPaymentSettings({
                  ...paymentSettings,
                  currency_default: e.target.value
                })}
                placeholder="USD"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="paypal-enabled">PayPal</Label>
                <Switch
                  id="paypal-enabled"
                  checked={paymentSettings.payment_methods_enabled.paypal}
                  onCheckedChange={(checked) => setPaymentSettings({
                    ...paymentSettings,
                    payment_methods_enabled: {
                      ...paymentSettings.payment_methods_enabled,
                      paypal: checked
                    }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="flutterwave-enabled">Flutterwave</Label>
                <Switch
                  id="flutterwave-enabled"
                  checked={paymentSettings.payment_methods_enabled.flutterwave}
                  onCheckedChange={(checked) => setPaymentSettings({
                    ...paymentSettings,
                    payment_methods_enabled: {
                      ...paymentSettings.payment_methods_enabled,
                      flutterwave: checked
                    }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="stripe-enabled">Stripe</Label>
                <Switch
                  id="stripe-enabled"
                  checked={paymentSettings.payment_methods_enabled.stripe}
                  onCheckedChange={(checked) => setPaymentSettings({
                    ...paymentSettings,
                    payment_methods_enabled: {
                      ...paymentSettings.payment_methods_enabled,
                      stripe: checked
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={() => saveSettings('payment_settings', paymentSettings)}
            disabled={loading}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {/* Website Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Website Settings
          </CardTitle>
          <CardDescription>
            Basic website information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-title">Site Title</Label>
              <Input
                id="site-title"
                value={websiteSettings.site_title}
                onChange={(e) => setWebsiteSettings({
                  ...websiteSettings,
                  site_title: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={websiteSettings.contact_email}
                onChange={(e) => setWebsiteSettings({
                  ...websiteSettings,
                  contact_email: e.target.value
                })}
                placeholder="info@kundapathways.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-description">Site Description</Label>
            <Textarea
              id="site-description"
              value={websiteSettings.site_description}
              onChange={(e) => setWebsiteSettings({
                ...websiteSettings,
                site_description: e.target.value
              })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input
                id="contact-phone"
                value={websiteSettings.contact_phone}
                onChange={(e) => setWebsiteSettings({
                  ...websiteSettings,
                  contact_phone: e.target.value
                })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
              <Input
                id="whatsapp-number"
                value={websiteSettings.whatsapp_number}
                onChange={(e) => setWebsiteSettings({
                  ...websiteSettings,
                  whatsapp_number: e.target.value
                })}
                placeholder="+1234567890"
              />
            </div>
          </div>

          <Button 
            onClick={() => saveSettings('website_settings', websiteSettings)}
            disabled={loading}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Website Settings
          </Button>
        </CardContent>
      </Card>

      {/* Booking Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Booking Settings
          </CardTitle>
          <CardDescription>
            Configure consultation booking preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-confirm">Auto-confirm bookings</Label>
                <p className="text-sm text-slate-500">Automatically confirm new bookings</p>
              </div>
              <Switch
                id="auto-confirm"
                checked={bookingSettings.auto_confirm_bookings}
                onCheckedChange={(checked) => setBookingSettings({
                  ...bookingSettings,
                  auto_confirm_bookings: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="require-payment">Require upfront payment</Label>
                <p className="text-sm text-slate-500">Require payment before booking confirmation</p>
              </div>
              <Switch
                id="require-payment"
                checked={bookingSettings.require_payment_upfront}
                onCheckedChange={(checked) => setBookingSettings({
                  ...bookingSettings,
                  require_payment_upfront: checked
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-window">Booking Window (days)</Label>
            <Input
              id="booking-window"
              type="number"
              value={bookingSettings.booking_window_days}
              onChange={(e) => setBookingSettings({
                ...bookingSettings,
                booking_window_days: parseInt(e.target.value) || 30
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
            <Textarea
              id="cancellation-policy"
              value={bookingSettings.cancellation_policy}
              onChange={(e) => setBookingSettings({
                ...bookingSettings,
                cancellation_policy: e.target.value
              })}
              placeholder="Describe your cancellation policy..."
              rows={3}
            />
          </div>

          <Button 
            onClick={() => saveSettings('booking_settings', bookingSettings)}
            disabled={loading}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Booking Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;
