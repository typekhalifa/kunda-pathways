
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="pt-24 pb-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Gateway to
            <span className="text-blue-400"> Global Opportunities</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Expert guidance for studying in Korea and building food & beverage businesses across Asia. 
            From scholarship applications to international business consulting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg">
              Explore Study Programs
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 text-lg shadow-lg bg-transparent backdrop-blur-sm"
            >
              F&B Consulting
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-700 dark:text-slate-300">Students Assisted</div>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-slate-700 dark:text-slate-300">Countries Reached</div>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">MSc</div>
              <div className="text-slate-700 dark:text-slate-300">Food Science Expert</div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto text-white" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
