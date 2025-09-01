
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Eye, Lock, Database, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const { translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Shield className="mx-auto mb-6 text-blue-600" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {translations.privacyPolicyTitle || "Privacy Policy"}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {translations.privacyPolicySubtitle || "Your privacy is our priority. Learn how we protect and handle your information."}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Eye className="text-blue-600" size={24} />
                  {translations.informationWeCollect || "Information We Collect"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.privacyCollectDescription || "We collect information that you provide directly to us, such as:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.personalIdentificationInfo || "Personal identification information (name, email address, phone number)"}</li>
                  <li>{translations.educationalBackground || "Educational background and academic records"}</li>
                  <li>{translations.professionalExperience || "Professional experience and business interests"}</li>
                  <li>{translations.communicationPreferences || "Communication preferences and feedback"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Database className="text-blue-600" size={24} />
                  {translations.howWeUseYourInfo || "How We Use Your Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.privacyUseDescription || "We use the information we collect to:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.providePersonalizedServices || "Provide personalized educational and business consulting services"}</li>
                  <li>{translations.processScholarshipApplications || "Process scholarship applications and university admissions"}</li>
                  <li>{translations.sendRelevantUpdates || "Send you relevant updates about programs and opportunities"}</li>
                  <li>{translations.improveServices || "Improve our services and user experience"}</li>
                  <li>{translations.complyLegalObligations || "Comply with legal obligations and protect our rights"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Lock className="text-blue-600" size={24} />
                  {translations.dataSecurity || "Data Security"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>
                  {translations.dataSecurityDescription || "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:"}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.encryptedDataTransmission || "Encrypted data transmission and storage"}</li>
                  <li>{translations.regularSecurityAudits || "Regular security audits and assessments"}</li>
                  <li>{translations.accessControls || "Access controls and authentication procedures"}</li>
                  <li>{translations.employeeTraining || "Employee training on data protection practices"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <Users className="text-blue-600" size={24} />
                  {translations.informationSharing || "Information Sharing"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.privacySharingDescription || "We may share your information with:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.educationalInstitutions || "Educational institutions for application processing"}</li>
                  <li>{translations.governmentAgencies || "Government agencies for visa and scholarship applications"}</li>
                  <li>{translations.trustedServiceProviders || "Trusted service providers who assist in our operations"}</li>
                  <li>{translations.legalAuthorities || "Legal authorities when required by law"}</li>
                </ul>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {translations.neverSellPersonalInfo || "We never sell your personal information to third parties."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                  <FileText className="text-blue-600" size={24} />
                  {translations.yourRights || "Your Rights"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>{translations.yourRightsDescription || "You have the right to:"}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{translations.accessReviewPersonalInfo || "Access and review your personal information"}</li>
                  <li>{translations.requestCorrections || "Request corrections to inaccurate data"}</li>
                  <li>{translations.requestDeletion || "Request deletion of your information"}</li>
                  <li>{translations.optOutMarketing || "Opt-out of marketing communications"}</li>
                  <li>{translations.dataPortability || "Data portability and transfer"}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {translations.lastUpdatedMarch2025 || "Last updated: March 2025"} | {translations.questionsContact || "Questions? Contact us at privacy@kundapathways.com"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
