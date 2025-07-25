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
      if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }

      let error = null;

      switch (bookingType) {
        case 'Study Abroad':
          ({ error } = await supabase
            .from('study_abroad_bookings')
            .update(updateData)
            .eq('id', bookingId));
          break;
        case 'F&B Consulting':
          ({ error } = await supabase
            .from('fb_consultation_bookings')
            .update(updateData)
            .eq('id', bookingId));
          break;
        case 'Extra Services':
          ({ error } = await supabase
            .from('extra_service_bookings')
            .update(updateData)
            .eq('id', parseInt(bookingId)));
          break;
        default:
          ({ error } = await supabase
            .from('consultation_bookings')
            .update(updateData)
            .eq('id', bookingId));
      }

      if (error) throw error;

      toast.success(`Booking ${status} successfully`);
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