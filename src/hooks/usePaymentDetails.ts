import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PaymentDetails {
  mobile_money: string;
  bank_of_kigali: string;
  equity_bank: string;
  rwf_exchange_rate: string;
}

export const usePaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    mobile_money: '+250 788 214 751',
    bank_of_kigali: '00005677XXXXXXX',
    equity_bank: '4065373xxxxxxxxxxxxx',
    rwf_exchange_rate: '1437.50'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_value')
        .eq('setting_key', 'payment_details')
        .single();

      if (error) throw error;

      if (data?.setting_value && typeof data.setting_value === 'object') {
        const value = data.setting_value as Record<string, any>;
        setPaymentDetails({
          mobile_money: value.mobile_money || '+250 788 214 751',
          bank_of_kigali: value.bank_of_kigali || '00005677XXXXXXX',
          equity_bank: value.equity_bank || '4065373xxxxxxxxxxxxx',
          rwf_exchange_rate: value.rwf_exchange_rate || '1437.50'
        });
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  };

  return { paymentDetails, loading };
};

