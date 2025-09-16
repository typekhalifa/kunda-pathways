import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, GraduationCap, DollarSign, MessageCircle, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
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
  is_featured: boolean;
  image_url?: string;
  external_link?: string;
}

const Scholarships = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('display_order', { ascending: true })
        .order('deadline', { ascending: true });

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

  const handleWhatsAppClick = (scholarship: Scholarship) => {
    const phoneNumber = "+821012345678";
    const message = encodeURIComponent(
      `Hello! I would like to know more about and apply to the "${scholarship.title}" scholarship. Could you please provide more information about the application process?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    if (filter === 'all') return true;
    if (filter === 'featured') return scholarship.is_featured;
    return scholarship.education_level === filter;
  });

  const uniqueEducationLevels = [...new Set(scholarships.map(s => s.education_level))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading scholarships...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-6">
            Available Scholarships
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing scholarship opportunities to fund your education journey. Find the perfect scholarship that matches your goals and start your application today.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="mb-2"
          >
            All Scholarships
          </Button>
          <Button
            variant={filter === 'featured' ? 'default' : 'outline'}
            onClick={() => setFilter('featured')}
            className="mb-2"
          >
            Featured
          </Button>
          {uniqueEducationLevels.map(level => (
            <Button
              key={level}
              variant={filter === level ? 'default' : 'outline'}
              onClick={() => setFilter(level)}
              className="mb-2 capitalize"
            >
              {level}
            </Button>
          ))}
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">Try adjusting your filter or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="h-full flex flex-col relative group hover:shadow-lg transition-shadow duration-300">
                {scholarship.is_featured && (
                  <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    Featured
                  </Badge>
                )}
                
                {scholarship.image_url && (
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={scholarship.image_url}
                      alt={scholarship.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <CardHeader className="flex-grow">
                  <CardTitle className="line-clamp-2">{scholarship.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{scholarship.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{scholarship.amount} {scholarship.currency}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    <span>Deadline: {format(new Date(scholarship.deadline), 'MMM dd, yyyy')}</span>
                  </div>
                  
                  {scholarship.country && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>{scholarship.country}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                    <span className="capitalize">{scholarship.education_level}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Provider:</span> {scholarship.provider}
                  </div>
                  
                  {scholarship.field_of_study && (
                    <Badge variant="secondary" className="text-xs">
                      {scholarship.field_of_study}
                    </Badge>
                  )}
                </CardContent>
                
                <CardFooter className="gap-2 flex-col">
                  <Button
                    onClick={() => handleWhatsAppClick(scholarship)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    I Want This Scholarship
                  </Button>
                  
                  {scholarship.external_link && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(scholarship.external_link, '_blank')}
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Scholarships;