import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useConsultationActions = () => {
  const [loading, setLoading] = useState(false);

  const updateConsultationStatus = async (
    bookingId: string,
    bookingType: string,
    status: 'confirmed' | 'cancelled' | 'completed',
    paymentStatus?: 'completed' | 'failed' | 'refunded'
  ) => {
    setLoading(true);
    try {
      const updateData: any = { status };
      
      // Auto-mark as paid when confirming
      if (status === 'confirmed') {
        updateData.payment_status = 'paid';
      } else if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }

      let error = null;
      let bookingData: any = null;

      switch (bookingType) {
        case 'Study Abroad':
          // Fetch booking details first
          const { data: studyData } = await supabase
            .from('study_abroad_bookings')
            .select('*')
            .eq('id', bookingId)
            .single();
          bookingData = studyData;
          
          ({ error } = await supabase
            .from('study_abroad_bookings')
            .update(updateData)
            .eq('id', bookingId));
          break;
        case 'F&B Consulting':
          const { data: fbData } = await supabase
            .from('fb_consultation_bookings')
            .select('*')
            .eq('id', bookingId)
            .single();
          bookingData = fbData;
          
          ({ error } = await supabase
            .from('fb_consultation_bookings')
            .update(updateData)
            .eq('id', bookingId));
          break;
        case 'Extra Services':
          const { data: extraData } = await supabase
            .from('extra_service_bookings')
            .select('*')
            .eq('id', parseInt(bookingId))
            .single();
          bookingData = extraData;
          
          ({ error } = await supabase
            .from('extra_service_bookings')
            .update(updateData)
            .eq('id', parseInt(bookingId)));
          break;
        default:
          const { data: consultData } = await supabase
            .from('consultation_bookings')
            .select('*')
            .eq('id', bookingId)
            .single();
          bookingData = consultData;
          
          ({ error } = await supabase
            .from('consultation_bookings')
            .update(updateData)
            .eq('id', bookingId));
      }

      if (error) throw error;

      // Send approval email when booking is confirmed
      if (status === 'confirmed' && bookingData && bookingData.email) {
        try {
          let serviceNames: string[] = [];
          
          // Fetch all services from database to map IDs to names
          const { data: allServices } = await supabase
            .from('services')
            .select('id, name');
          
          const servicesMap = (allServices || []).reduce((acc: any, service) => {
            acc[service.id] = service.name;
            return acc;
          }, {});
          
          // Parse services based on booking type and convert IDs to names
          if (bookingType === 'Study Abroad' && bookingData.service) {
            // Study abroad has service object
            if (typeof bookingData.service === 'object' && bookingData.service.name) {
              serviceNames = [bookingData.service.name];
            } else if (typeof bookingData.service === 'string') {
              serviceNames = [servicesMap[bookingData.service] || bookingData.service];
            }
          } else if (bookingData.services) {
            // Handle services array (could be IDs or objects)
            let serviceIds: string[] = [];
            
            if (typeof bookingData.services === 'string') {
              try {
                const parsed = JSON.parse(bookingData.services);
                serviceIds = Array.isArray(parsed) ? parsed : [parsed];
              } catch {
                serviceIds = [bookingData.services];
              }
            } else if (Array.isArray(bookingData.services)) {
              serviceIds = bookingData.services.map((s: any) => {
                // If service is an object with name, extract name directly
                if (typeof s === 'object' && s && s.name) {
                  return s.name; // Already a name
                }
                return s; // ID to be mapped
              });
            }
            
            // Convert IDs to names
            serviceNames = serviceIds.map(id => {
              // If already a name (not a UUID), return as is
              if (typeof id === 'string' && !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
                return id;
              }
              return servicesMap[id] || id;
            });
          }
          
          // Fallback if no services found
          if (serviceNames.length === 0) {
            serviceNames = ['Consultation Service'];
          }

          await supabase.functions.invoke('send-booking-approval', {
            body: {
              bookingId: bookingId,
              bookingType: bookingType,
              name: bookingData.full_name,
              email: bookingData.email,
              services: serviceNames,
              totalPrice: bookingData.total_price || 0,
              preferredDate: bookingData.preferred_date,
              preferredTime: bookingData.preferred_time
            }
          });
        } catch (emailError) {
          console.error('Error sending approval email:', emailError);
          // Don't fail the whole operation if email fails
        }
      }

      const statusMessage = status === 'confirmed' 
        ? 'Booking confirmed and marked as paid. Approval email sent!' 
        : `Booking ${status} successfully`;
        
      toast.success(statusMessage);
      
      // Trigger dashboard update
      window.dispatchEvent(new CustomEvent('bookingUpdated'));
      
      return true;
    } catch (error) {
      console.error('Error updating consultation:', error);
      toast.error('Failed to update booking status');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultation = async (bookingId: string, bookingType: string) => {
    setLoading(true);
    try {
      let error = null;

      switch (bookingType) {
        case 'Study Abroad':
          ({ error } = await supabase
            .from('study_abroad_bookings')
            .delete()
            .eq('id', bookingId));
          break;
        case 'F&B Consulting':
          ({ error } = await supabase
            .from('fb_consultation_bookings')
            .delete()
            .eq('id', bookingId));
          break;
        case 'Extra Services':
          ({ error } = await supabase
            .from('extra_service_bookings')
            .delete()
            .eq('id', parseInt(bookingId)));
          break;
        default:
          ({ error } = await supabase
            .from('consultation_bookings')
            .delete()
            .eq('id', bookingId));
      }

      if (error) throw error;

      toast.success('Booking deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting consultation:', error);
      toast.error('Failed to delete booking');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateConsultationStatus,
    deleteConsultation,
    loading
  };
};