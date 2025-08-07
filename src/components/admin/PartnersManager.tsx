import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import FileUpload from './FileUpload';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  alt_text: string | null;
  display_order: number;
  is_active: boolean;
}

const PartnersManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    alt_text: '',
    display_order: 0
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error('Failed to fetch partners');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id?: string) => {
    try {
      setLoading(true);
      
      if (id) {
        // Update existing partner
        const { error } = await supabase
          .from('partners')
          .update({
            name: formData.name,
            logo_url: formData.logo_url || null,
            alt_text: formData.alt_text || null,
            display_order: formData.display_order
          })
          .eq('id', id);

        if (error) throw error;
        toast.success('Partner updated successfully');
      } else {
        // Create new partner
        const { error } = await supabase
          .from('partners')
          .insert({
            name: formData.name,
            logo_url: formData.logo_url || null,
            alt_text: formData.alt_text || null,
            display_order: formData.display_order
          });

        if (error) throw error;
        toast.success('Partner added successfully');
        setShowAddForm(false);
      }

      setEditingId(null);
      setFormData({ name: '', logo_url: '', alt_text: '', display_order: 0 });
      await fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      toast.error('Failed to save partner');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url || '',
      alt_text: partner.alt_text || '',
      display_order: partner.display_order
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Partner deleted successfully');
      await fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error('Failed to delete partner');
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Partner ${!isActive ? 'activated' : 'deactivated'}`);
      await fetchPartners();
    } catch (error) {
      console.error('Error toggling partner status:', error);
      toast.error('Failed to update partner status');
    }
  };

  if (loading && partners.length === 0) {
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
          <h2 className="text-2xl font-bold">Partners Management</h2>
          <p className="text-muted-foreground">Manage university and organization partners</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Partner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Partner Name</Label>
                <Input
                  id="new-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter partner name"
                />
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
              <FileUpload
                label="Partner Logo"
                currentUrl={formData.logo_url}
                onUpload={(url) => setFormData({ ...formData, logo_url: url })}
                accept="image/*"
                folder="partners"
              />
            </div>
            <div>
              <Label htmlFor="new-alt">Alt Text</Label>
              <Input
                id="new-alt"
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                placeholder="Alt text for accessibility"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave()} disabled={loading || !formData.name}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Partner
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: '', logo_url: '', alt_text: '', display_order: 0 });
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
        {partners.map((partner) => (
          <Card key={partner.id} className={`${!partner.is_active ? 'opacity-50' : ''}`}>
            <CardContent className="p-6">
              {editingId === partner.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Partner Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter partner name"
                      />
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
                    <FileUpload
                      label="Partner Logo"
                      currentUrl={formData.logo_url}
                      onUpload={(url) => setFormData({ ...formData, logo_url: url })}
                      accept="image/*"
                      folder="partners"
                    />
                  </div>
                  <div>
                    <Label>Alt Text</Label>
                    <Input
                      value={formData.alt_text}
                      onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                      placeholder="Alt text for accessibility"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(partner.id)} disabled={loading || !formData.name}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', logo_url: '', alt_text: '', display_order: 0 });
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {partner.logo_url ? (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.alt_text || partner.name}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">Order: {partner.display_order}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(partner.id, partner.is_active)}
                    >
                      {partner.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(partner)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(partner.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PartnersManager;