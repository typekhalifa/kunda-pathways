import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  country: string | null;
  rating: number;
  avatar_url: string | null;
  display_order: number;
  is_active: boolean;
}

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    country: '',
    rating: 5,
    avatar_url: '',
    display_order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id?: string) => {
    try {
      setLoading(true);
      
      if (id) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            role: formData.role,
            content: formData.content,
            country: formData.country || null,
            rating: formData.rating,
            avatar_url: formData.avatar_url || null,
            display_order: formData.display_order
          })
          .eq('id', id);

        if (error) throw error;
        toast.success('Testimonial updated successfully');
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert({
            name: formData.name,
            role: formData.role,
            content: formData.content,
            country: formData.country || null,
            rating: formData.rating,
            avatar_url: formData.avatar_url || null,
            display_order: formData.display_order
          });

        if (error) throw error;
        toast.success('Testimonial added successfully');
        setShowAddForm(false);
      }

      setEditingId(null);
      setFormData({ name: '', role: '', content: '', country: '', rating: 5, avatar_url: '', display_order: 0 });
      await fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Failed to save testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      country: testimonial.country || '',
      rating: testimonial.rating,
      avatar_url: testimonial.avatar_url || '',
      display_order: testimonial.display_order
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Testimonial deleted successfully');
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Testimonial ${!isActive ? 'activated' : 'deactivated'}`);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error toggling testimonial status:', error);
      toast.error('Failed to update testimonial status');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading && testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Success Stories Management</h2>
          <p className="text-muted-foreground">Manage client testimonials and success stories</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Testimonial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Client Name</Label>
                <Input
                  id="new-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <Label htmlFor="new-role">Role/Title</Label>
                <Input
                  id="new-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="University Student, Entrepreneur, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="new-country">Country</Label>
                <Input
                  id="new-country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Rwanda, Uganda, etc."
                />
              </div>
              <div>
                <Label htmlFor="new-rating">Rating</Label>
                <select
                  id="new-rating"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="new-order">Display Order</Label>
                <Input
                  id="new-order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-content">Testimonial Content</Label>
              <Textarea
                id="new-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter the testimonial content..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="new-avatar">Avatar URL (Optional)</Label>
              <Input
                id="new-avatar"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave()} disabled={loading || !formData.name || !formData.content}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Testimonial
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: '', role: '', content: '', country: '', rating: 5, avatar_url: '', display_order: 0 });
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={`${!testimonial.is_active ? 'opacity-50' : ''}`}>
            <CardContent className="p-6">
              {editingId === testimonial.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Client Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter client name"
                      />
                    </div>
                    <div>
                      <Label>Role/Title</Label>
                      <Input
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="University Student, etc."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Country</Label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Rwanda, Uganda, etc."
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded-md"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Display Order</Label>
                      <Input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Testimonial Content</Label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Enter the testimonial content..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Avatar URL</Label>
                    <Input
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(testimonial.id)} disabled={loading || !formData.name || !formData.content}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', role: '', content: '', country: '', rating: 5, avatar_url: '', display_order: 0 });
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        {testimonial.avatar_url ? (
                          <img 
                            src={testimonial.avatar_url} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-semibold">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(testimonial.rating)}
                        </div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        {testimonial.country && (
                          <p className="text-sm text-blue-600 font-medium">{testimonial.country}</p>
                        )}
                        <p className="text-sm text-muted-foreground">Order: {testimonial.display_order}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                      >
                        {testimonial.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <blockquote className="italic text-slate-600 border-l-4 border-blue-500 pl-4">
                    "{testimonial.content}"
                  </blockquote>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;