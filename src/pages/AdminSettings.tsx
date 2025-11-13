import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoLogout } from '@/hooks/useAutoLogout';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SettingsManager from '@/components/admin/SettingsManager';

const AdminSettings = () => {
  const { profile, signOut } = useAuth();
  useAutoLogout(10); // Auto logout after 10 minutes of inactivity

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                  Admin Settings
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
                  Manage your application settings
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate max-w-[120px] sm:max-w-none">
                {profile?.full_name || profile?.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <SettingsManager />
      </div>
    </div>
  );
};

export default AdminSettings;