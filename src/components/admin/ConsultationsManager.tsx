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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ConsultationsManager = () => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
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
          service_type: typeof b.service === 'string' ? b.service : 
            (Array.isArray(b.service) ? b.service.join(', ') : 
             (b.service && typeof b.service === 'object' ? Object.values(b.service).join(', ') : 'N/A')),
          booking_type: 'Study Abroad',
        }));
        console.log('📚 Processed Study Bookings:', studyBookings);

        const fbBookings = (fbRes.data || []).map((b) => ({
          ...b,
          service_type: typeof b.services === 'string' ? b.services : 
            (Array.isArray(b.services) ? b.services.join(', ') : 
             (b.services && typeof b.services === 'object' ? Object.values(b.services).join(', ') : 'N/A')),
          company_name: b.company || '',
          booking_type: 'F&B Consulting',
        }));
        console.log('🍽️ Processed FB Bookings:', fbBookings);

        const extraBookings = (extraRes.data || []).map((b) => ({
          ...b,
          service_type: typeof b.services === 'string' ? b.services : 
            (Array.isArray(b.services) ? b.services.join(', ') : 
             (b.services && typeof b.services === 'object' ? Object.values(b.services).join(', ') : 'N/A')),
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
        setFilteredConsultations(sorted);
      } catch (err) {
        console.error('🚨 Unexpected Error:', err);
      }
    };

    fetchAllBookings();
  }, []);

  // Filter consultations when filters change
  useEffect(() => {
    let filtered = consultations;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status === filterStatus);
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.booking_type === filterType);
    }
    
    setFilteredConsultations(filtered);
  }, [consultations, filterStatus, filterType]);

  const handleStatusUpdate = async (consultation: any, status: 'confirmed' | 'cancelled') => {
    const success = await updateConsultationStatus(
      consultation.id,
      consultation.booking_type,
      status
    );
    
      if (success) {
        setConsultations(prev => 
          prev.map(c => 
            c.id === consultation.id ? { 
              ...c, 
              status,
              payment_status: status === 'confirmed' ? 'paid' : c.payment_status
            } : c
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
    .filter(c => c.payment_status === 'completed' || c.payment_status === 'paid')
    .reduce((sum, c) => sum + (parseFloat(c.total_price) || 0), 0);

  const handleViewDetails = (consultation: any) => {
    setSelectedConsultation(consultation);
    setViewDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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

        <Card className="border-l-4 border-l-yellow-500 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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

        <Card className="border-l-4 border-l-green-500 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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

        <Card className="border-l-4 border-l-emerald-500 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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

      <Card className="rounded-3xl border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Consultation Bookings
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Study Abroad">Study Abroad</SelectItem>
                  <SelectItem value="F&B Consulting">F&B Consulting</SelectItem>
                  <SelectItem value="Extra Services">Extra Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardDescription>
            Manage consultation booking requests and appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <Card key={consultation.id} className="rounded-2xl border hover:border-primary/20 transition-all duration-300">
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
                           Service: {(() => {
                             const serviceText = Array.isArray(consultation.service_type) ? consultation.service_type.join(', ') : consultation.service_type;
                             // Extract only the service name, removing IDs and extra numbers
                             return serviceText.split(',').map(s => s.trim()).filter(s => !s.match(/^[a-f0-9-]+$/)).filter(s => isNaN(Number(s))).join(', ') || 'N/A';
                           })()}
                         </p>
                        {consultation.message && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            Message: {consultation.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(consultation)}
                      >
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

          {filteredConsultations.length === 0 && consultations.length > 0 && (
            <div className="text-center py-8">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No consultations match your filters</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filter criteria</p>
            </div>
          )}

          {consultations.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No consultation bookings yet</p>
              <p className="text-sm text-muted-foreground">Booking requests will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700">
          <DialogHeader className="pb-6 border-b border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Consultation Details
                </DialogTitle>
                <DialogDescription className="text-base mt-1 text-slate-600 dark:text-slate-300">
                  Complete information for this consultation booking
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedConsultation && (
            <div className="space-y-8 py-6">
              {/* Header with Key Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Date</p>
                        <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                          {selectedConsultation.preferred_date ? 
                            new Date(selectedConsultation.preferred_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Time</p>
                        <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                          {selectedConsultation.preferred_time || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Price</p>
                        <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                          ${selectedConsultation.total_price || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(selectedConsultation.status)}>
                        {selectedConsultation.status}
                      </Badge>
                      <div className="ml-2">
                        <Badge className={getPaymentStatusColor(selectedConsultation.payment_status)}>
                          {selectedConsultation.payment_status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Information */}
                <Card className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-slate-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      Client Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                        <div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-medium">Full Name</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{selectedConsultation.full_name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-800">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-sm"></div>
                        <div>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wide font-medium">Email Address</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-100 break-all">{selectedConsultation.email}</p>
                        </div>
                      </div>
                      
                      {selectedConsultation.phone && (
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-slate-50 dark:from-purple-900/20 dark:to-slate-800 rounded-xl border border-purple-200 dark:border-purple-800">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-sm"></div>
                          <div>
                            <p className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide font-medium">Phone Number</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{selectedConsultation.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedConsultation.company_name && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Company</p>
                            <p className="font-semibold">{selectedConsultation.company_name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Details */}
                <Card className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-slate-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      Booking Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                        <div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-medium">Service Type</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{selectedConsultation.booking_type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-800">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-sm"></div>
                        <div>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wide font-medium">Created Date</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {new Date(selectedConsultation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Service Details */}
              <Card className="rounded-xl border border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium leading-relaxed">
                      {selectedConsultation.service_type}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Message Section */}
              {selectedConsultation.message && (
                <Card className="rounded-xl border border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      Additional Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <p className="text-sm leading-relaxed italic">
                        "{selectedConsultation.message}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              {selectedConsultation.status === 'pending' && (
                <div className="flex gap-3 pt-6 border-t border-border/50">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      handleStatusUpdate(selectedConsultation, 'confirmed');
                      setViewDetailsOpen(false);
                    }}
                    disabled={actionLoading}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Confirm & Mark as Paid
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1 rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      handleStatusUpdate(selectedConsultation, 'cancelled');
                      setViewDetailsOpen(false);
                    }}
                    disabled={actionLoading}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationsManager;
