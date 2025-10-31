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
          let services: string[] = [];
          
          // Parse services based on booking type
          if (typeof bookingData.services === 'string') {
            try {
              services = JSON.parse(bookingData.services);
            } catch {
              services = [bookingData.services];
            }
          } else if (Array.isArray(bookingData.services)) {
            services = bookingData.services;
          } else if (bookingData.service) {
            services = [bookingData.service.name || 'Service'];
          }

          await supabase.functions.invoke('send-booking-approval', {
            body: {
              bookingId: bookingId,
              bookingType: bookingType,
              name: bookingData.full_name,
              email: bookingData.email,
              services: services,
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