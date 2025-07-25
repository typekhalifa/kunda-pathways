import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useConsultationActions } from '@/hooks/useConsultationActions';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  DollarSign,
  Eye,
  Check,
  X,
  Filter,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ConsultationsManager = () => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const { updateConsultationStatus, deleteConsultation, loading: actionLoading } = useConsultationActions();

  useEffect(() => {
    const fetchAllBookings = async () => {
      console.log('🔄 Starting to fetch bookings...');
      try {
        const [studyRes, fbRes, extraRes] = await Promise.all([
          supabase.from('study_abroad_bookings').select('*'),
          supabase.from('fb_consultation_bookings').select('*'),
          supabase.from('extra_service_bookings').select('*'),
        ]);

        if (studyRes.error) {
          console.error('❌ Study Abroad Fetch Error:', studyRes.error);
        } else {
          console.log('✅ Study Abroad Raw Data:', studyRes.data);
        }
        
        if (fbRes.error) {
          console.error('❌ FB Consulting Fetch Error:', fbRes.error);
        } else {
          console.log('✅ FB Raw Data:', fbRes.data);
        }
        
        if (extraRes.error) {
          console.error('❌ Extra Services Fetch Error:', extraRes.error);
        } else {
          console.log('✅ Extra Raw Data:', extraRes.data);
        }

        const studyBookings = (studyRes.data || []).map((b) => ({
          ...b,
          service_type: typeof b.service === 'string' ? b.service : JSON.stringify(b.service),
          booking_type: 'Study Abroad',
        }));
        console.log('📚 Processed Study Bookings:', studyBookings);

        const fbBookings = (fbRes.data || []).map((b) => ({
          ...b,
          service_type: typeof b.services === 'string' ? b.services : JSON.stringify(b.services),
          company_name: b.company || '',
          booking_type: 'F&B Consulting',
        }));
        console.log('🍽️ Processed FB Bookings:', fbBookings);

        const extraBookings = (extraRes.data || []).map((b) => ({
          ...b,
          service_type: typeof b.services === 'string' ? b.services : JSON.stringify(b.services),
          booking_type: 'Extra Services',
        }));
        console.log('🔧 Processed Extra Bookings:', extraBookings);

        const all = [...studyBookings, ...fbBookings, ...extraBookings];
        console.log('📋 All Combined Bookings:', all);

        const sorted = all.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        console.log('📊 Final Sorted Consultations:', sorted);

        setConsultations(sorted);
      } catch (err) {
        console.error('🚨 Unexpected Error:', err);
      }
    };

    fetchAllBookings();
  }, []);

  const handleStatusUpdate = async (consultation: any, status: 'confirmed' | 'cancelled') => {
    const success = await updateConsultationStatus(
      consultation.id,
      consultation.booking_type,
      status
    );
    
    if (success) {
      setConsultations(prev => 
        prev.map(c => 
          c.id === consultation.id ? { ...c, status } : c
        )
      );
    }
  };

  const handleDelete = async (consultation: any) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const success = await deleteConsultation(consultation.id, consultation.booking_type);
      
      if (success) {
        setConsultations(prev => prev.filter(c => c.id !== consultation.id));
      }
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const pendingCount = consultations.filter(c => c.status === 'pending').length;
  const totalRevenue = consultations
    .filter(c => c.payment_status === 'completed')
    .reduce((sum, c) => sum + (c.total_price || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{consultations.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Check className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {consultations.filter(c => c.status === 'confirmed').length}
                </p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-emerald-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">${totalRevenue}</p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Consultation Bookings
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </CardTitle>
          <CardDescription>
            Manage consultation booking requests and appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-lg">{consultation.full_name}</h3>
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(consultation.payment_status)}>
                          {consultation.payment_status}
                        </Badge>
                        <Badge variant="secondary">{consultation.booking_type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {consultation.email}
                          </div>
                          {consultation.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              {consultation.phone}
                            </div>
                          )}
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            ${consultation.total_price}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {consultation.preferred_date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {consultation.preferred_time}
                          </div>
                        </div>
                      </div>

                      {consultation.company_name && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Company:</strong> {consultation.company_name}
                        </p>
                      )}

                       <div className="mb-3">
                         <p className="font-medium text-sm mb-1">
                           Service: {Array.isArray(consultation.service_type) ? consultation.service_type.join(', ') : consultation.service_type}
                         </p>
                        {consultation.message && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            Message: {consultation.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {consultation.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleStatusUpdate(consultation, 'confirmed')}
                            disabled={actionLoading}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleStatusUpdate(consultation, 'cancelled')}
                            disabled={actionLoading}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDelete(consultation)}
                        disabled={actionLoading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {consultations.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No consultation bookings yet</p>
              <p className="text-sm text-muted-foreground">Booking requests will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationsManager;
