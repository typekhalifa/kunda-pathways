import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, ExternalLink, Upload } from "lucide-react";
import { format } from "date-fns";
import FileUpload from "./FileUpload";

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
  education_levels: string[];
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Education levels data
  const educationLevels = [
    'undergraduate',
    'graduate',
    'postgraduate',
    'doctorate'
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    amount: '',
    currency: 'USD',
    deadline: '',
    eligibility_criteria: '',
    application_process: '',
    provider: '',
    country: '',
    field_of_study: '',
    education_levels: ['undergraduate'],
    image_url: '',
    external_link: '',
    is_featured: false
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.education_levels.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one education level",
        variant: "destructive",
      });
      return;
    }

    try {
      const scholarshipData = {
        ...formData,
        display_order: scholarships.length + 1
      };

      if (editingId) {
        const { error } = await supabase
          .from('scholarships')
          .update(scholarshipData)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: "Success", description: "Scholarship updated successfully" });
      } else {
        const { error } = await supabase
          .from('scholarships')
          .insert(scholarshipData);
        if (error) throw error;
        toast({ title: "Success", description: "Scholarship created successfully" });
      }

      fetchScholarships();
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save scholarship",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (scholarship: Scholarship) => {
      setFormData({
        title: scholarship.title,
        description: scholarship.description,
        requirements: scholarship.requirements,
        amount: scholarship.amount,
        currency: scholarship.currency,
        deadline: scholarship.deadline,
        eligibility_criteria: scholarship.eligibility_criteria,
        application_process: scholarship.application_process || '',
        provider: scholarship.provider,
        country: scholarship.country || '',
        field_of_study: scholarship.field_of_study || '',
        education_levels: scholarship.education_levels || ['undergraduate'],
        image_url: scholarship.image_url || '',
        external_link: scholarship.external_link || '',
        is_featured: scholarship.is_featured
      });
      setEditingId(scholarship.id);
      setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      amount: '',
      currency: 'USD',
      deadline: '',
      eligibility_criteria: '',
      application_process: '',
      provider: '',
      country: '',
      field_of_study: '',
      education_levels: ['undergraduate'],
      image_url: '',
      external_link: '',
      is_featured: false
    });
    setEditingId(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEducationLevelToggle = (level: string) => {
    setFormData(prev => ({
      ...prev,
      education_levels: prev.education_levels.includes(level)
        ? prev.education_levels.filter(l => l !== level)
        : [...prev.education_levels, level]
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scholarships')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Scholarship deleted successfully" });
      fetchScholarships();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete scholarship",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('scholarships')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast({ 
        title: "Success", 
        description: `Scholarship ${!currentStatus ? 'activated' : 'deactivated'} successfully` 
      });
      fetchScholarships();
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
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Scholarship
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Scholarship' : 'Add New Scholarship'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Provider *</Label>
                  <Input
                    id="provider"
                    value={formData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="e.g., $5,000 or Full Tuition"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="KRW">KRW</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field_of_study">Field of Study</Label>
                  <Input
                    id="field_of_study"
                    value={formData.field_of_study}
                    onChange={(e) => handleInputChange('field_of_study', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="external_link">External Link</Label>
                  <Input
                    id="external_link"
                    type="url"
                    value={formData.external_link}
                    onChange={(e) => handleInputChange('external_link', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education_levels">Education Levels</Label>
                <div className="flex flex-wrap gap-2">
                  {educationLevels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`education_${level}`}
                        checked={formData.education_levels.includes(level)}
                        onCheckedChange={() => handleEducationLevelToggle(level)}
                      />
                      <Label htmlFor={`education_${level}`} className="text-sm">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eligibility_criteria">Eligibility Criteria *</Label>
                <Textarea
                  id="eligibility_criteria"
                  value={formData.eligibility_criteria}
                  onChange={(e) => handleInputChange('eligibility_criteria', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="application_process">Application Process</Label>
                <Textarea
                  id="application_process"
                  value={formData.application_process}
                  onChange={(e) => handleInputChange('application_process', e.target.value)}
                  rows={3}
                />
              </div>

              <FileUpload
                label="Scholarship Image"
                currentUrl={formData.image_url}
                onUpload={(url) => handleInputChange('image_url', url)}
                accept="image/*"
                folder="scholarships"
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? 'Update' : 'Create'} Scholarship
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scholarships Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Scholarships</CardTitle>
          <CardDescription>
            Manage and monitor your scholarship listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Field of Study</TableHead>
                <TableHead>Education Levels</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {scholarship.is_featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <span className="font-medium">{scholarship.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{scholarship.provider}</TableCell>
                  <TableCell>{scholarship.amount} {scholarship.currency}</TableCell>
                  <TableCell>
                    {format(new Date(scholarship.deadline), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{scholarship.field_of_study || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.education_levels?.map((level: string) => (
                        <Badge key={level} variant="outline" className="text-xs">
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={scholarship.is_active}
                        onCheckedChange={() => toggleStatus(scholarship.id, scholarship.is_active)}
                      />
                      <span className="text-sm">
                        {scholarship.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(scholarship)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the scholarship. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(scholarship.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScholarshipsManager;