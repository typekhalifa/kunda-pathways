
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Edit,
  Plus,
  BarChart3,
  Mail,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [consultationCount, setConsultationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [newsletterCount, setNewsletterCount] = useState(0);
  const [activeSubscribers, setActiveSubscribers] = useState(0);
  const [campaignsSent, setCampaignsSent] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  useEffect(() => {
    const fetchConsultationCount = async () => {
      try {
        // Add timestamp to prevent caching
        const timestamp = Date.now();
        console.log('🔄 Fetching consultation counts at:', new Date().toISOString());
        
        const [studyRes, fbRes, extraRes, generalRes] = await Promise.all([
          supabase.from('study_abroad_bookings').select('id', { count: 'exact', head: true }),
          supabase.from('fb_consultation_bookings').select('id', { count: 'exact', head: true }),
          supabase.from('extra_service_bookings').select('id', { count: 'exact', head: true }),
          supabase.from('consultation_bookings').select('id', { count: 'exact', head: true }),
        ]);

        const studyCount = studyRes.count || 0;
        const fbCount = fbRes.count || 0;
        const extraCount = extraRes.count || 0;
        const generalCount = generalRes.count || 0;
        const totalCount = studyCount + fbCount + extraCount + generalCount;
        
        console.log('📊 Fresh consultation counts:', {
          study: studyCount,
          fb: fbCount,
          extra: extraCount,
          general: generalCount,
          total: totalCount,
          timestamp: timestamp
        });
        
        setConsultationCount(totalCount);
      } catch (error) {
        console.error("❌ Error fetching consultations count:", error);
      }
    };

    const fetchMessageCount = async () => {
      try {
        const { count, error } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        setMessageCount(count || 0);
      } catch (error) {
        console.error('Error fetching message count:', error);
      }
    };

    const fetchNewsletterData = async () => {
      try {
        // Total subscribers
        const { count: totalCount } = await supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact', head: true });
        
        // Active subscribers
        const { count: activeCount } = await supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);
        
        // Sent campaigns
        const { count: sentCount } = await supabase
          .from('newsletter_campaigns')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent');

        setNewsletterCount(totalCount || 0);
        setActiveSubscribers(activeCount || 0);
        setCampaignsSent(sentCount || 0);
      } catch (error) {
        console.error('Error fetching newsletter data:', error);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        const [studyRes, fbRes, extraRes, generalRes] = await Promise.all([
          supabase.from('study_abroad_bookings').select('total_price, payment_status, status'),
          supabase.from('fb_consultation_bookings').select('total_price, payment_status, status'),
          supabase.from('extra_service_bookings').select('total_price, payment_status, status'),
          supabase.from('consultation_bookings').select('total_price, payment_status, status'),
        ]);

        const allBookings = [
          ...(studyRes.data || []),
          ...(fbRes.data || []),
          ...(extraRes.data || []),
          ...(generalRes.data || [])
        ];

        // Only count revenue from existing bookings that are confirmed/completed and paid
        const revenue = allBookings
          .filter(b => 
            (b.payment_status === 'completed' || b.payment_status === 'paid') &&
            (b.status === 'confirmed' || b.status === 'completed')
          )
          .reduce((sum, b) => sum + (parseFloat(String(b.total_price)) || 0), 0);

        setTotalRevenue(revenue);
      } catch (error) {
        console.error('Error fetching revenue:', error);
      }
    };

    fetchConsultationCount();
    fetchMessageCount();
    fetchNewsletterData();
    fetchTotalRevenue();

    // Set up real-time subscriptions for automatic updates
    const consultationChannel = supabase
      .channel('consultation-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'study_abroad_bookings' }, () => {
        fetchConsultationCount();
        fetchTotalRevenue();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fb_consultation_bookings' }, () => {
        fetchConsultationCount();
        fetchTotalRevenue();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'extra_service_bookings' }, () => {
        fetchConsultationCount();
        fetchTotalRevenue();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consultation_bookings' }, () => {
        fetchConsultationCount();
        fetchTotalRevenue();
      })
      .subscribe();

    const messageChannel = supabase
      .channel('message-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchMessageCount)
      .subscribe();

    const newsletterChannel = supabase
      .channel('newsletter-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'newsletter_subscribers' }, fetchNewsletterData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'newsletter_campaigns' }, fetchNewsletterData)
      .subscribe();

    return () => {
      supabase.removeChannel(consultationChannel);
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(newsletterChannel);
    };
  }, []);


  const handleSignOut = () => {
    signOut();
    setShowSignOutDialog(false);
  };

  const dashboardCards = [
    {
      title: 'Website Content',
      description: 'Edit homepage, about, services content',
      icon: Edit,
      href: '/admin/content',
      color: 'text-blue-600'
    },
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      icon: FileText,
      href: '/admin/blog',
      color: 'text-green-600'
    },
    {
      title: 'Services',
      description: 'Manage consultation services and pricing',
      icon: Plus,
      href: '/admin/services',
      color: 'text-purple-600'
    },
    {
      title: 'Contact Messages',
      description: 'View and respond to inquiries',
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'text-orange-600'
    },
    {
      title: 'Consultations',
      description: 'Manage booking requests',
      icon: Calendar,
      href: '/admin/consultations',
      color: 'text-pink-600'
    },
    {
      title: 'Analytics',
      description: 'View website statistics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'text-indigo-600'
    },
    {
      title: 'Settings',
      description: 'Configure website settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'text-slate-600'
    },
    {
      title: 'Newsletter',
      description: 'Manage subscribers and email campaigns',
      icon: Mail,
      href: '/admin/newsletter',
      color: 'text-cyan-600'
    },
    {
      title: 'Scholarships',
      description: 'Manage scholarship opportunities',
      icon: GraduationCap,
      href: '/admin/scholarships',
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome back, {profile?.full_name || profile?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline">
                  View Website
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setShowSignOutDialog(true)}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{consultationCount}</div>
              <p className="text-purple-100 text-sm">Total bookings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{messageCount}</div>
              <p className="text-orange-100 text-sm">New inquiries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-3xl hover:scale-[1.02] transform">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Newsletter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeSubscribers}</div>
              <p className="text-emerald-100 text-sm">Active subscribers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-3xl hover:scale-[1.02] transform">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <DollarSign className="w-5 h-5 mr-2" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-blue-100 text-sm">Total earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <Link key={index} to={card.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 rounded-3xl bg-gradient-to-br from-background to-muted/30">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-primary transition-colors">
                    <card.icon className={`w-6 h-6 mr-3 ${card.color} group-hover:scale-110 transition-transform`} />
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent className="sm:max-w-lg rounded-3xl border-0 shadow-2xl bg-white dark:bg-slate-800">
          <AlertDialogHeader className="text-center space-y-4 pt-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <LogOut className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-slate-800 dark:text-white">
              Sign Out Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to sign out from the admin dashboard? You'll need to log in again to access admin features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 pt-6 pb-6">
            <AlertDialogCancel className="w-full sm:w-auto order-2 sm:order-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 rounded-xl py-3 px-6 font-medium">
              No, Stay Logged In
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSignOut}
              className="w-full sm:w-auto order-1 sm:order-2 bg-red-600 hover:bg-red-700 text-white border-0 rounded-xl py-3 px-6 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Yes, Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
