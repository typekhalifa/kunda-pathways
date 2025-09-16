import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, ExternalLink, Upload } from "lucide-react";
import { format } from "date-fns";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  requirements: string;
  amount: string;
  currency: string;
  deadline: string;
  eligibility_criteria: string;
  application_process?: string;
  provider: string;
  country?: string;
  field_of_study?: string;
  education_level: string;
  is_active: boolean;
  is_featured: boolean;
  image_url?: string;
  external_link?: string;
  display_order: number;
  created_at: string;
}

const ScholarshipsManager = () => {
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const educationLevels = [
    "undergraduate",
    "graduate",
    "masters",
    "doctoral",
    "certificate",
    "diploma",
    "postgraduate"
  ];

  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "KRW", "JPY"];

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScholarships(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load scholarships",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `scholarships/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveScholarship = async (formData: FormData) => {
    try {
      let imageUrl = editingScholarship?.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl && imageFile) return; // Failed to upload
      }

      const scholarshipData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        requirements: formData.get('requirements') as string,
        amount: formData.get('amount') as string,
        currency: formData.get('currency') as string,
        deadline: formData.get('deadline') as string,
        eligibility_criteria: formData.get('eligibility_criteria') as string,
        application_process: formData.get('application_process') as string,
        provider: formData.get('provider') as string,
        country: formData.get('country') as string,
        field_of_study: formData.get('field_of_study') as string,
        education_level: formData.get('education_level') as string,
        external_link: formData.get('external_link') as string,
        is_active: formData.get('is_active') === 'on',
        is_featured: formData.get('is_featured') === 'on',
        display_order: parseInt(formData.get('display_order') as string) || 0,
        image_url: imageUrl,
      };

      if (editingScholarship) {
        const { error } = await supabase
          .from('scholarships')
          .update(scholarshipData)
          .eq('id', editingScholarship.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Scholarship updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('scholarships')
          .insert(scholarshipData);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Scholarship created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingScholarship(null);
      setImageFile(null);
      await fetchScholarships();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save scholarship",
        variant: "destructive",
      });
    }
  };

  const handleDeleteScholarship = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scholarships')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
      });
      
      await fetchScholarships();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete scholarship",
        variant: "destructive",
      });
    }
  };

  const toggleScholarshipStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('scholarships')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      
      await fetchScholarships();
      toast({
        title: "Success",
        description: `Scholarship ${!isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update scholarship status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Scholarships Management</h2>
          <p className="text-muted-foreground">Manage available scholarships and opportunities</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingScholarship(null); setImageFile(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Scholarship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveScholarship(new FormData(e.target as HTMLFormElement));
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingScholarship?.title || ''}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider *</Label>
                  <Input
                    id="provider"
                    name="provider"
                    defaultValue={editingScholarship?.provider || ''}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    placeholder="e.g., $5,000 or Full Tuition"
                    defaultValue={editingScholarship?.amount || ''}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select name="currency" defaultValue={editingScholarship?.currency || 'USD'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    defaultValue={editingScholarship?.deadline || ''}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education_level">Education Level *</Label>
                  <Select name="education_level" defaultValue={editingScholarship?.education_level || 'undergraduate'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    defaultValue={editingScholarship?.country || ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field_of_study">Field of Study</Label>
                  <Input
                    id="field_of_study"
                    name="field_of_study"
                    defaultValue={editingScholarship?.field_of_study || ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="external_link">External Link</Label>
                  <Input
                    id="external_link"
                    name="external_link"
                    type="url"
                    defaultValue={editingScholarship?.external_link || ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    name="display_order"
                    type="number"
                    defaultValue={editingScholarship?.display_order || 0}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingScholarship?.description || ''}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  defaultValue={editingScholarship?.requirements || ''}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eligibility_criteria">Eligibility Criteria *</Label>
                <Textarea
                  id="eligibility_criteria"
                  name="eligibility_criteria"
                  rows={4}
                  defaultValue={editingScholarship?.eligibility_criteria || ''}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="application_process">Application Process</Label>
                <Textarea
                  id="application_process"
                  name="application_process"
                  rows={3}
                  defaultValue={editingScholarship?.application_process || ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Scholarship Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {uploadingImage && (
                    <div className="flex items-center">
                      <Upload className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
                {editingScholarship?.image_url && !imageFile && (
                  <div className="mt-2">
                    <img
                      src={editingScholarship.image_url}
                      alt="Current scholarship image"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    defaultChecked={editingScholarship?.is_active ?? true}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    defaultChecked={editingScholarship?.is_featured ?? false}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploadingImage}>
                  {editingScholarship ? 'Update' : 'Create'} Scholarship
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{scholarship.title}</CardTitle>
                    {scholarship.is_featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge variant={scholarship.is_active ? "default" : "secondary"}>
                      {scholarship.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {scholarship.provider} • {scholarship.amount} {scholarship.currency} • 
                    Deadline: {format(new Date(scholarship.deadline), 'MMM dd, yyyy')}
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleScholarshipStatus(scholarship.id, scholarship.is_active)}
                  >
                    {scholarship.is_active ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingScholarship(scholarship);
                      setImageFile(null);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  
                  {scholarship.external_link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(scholarship.external_link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Scholarship</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{scholarship.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteScholarship(scholarship.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Description:</strong>
                  <p className="mt-1 text-muted-foreground line-clamp-2">{scholarship.description}</p>
                </div>
                
                <div>
                  <strong>Education Level:</strong>
                  <p className="mt-1 text-muted-foreground capitalize">{scholarship.education_level}</p>
                </div>
                
                {scholarship.country && (
                  <div>
                    <strong>Country:</strong>
                    <p className="mt-1 text-muted-foreground">{scholarship.country}</p>
                  </div>
                )}
                
                {scholarship.field_of_study && (
                  <div>
                    <strong>Field of Study:</strong>
                    <p className="mt-1 text-muted-foreground">{scholarship.field_of_study}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <strong>Requirements:</strong>
                <p className="mt-1 text-muted-foreground text-sm line-clamp-3">{scholarship.requirements}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {scholarships.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No scholarships found. Add your first scholarship to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScholarshipsManager;