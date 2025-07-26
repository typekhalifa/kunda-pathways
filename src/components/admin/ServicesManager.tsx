import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Save, X, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  duration: string;
  is_active: boolean;
  created_at: string;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    category: 'study-abroad',
    duration: '',
    is_active: true,
  });

  const categories = [
    { value: 'study-abroad', label: 'Study Abroad Services', icon: '🎓', color: 'from-blue-500 to-blue-600' },
    { value: 'fb-consulting', label: 'F&B Consulting Services', icon: '🍽️', color: 'from-green-500 to-green-600' },
    { value: 'study-programs', label: 'Study Programs Services', icon: '📚', color: 'from-indigo-500 to-indigo-600' },
    { value: 'extra-services', label: 'Additional Services', icon: '⭐', color: 'from-purple-500 to-purple-600' },
  ];

  // Categorize services for better display
  const categorizeServices = () => {
    const grouped = services.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
    return grouped;
  };

  const groupedServices = categorizeServices();
  
  // Filter services for different sections
  const individualServicesData = services.filter(s => s.category === 'study-abroad' || s.category === 'extra-services');
  const generalServicesData = services.filter(s => s.category === 'fb-consulting' || s.category === 'study-programs');

  const getCategoryInfo = (categoryValue: string) => {
    return categories.find(c => c.value === categoryValue) || 
           { value: categoryValue, label: categoryValue, icon: '📦', color: 'from-gray-500 to-gray-600' };
  };

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'KRW', label: 'KRW (₩)' },
    { value: 'RWF', label: 'RWF' },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast.error('Failed to load services: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
        toast.success('Service updated successfully!');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) throw error;
        toast.success('Service added successfully!');
      }

      resetForm();
      fetchServices();
    } catch (error: any) {
      toast.error('Failed to save service: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      currency: service.currency,
      category: service.category,
      duration: service.duration,
      is_active: service.is_active,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Service deleted successfully!');
      fetchServices();
    } catch (error: any) {
      toast.error('Failed to delete service: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'USD',
      category: 'study-abroad',
      duration: '',
      is_active: true,
    });
    setEditingService(null);
    setShowAddForm(false);
  };

  if (loading && services.length === 0) {
    return <div className="flex justify-center p-8">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Services Management</h2>
          <p className="text-slate-600">Manage your consultation services and pricing</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-blue-200 bg-blue-50 rounded-3xl border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {editingService ? 'Edit Service' : 'Add New Service'}
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Study Abroad Consultation"
                    className="rounded-xl border-2 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-background">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 bg-background shadow-lg z-50">
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                          className="rounded-lg hover:bg-accent focus:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the service..."
                  rows={3}
                  className="rounded-xl border-2 focus:border-primary resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.99"
                    className="rounded-xl border-2 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 bg-background shadow-lg z-50">
                      {currencies.map((currency) => (
                        <SelectItem 
                          key={currency.value} 
                          value={currency.value}
                          className="rounded-lg hover:bg-accent focus:bg-accent cursor-pointer"
                        >
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 60 minutes"
                    className="rounded-xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingService ? 'Update Service' : 'Add Service'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Individual Services Section */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4 rounded-2xl">
          <h3 className="text-2xl font-bold flex items-center">
            <span className="text-3xl mr-3">⚡</span>
            Individual Services
            <Badge variant="secondary" className="ml-3 text-slate-700">
              {individualServicesData.length} services
            </Badge>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {individualServicesData.map((service) => (
            <Card key={service.id} className="relative rounded-3xl border-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={service.is_active ? "default" : "destructive"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryInfo(service.category).label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                      className="hover:bg-blue-50 rounded-xl"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-sm">
                  {service.description}
                </CardDescription>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-lg font-semibold text-green-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {service.price} {service.currency}
                  </div>
                  {service.duration && (
                    <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                      {service.duration}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* General Services Section */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-2xl">
          <h3 className="text-2xl font-bold flex items-center">
            <span className="text-3xl mr-3">🏢</span>
            General Services
            <Badge variant="secondary" className="ml-3 text-slate-700">
              {generalServicesData.length} services
            </Badge>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generalServicesData.map((service) => (
            <Card key={service.id} className="relative rounded-3xl border-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={service.is_active ? "default" : "destructive"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryInfo(service.category).label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                      className="hover:bg-blue-50 rounded-xl"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-sm">
                  {service.description}
                </CardDescription>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-lg font-semibold text-green-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {service.price} {service.currency}
                  </div>
                  {service.duration && (
                    <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                      {service.duration}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {services.length === 0 && !loading && (
        <Card className="text-center p-8">
          <CardContent>
            <p className="text-slate-500 mb-4">No services found. Add your first service to get started!</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesManager;