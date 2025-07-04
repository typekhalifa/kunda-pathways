
import React, { useState } from 'react';
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
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-purple-100 text-sm">Pending bookings</p>
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
              <div className="text-3xl font-bold">0</div>
              <p className="text-orange-100 text-sm">New inquiries</p>
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
