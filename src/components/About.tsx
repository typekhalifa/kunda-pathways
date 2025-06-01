
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, TrendingUp, Globe } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Meet Your <span className="text-blue-600">Global Advisor</span>
          </h2>
          
          {/* Professional Photo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg border-4 border-white dark:border-slate-700">
              {/* Placeholder for professional photo - you can replace this with an actual image */}
              <GraduationCap size={80} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            John Doe, MSc
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
            Food Science & Technology | Korean Education Expert
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Your partner for education and business in Korea & Asia. With years of experience in both academic guidance and F&B consulting, I help students and entrepreneurs achieve their global dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">Education Expert</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Specializing in Korean university admissions and scholarship guidance
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">F&B Consultant</h3>
              <p className="text-slate-600 dark:text-slate-300">
                MSc in Food Science with extensive market analysis experience
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">500+ Students</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Successfully guided students from Africa to top Korean universities
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-8">
              <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">15+ Countries</h3>
              <p className="text-slate-600 dark:text-slate-300">
                International reach across Africa, Asia, and beyond
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
