
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
              Meet Your <span className="text-blue-600">Global Advisor</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              With an MSc in Food Science and Technology and years of experience living and studying in South Korea, 
              I bridge the gap between African talent and global opportunities.
            </p>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              My passion lies in helping fellow Africans access world-class education and build successful 
              businesses in the food and beverage industry across Asia.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">5+ Years</div>
                <div className="text-slate-600">Living in Korea</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">MSc</div>
                <div className="text-slate-600">Food Science</div>
              </div>
            </div>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Read My Full Story
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose GlobalConnect?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">★</span>
                  <span>Personal experience studying and living in Korea</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">★</span>
                  <span>Deep understanding of African and Asian cultures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">★</span>
                  <span>Proven track record of successful placements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">★</span>
                  <span>Industry expertise in food science and technology</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
