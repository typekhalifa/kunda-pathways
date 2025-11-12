import { useEffect, useState } from 'react';
import { Construction, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Maintenance = () => {
  const [message, setMessage] = useState('We are currently performing maintenance. Please check back soon!');

  useEffect(() => {
    const fetchMaintenanceMessage = async () => {
      const { data } = await supabase
        .from('website_settings')
        .select('setting_value')
        .eq('setting_key', 'maintenance_mode')
        .single();

      if (data?.setting_value && typeof data.setting_value === 'object' && data.setting_value !== null) {
        const value = data.setting_value as Record<string, any>;
        if (value.message && typeof value.message === 'string') {
          setMessage(value.message);
        }
      }
    };

    fetchMaintenanceMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="animate-bounce">
          <Construction className="w-24 h-24 mx-auto text-primary" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Under Maintenance
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {message}
          </p>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We apologize for any inconvenience. We're working hard to improve your experience.
          </p>
        </div>

        <Button
          onClick={() => window.location.reload()}
          className="gap-2"
          variant="outline"
        >
          <RefreshCw className="w-4 h-4" />
          Check Again
        </Button>
      </div>
    </div>
  );
};

export default Maintenance;
