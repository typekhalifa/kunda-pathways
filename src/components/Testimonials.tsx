
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { translations } = useLanguage();
  
  const testimonials = [
    {
      name: "Marie Uwimana",
      role: "University Student in Seoul",
      content: "Thanks to GlobalConnect, I'm now studying at a top Korean university with a full scholarship. The guidance was incredible!",
      country: "Rwanda",
      rating: 5,
    },
    {
      name: "James Mukamana",
      role: "F&B Entrepreneur",
      content: "The food industry consulting helped me launch my beverage company in the Korean market. Invaluable expertise!",
      country: "Uganda",
      rating: 5,
    },
    {
      name: "Sarah Nkunda",
      role: "Graduate Student",
      content: "From visa application to finding accommodation, every step was handled professionally. Highly recommended!",
      country: "Rwanda",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Real stories from clients who achieved their global dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-500 hover:scale-105 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                
                {/* Content without quotes */}
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic text-lg">
                  {testimonial.content}
                </p>
                
                {/* User Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                    <div className="text-sm text-blue-600 font-medium">{testimonial.country}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
