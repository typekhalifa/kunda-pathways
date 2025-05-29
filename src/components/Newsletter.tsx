
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 px-4 bg-blue-600 dark:bg-blue-800">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="mx-auto mb-6 text-white" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Global Opportunities
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.
          </p>
          
          {isSubscribed ? (
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg">
              Thank you for subscribing! Check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/90 border-0 text-slate-800"
              />
              <Button 
                type="submit" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
