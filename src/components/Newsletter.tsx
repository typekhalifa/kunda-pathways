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
    
    console.log('🎯 Newsletter subscription started');
    
    const trimmedEmail = email.toLowerCase().trim();
    const trimmedName = name.trim();
    
    console.log('🎯 Processing subscription:', { 
      email: trimmedEmail, 
      name: trimmedName,
      emailLength: trimmedEmail.length,
      isValidEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    });
    
    if (!trimmedEmail) {
      console.log('🎯 No email provided');
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      console.log('🎯 Invalid email format');
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    console.log('🎯 Starting database operation...');
    
    try {
      const insertData = {
        email: trimmedEmail,
        name: trimmedName || null,
        preferences: {
          frequency: 'weekly',
          topics: ['study-abroad', 'fb-consulting', 'general-updates']
        }
      };
      
      console.log('🎯 Insert data prepared:', insertData);
      
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([insertData])
        .select();

      console.log('🎯 Database response:', { 
        data, 
        error,
        hasData: !!data,
        hasError: !!error
      });

      if (error) {
        console.error('🎯 Database error occurred:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        if (error.code === '23505') {
          toast.error('This email is already subscribed!');
        } else {
          toast.error(`Database error: ${error.message}`);
        }
        return;
      }

      if (!data || data.length === 0) {
        console.error('🎯 No data returned from database');
        toast.error('No data returned. Please try again.');
        return;
      }

      console.log('🎯 SUCCESS! Subscription completed:', data[0]);
      setSubscribed(true);
      toast.success('🎉 Successfully subscribed to our newsletter!');
      setEmail('');
      setName('');
      
    } catch (error: any) {
      console.error('🎯 Unexpected error in try-catch:', {
        error,
        message: error?.message,
        name: error?.name
      });
      toast.error(`Unexpected error: ${error?.message || 'Unknown error'}`);
    } finally {
      console.log('🎯 Subscription attempt completed, setting loading to false');
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
    <section className="py-20 px-4 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-violet-200 dark:border-violet-800">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
            </div>
            <CardTitle className="text-2xl font-bold text-violet-800 dark:text-violet-200 mb-2">
              Subscribe to Our Newsletter
            </CardTitle>
            <CardDescription className="text-violet-700 dark:text-violet-300 text-base">
              Get the latest insights on education opportunities, scholarships, and F&B industry trends delivered straight to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/70 border-violet-200 focus:border-violet-400 dark:bg-gray-800/70 dark:border-violet-700"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/70 border-violet-200 focus:border-violet-400 dark:bg-gray-800/70 dark:border-violet-700"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </div>
                )}
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-violet-200 dark:border-violet-700">
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                <Gift className="w-3 h-3 mr-1" />
                Weekly updates
              </Badge>
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                <Shield className="w-3 h-3 mr-1" />
                No spam
              </Badge>
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                <Clock className="w-3 h-3 mr-1" />
                Unsubscribe anytime
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;