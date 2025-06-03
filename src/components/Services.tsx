
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Utensils, Globe, Users, CheckCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { translations } = useLanguage();
  
  const studyServices = [
    { name: translations.scholarshipGuidance, price: "$150", description: translations.scholarshipGuidanceDesc },
    { name: translations.universityAdmissions, price: "$200", description: translations.universityAdmissionsDesc },
    { name: translations.visaApplication, price: "$100", description: translations.visaApplicationDesc },
    { name: translations.koreanLanguageTraining, price: "$80/month", description: translations.koreanLanguageTrainingDesc },
    { name: translations.visitsHelp, price: "$120", description: translations.visitsHelpDesc },
  ];

  const fbServices = [
    { name: translations.businessConsultation, price: "$250/hour", description: translations.businessConsultationDesc },
    { name: translations.fbMarketAnalysis, price: "$500", description: translations.fbMarketAnalysisDesc },
    { name: translations.productDevelopment, price: "$300/hour", description: translations.productDevelopmentDesc },
    { name: translations.regulatoryCompliance, price: "$200/hour", description: translations.regulatoryComplianceDesc },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {translations.servicesTitle.split(' ')[0]} <span className="text-blue-600">{translations.servicesTitle.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {translations.servicesSubtitle}
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
                    {translations.studyAbroadTitle}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{translations.studyAbroadSubtitle}</p>
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
                  <span>{translations.personalizedGuidance}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>{translations.endToEndSupport}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>{translations.culturalOrientation}</span>
                </div>
              </div>

              <Link to="/book-consultation">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  {translations.startYourJourney}
                </Button>
              </Link>
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
                    {translations.fbConsultingTitle}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{translations.fbConsultingSubtitle}</p>
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
                  <span>{translations.mscFoodScienceExpertise}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <span>{translations.asianMarketSpecialization}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <span>{translations.internationalBusinessDev}</span>
                </div>
              </div>

              <Link to="/fb-consulting">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                  {translations.getExpertConsultation}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            🎯 <strong>{translations.packageDealsAvailable}</strong> {translations.saveUpTo20Percent}
          </p>
          <Link to="/all-services">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl">
              {translations.viewAllPackages}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
