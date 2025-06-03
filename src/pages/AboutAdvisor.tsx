
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, Award, Users, Clock, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import WhatsAppConsultationButton from "@/components/WhatsAppConsultationButton";

const AboutAdvisor = () => {
  const { translations } = useLanguage();

  const skills = [
    "University Admissions Guidance",
    "Scholarship Applications",
    "Visa Processing",
    "Food & Beverage Consulting",
    "Market Research & Analysis",
    "Korean Language Training",
    "Cultural Orientation",
    "Business Development"
  ];

  const certifications = [
    "MSc Food Science & Technology",
    "Certified Education Consultant",
    "Korean Language Proficiency (TOPIK Level 6)",
    "International Business Development",
    "Cross-Cultural Communication"
  ];

  const achievements = [
    "500+ Students Successfully Placed",
    "15+ Countries Reached",
    "95% Visa Approval Rate",
    "50+ University Partnerships",
    "10+ Years Experience"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-8 rounded-xl border-blue-300 dark:border-blue-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <ArrowLeft size={16} className="mr-2" />
              {translations.backToHome || 'Back to Home'}
            </Button>
          </Link>

          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                K
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-slate-800"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Meet Your <span className="text-blue-600">Global Advisor</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              With over 10 years of experience in international education and F&B consulting, 
              I'm here to guide you through your journey to success in East Asia.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto mb-3 text-blue-600" size={32} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Email</h3>
                <a 
                  href="mailto:info@kundapathways.com" 
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  info@kundapathways.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Phone className="mx-auto mb-3 text-green-600" size={32} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Phone</h3>
                <a 
                  href="tel:+821012345678" 
                  className="text-green-600 dark:text-green-400 hover:underline transition-colors"
                >
                  +82 10 1234 5678
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Clock className="mx-auto mb-3 text-purple-600" size={32} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Office Hours</h3>
                <div className="text-slate-600 dark:text-slate-400">
                  <div>Mon - Fri: 9 AM - 5 PM</div>
                  <div>Sat - Sun: Closed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Free Consultation CTA */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Get Your Free 15-Minute Consultation
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Let's discuss your goals and how I can help you achieve them
              </p>
              <WhatsAppConsultationButton className="text-lg px-8 py-3" />
            </div>
          </div>

          {/* Skills & Expertise */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                <GraduationCap className="mr-3 text-blue-600" size={28} />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-slate-700 dark:text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                <Award className="mr-3 text-purple-600" size={28} />
                Certifications & Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                    <Award className="text-purple-600 mr-3" size={20} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                <Users className="mr-3 text-green-600" size={28} />
                Key Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {achievement.split(' ')[0]}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {achievement.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trusted Partners */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
                <Globe className="mr-3 text-blue-600" size={28} />
                Our Trusted Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">🏛️</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Seoul National University</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">University of Tokyo</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">🏢</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Yonsei University</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">🌏</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Peking University</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-6 opacity-90">
              Let's work together to achieve your academic and professional goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-consultation">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                  Schedule Full Consultation
                </Button>
              </Link>
              <WhatsAppConsultationButton className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutAdvisor;
