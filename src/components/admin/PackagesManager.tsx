import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit, RefreshCw, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DisplayPackage {
  id: string;
  name: string;
  description: string;
  category: string;
  original_price: number;
  discounted_price: number;
  currency: string;
  services: string[];
  is_popular: boolean;
  is_active: boolean;
  discount_percentage: number;
  is_auto_generated: boolean;
}

const PackagesManager = () => {
  const [packages, setPackages] = useState<DisplayPackage[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    discount_percentage: 29,
    currency: "USD",
    is_popular: false,
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
    fetchPackages();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        return;
      }

      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error('Error fetching packages:', error);
        return;
      }

      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const generateAutoPackages = () => {
    if (services.length === 0) return;

    const studyAbroadServices = services.filter(s => s.category === 'study-abroad');
    const fbServices = services.filter(s => s.category === 'fb-consulting');
    
    const studyAbroadTotal = studyAbroadServices.reduce((sum, service) => sum + Number(service.price), 0);
    const fbTotal = fbServices.reduce((sum, service) => sum + Number(service.price), 0);
    
    const autoPackages: DisplayPackage[] = [];
    
    // Check if we already have stored configurations for these packages
    const existingStudyPackage = packages.find(p => p.category === 'study-abroad' && p.is_auto_generated);
    const existingFbPackage = packages.find(p => p.category === 'fb-consulting' && p.is_auto_generated);
    
    if (studyAbroadTotal > 0) {
      const discountPercentage = existingStudyPackage?.discount_percentage || 29;
      const discountedPrice = Math.round(studyAbroadTotal * (1 - discountPercentage / 100));
      
      autoPackages.push({
        id: existingStudyPackage?.id || 'study-abroad-package',
        name: existingStudyPackage?.name || 'Complete Korean Study Package',
        description: existingStudyPackage?.description || 'Complete package for studying in Korea with all essential services',
        category: 'study-abroad',
        original_price: studyAbroadTotal,
        discounted_price: discountedPrice,
        services: studyAbroadServices.map(s => s.name),
        currency: existingStudyPackage?.currency || 'USD',
        discount_percentage: discountPercentage,
        is_popular: existingStudyPackage?.is_popular ?? true,
        is_active: existingStudyPackage?.is_active ?? true,
        is_auto_generated: true,
      });
    }
    
    if (fbTotal > 0) {
      const discountPercentage = existingFbPackage?.discount_percentage || 25;
      const discountedPrice = Math.round(fbTotal * (1 - discountPercentage / 100));
      
      autoPackages.push({
        id: existingFbPackage?.id || 'fb-package',
        name: existingFbPackage?.name || 'Complete F&B Package',
        description: existingFbPackage?.description || 'Complete F&B market entry package for Korean market',
        category: 'fb-consulting',
        original_price: fbTotal,
        discounted_price: discountedPrice,
        services: fbServices.map(s => s.name),
        currency: existingFbPackage?.currency || 'USD',
        discount_percentage: discountPercentage,
        is_popular: existingFbPackage?.is_popular ?? false,
        is_active: existingFbPackage?.is_active ?? true,
        is_auto_generated: true,
      });
    }
    
    // Merge auto packages with existing non-auto packages
    const nonAutoPackages = packages.filter(p => !p.is_auto_generated);
    setPackages([...autoPackages, ...nonAutoPackages]);
  };

  useEffect(() => {
    if (services.length > 0) {
      generateAutoPackages();
    }
  }, [services]);

  const handleEdit = (pkg: DisplayPackage) => {
    setEditingId(pkg.id);
    setEditForm({
      name: pkg.name,
      description: pkg.description,
      discount_percentage: pkg.discount_percentage,
      currency: pkg.currency,
      is_popular: pkg.is_popular,
      is_active: pkg.is_active,
    });
  };

  const handleSave = async (pkg: DisplayPackage) => {
    if (!editForm.name || editForm.discount_percentage === undefined) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    // Calculate new prices based on current services
    const categoryServices = services.filter(s => s.category === pkg.category);
    const originalPrice = categoryServices.reduce((sum, service) => sum + Number(service.price), 0);
    const discountedPrice = Math.round(originalPrice * (1 - editForm.discount_percentage / 100));
    
    const packageData = {
      id: pkg.id,
      name: editForm.name,
      description: editForm.description,
      category: pkg.category,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      currency: editForm.currency,
      services: pkg.services,
      is_popular: editForm.is_popular,
      is_active: editForm.is_active,
      discount_percentage: editForm.discount_percentage,
      is_auto_generated: true,
    };

    const { error } = await supabase
      .from("packages")
      .upsert(packageData, { onConflict: 'id' });

    if (error) {
      toast.error("Failed to save package configuration");
      console.error('Save error:', error);
    } else {
      toast.success("Package configuration saved successfully");
      setEditingId(null);
      setEditForm({
        name: "",
        description: "",
        discount_percentage: 29,
        currency: "USD",
        is_popular: false,
        is_active: true,
      });
      await fetchPackages();
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      description: "",
      discount_percentage: 29,
      currency: "USD",
      is_popular: false,
      is_active: true,
    });
  };

  const refreshPackages = async () => {
    setLoading(true);
    await fetchServices();
    await fetchPackages();
    toast.success("Packages refreshed with latest service pricing!");
    setLoading(false);
  };

  const calculateDiscount = (original: number, discounted: number) => {
    if (original <= 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  // Separate auto-generated and custom packages
  const autoPackages = packages.filter(p => p.is_auto_generated);
  const customPackages = packages.filter(p => !p.is_auto_generated);

  if (loading && packages.length === 0) {
    return <div className="text-center py-8">Loading packages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Package Management</h2>
        <Button onClick={refreshPackages} variant="outline" disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Packages
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Auto-Generated Packages</h3>
          <span className="text-sm text-muted-foreground">(Editable with automatic pricing based on services)</span>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {autoPackages.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No services found. Add services to generate packages automatically.</p>
              </CardContent>
            </Card>
          ) : (
            autoPackages.map((pkg) => (
              <Card key={pkg.id} className="relative">
                {pkg.is_popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {editingId === pkg.id ? (
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="text-lg font-semibold"
                          placeholder="Package name"
                        />
                      ) : (
                        <CardTitle>{pkg.name}</CardTitle>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{pkg.category}</Badge>
                        {!pkg.is_active && <Badge variant="destructive">Inactive</Badge>}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {editingId === pkg.id ? (
                        <>
                          <Button size="sm" onClick={() => handleSave(pkg)} disabled={loading}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {editingId === pkg.id ? (
                    <Textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Package description"
                      rows={2}
                    />
                  ) : (
                    <CardDescription>{pkg.description}</CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {editingId === pkg.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Discount %</label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={editForm.discount_percentage}
                              onChange={(e) => setEditForm(prev => ({ ...prev, discount_percentage: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Currency</label>
                            <select
                              value={editForm.currency}
                              onChange={(e) => setEditForm(prev => ({ ...prev, currency: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="USD">USD</option>
                              <option value="RWF">RWF</option>
                              <option value="EUR">EUR</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={editForm.is_popular}
                              onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, is_popular: checked }))}
                            />
                            <label className="text-sm font-medium">Popular Package</label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={editForm.is_active}
                              onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, is_active: checked }))}
                            />
                            <label className="text-sm font-medium">Active</label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">
                            {pkg.currency} {pkg.discounted_price}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {pkg.currency} {pkg.original_price}
                          </span>
                          <Badge variant="outline" className="text-green-600">
                            {calculateDiscount(pkg.original_price, pkg.discounted_price)}% OFF
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Services Included:</h4>
                          <div className="flex flex-wrap gap-2">
                            {pkg.services.map((service: string, index: number) => (
                              <Badge key={index} variant="outline">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagesManager;