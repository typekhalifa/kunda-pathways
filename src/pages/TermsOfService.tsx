
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Scale, FileCheck, AlertTriangle, Users, Globe, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { updateMetaTags } from "@/utils/updateMetaTags";

const TermsOfService = () => {
  const { translations } = useLanguage();

  useEffect(() => {
    updateMetaTags(
      "Terms of Service - Khalil Consultings",
      "Read our terms of service to understand the conditions for using Khalil Consultings services.",
      "https://khalilconsultings.com/consulting-meta-image.jpg",
      "https://khalilconsultings.com/terms-of-service"
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Scale className="mx-auto mb-6 text-blue-600" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.termsOfServiceTitle || "Terms of Service"}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {translations.termsOfServiceSubtitle || "Please read these terms carefully before using our services."}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <FileCheck className="text-blue-600" size={24} />
                  {translations.acceptanceOfTerms || "Acceptance of Terms"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>
                  {translations.acceptanceDescription || "By accessing and using Kunda Pathways' services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Globe className="text-blue-600" size={24} />
                  {translations.serviceDescription || "Service Description"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.kundaPathwaysProvides || "Kunda Pathways provides:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.educationalConsultingScholarshipGuidance || "Educational consulting and scholarship guidance"}</li>
                  <li>{translations.universityAdmissionAssistance || "University admission assistance"}</li>
                  <li>{translations.fbBusinessConsulting || "Food & beverage business consulting"}</li>
                  <li>{translations.marketAnalysisBusinessDevelopment || "Market analysis and business development support"}</li>
                  <li>{translations.visaApplicationRelocation || "Visa application and relocation assistance"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Users className="text-blue-600" size={24} />
                  {translations.userResponsibilities || "User Responsibilities"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.userResponsibilitiesDescription || "As a user of our services, you agree to:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.provideAccurateInfo || "Provide accurate and complete information"}</li>
                  <li>{translations.maintainAccountConfidentiality || "Maintain the confidentiality of your account"}</li>
                  <li>{translations.useServicesLawfully || "Use our services only for lawful purposes"}</li>
                  <li>{translations.respectIntellectualProperty || "Respect intellectual property rights"}</li>
                  <li>{translations.followApplicableLaws || "Follow all applicable laws and regulations"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <AlertTriangle className="text-blue-600" size={24} />
                  {translations.limitationsDisclaimers || "Limitations and Disclaimers"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>
                  {translations.limitationsDescription || "While we strive to provide accurate information and quality services, we cannot guarantee:"}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.successfulAdmission || "Successful admission to educational institutions"}</li>
                  <li>{translations.approvalScholarshipVisa || "Approval of scholarship or visa applications"}</li>
                  <li>{translations.specificBusinessOutcomes || "Specific business outcomes or profits"}</li>
                  <li>{translations.availabilityPrograms || "Availability of programs or opportunities"}</li>
                </ul>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {translations.servicesAdvisoryNature || "Our services are advisory in nature and success depends on various external factors."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Clock className="text-blue-600" size={24} />
                  {translations.paymentRefundPolicy || "Payment and Refund Policy"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.paymentTermsInclude || "Our payment terms include:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.paymentRequiredBeforeService || "Payment is required before service delivery"}</li>
                  <li>{translations.refundsCaseByCase || "Refunds are considered on a case-by-case basis"}</li>
                  <li>{translations.serviceFeesNonRefundable || "Service fees are non-refundable once work has commenced"}</li>
                  <li>{translations.cancellationsWithin48Hours || "Cancellations must be made within 48 hours of booking"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Scale className="text-blue-600" size={24} />
                  {translations.governingLaw || "Governing Law"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>
                  {translations.governingLawDescription || "These terms shall be governed by and construed in accordance with the laws of South Korea. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Seoul, South Korea."}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {translations.lastUpdatedMarch2025 || "Last updated: March 2025"} | {translations.questionsContactLegal || "Questions? Contact us at legal@kundapathways.com"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
