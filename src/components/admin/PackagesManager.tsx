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

interface PackageConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  discount_percentage: number;
  currency: string;
  is_popular: boolean;
  is_active: boolean;
  is_auto_generated: boolean;
}

interface DisplayPackage extends PackageConfig {
  original_price: number;
  discounted_price: number;
  services: string[];
}

const PackagesManager = () => {
  const [packages, setPackages] = useState<DisplayPackage[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PackageConfig>>({});

  useEffect(() => {
    fetchServices();
    fetchPackageConfigs();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      generatePackages();
    }
  }, [services]);

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

  const fetchPackageConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq('is_auto_generated', true);

      if (!error && data) {
        // Store existing configs for merging
        window.packageConfigs = data;
      }
    } catch (error) {
      console.error('Error fetching package configs:', error);
    }
  };

  const generatePackages = async () => {
    try {
      const studyAbroadServices = services.filter(s => s.category === 'study-abroad');
      const fbServices = services.filter(s => s.category === 'fb-consulting');
      
      const studyAbroadTotal = studyAbroadServices.reduce((sum, service) => sum + Number(service.price), 0);
      const fbTotal = fbServices.reduce((sum, service) => sum + Number(service.price), 0);
      
      const generatedPackages: DisplayPackage[] = [];
      const existingConfigs = (window as any).packageConfigs || [];
      
      if (studyAbroadTotal > 0) {
        const existingConfig = existingConfigs.find((c: any) => c.category === 'study-abroad');
        const discountPercentage = existingConfig?.discount_percentage || 29;
        
        generatedPackages.push({
          id: 'study-abroad-package',
          name: existingConfig?.name || 'Complete Korean Study Package',
          description: existingConfig?.description || 'Complete package for studying in Korea with all essential services',
          category: 'study-abroad',
          original_price: studyAbroadTotal,
          discounted_price: Math.round(studyAbroadTotal * (1 - discountPercentage / 100)),
          services: studyAbroadServices.map(s => s.name),
          currency: existingConfig?.currency || 'USD',
          discount_percentage: discountPercentage,
          is_popular: existingConfig?.is_popular ?? true,
          is_active: existingConfig?.is_active ?? true,
          is_auto_generated: true,
        });
      }
      
      if (fbTotal > 0) {
        const existingConfig = existingConfigs.find((c: any) => c.category === 'fb-consulting');
        const discountPercentage = existingConfig?.discount_percentage || 25;
        
        generatedPackages.push({
          id: 'fb-package',
          name: existingConfig?.name || 'Complete F&B Package',
          description: existingConfig?.description || 'Complete F&B market entry package for Korean market',
          category: 'fb-consulting',
          original_price: fbTotal,
          discounted_price: Math.round(fbTotal * (1 - discountPercentage / 100)),
          services: fbServices.map(s => s.name),
          currency: existingConfig?.currency || 'USD',
          discount_percentage: discountPercentage,
          is_popular: existingConfig?.is_popular ?? false,
          is_active: existingConfig?.is_active ?? true,
          is_auto_generated: true,
        });
      }
      
      setPackages(generatedPackages);
    } catch (error) {
      console.error('Error generating packages:', error);
    }
  };

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
    
    const packageData = {
      id: pkg.id,
      name: editForm.name,
      description: editForm.description || '',
      category: pkg.category,
      discount_percentage: editForm.discount_percentage,
      currency: editForm.currency || 'USD',
      is_popular: editForm.is_popular || false,
      is_active: editForm.is_active ?? true,
      is_auto_generated: true,
    };

    const { error } = await supabase
      .from("packages")
      .upsert(packageData, { onConflict: 'id' });

    if (error) {
      toast.error("Failed to save package configuration");
    } else {
      toast.success("Package configuration saved successfully");
      setEditingId(null);
      setEditForm({});
      await fetchPackageConfigs();
      await generatePackages();
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const refreshPackages = async () => {
    setLoading(true);
    await fetchServices();
    await fetchPackageConfigs();
    toast.success("Packages refreshed with latest service pricing!");
    setLoading(false);
  };

  const calculateDiscount = (original: number, discounted: number) => {
    if (original <= 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

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
          <span className="text-sm text-muted-foreground">(Editable configurations with automatic pricing)</span>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
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
                        value={editForm.name || ''}
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
                    value={editForm.description || ''}
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
                            value={editForm.discount_percentage || 0}
                            onChange={(e) => setEditForm(prev => ({ ...prev, discount_percentage: parseInt(e.target.value) || 0 }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Currency</label>
                          <select
                            value={editForm.currency || 'USD'}
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
                            checked={editForm.is_popular || false}
                            onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, is_popular: checked }))}
                          />
                          <label className="text-sm font-medium">Popular Package</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editForm.is_active ?? true}
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
          ))}
        </div>
        
        {packages.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No services found. Add services to generate packages automatically.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PackagesManager;