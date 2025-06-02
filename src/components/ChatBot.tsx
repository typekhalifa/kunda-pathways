
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Kunda Pathways Assistant. I'm here to help you with study abroad opportunities in Korea and F&B consulting services. How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Comprehensive knowledge base for the bot
  const getResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Study in Korea related queries
    if (message.includes('study') || message.includes('korea') || message.includes('university') || message.includes('education')) {
      if (message.includes('scholarship')) {
        return "We offer comprehensive scholarship guidance for studying in Korea! We help with KGSP (Korean Government Scholarship Program), university-specific scholarships, and private foundation scholarships. Our success rate is over 85%. Would you like to know more about eligibility requirements?";
      }
      if (message.includes('admission') || message.includes('apply')) {
        return "Our university admission services include: application strategy, document preparation, personal statement writing, interview preparation, and application tracking. We work with top Korean universities like SNU, Yonsei, Korea University, and KAIST. Which field of study interests you?";
      }
      if (message.includes('visa')) {
        return "We provide complete visa application support including D-2 (study visa), D-4 (language training visa), and F-2 (residence visa) applications. Our team ensures all documentation is properly prepared and submitted. Processing typically takes 2-4 weeks.";
      }
      if (message.includes('language') || message.includes('korean')) {
        return "We offer Korean language training programs from beginner to advanced levels, including TOPIK exam preparation. Our certified instructors help you achieve the language proficiency needed for university admission (usually TOPIK Level 3-4).";
      }
      return "We provide comprehensive study abroad services for Korea including: scholarship guidance (KGSP & others), university admissions, visa applications, Korean language training, and post-arrival support. Which aspect would you like to know more about?";
    }
    
    // F&B Consulting related queries
    if (message.includes('food') || message.includes('beverage') || message.includes('restaurant') || message.includes('business') || message.includes('consulting')) {
      if (message.includes('market') || message.includes('analysis')) {
        return "Our F&B market analysis services include: market research, competitor analysis, consumer behavior studies, trend identification, and feasibility studies. We specialize in Korean and East Asian markets. What type of F&B business are you planning?";
      }
      if (message.includes('menu') || message.includes('product')) {
        return "We offer menu development and product consulting services including: recipe development, nutritional analysis, cost optimization, supplier sourcing, and regulatory compliance. Our MSc Food Science expert ensures quality and safety standards.";
      }
      if (message.includes('license') || message.includes('permit') || message.includes('regulation')) {
        return "We help with F&B business licensing and regulatory compliance including: business registration, food safety permits, health department approvals, and import/export documentation. We ensure full compliance with Korean regulations.";
      }
      return "Our F&B consulting services include: business planning, market analysis, menu development, regulatory compliance, supplier network access, and operational setup. We have expertise in Korean market entry and MSc Food Science background. What's your F&B business goal?";
    }
    
    // Cost and pricing queries
    if (message.includes('cost') || message.includes('price') || message.includes('fee') || message.includes('how much')) {
      return "Our service fees vary based on your specific needs. Study abroad services start from $500 for basic consultation, while comprehensive packages range $1,500-$3,000. F&B consulting starts from $800. We offer free initial consultations to discuss your requirements and provide accurate pricing.";
    }
    
    // Timeline queries
    if (message.includes('time') || message.includes('long') || message.includes('when') || message.includes('duration')) {
      return "Timelines vary by service: University applications take 3-6 months, scholarship applications 4-8 months, visa processing 2-4 weeks. F&B consulting projects typically take 2-12 weeks depending on scope. We provide detailed timelines during consultation.";
    }
    
    // Success rate queries
    if (message.includes('success') || message.includes('rate') || message.includes('guarantee')) {
      return "Our success rates: 85%+ scholarship approval rate, 95%+ university admission rate, 98%+ visa approval rate. While we can't guarantee outcomes (they depend on individual qualifications), our expertise significantly improves your chances. We provide realistic assessments during consultation.";
    }
    
    // Contact and booking queries
    if (message.includes('contact') || message.includes('book') || message.includes('appointment') || message.includes('consultation')) {
      return "Ready to get started? You can book a free 15-minute consultation through our website, email us at info@kundapathways.com, or call +82-10-1234-5678. We're available Monday-Friday 9AM-6PM KST, Saturday 10AM-4PM KST.";
    }
    
    // Location queries
    if (message.includes('location') || message.includes('where') || message.includes('office')) {
      return "We're based in Seoul, South Korea, but serve clients worldwide through online consultations. We also have partnerships with institutions across Korea and can provide in-person support for students already in Korea.";
    }
    
    // General greetings and thanks
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Kunda Pathways. Whether you're interested in studying in Korea or starting an F&B business, I'm here to help. What would you like to know about our services?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm here whenever you need assistance with your study abroad or F&B consulting journey. Feel free to ask any other questions!";
    }
    
    // Default response
    return "I'd be happy to help you with that! For detailed information about our study abroad and F&B consulting services, I recommend booking a free consultation with our experts. You can also ask me about specific services like scholarships, university admissions, visa applications, or F&B business consulting.";
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
        className="fixed bottom-24 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open chat assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 h-96 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Kunda Pathways Assistant</h3>
            <p className="text-sm text-purple-100">Online now</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
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
