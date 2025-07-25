import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LogOut, 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users,
  BarChart3,
  PieChart,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalytics = () => {
  const { profile, signOut } = useAuth();
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalMessages: 0,
    monthlyData: [],
    serviceTypeData: [],
    statusData: [],
    recentBookings: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch all booking data
        const [studyRes, fbRes, extraRes, messagesRes] = await Promise.all([
          supabase.from('study_abroad_bookings').select('*'),
          supabase.from('fb_consultation_bookings').select('*'),
          supabase.from('extra_service_bookings').select('*'),
          supabase.from('contact_messages').select('*')
        ]);

        const allBookings = [
          ...(studyRes.data || []).map(b => ({ ...b, type: 'Study Abroad' })),
          ...(fbRes.data || []).map(b => ({ ...b, type: 'F&B Consulting' })),
          ...(extraRes.data || []).map(b => ({ ...b, type: 'Extra Services' }))
        ];

        // Calculate totals
        const totalBookings = allBookings.length;
        const totalRevenue = allBookings
          .filter(b => b.payment_status === 'completed' || b.payment_status === 'paid')
          .reduce((sum, b) => sum + (parseFloat(String(b.total_price)) || 0), 0);
        const totalMessages = messagesRes.data?.length || 0;

        // Monthly data for last 6 months
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const monthKey = date.toISOString().substring(0, 7);
          const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          
          const monthBookings = allBookings.filter(b => 
            b.created_at?.startsWith(monthKey)
          );
          
          const monthRevenue = monthBookings
            .filter(b => b.payment_status === 'completed' || b.payment_status === 'paid')
            .reduce((sum, b) => sum + (parseFloat(String(b.total_price)) || 0), 0);

          monthlyData.push({
            month: monthName,
            bookings: monthBookings.length,
            revenue: monthRevenue
          });
        }

        // Service type distribution
        const serviceTypes = allBookings.reduce((acc, booking) => {
          acc[booking.type] = (acc[booking.type] || 0) + 1;
          return acc;
        }, {});

        const serviceTypeData = Object.entries(serviceTypes).map(([type, count]) => ({
          name: type,
          value: count as number,
          percentage: Math.round((count as number / totalBookings) * 100)
        }));

        // Status distribution
        const statuses = allBookings.reduce((acc, booking) => {
          acc[booking.status || 'pending'] = (acc[booking.status || 'pending'] || 0) + 1;
          return acc;
        }, {});

        const statusData = Object.entries(statuses).map(([status, count]) => ({
          name: status,
          value: count as number
        }));

        // Recent bookings (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentBookings = allBookings
          .filter(b => new Date(b.created_at) >= sevenDaysAgo)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);

        setAnalytics({
          totalBookings,
          totalRevenue,
          totalMessages,
          monthlyData,
          serviceTypeData,
          statusData,
          recentBookings
        });

      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
                  Analytics Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Business insights and performance metrics
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

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalBookings}</div>
              <p className="text-blue-100 text-sm">All-time bookings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <DollarSign className="w-5 h-5 mr-2" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
              <p className="text-green-100 text-sm">Completed payments</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalMessages}</div>
              <p className="text-orange-100 text-sm">Total inquiries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.recentBookings.length}</div>
              <p className="text-purple-100 text-sm">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Monthly Revenue Trend
              </CardTitle>
              <CardDescription>Revenue and bookings over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                    name="Revenue ($)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#82ca9d" 
                    name="Bookings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Service Type Distribution
              </CardTitle>
              <CardDescription>Breakdown of bookings by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={analytics.serviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview and Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Booking Status Overview
              </CardTitle>
              <CardDescription>Current status of all bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{booking.full_name}</p>
                      <p className="text-sm text-muted-foreground">{booking.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.total_price}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {analytics.recentBookings.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No recent bookings in the last 7 days
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;