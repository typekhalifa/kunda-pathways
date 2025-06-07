
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Aria, your Kunda Pathways Assistant. I'm here to help you with study abroad opportunities in Korea and F&B consulting services. How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Enhanced AI knowledge base for the bot
  const getResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Study in Korea related queries
    if (message.includes('study') || message.includes('korea') || message.includes('university') || message.includes('education')) {
      if (message.includes('scholarship')) {
        return "We offer comprehensive scholarship guidance for studying in Korea! Our services include KGSP (Korean Government Scholarship Program), university-specific scholarships, and private foundation scholarships. Our success rate is over 85%. We help with application strategies, document preparation, and interview coaching. Would you like to schedule a consultation to discuss specific scholarships for your field? I can arrange a call with our expert advisor.";
      }
      if (message.includes('admission') || message.includes('apply')) {
        return "Our university admission services include: application strategy development, document preparation and review, personal statement writing assistance, interview preparation, and application tracking. We work with top Korean universities like Seoul National University, Yonsei, Korea University, and KAIST. Which field of study interests you most? I'd be happy to schedule a consultation call to discuss your options in detail.";
      }
      if (message.includes('visa')) {
        return "We provide complete visa application support including D-2 (study visa), D-4 (language training visa), and F-2 (residence visa) applications. Our team ensures all documentation is properly prepared and submitted. Processing typically takes 2-4 weeks. We also provide guidance on maintaining visa status and extensions. Would you like to speak with our visa specialist? I can arrange a consultation call.";
      }
      if (message.includes('language') || message.includes('korean') || message.includes('topik')) {
        return "We offer comprehensive Korean language training programs from beginner to advanced levels, including TOPIK exam preparation. Our certified instructors help you achieve the language proficiency needed for university admission (usually TOPIK Level 3-4). We also provide cultural orientation and conversation practice sessions. Would you be interested in a consultation call to assess your current level and create a personalized study plan?";
      }
      return "We provide comprehensive study abroad services for Korea including: scholarship guidance (KGSP & others), university admissions support, visa applications, Korean language training, and post-arrival support. Our services range from $500-$3,000 depending on your needs. Would you like to schedule a FREE consultation call to discuss your specific goals? I can arrange that for you right away.";
    }
    
    // F&B Consulting related queries
    if (message.includes('food') || message.includes('beverage') || message.includes('restaurant') || message.includes('business') || message.includes('consulting')) {
      if (message.includes('market') || message.includes('analysis')) {
        return "Our F&B market analysis services include: comprehensive market research, competitor analysis, consumer behavior studies, trend identification, and feasibility studies. We specialize in Korean and East Asian markets with particular expertise in Korean food culture and regulations. What type of F&B business are you planning to start? I'd love to connect you with our MSc Food Science expert for a detailed consultation call.";
      }
      if (message.includes('menu') || message.includes('product') || message.includes('development')) {
        return "We offer menu development and product consulting services including: recipe development and optimization, nutritional analysis, cost optimization strategies, supplier sourcing, and regulatory compliance. Our MSc Food Science expert ensures quality and safety standards are met. We can help with both traditional and innovative food concepts. Would you like to schedule a call to discuss your product development needs?";
      }
      if (message.includes('license') || message.includes('permit') || message.includes('regulation') || message.includes('compliance')) {
        return "We help with F&B business licensing and regulatory compliance including: business registration in Korea, food safety permits, health department approvals, import/export documentation, and ongoing compliance monitoring. We ensure full compliance with Korean regulations and can guide you through the entire legal process. Shall I arrange a consultation call with our regulatory compliance specialist?";
      }
      return "Our F&B consulting services include: business planning and strategy development, market analysis, menu development, regulatory compliance, supplier network access, and operational setup. We have expertise in Korean market entry and MSc Food Science background. Our F&B consulting packages start from $800. Would you be interested in a consultation call to discuss your specific F&B business goals?";
    }
    
    // Call/consultation related queries
    if (message.includes('call') || message.includes('consultation') || message.includes('speak') || message.includes('talk') || message.includes('meeting')) {
      return "I'd be happy to arrange a consultation call for you! We offer FREE 15-minute initial consultations to understand your needs and provide personalized guidance. You can book directly through our website, or I can help you schedule right now. What type of consultation are you interested in - Study Abroad or F&B Consulting? You can also reach us at +82-10-1234-5678 or email info@kundapathways.com.";
    }
    
    // Pricing queries
    if (message.includes('cost') || message.includes('price') || message.includes('fee') || message.includes('how much') || message.includes('pricing')) {
      return "Our service fees vary based on your specific needs: Study abroad services start from $500 for basic consultation, while comprehensive packages range $1,500-$3,000. F&B consulting starts from $800. We offer a FREE 15-minute initial consultation to discuss your requirements and provide accurate pricing. Would you like me to schedule this consultation call for you? Individual services can also be customized based on your budget.";
    }
    
    // Success rate queries
    if (message.includes('success') || message.includes('rate') || message.includes('guarantee') || message.includes('results')) {
      return "Our success rates are impressive: 85%+ scholarship approval rate, 95%+ university admission rate, 98%+ visa approval rate. While we can't guarantee outcomes (they depend on individual qualifications), our expertise and proven track record significantly improve your chances. We provide realistic assessments during consultation and work closely with you to maximize success. Would you like to schedule a call to discuss your specific situation?";
    }
    
    // Timeline queries
    if (message.includes('time') || message.includes('long') || message.includes('when') || message.includes('duration') || message.includes('timeline')) {
      return "Timelines vary by service: University applications take 3-6 months, scholarship applications 4-8 months, visa processing 2-4 weeks. F&B consulting projects typically take 2-12 weeks depending on scope. We provide detailed project timelines during your consultation and keep you updated throughout the process. Would you like to schedule a consultation call to get a personalized timeline for your goals?";
    }
    
    // Contact information queries
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('reach')) {
      return "You can reach us in several ways: 📧 Email: info@kundapathways.com | 📞 Phone: +82-10-1234-5678 | 💬 WhatsApp: +82-10-1234-5678 | 🕐 Hours: Monday-Friday 9AM-5PM KST, Saturday 10AM-4PM KST. Would you prefer a scheduled consultation call or immediate contact? I can help arrange either option for you!";
    }
    
    // Who is the advisor/team
    if (message.includes('who') || message.includes('advisor') || message.includes('consultant') || message.includes('team') || message.includes('expert')) {
      return "Our team is led by experienced consultants with over 8 years in international education and F&B business development. Our principal advisor holds an MSc in Food Science and has helped over 500 students achieve their academic dreams in Korea, plus assisted 50+ businesses with market entry. We're passionate about creating pathways to success! Would you like to schedule a call to meet our team personally?";
    }
    
    // Interested/yes responses
    if (message.includes('yes') || message.includes('interested') || message.includes('sure') || message.includes('okay') || message.includes('ok')) {
      return "Perfect! I'm excited to help you move forward. To schedule your FREE 15-minute consultation, you can: 1) Visit our booking page directly on the website, 2) Call us at +82-10-1234-5678, 3) Email us at info@kundapathways.com, or 4) Send a WhatsApp message to +82-10-1234-5678. Which method would be most convenient for you? I'm here to guide you through the process!";
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
      return "Hello! Welcome to Kunda Pathways! I'm Aria, your personal assistant. Whether you're dreaming of studying in Korea or expanding your F&B business into Asian markets, I'm here to guide you every step of the way. What brings you here today? Are you interested in education opportunities or business consulting? I'd love to learn about your goals and see how we can help you achieve them!";
    }
    
    // Thanks
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return "You're absolutely welcome! I'm thrilled I could help. Remember, we're here for you throughout your entire journey - whether it's studying in Korea or growing your F&B business. If you'd like personalized guidance, I highly recommend booking our FREE 15-minute consultation. Our experts would love to discuss your specific goals and create a tailored plan for success. Feel free to ask me anything else!";
    }
    
    // Goodbye
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return "Thank you for chatting with me today! Before you go, remember that we offer a FREE 15-minute consultation if you'd like to discuss your goals with our expert advisors. Whether it's studying in Korea or F&B consulting, we're here to support your dreams. Have a wonderful day, and don't hesitate to return anytime you need guidance on your journey to success!";
    }
    
    // Default response with call-to-action
    return "That's a great question! I'd love to provide you with detailed, personalized information. For the most comprehensive guidance tailored to your specific situation, I recommend scheduling a FREE 15-minute consultation with our expert advisors. They can address all your questions about study abroad opportunities, F&B consulting, pricing, timelines, and success strategies. Would you be interested in booking this consultation call? I can help you schedule it right now!";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    
    // Generate intelligent response
    setTimeout(() => {
      const response = getResponse(inputMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open chat assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 sm:w-80 h-96 sm:h-96 max-h-[calc(100vh-200px)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden md:w-96 md:h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b547?w=100&h=100&fit=crop&crop=face" alt="Aria Assistant" />
                <AvatarFallback className="bg-white/20 text-white text-xs">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Aria - Kunda Pathways Assistant</h3>
                <p className="text-xs text-purple-100">Online now • Usually replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    message.isBot
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <Button 
                onClick={handleSendMessage}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl px-4 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
