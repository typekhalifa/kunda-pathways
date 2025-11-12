import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MaintenanceMode {
  enabled: boolean;
  message: string;
}

export const useMaintenanceMode = () => {
  const [maintenanceMode, setMaintenanceMode] = useState<MaintenanceMode>({
    enabled: false,
    message: 'We are currently performing maintenance. Please check back soon!'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        const { data, error } = await supabase
          .from('website_settings')
          .select('setting_value')
          .eq('setting_key', 'maintenance_mode')
          .single();

        if (!error && data && typeof data.setting_value === 'object' && data.setting_value !== null) {
          const value = data.setting_value as Record<string, any>;
          if ('enabled' in value && 'message' in value) {
            setMaintenanceMode(value as MaintenanceMode);
          }
        }
      } catch (error) {
        console.error('Error fetching maintenance mode:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceMode();

    // Subscribe to changes
    const channel = supabase
      .channel('maintenance_mode_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'website_settings',
          filter: 'setting_key=eq.maintenance_mode'
        },
        (payload) => {
          if (payload.new.setting_value && typeof payload.new.setting_value === 'object') {
            const value = payload.new.setting_value as Record<string, any>;
            if ('enabled' in value && 'message' in value) {
              setMaintenanceMode(value as MaintenanceMode);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { maintenanceMode, loading };
};
