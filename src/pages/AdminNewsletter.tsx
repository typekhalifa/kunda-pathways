import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoLogout } from '@/hooks/useAutoLogout';
import { 
  LogOut, 
  ArrowLeft, 
  Users, 
  Mail, 
  Send,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const AdminNewsletter = () => {
  const { profile, signOut } = useAuth();
  useAutoLogout(10); // Auto logout after 10 minutes of inactivity
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  
  // Campaign composition state
  const [composeOpen, setComposeOpen] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  // View campaign state
  const [viewCampaign, setViewCampaign] = useState<any>(null);

  useEffect(() => {
    fetchSubscribers();
    fetchCampaigns();

    // Set up real-time subscription
    const subscriberChannel = supabase
      .channel('newsletter-subscriber-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'newsletter_subscribers' }, () => {
        console.log('Newsletter subscriber changed, refetching...');
        fetchSubscribers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscriberChannel);
    };
  }, []);

  useEffect(() => {
    let filtered = subscribers;
    
    if (filterStatus === 'active') {
      filtered = filtered.filter(s => s.is_active === true);
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter(s => s.is_active === false);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredSubscribers(filtered);
  }, [subscribers, filterStatus, searchTerm]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to fetch subscribers');
    }
  };

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to fetch campaigns');
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSubscribers(prev => prev.filter(s => s.id !== id));
      toast.success('Subscriber deleted successfully');
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    }
  };

  const toggleSubscriberStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      setSubscribers(prev => 
        prev.map(s => 
          s.id === id ? { ...s, is_active: !currentStatus } : s
        )
      );
      
      toast.success(`Subscriber ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating subscriber status:', error);
      toast.error('Failed to update subscriber status');
    }
  };

  const handleSaveDraft = async () => {
    if (!campaignTitle || !campaignSubject || !campaignContent) {
      toast.error('Please fill in all required fields', {
        description: 'Title, subject, and content are required',
        className: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-800'
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('newsletter_campaigns')
        .insert([
          {
            title: campaignTitle,
            subject: campaignSubject,
            content: campaignContent,
            status: 'draft',
            created_by: user?.id,
            recipient_count: subscribers.filter(s => s.is_active).length
          }
        ]);

      if (error) throw error;
      
      toast.success('Campaign saved as draft');
      setComposeOpen(false);
      resetCampaignForm();
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error('Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNow = async () => {
    if (!campaignTitle || !campaignSubject || !campaignContent) {
      toast.error('Please fill in all required fields', {
        description: 'Title, subject, and content are required',
        className: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-800'
      });
      return;
    }

    if (activeSubscribers === 0) {
      toast.error('No active subscribers to send to', {
        description: 'Add some subscribers before sending a newsletter',
        className: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-800'
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // First save the campaign
      const { data: campaignData, error: saveError } = await supabase
        .from('newsletter_campaigns')
        .insert([{
          title: campaignTitle,
          subject: campaignSubject,
          content: campaignContent,
          status: 'sending',
          created_by: user?.id,
          recipient_count: activeSubscribers
        }])
        .select()
        .single();

      if (saveError) throw saveError;

      // Send the newsletter
      const { error: sendError } = await supabase.functions.invoke('send-newsletter', {
        body: {
          campaignId: campaignData.id,
          subject: campaignSubject,
          content: campaignContent
        }
      });

      if (sendError) throw sendError;

      toast.success('Newsletter sent successfully!', {
        description: `Sent to ${activeSubscribers} subscribers`,
        duration: 5000,
        className: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800'
      });
      setComposeOpen(false);
      resetCampaignForm();
      fetchCampaigns();
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast.error('Failed to send newsletter', {
        description: 'Please check your email configuration and try again.',
        duration: 5000,
        className: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-800'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetCampaignForm = () => {
    setCampaignTitle('');
    setCampaignSubject('');
    setCampaignContent('');
    setSelectedTemplate('');
  };

  const loadTemplate = (template: string) => {
    const templates = {
      welcome: {
        title: 'Welcome to Our Newsletter',
        subject: 'Welcome to Kunda Pathways Newsletter! 🎉',
        content: `Hi there!

Welcome to the Kunda Pathways newsletter community! We're thrilled to have you on board.

Here's what you can expect from us:
• Expert insights on study abroad opportunities
• Business consulting tips and strategies  
• Success stories from our clients
• Exclusive resources and guides
• Early access to our services and events

We're committed to helping you achieve your academic and business goals.

Best regards,
The Kunda Pathways Team`
      },
      update: {
        title: 'Monthly Update Newsletter',
        subject: 'Your Monthly Update from Kunda Pathways',
        content: `Hello!

Here's what's new this month at Kunda Pathways:

🎓 STUDY ABROAD UPDATES
• New university partnerships
• Scholarship opportunities
• Application deadlines reminders

💼 BUSINESS CONSULTING
• Industry insights
• Success stories
• New service offerings

📚 RESOURCES
• Free guides and templates
• Upcoming webinars
• Expert interviews

Thank you for being part of our community!

Best regards,
The Kunda Pathways Team`
      },
      announcement: {
        title: 'Important Announcement',
        subject: 'Important News from Kunda Pathways',
        content: `Dear Subscribers,

We have some exciting news to share with you!

[Your announcement content here]

This is an important update that we wanted to make sure you didn't miss.

If you have any questions, please don't hesitate to reach out to us.

Best regards,
The Kunda Pathways Team`
      }
    };

    const template_data = templates[template as keyof typeof templates];
    if (template_data) {
      setCampaignTitle(template_data.title);
      setCampaignSubject(template_data.subject);
      setCampaignContent(template_data.content);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('newsletter_campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw error;

      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      toast.success('Campaign deleted successfully', {
        description: 'The campaign has been permanently removed',
        className: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800'
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign', {
        description: 'Please try again or contact support',
        className: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-800'
      });
    }
  };

  const exportSubscribers = () => {
    const csv = subscribers.map(s => 
      `"${s.email}","${s.name || ''}","${s.is_active ? 'Active' : 'Inactive'}","${new Date(s.subscribed_at).toLocaleDateString()}"`
    ).join('\n');
    
    const csvContent = `Email,Name,Status,Subscribed Date\n${csv}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter_subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const activeSubscribers = subscribers.filter(s => s.is_active).length;
  const totalSubscribers = subscribers.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Newsletter Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage subscribers and create email campaigns
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {profile?.full_name || profile?.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="subscribers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="subscribers" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-3xl hover:scale-[1.02] transform">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Total Subscribers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalSubscribers}</div>
                  <p className="text-blue-100 text-sm">All time subscribers</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-3xl hover:scale-[1.02] transform">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Active Subscribers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeSubscribers}</div>
                  <p className="text-green-100 text-sm">Ready to receive emails</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-3xl hover:scale-[1.02] transform">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Send className="w-5 h-5 mr-2" />
                    Campaigns Sent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{campaigns.filter(c => c.status === 'sent').length}</div>
                  <p className="text-purple-100 text-sm">Total campaigns</p>
                </CardContent>
              </Card>
            </div>

            {/* Subscribers Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Newsletter Subscribers
                    </CardTitle>
                    <CardDescription>
                      Manage your newsletter subscriber list
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={exportSubscribers} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                    <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Compose Email
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by email or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredSubscribers.map((subscriber) => (
                    <Card key={subscriber.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{subscriber.email}</h3>
                            <Badge className={subscriber.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {subscriber.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          {subscriber.name && (
                            <p className="text-sm text-muted-foreground mb-1">Name: {subscriber.name}</p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={subscriber.is_active ? "outline" : "default"}
                            onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.is_active)}
                          >
                            {subscriber.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {filteredSubscribers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No subscribers found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Email Campaigns</CardTitle>
                    <CardDescription>View and manage your newsletter campaigns</CardDescription>
                  </div>
                  <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{campaign.title}</h3>
                            <Badge className={
                              campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Subject: {campaign.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(campaign.created_at).toLocaleDateString()}
                          </p>
                          {campaign.sent_at && (
                            <p className="text-sm text-muted-foreground">
                              Sent: {new Date(campaign.sent_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setViewCampaign(campaign)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          {campaign.status === 'draft' && (
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {campaigns.length === 0 && (
                  <div className="text-center py-8">
                    <Mail className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No campaigns created yet</p>
                    <p className="text-sm text-muted-foreground">Create your first campaign to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Compose Email Dialog */}
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-2xl">
            <DialogHeader className="pb-6 border-b border-slate-200 dark:border-slate-600">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                Compose Newsletter Campaign
              </DialogTitle>
              <DialogDescription className="text-base text-slate-600 dark:text-slate-300">
                Create a new email campaign for your {activeSubscribers} active subscribers
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Template</label>
                  <Select value={selectedTemplate} onValueChange={(value) => {
                    setSelectedTemplate(value);
                    loadTemplate(value);
                  }}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2 border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl z-50 p-2">
                      <SelectItem value="welcome" className="rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50 cursor-pointer m-1 p-3 font-medium transition-all duration-200">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          Welcome Email
                        </div>
                      </SelectItem>
                      <SelectItem value="update" className="rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50 cursor-pointer m-1 p-3 font-medium transition-all duration-200">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Monthly Update
                        </div>
                      </SelectItem>
                      <SelectItem value="announcement" className="rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50 cursor-pointer m-1 p-3 font-medium transition-all duration-200">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                          Announcement
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recipients</label>
                  <Input 
                    value={`${activeSubscribers} active subscribers`} 
                    disabled 
                    className="h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Campaign Title</label>
                <Input
                  placeholder="Internal campaign name"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Subject</label>
                <Input
                  placeholder="Subject line for your email"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Content</label>
                <Textarea
                  placeholder="Write your email content here..."
                  value={campaignContent}
                  onChange={(e) => setCampaignContent(e.target.value)}
                  rows={12}
                  className="resize-none rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900"
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-600">
                <Button 
                  onClick={handleSaveDraft}
                  disabled={loading}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-2 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  {loading ? 'Saving...' : 'Save as Draft'}
                </Button>
                <Button 
                  onClick={handleSendNow}
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {loading ? 'Sending...' : 'Send Now'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Campaign Dialog */}
        <Dialog open={!!viewCampaign} onOpenChange={() => setViewCampaign(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-2xl">
            <DialogHeader className="pb-6 border-b border-slate-200 dark:border-slate-600">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                Campaign Details
              </DialogTitle>
              <DialogDescription className="text-base text-slate-600 dark:text-slate-300">
                View campaign content and details
              </DialogDescription>
            </DialogHeader>
            
            {viewCampaign && (
              <div className="space-y-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Campaign Title</label>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border">
                      {viewCampaign.title}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border">
                      <Badge className={
                        viewCampaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                        viewCampaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {viewCampaign.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Subject</label>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border">
                    {viewCampaign.subject}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Content</label>
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{viewCampaign.content}</pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    <strong>Created:</strong> {new Date(viewCampaign.created_at).toLocaleString()}
                  </div>
                  {viewCampaign.sent_at && (
                    <div>
                      <strong>Sent:</strong> {new Date(viewCampaign.sent_at).toLocaleString()}
                    </div>
                  )}
                  {viewCampaign.recipient_count && (
                    <div>
                      <strong>Recipients:</strong> {viewCampaign.recipient_count}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminNewsletter;