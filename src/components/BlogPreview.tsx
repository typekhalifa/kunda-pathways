
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BlogPreview = () => {
  const posts = [
    {
      title: "Top 10 Korean Universities Offering Scholarships for African Students",
      excerpt: "Discover the best opportunities for funded education in South Korea...",
      date: "March 15, 2024",
      category: "Education",
    },
    {
      title: "Breaking into the Korean F&B Market: A Complete Guide",
      excerpt: "Everything you need to know about food business regulations in Korea...",
      date: "March 10, 2024",
      category: "Business",
    },
    {
      title: "KGSP 2024: Application Tips and Deadlines",
      excerpt: "Get insider tips for the Korean Government Scholarship Program...",
      date: "March 5, 2024",
      category: "Scholarships",
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
            Latest <span className="text-blue-600">Resources</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with scholarship opportunities, industry insights, and success tips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md bg-white">
              <CardHeader>
                <div className="text-sm text-blue-600 font-medium mb-2">{post.category}</div>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                <CardDescription className="text-slate-600">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">{post.date}</span>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
