import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const BlogPreview = () => {
  const { translations } = useLanguage();

  const posts = [
    {
      title: translations.blogPost1Title || "2024 Complete Guide to Korean University Scholarships",
      excerpt: translations.blogPost1Excerpt || "Everything you need to know about scholarship applications in Korea, including KGSP and university-specific programs. Discover eligibility criteria, application deadlines, and expert tips for success.",
      date: translations.march152024 || "March 15, 2024",
      category: translations.education || "Education",
      readTime: translations.eightMinRead || "8 min read"
    },
    {
      title: translations.blogPost2Title || "Korean F&B Market Entry Strategies",
      excerpt: translations.blogPost2Excerpt || "Learn the essential steps to successfully enter the Korean food and beverage market with expert insights. From regulatory compliance to consumer preferences and distribution channels.",
      date: translations.march102024 || "March 10, 2024", 
      category: translations.business || "Business",
      readTime: translations.twelveMinRead || "12 min read"
    },
    {
      title: translations.blogPost3Title || "TOPIK Preparation: Your Path to Korean Universities",
      excerpt: translations.blogPost3Excerpt || "Master the Test of Proficiency in Korean with our comprehensive preparation guide. Includes study schedules, practice resources, and test-taking strategies.",
      date: translations.march52024 || "March 5, 2024",
      category: translations.scholarships || "Scholarships", 
      readTime: translations.sixMinRead || "6 min read"
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {translations.latest} <span className="text-blue-600">{translations.resources}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {translations.resourcesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{post.category}</div>
                <CardTitle className="text-xl leading-tight dark:text-white">{post.title}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{post.date}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{post.readTime}</span>
                </div>
                <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 justify-center">
                  {translations.readMore} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/resources">
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-xl shadow-lg">
              {translations.viewAllResources}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
