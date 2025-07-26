
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Aria, your Kunda Pathways Assistant. I'm here to help you with study abroad opportunities in Korea and F&B consulting services. How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sanitize input to prevent XSS
  const sanitizeInput = useCallback((input: string) => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .trim();
  }, []);

  // Enhanced AI knowledge base with better intent matching
  const getResponse = useCallback((userMessage: string) => {
    const message = userMessage.toLowerCase().trim();
    
    // Multi-keyword matching for better intent detection
    const hasKeywords = (keywords: string[]) => 
      keywords.some(keyword => message.includes(keyword.toLowerCase()));
    
    const hasAllKeywords = (keywords: string[]) => 
      keywords.every(keyword => message.includes(keyword.toLowerCase()));
    
    // 1. How to book consultation - Enhanced matching
    if (hasKeywords(['book', 'schedule', 'appointment']) || 
        hasAllKeywords(['how', 'book']) || 
        hasKeywords(['consultation', 'meeting']) && hasKeywords(['book', 'schedule'])) {
      return "📅 **How to Book Your Consultation:**\n\n✅ **Quick Steps:**\n1️⃣ Click the 'Book Now' button on our website\n2️⃣ Select your preferred service (Study Abroad or F&B Consulting)\n3️⃣ Choose your preferred date and time\n4️⃣ Fill in your contact details\n5️⃣ Confirm your booking\n\n📧 You'll receive instant confirmation via email!\n\n🚀 **Need faster booking?** Call/WhatsApp: +250 788 123 456\n\nReady to get started? What service interests you most?";
    }
    
    // 2. Services offered - Better intent detection
    if (hasKeywords(['what', 'services']) || 
        hasKeywords(['list', 'services']) || 
        hasKeywords(['offer', 'provide']) || 
        hasKeywords(['help', 'with']) ||
        message.includes('what can you do') ||
        message.includes('what do you do')) {
      return "🌟 **Our Complete Service Portfolio:**\n\n📚 **Study Abroad Consulting:**\n• University admissions & application support\n• KGSP & scholarship guidance (85%+ success rate)\n• Visa applications & document preparation\n• Korean language training & TOPIK prep\n• Post-arrival support in Korea\n\n🍽️ **F&B Market Entry Support:**\n• Complete business planning & strategy\n• Market research & competitive analysis\n• Menu development & food regulations\n• Operational setup & compliance\n• Korean market entry expertise\n\n⭐ **Additional Services:**\n• Document translation & apostille\n• Cultural orientation programs\n• Emergency visa support\n• Academic transcript evaluation\n\n💡 **Which area interests you most?** I can provide detailed information!";
    }
    
    // 3. Pricing questions
    if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('complete') || message.includes('package') || message.includes('full')) {
      return "Here's our pricing structure:\n\n💰 **Study Abroad Services:** Starting from $200\n💰 **F&B Complete Package:** $12,000 (currently 25% discount available!)\n💰 **Individual Consultations:** Starting from $50\n💰 **Extra Services:** Varies by service\n\nWe offer FREE 15-minute initial consultations to discuss your needs and provide accurate quotes. The F&B package includes comprehensive market entry support. Would you like to book a consultation to get a customized quote?";
    }
    
    // 4. Payment methods
    if (message.includes('pay') || message.includes('payment') || message.includes('mobile money') || message.includes('bank')) {
      return "We accept multiple payment methods for your convenience:\n\n📱 **Mobile Money:**\n- MTN Mobile Money\n- Airtel Money\n\n🏦 **Bank Transfer:**\n- Bank of Kigali (BK)\n- Equity Bank\n- Other local banks\n\n💳 **Cards:**\n- Debit/Credit Cards\n- International payments accepted\n\nWe'll provide payment details after your consultation booking. Which payment method would be most convenient for you?";
    }
    
    // 5. Discounts and promotions
    if (message.includes('discount') || message.includes('promo') || message.includes('offer') || message.includes('sale')) {
      return "🎉 **Yes, we have active promotions!**\n\n✨ **Current Offer:** 25% OFF on our F&B Complete Package (normally $16,000, now $12,000)\n✨ **Study Abroad:** Early bird discounts available for next semester applications\n✨ **First-time clients:** FREE initial consultation (15 minutes)\n\nThese promotions are limited time offers. Would you like to book a consultation to learn more about how these discounts apply to your specific needs?";
    }
    
    // 6. Location
    if (message.includes('where') || message.includes('location') || message.includes('office') || message.includes('address')) {
      return "📍 **Our Location:**\n\nWe operate primarily online to serve clients globally, but our head office is located in **Kigali, Rwanda**.\n\n🌐 **Virtual Services:** Most consultations are conducted online via Zoom/Google Meet for convenience\n🏢 **In-person meetings:** Available in Kigali by appointment\n📞 **Contact:** +250 788 123 456\n📧 **Email:** info@kundapathways.com\n\nWould you prefer an online or in-person consultation?";
    }
    
    // 7. Reschedule consultation
    if (message.includes('reschedule') || message.includes('change') || message.includes('move')) {
      return "📅 **Rescheduling Your Consultation:**\n\nYes, you can reschedule! Here's how:\n\n⏰ **Notice Required:** Please contact us at least 24 hours before your scheduled appointment\n📞 **Contact Methods:**\n- Call/WhatsApp: +250 788 123 456\n- Email: info@kundapathways.com\n\n✅ **We'll help you find a new time slot that works for both parties**\n\nDo you need to reschedule an existing appointment?";
    }
    
    // 8. Email/booking issues
    if (message.includes('email') || message.includes('confirmation') || message.includes('booking') || message.includes('didn') || message.includes('through')) {
      return "📧 **Booking & Email Issues - Let's fix this!**\n\n🔍 **Troubleshooting steps:**\n1. Check your spam/junk folder\n2. Verify the email address you provided\n3. Wait up to 10 minutes for delivery\n\n📞 **Immediate Support:**\n- Call/WhatsApp: +250 788 123 456\n- Email: info@kundapathways.com\n\n✅ **We'll verify your booking and resend confirmation immediately**\n\nWhat email address did you use for booking? I can help you resolve this right away!";
    }
    
    // 9. Korean university applications
    if (message.includes('korean') || message.includes('university') || message.includes('application') || message.includes('korea')) {
      return "🇰🇷 **Yes! Korean University Applications is our specialty!**\n\nWe help with:\n✅ **Top Universities:** Seoul National, Yonsei, Korea University, KAIST, POSTECH\n✅ **Application Strategy:** Program selection, requirements, deadlines\n✅ **Documentation:** Personal statements, recommendation letters, portfolios\n✅ **Scholarships:** KGSP, university-specific scholarships\n✅ **Language:** TOPIK preparation, language school options\n\n🎯 **Success Rate:** 95%+ acceptance rate\n💰 **Starting from:** $200\n\nWhich field of study interests you? Let's discuss your Korean university goals!";
    }
    
    // 10. Talk to human/live agent
    if (message.includes('human') || message.includes('agent') || message.includes('person') || message.includes('talk') || message.includes('speak')) {
      return "👥 **Connect with Our Human Experts!**\n\n📞 **Direct Contact:**\n- Phone/WhatsApp: +250 788 123 456\n- Email: info@kundapathways.com\n\n⏰ **Business Hours:**\n- Monday-Friday: 8 AM - 6 PM (EAT)\n- Saturday: 9 AM - 2 PM (EAT)\n- Emergency support available\n\n🗓️ **Or book a consultation:** Our expert advisors are ready to discuss your goals in detail!\n\nWould you like me to help you schedule a call with our team right now?";
    }
    
    // Study in Korea related queries
    if (message.includes('study') || message.includes('education') || message.includes('scholarship')) {
      if (message.includes('scholarship')) {
        return "🏆 **Scholarship Opportunities in Korea!** We specialize in KGSP (Korean Government Scholarship Program) and university-specific scholarships. Our success rate is 85%+. We help with application strategies, document preparation, and interview coaching. Starting from $200. Would you like to schedule a consultation to discuss scholarships for your field?";
      }
      return "📚 **Study Abroad Services for Korea:** University admissions, scholarship guidance, visa applications, Korean language training, and post-arrival support. Services range from $200-$3,000. We offer FREE 15-minute initial consultations. Ready to start your Korean education journey?";
    }
    
    // F&B Consulting related queries
    if (message.includes('food') || message.includes('beverage') || message.includes('restaurant') || message.includes('business') || message.includes('consulting')) {
      return "🍽️ **F&B Market Entry Support:** Business planning, market analysis, menu development, regulatory compliance, and operational setup. Our complete package is $12,000 (25% discount available!). We have MSc Food Science expertise and Korean market specialization. Ready to expand your F&B business?";
    }
    
    // Contact information queries
    if (message.includes('contact') || message.includes('phone') || message.includes('reach')) {
      return "📞 **Contact Us:** Phone/WhatsApp: +250 788 123 456 | 📧 Email: info@kundapathways.com | ⏰ Hours: Mon-Fri 8AM-6PM, Sat 9AM-2PM (EAT). Would you prefer a scheduled consultation or immediate contact?";
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good')) {
      return "Hello! 👋 Welcome to Kunda Pathways! I'm Aria, your personal assistant. I can help you with Study Abroad opportunities in Korea or F&B business consulting. What brings you here today? Are you interested in education or business consulting?";
    }
    
    // Thanks
    if (message.includes('thank') || message.includes('appreciate')) {
      return "You're absolutely welcome! 😊 I'm here to help you achieve your goals. Remember, we offer FREE 15-minute consultations with our expert advisors. Feel free to ask me anything else about our services!";
    }
    
    // Goodbye
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Thank you for chatting with me! 👋 Before you go, remember our FREE 15-minute consultation offer. Whether it's studying in Korea or F&B consulting, we're here to support your dreams. Have a wonderful day!";
    }
    
    // Default response with smart suggestions
    const commonQuestions = [
      "📅 How to book a consultation",
      "🏷️ Service pricing information", 
      "💳 Payment methods accepted",
      "📍 Our location & contact info",
      "🎓 Korean university applications",
      "🍽️ F&B business consulting"
    ];
    
    return `I'd be happy to help! 🤖 Here are some topics I can assist with:\n\n${commonQuestions.join('\n')}\n\n💬 **Just ask me about any of these, or feel free to ask anything else!**\n\n🆓 **Remember:** We offer FREE 15-minute consultations with our expert advisors. Would you like me to help you schedule one?`;
  }, []);

  const handleSendMessage = useCallback(() => {
    const sanitizedInput = sanitizeInput(inputMessage);
    if (!sanitizedInput.trim()) return;

    // Add user message immediately
    setMessages(prev => [...prev, { text: sanitizedInput, isBot: false }]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate more natural response timing (300-800ms)
    const responseTime = Math.random() * 500 + 300;
    
    setTimeout(() => {
      const response = getResponse(sanitizedInput);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, responseTime);
  }, [inputMessage, sanitizeInput, getResponse]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

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
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    message.isBot
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Aria is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={handleKeyPress}
                disabled={isTyping}
                maxLength={1000}
                className="flex-1 rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm disabled:opacity-50"
              />
              <Button 
                onClick={handleSendMessage}
                size="sm"
                disabled={isTyping || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl px-4 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
