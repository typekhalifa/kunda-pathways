
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, Shield, Eye, EyeOff, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', fullName: '' });
  const [resetEmail, setResetEmail] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      console.log('🔄 User detected in AdminLogin, redirecting to dashboard');
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Check your email for verification.');
    }
    
    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    if (!resetEmail.includes('@') || !resetEmail.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const currentOrigin = window.location.origin;
      const redirectUrl = `${currentOrigin}/admin/reset-password`;
      
      console.log('Sending custom password reset email for:', resetEmail);

      // Use our custom edge function instead of Supabase's built-in email
      const { data, error } = await supabase.functions.invoke('send-password-reset', {
        body: {
          email: resetEmail,
          redirectUrl: redirectUrl,
        }
      });

      if (error) {
        console.error('Password reset error:', error);
        toast.error('Failed to send reset email. Please try again.');
      } else if (data?.success) {
        toast.success('Password reset link sent! Check your email and click the link to reset your password.');
        setActiveTab('signin');
        setResetEmail(''); // Clear the email field
      } else {
        toast.error(data?.error || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Failed to send reset email. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Secure access to your dashboard
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="reset" className="text-sm">Reset Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-slate-700 font-medium">
                    Admin Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-slate-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secure password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg" 
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Access Dashboard
                </Button>
              </form>
            </TabsContent>
            

            <TabsContent value="reset" className="space-y-4">
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="text-center mb-4">
                  <KeyRound className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">
                    Enter your email to receive a password reset link
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium shadow-lg" 
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Reset Link
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Secure admin access for Kunda Pathways
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
