
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
            Our <span className="text-blue-600">Expert</span> Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive solutions for international education and food industry development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Study Abroad Service */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎓</span>
              </div>
              <CardTitle className="text-2xl text-slate-800 mb-4">
                Study Abroad & Relocation
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Complete support for your Korean education journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Scholarship guidance and application support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Korean language training programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>University enrollment (public & private)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Visa application assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Accommodation and travel arrangements</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform">
                Learn More About Study Programs
              </Button>
            </CardContent>
          </Card>

          {/* F&B Consulting Service */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🍽️</span>
              </div>
              <CardTitle className="text-2xl text-slate-800 mb-4">
                Food & Beverage Consulting
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Professional guidance for F&B business success in Asia
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Food science and technology expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Asian market entry strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Product development and innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Regulatory compliance guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Business partnership opportunities</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:scale-105 transition-transform">
                Explore F&B Consulting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
