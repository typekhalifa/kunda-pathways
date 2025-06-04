
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Meg, your Kunda Pathways Assistant. I'm here to help you with study abroad opportunities in Korea and F&B consulting services. How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Enhanced knowledge base for the bot
  const getResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Study in Korea related queries
    if (message.includes('study') || message.includes('korea') || message.includes('university') || message.includes('education')) {
      if (message.includes('scholarship')) {
        return "We offer comprehensive scholarship guidance for studying in Korea! Our services include KGSP (Korean Government Scholarship Program), university-specific scholarships, and private foundation scholarships. Our success rate is over 85%. We help with application strategies, document preparation, and interview coaching. Would you like to know more about specific scholarships or eligibility requirements?";
      }
      if (message.includes('admission') || message.includes('apply')) {
        return "Our university admission services include: application strategy development, document preparation and review, personal statement writing assistance, interview preparation, and application tracking. We work with top Korean universities like Seoul National University, Yonsei, Korea University, and KAIST. Which field of study interests you most?";
      }
      if (message.includes('visa')) {
        return "We provide complete visa application support including D-2 (study visa), D-4 (language training visa), and F-2 (residence visa) applications. Our team ensures all documentation is properly prepared and submitted. Processing typically takes 2-4 weeks. We also provide guidance on maintaining visa status and extensions.";
      }
      if (message.includes('language') || message.includes('korean') || message.includes('topik')) {
        return "We offer comprehensive Korean language training programs from beginner to advanced levels, including TOPIK exam preparation. Our certified instructors help you achieve the language proficiency needed for university admission (usually TOPIK Level 3-4). We also provide cultural orientation and conversation practice sessions.";
      }
      return "We provide comprehensive study abroad services for Korea including: scholarship guidance (KGSP & others), university admissions support, visa applications, Korean language training, and post-arrival support. Our services range from $500-$3,000 depending on your needs. Which aspect would you like to know more about?";
    }
    
    // F&B Consulting related queries
    if (message.includes('food') || message.includes('beverage') || message.includes('restaurant') || message.includes('business') || message.includes('consulting')) {
      if (message.includes('market') || message.includes('analysis')) {
        return "Our F&B market analysis services include: comprehensive market research, competitor analysis, consumer behavior studies, trend identification, and feasibility studies. We specialize in Korean and East Asian markets with particular expertise in Korean food culture and regulations. What type of F&B business are you planning to start?";
      }
      if (message.includes('menu') || message.includes('product') || message.includes('development')) {
        return "We offer menu development and product consulting services including: recipe development and optimization, nutritional analysis, cost optimization strategies, supplier sourcing, and regulatory compliance. Our MSc Food Science expert ensures quality and safety standards are met. We can help with both traditional and innovative food concepts.";
      }
      if (message.includes('license') || message.includes('permit') || message.includes('regulation') || message.includes('compliance')) {
        return "We help with F&B business licensing and regulatory compliance including: business registration in Korea, food safety permits, health department approvals, import/export documentation, and ongoing compliance monitoring. We ensure full compliance with Korean regulations and can guide you through the entire legal process.";
      }
      return "Our F&B consulting services include: business planning and strategy development, market analysis, menu development, regulatory compliance, supplier network access, and operational setup. We have expertise in Korean market entry and MSc Food Science background. Our F&B consulting packages start from $800. What's your specific F&B business goal?";
    }
    
    // Cost and pricing queries
    if (message.includes('cost') || message.includes('price') || message.includes('fee') || message.includes('how much') || message.includes('pricing')) {
      return "Our service fees vary based on your specific needs: Study abroad services start from $500 for basic consultation, while comprehensive packages range $1,500-$3,000. F&B consulting starts from $800. We offer a FREE 15-minute initial consultation to discuss your requirements and provide accurate pricing. Individual services can also be customized based on your budget.";
    }
    
    // Timeline queries
    if (message.includes('time') || message.includes('long') || message.includes('when') || message.includes('duration') || message.includes('timeline')) {
      return "Timelines vary by service: University applications take 3-6 months, scholarship applications 4-8 months, visa processing 2-4 weeks. F&B consulting projects typically take 2-12 weeks depending on scope. We provide detailed project timelines during your consultation and keep you updated throughout the process.";
    }
    
    // Success rate queries
    if (message.includes('success') || message.includes('rate') || message.includes('guarantee') || message.includes('results')) {
      return "Our success rates: 85%+ scholarship approval rate, 95%+ university admission rate, 98%+ visa approval rate. While we can't guarantee outcomes (they depend on individual qualifications), our expertise and proven track record significantly improve your chances. We provide realistic assessments during consultation and work closely with you to maximize success.";
    }
    
    // Contact and booking queries
    if (message.includes('contact') || message.includes('book') || message.includes('appointment') || message.includes('consultation') || message.includes('meet')) {
      return "Ready to get started? You can book a FREE 15-minute consultation through our website, email us at info@kundapathways.com, or call +82-10-1234-5678. We're available Monday-Friday 9AM-5PM KST, Saturday 10AM-4PM KST. You can also schedule directly via WhatsApp for immediate response!";
    }
    
    // Location and availability queries
    if (message.includes('location') || message.includes('where') || message.includes('office') || message.includes('seoul')) {
      return "We're based in Seoul, South Korea, but serve clients worldwide through online consultations. We also have partnerships with institutions across Korea and can provide in-person support for students already in Korea. Our office hours are Monday-Friday 9AM-5PM KST, weekends closed.";
    }
    
    // Who is the advisor
    if (message.includes('who') || message.includes('advisor') || message.includes('consultant') || message.includes('team')) {
      return "I work with an experienced team led by our principal consultant who has over 8 years of experience in international education consulting and F&B business development. Our advisor holds an MSc in Food Science and has helped over 500 students achieve their academic dreams in Korea. Would you like to learn more about our team's background?";
    }
    
    // Languages and communication
    if (message.includes('language') && !message.includes('korean') && !message.includes('study')) {
      return "We provide services in multiple languages and can accommodate various communication preferences. Our team is experienced in working with international clients and can provide culturally sensitive guidance throughout your journey.";
    }
    
    // General greetings and thanks
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
      return "Hello! Welcome to Kunda Pathways. I'm Meg, your virtual assistant. Whether you're interested in studying in Korea or starting an F&B business, I'm here to help guide you. What would you like to know about our services today?";
    }
    
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return "You're very welcome! I'm here whenever you need assistance with your study abroad or F&B consulting journey. Feel free to ask any other questions, or schedule a FREE consultation to speak with our expert advisor directly!";
    }
    
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return "Thank you for chatting with me! Remember, we offer a FREE 15-minute consultation if you'd like to discuss your goals with our expert advisor. Have a great day and don't hesitate to reach out anytime!";
    }
    
    // Default response
    return "I'd be happy to help you with that! For detailed information about our study abroad and F&B consulting services, I recommend booking a FREE 15-minute consultation with our experts. You can also ask me about specific services like scholarships, university admissions, visa applications, or F&B business consulting. What specific area would you like to explore?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    
    // Generate intelligent response based on user input
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
        <div className="fixed bottom-40 right-6 z-50 w-80 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-semibold">Meg - Kunda Pathways Assistant</h3>
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
                className="flex-1 rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
