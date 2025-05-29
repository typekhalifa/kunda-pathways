
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie Uwimana",
      role: "University Student in Seoul",
      content: "Thanks to GlobalConnect, I'm now studying at a top Korean university with a full scholarship. The guidance was incredible!",
      country: "Rwanda",
    },
    {
      name: "James Mukamana",
      role: "F&B Entrepreneur",
      content: "The food industry consulting helped me launch my beverage company in the Korean market. Invaluable expertise!",
      country: "Uganda",
    },
    {
      name: "Sarah Nkunda",
      role: "Graduate Student",
      content: "From visa application to finding accommodation, every step was handled professionally. Highly recommended!",
      country: "Rwanda",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real stories from clients who achieved their global dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="text-4xl text-blue-600 mb-4">"</div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.country}</div>
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
