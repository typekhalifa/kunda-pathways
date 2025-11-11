import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Mail, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);
  
  const subscriberId = searchParams.get('id');

  const handleStaySubscribed = () => {
    toast.success("Great! You'll continue receiving our newsletter.");
    navigate('/');
  };

  const handleUnsubscribe = async () => {
    if (!subscriberId) {
      toast.error('Invalid unsubscribe link');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: false })
        .eq('id', subscriberId);

      if (error) throw error;

      setUnsubscribed(true);
      toast.success('You have been unsubscribed from our newsletter.');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast.error('Failed to unsubscribe. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (!subscriberId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-destructive">Invalid Link</CardTitle>
              <CardDescription>
                This unsubscribe link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/')} className="w-full">
                Go to Homepage
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (unsubscribed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <CardTitle>You've Been Unsubscribed</CardTitle>
              <CardDescription>
                You will no longer receive newsletters from Kunda Pathways.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                If you change your mind, you can always subscribe again from our homepage.
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>We're Sorry to See You Go</CardTitle>
            <CardDescription>
              Are you sure you want to unsubscribe from our newsletter?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                By staying subscribed, you'll continue to receive:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Educational opportunities and scholarship alerts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Business consulting insights and tips</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Exclusive updates from our experts</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleStaySubscribed} 
                className="w-full"
                variant="default"
              >
                Stay Subscribed
              </Button>
              <Button 
                onClick={handleUnsubscribe} 
                className="w-full"
                variant="outline"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Unsubscribe Anyway
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
