import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Package, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Package {
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
  created_at: string;
}

const PackagesManager = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [newService, setNewService] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "study-abroad",
    original_price: "",
    discounted_price: "",
    currency: "USD",
    services: [] as string[],
    is_popular: false,
    is_active: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch packages");
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const packageData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      original_price: parseFloat(formData.original_price),
      discounted_price: parseFloat(formData.discounted_price),
      currency: formData.currency,
      services: formData.services,
      is_popular: formData.is_popular,
      is_active: formData.is_active,
    };

    let result;
    if (editingPackage) {
      result = await supabase
        .from("packages")
        .update(packageData)
        .eq("id", editingPackage.id);
    } else {
      result = await supabase.from("packages").insert([packageData]);
    }

    if (result.error) {
      toast.error("Failed to save package");
    } else {
      toast.success(`Package ${editingPackage ? "updated" : "created"} successfully`);
      resetForm();
      fetchPackages();
    }
    setLoading(false);
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description || "",
      category: pkg.category,
      original_price: pkg.original_price.toString(),
      discounted_price: pkg.discounted_price.toString(),
      currency: pkg.currency,
      services: pkg.services,
      is_popular: pkg.is_popular,
      is_active: pkg.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete package");
    } else {
      toast.success("Package deleted successfully");
      fetchPackages();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "study-abroad",
      original_price: "",
      discounted_price: "",
      currency: "USD",
      services: [],
      is_popular: false,
      is_active: true,
    });
    setEditingPackage(null);
    setShowForm(false);
    setNewService("");
  };

  const addService = () => {
    if (newService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const calculateDiscount = () => {
    if (formData.original_price && formData.discounted_price) {
      const original = parseFloat(formData.original_price);
      const discounted = parseFloat(formData.discounted_price);
      return Math.round(((original - discounted) / original) * 100);
    }
    return 0;
  };

  if (loading && packages.length === 0) {
    return <div className="p-6">Loading packages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Package Management</h2>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Package
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPackage ? "Edit Package" : "Add New Package"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Package Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter package name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study-abroad">Study Abroad</SelectItem>
                      <SelectItem value="fb-consulting">F&B Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Original Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Discounted Price 
                    {calculateDiscount() > 0 && (
                      <span className="text-green-600 ml-2">({calculateDiscount()}% OFF)</span>
                    )}
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.discounted_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, discounted_price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="RWF">RWF</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Package description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Services Included</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Add a service"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                  />
                  <Button type="button" onClick={addService} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.is_popular}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: checked }))}
                  />
                  <label className="text-sm font-medium">Popular Package</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <label className="text-sm font-medium">Active</label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editingPackage ? "Update Package" : "Create Package"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {packages.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No packages found. Create your first package!</p>
            </CardContent>
          </Card>
        ) : (
          packages.map((pkg) => (
            <Card key={pkg.id} className={!pkg.is_active ? "opacity-50" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {pkg.name}
                      {pkg.is_popular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={pkg.category === "study-abroad" ? "default" : "secondary"}>
                        {pkg.category === "study-abroad" ? "Study Abroad" : "F&B Consulting"}
                      </Badge>
                      {!pkg.is_active && <Badge variant="destructive">Inactive</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(pkg.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pkg.description && (
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-green-600">
                      {pkg.currency} {pkg.discounted_price}
                    </div>
                    {pkg.original_price !== pkg.discounted_price && (
                      <div className="text-lg text-gray-400 line-through">
                        {pkg.currency} {pkg.original_price}
                      </div>
                    )}
                    {pkg.original_price !== pkg.discounted_price && (
                      <Badge variant="secondary">
                        {Math.round(((pkg.original_price - pkg.discounted_price) / pkg.original_price) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Services Included:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PackagesManager;