import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Sparkles, Gift, CheckCircle, Shield, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { language } = useLanguage();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📧 Newsletter subscription attempt started');
    console.log('📧 Form data before processing:', { email, name, emailLength: email.length, nameLength: name.length });
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const trimmedEmail = email.toLowerCase().trim();
      const trimmedName = name.trim() || null;
      
      console.log('📧 Attempting to subscribe:', { 
        email: trimmedEmail, 
        name: trimmedName,
        originalEmail: email,
        originalName: name 
      });
      
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: trimmedEmail,
            name: trimmedName,
            preferences: {
              frequency: 'weekly',
              topics: ['study-abroad', 'fb-consulting', 'general-updates']
            }
          }
        ])
        .select();

      console.log('📧 Supabase response:', { data, error });

      if (error) {
        console.error('📧 Subscription error:', error);
        if (error.code === '23505') { // Unique constraint violation
          toast.error('This email is already subscribed to our newsletter!');
        } else {
          throw error;
        }
        return;
      }

      console.log('📧 Subscription successful!', data);
      setSubscribed(true);
      toast.success('🎉 Successfully subscribed to our newsletter!');
      setEmail('');
      setName('');
    } catch (error) {
      console.error('📧 Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                    Welcome to our community! 🎉
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                    You'll receive our latest updates, exclusive content, and expert insights directly in your inbox.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-900/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Join Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground dark:text-slate-300">
              Get exclusive insights, study abroad tips, and business consulting updates delivered to your inbox
            </p>
          </div>

          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-900/40 border-blue-200 dark:border-blue-700/50 shadow-lg hover:shadow-xl dark:shadow-blue-500/10 transition-all duration-300 rounded-3xl backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Stay Connected With Us
              </CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                Be the first to know about new opportunities, expert insights, and exclusive content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 py-3">
                  <div className="flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-center">
                      <Sparkles className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Expert Tips</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-center">
                      <Gift className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">Exclusive Content</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <div className="text-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Success Stories</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </div>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Weekly updates</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;