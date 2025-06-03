
import { ArrowLeft, GraduationCap, Award, Users, Globe, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import WhatsAppConsultationButton from "@/components/WhatsAppConsultationButton";

const AboutAdvisor = () => {
  const { translations } = useLanguage();

  const skills = [
    "Food Science & Technology",
    "University Admissions",
    "Scholarship Applications", 
    "Business Consulting",
    "Market Analysis",
    "Regulatory Compliance"
  ];

  const certifications = [
    "MSc Food Science - Seoul National University",
    "Certified Education Consultant",
    "Business Analysis Professional",
    "Korean Language Proficiency (TOPIK Level 6)"
  ];

  const achievements = [
    "500+ Students Successfully Placed",
    "15+ Countries Reached",
    "95% Success Rate in Applications",
    "5+ Years Experience"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="mb-4 hover:bg-blue-50 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg border-4 border-white dark:border-slate-700">
              <GraduationCap size={80} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            {translations.advisorName}
          </h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
            {translations.advisorTitle}
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            {translations.advisorDescription}
          </p>
        </div>

        {/* Contact & Consultation Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <Mail size={20} className="text-blue-600" />
                  <a href="mailto:info@kundapathways.com" className="hover:text-blue-600 transition-colors">
                    info@kundapathways.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <Phone size={20} className="text-blue-600" />
                  <a href="tel:+821012345678" className="hover:text-blue-600 transition-colors">
                    +82-10-1234-5678
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <MapPin size={20} className="text-blue-600" />
                  <span>Seoul, South Korea</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Clock size={20} className="mr-2 text-blue-600" />
                  Office Hours
                </h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 5:00 PM (KST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span className="font-medium text-red-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Get Started Today</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Schedule a free 15-minute consultation to discuss your goals and how I can help you achieve them.
              </p>
              <WhatsAppConsultationButton className="w-full mb-4" />
              <Link to="/book-consultation">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  <Calendar className="mr-2" size={20} />
                  Book Full Consultation ($150)
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Award className="mr-3 text-blue-600" size={24} />
                Core Skills
              </h3>
              <ul className="space-y-3">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <GraduationCap className="mr-3 text-green-600" size={24} />
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <Users className="mr-3 text-purple-600" size={24} />
                Achievements
              </h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    {achievement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Professional Background */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Professional Background</h3>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              With over 5 years of experience in education consulting and food & beverage industry analysis, 
              I have dedicated my career to helping students achieve their academic dreams while also providing 
              strategic business insights to companies looking to expand in the Asian market.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              My journey began with my own studies in South Korea, where I completed my Master's degree in 
              Food Science at Seoul National University. This experience gave me firsthand knowledge of the 
              challenges international students face and the incredible opportunities available in Korean 
              higher education.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Today, I combine my academic background with practical industry experience to provide 
              comprehensive guidance that goes beyond traditional consulting. Whether you're a student 
              seeking the perfect university match or a business looking to understand the Asian F&B market, 
              I'm here to turn your aspirations into achievements.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-slate-600 dark:text-slate-300">Students Helped</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
            <div className="text-slate-600 dark:text-slate-300">Countries Reached</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-slate-600 dark:text-slate-300">Success Rate</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
            <div className="text-slate-600 dark:text-slate-300">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAdvisor;
