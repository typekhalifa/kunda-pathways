import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Utensils, Globe, Users, CheckCircle, Star } from "lucide-react";

const Services = () => {
  const studyServices = [
    { name: "Scholarship Guidance", price: "$150", description: "Complete scholarship application support" },
    { name: "University Enrollment", price: "$200", description: "Private & public university assistance" },
    { name: "Visa Application", price: "$100", description: "Full visa processing support" },
    { name: "Korean Language Training", price: "$80/month", description: "Online Korean language courses" },
    { name: "Visits Help & Relocations", price: "$120", description: "Complete relocation and settlement assistance" },
  ];

  const fbServices = [
    { name: "Business Consultation", price: "$250/hour", description: "Expert F&B business advice" },
    { name: "Market Analysis", price: "$500", description: "Asian market research & insights" },
    { name: "Product Development", price: "$300/hour", description: "Food science & technology guidance" },
    { name: "Regulatory Compliance", price: "$200/hour", description: "Food safety & regulations" },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Professional guidance for your global journey and business success
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Study Abroad Services */}
          <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg dark:bg-slate-800">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Study Abroad & Relocation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">Your pathway to global education</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {studyServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-white">{service.name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{service.description}</div>
                    </div>
                    <div className="text-blue-600 font-bold">{service.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Personalized guidance from Korean education expert</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>End-to-end support from application to arrival</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Cultural orientation and settlement assistance</span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Start Your Journey
              </Button>
            </CardContent>
          </Card>

          {/* F&B Consulting Services */}
          <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg dark:bg-slate-800">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <Utensils className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Food & Beverage Consulting
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">Expert guidance from MSc Food Science</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {fbServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-white">{service.name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{service.description}</div>
                    </div>
                    <div className="text-green-600 font-bold">{service.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <span>MSc Food Science & Technology expertise</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <span>Asian market specialization</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <span>International business development</span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Get Expert Consultation
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            🎯 <strong>Package Deals Available!</strong> Save up to 20% when combining services
          </p>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900">
            View All Packages & Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
