
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
      title: 'Resources',
      description: 'Upload PDFs and manage resources',
      icon: Plus,
      href: '/admin/resources',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-purple-100">Pending bookings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <Link key={index} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <card.icon className={`w-5 h-5 mr-2 ${card.color}`} />
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out from the admin dashboard?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
