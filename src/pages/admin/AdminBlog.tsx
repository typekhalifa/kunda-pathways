import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BlogManager from '@/components/admin/BlogManager';

const AdminBlog = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Blog Management
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <BlogManager />
      </div>
    </div>
  );
};

export default AdminBlog;