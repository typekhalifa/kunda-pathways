import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, MessageCircle, ExternalLink, BookOpen, Sparkles, Eye, X, Clock, DollarSign, FileText, CheckCircle } from "lucide-react";
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
  education_levels: string[];
  image_url?: string;
  external_link?: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const Scholarships = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

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
    const phoneNumber = "+821026077012"; // Updated with correct WhatsApp number
    const message = encodeURIComponent(
      `Hello! I would like to know more about and apply for the "${scholarship.title}" scholarship. Could you please provide more information about the application process?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get unique education levels for filter buttons
  const uniqueEducationLevels = Array.from(
    new Set(scholarships.flatMap(s => s.education_levels || []))
  ).filter(Boolean);

  // Filter scholarships based on current filter
  const filteredScholarships = scholarships.filter(scholarship => {
    if (filter === 'all') return true;
    if (filter === 'featured') return scholarship.is_featured;
    return scholarship.education_levels?.includes(filter);
  });

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
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="h-10 w-10 text-primary" />
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
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
            <Sparkles className="mr-2 h-4 w-4" />
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
                    <Sparkles className="mr-1 h-3 w-3" />
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
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{scholarship.amount} {scholarship.currency}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {format(new Date(scholarship.deadline), 'MMM dd, yyyy')}</span>
                  </div>
                  
                  {scholarship.country && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span>{scholarship.country}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <GraduationCap className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {scholarship.education_levels?.map((level, index) => (
                        <span key={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                          {index < scholarship.education_levels.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Provider:</span> {scholarship.provider}
                  </div>
                  
                  {scholarship.field_of_study && (
                    <Badge variant="secondary" className="text-xs">
                      {scholarship.field_of_study}
                    </Badge>
                  )}
                </CardContent>
                
                <CardFooter className="pt-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleWhatsAppClick(scholarship)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={() => setSelectedScholarship(scholarship)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    {scholarship.external_link && (
                      <Button
                        onClick={() => window.open(scholarship.external_link, '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Scholarship Detail Modal */}
        {selectedScholarship && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-6 flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedScholarship.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">{selectedScholarship.amount} {selectedScholarship.currency}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(selectedScholarship.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedScholarship(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {selectedScholarship.image_url && (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={selectedScholarship.image_url}
                      alt={selectedScholarship.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Description
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedScholarship.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Eligibility Criteria
                      </h3>
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedScholarship.eligibility_criteria.split('\n').filter(item => item.trim()).map((criteria, index) => {
                          const trimmed = criteria.trim();
                          if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                            return (
                              <div key={index} className="flex items-start gap-2 mb-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">-</span>
                                <span>{trimmed.replace(/^[\-•]\s*/, '')}</span>
                              </div>
                            );
                          }
                          return trimmed ? (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">-</span>
                              <span>{trimmed}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Provider</h3>
                      <p className="text-gray-700 dark:text-gray-300">{selectedScholarship.provider}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedScholarship.requirements.split('\n').filter(item => item.trim()).map((requirement, index) => {
                          const trimmed = requirement.trim();
                          if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                            return (
                              <div key={index} className="flex items-start gap-2 mb-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">-</span>
                                <span>{trimmed.replace(/^[\-•]\s*/, '')}</span>
                              </div>
                            );
                          }
                          return trimmed ? (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">-</span>
                              <span>{trimmed}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {selectedScholarship.application_process && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Application Process</h3>
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {selectedScholarship.application_process.split('\n').filter(item => item.trim()).map((step, index) => {
                            const trimmed = step.trim();
                            if (trimmed.startsWith('→') || trimmed.startsWith('-') || trimmed.startsWith('•')) {
                              return (
                                <div key={index} className="flex items-start gap-2 mb-2">
                                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">→</span>
                                  <span>{trimmed.replace(/^[→\-•]\s*/, '')}</span>
                                </div>
                              );
                            }
                            return trimmed ? (
                              <div key={index} className="flex items-start gap-2 mb-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">→</span>
                                <span>{trimmed}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {selectedScholarship.country && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                          <p className="text-gray-600 dark:text-gray-300">{selectedScholarship.country}</p>
                        </div>
                      )}
                      {selectedScholarship.field_of_study && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Field of Study</h4>
                          <p className="text-gray-600 dark:text-gray-300">{selectedScholarship.field_of_study}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Education Levels</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedScholarship.education_levels?.map((level) => (
                          <span
                            key={level}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleWhatsAppClick(selectedScholarship)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact via WhatsApp
                  </Button>
                  {selectedScholarship.external_link && (
                    <Button
                      onClick={() => window.open(selectedScholarship.external_link, '_blank')}
                      variant="outline"
                      className="flex-1"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Official Link
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Scholarships;