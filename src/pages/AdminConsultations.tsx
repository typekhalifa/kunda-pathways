import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultationsManager from '@/components/admin/ConsultationsManager';

const AdminConsultations = () => {
  const { profile, signOut } = useAuth();

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
                  Consultation Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  View and manage all consultation bookings
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
        <ConsultationsManager />
      </div>
    </div>
  );
};

export default AdminConsultations;