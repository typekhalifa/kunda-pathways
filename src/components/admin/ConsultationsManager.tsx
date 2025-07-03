import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  DollarSign,
  Eye,
  Check,
  X,
  Filter
} from 'lucide-react';

const ConsultationsManager = () => {
  const [consultations] = useState([
    {
      id: '1',
      full_name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1 234 567 8900',
      service_type: 'University Application Consultation',
      preferred_date: '2024-01-20',
      preferred_time: '14:00',
      total_price: 150,
      status: 'pending',
      payment_status: 'pending',
      message: 'I need help with my application to Korean universities.',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      full_name: 'David Kim',
      email: 'david@example.com',
      phone: '+1 234 567 8901',
      service_type: 'Study Abroad Planning',
      preferred_date: '2024-01-18',
      preferred_time: '10:00',
      total_price: 200,
      status: 'confirmed',
      payment_status: 'completed',
      message: 'Looking for guidance on study abroad programs.',
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      full_name: 'Maria Rodriguez',
      email: 'maria@example.com',
      phone: '+1 234 567 8902',
      service_type: 'Scholarship Consultation',
      preferred_date: '2024-01-22',
      preferred_time: '16:00',
      total_price: 100,
      status: 'cancelled',
      payment_status: 'refunded',
      message: 'Need information about available scholarships.',
      created_at: '2024-01-13T09:15:00Z'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
    .reduce((sum, c) => sum + c.total_price, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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

      {/* Consultations List */}
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
              <Card key={consultation.id} className="transition-all duration-200 hover:shadow-md">
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

                      <div className="mb-3">
                        <p className="font-medium text-sm mb-1">Service: {consultation.service_type}</p>
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
                          <Button size="sm" variant="default">
                            <Check className="w-4 h-4 mr-2" />
                            Confirm
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      )}
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