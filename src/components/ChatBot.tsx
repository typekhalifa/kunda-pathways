
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

  // Enhanced AI knowledge base with comprehensive Korea & Asia study expertise
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
      return "How to Book Your Consultation:\n\n✓ Quick Steps:\n• Click the 'Book Now' button on our website\n• Select your preferred service (Study Abroad or F&B Consulting)\n• Choose your preferred date and time\n• Fill in your contact details\n• Confirm your booking\n\n✓ You'll receive instant confirmation via email!\n\n⚡ Need faster booking? Call/WhatsApp: +250 788 123 456\n\nReady to get started? What service interests you most?";
    }
    
    // 2. Services offered - Better intent detection
    if (hasKeywords(['what', 'services']) || 
        hasKeywords(['list', 'services']) || 
        hasKeywords(['offer', 'provide']) || 
        hasKeywords(['help', 'with']) ||
        message.includes('what can you do') ||
        message.includes('what do you do')) {
      return "★ Our Complete Service Portfolio:\n\nStudy Abroad Consulting:\n• University admissions & application support\n• KGSP & scholarship guidance (85%+ success rate)\n• Visa applications & document preparation\n• Korean language training & TOPIK prep\n• Post-arrival support in Korea\n\nF&B Market Entry Support:\n• Complete business planning & strategy\n• Market research & competitive analysis\n• Menu development & food regulations\n• Operational setup & compliance\n• Korean market entry expertise\n\n★ Additional Services:\n• Document translation & apostille\n• Cultural orientation programs\n• Emergency visa support\n• Academic transcript evaluation\n\nWhich area interests you most? I can provide detailed information!";
    }
    
    // 3. Pricing questions
    if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('complete') || message.includes('package') || message.includes('full')) {
      return "Here's our pricing structure:\n\n• **Study Abroad Services:** Starting from $200\n• **F&B Complete Package:** $12,000 (currently 25% discount available!)\n• **Individual Consultations:** Starting from $50\n• **Extra Services:** Varies by service\n\nWe offer FREE 15-minute initial consultations to discuss your needs and provide accurate quotes. The F&B package includes comprehensive market entry support. Would you like to book a consultation to get a customized quote?";
    }
    
    // 4. Payment methods
    if (message.includes('pay') || message.includes('payment') || message.includes('mobile money') || message.includes('bank')) {
      return "We accept multiple payment methods for your convenience:\n\n**Mobile Money:**\n- MTN Mobile Money\n- Airtel Money\n\n**Bank Transfer:**\n- Bank of Kigali (BK)\n- Equity Bank\n- Other local banks\n\n**Cards:**\n- Debit/Credit Cards\n- International payments accepted\n\nWe'll provide payment details after your consultation booking. Which payment method would be most convenient for you?";
    }
    
    // 5. Discounts and promotions
    if (message.includes('discount') || message.includes('promo') || message.includes('offer') || message.includes('sale')) {
      return "✓ Yes, we have active promotions!\n\n★ Current Offer: 25% OFF on our F&B Complete Package (normally $16,000, now $12,000)\n★ Study Abroad: Early bird discounts available for next semester applications\n★ First-time clients: FREE initial consultation (15 minutes)\n\nThese promotions are limited time offers. Would you like to book a consultation to learn more about how these discounts apply to your specific needs?";
    }
    
    // 6. Location
    if (message.includes('where') || message.includes('location') || message.includes('office') || message.includes('address')) {
      return "★ Our Location:\n\nWe operate primarily online to serve clients globally, but our head office is located in Kigali, Rwanda.\n\n★ Virtual Services: Most consultations are conducted online via Zoom/Google Meet for convenience\n★ In-person meetings: Available in Kigali by appointment\n★ Contact: +250 788 123 456\n★ Email: info@kundapathways.com\n\nWould you prefer an online or in-person consultation?";
    }
    
    // 7. Reschedule consultation
    if (message.includes('reschedule') || message.includes('change') || message.includes('move')) {
      return "★ Rescheduling Your Consultation:\n\nYes, you can reschedule! Here's how:\n\n★ Notice Required: Please contact us at least 24 hours before your scheduled appointment\n★ Contact Methods:\n- Call/WhatsApp: +250 788 123 456\n- Email: info@kundapathways.com\n\n✓ We'll help you find a new time slot that works for both parties\n\nDo you need to reschedule an existing appointment?";
    }
    
    // 8. Email/booking issues
    if (message.includes('email') || message.includes('confirmation') || message.includes('booking') || message.includes('didn') || message.includes('through')) {
      return "★ Booking & Email Issues - Let's fix this!\n\n★ Troubleshooting steps:\n1. Check your spam/junk folder\n2. Verify the email address you provided\n3. Wait up to 10 minutes for delivery\n\n★ Immediate Support:\n- Call/WhatsApp: +250 788 123 456\n- Email: info@kundapathways.com\n\n✓ We'll verify your booking and resend confirmation immediately\n\nWhat email address did you use for booking? I can help you resolve this right away!";
    }
    
    // 9. Korea & Asia Study Abroad (Comprehensive Knowledge)
    if (hasKeywords(['korea', 'korean', 'seoul', 'busan', 'kaist', 'postech', 'snu', 'yonsei']) ||
        hasKeywords(['asian', 'asia', 'japan', 'china', 'singapore', 'hong kong', 'malaysia']) ||
        hasKeywords(['topik', 'kgsp', 'korean government scholarship', 'k-pop', 'korean culture'])) {
      
      if (hasKeywords(['university', 'universities', 'college', 'admission'])) {
        return "★ Top Korean Universities & Admissions:\n\n★ SKY Universities (Top 3):\n• Seoul National University (SNU) - #1 in Korea\n• Korea University - Strong liberal arts & business\n• Yonsei University - International programs\n\n★ STEM Excellence:\n• KAIST - Engineering & Technology\n• POSTECH - Science & Engineering\n• UNIST - Science & Technology\n\n★ Other Top Choices:\n• Hanyang University - Engineering focus\n• Ewha Womans University - Women's education leader\n• Sungkyunkwan University - Business & medicine\n• HUFS - Foreign languages & international studies\n\n★ Application Seasons:\n• Spring: Sept-Nov (starts March)\n• Fall: Feb-May (starts September)\n\nWhich field interests you most? I can provide specific admission requirements!";
      }
      
      if (hasKeywords(['scholarship', 'kgsp', 'funding', 'financial aid'])) {
        return "★ Korean Scholarship Opportunities:\n\n★ KGSP (Korean Government Scholarship):\n• Full tuition coverage + living allowance\n• Monthly stipend: 900,000-1,000,000 KRW\n• Korean language training included\n• Flight tickets covered\n• 85%+ success rate with our guidance\n\n★ University Scholarships:\n• Merit-based: 25-100% tuition coverage\n• Need-based: Financial assistance\n• Exchange programs: Semester/year abroad\n\n★ Application Requirements:\n• Bachelor's degree (for Master's)\n• GPA: 2.64+ (KGSP requirement)\n• English proficiency: TOEFL/IELTS\n• Health certificate & clean criminal record\n\n★ Deadlines:\n• KGSP: February-May annually\n• University scholarships: Vary by institution\n\nReady to apply? Our success rate is 85%+ for KGSP applications!";
      }
      
      if (hasKeywords(['topik', 'korean language', 'language requirement'])) {
        return "★ Korean Language & TOPIK Guide:\n\n★ TOPIK Levels:\n• TOPIK I (Levels 1-2): Basic communication\n• TOPIK II (Levels 3-6): Academic & professional\n\n★ University Requirements:\n• Undergraduate: TOPIK 3+ (Korean programs)\n• Graduate: TOPIK 4+ recommended\n• English programs: No TOPIK required\n\n★ Test Schedule:\n• 6 times per year globally\n• Registration: 2 months before test\n• Results: 1 month after test\n\n★ Preparation Timeline:\n• Level 1-2: 3-6 months\n• Level 3-4: 6-12 months\n• Level 5-6: 12-18 months\n\n★ Language Schools in Korea:\n• University language centers\n• Private institutes (hagwons)\n• Online programs available\n\nNeed TOPIK preparation guidance? We provide comprehensive training!";
      }
      
      return "★ Korea Study Abroad - Complete Guide!\n\nOur expertise covers:\n✓ University admissions (SKY, KAIST, POSTECH)\n✓ KGSP scholarship applications (85% success)\n✓ Visa applications & documentation\n✓ TOPIK preparation & language training\n✓ Cultural orientation & arrival support\n\n★ We also assist with other Asian destinations:\n• Japan: University of Tokyo, Kyoto University\n• Singapore: NUS, NTU\n• Hong Kong: HKU, HKUST\n• China: Tsinghua, Peking University\n\nWhich country/program interests you most?";
    }
    
    // 10. Detailed Program Information
    if (hasKeywords(['program', 'major', 'course', 'field of study', 'engineering', 'business', 'medicine', 'arts'])) {
      if (hasKeywords(['engineering', 'computer science', 'tech', 'it'])) {
        return "★ Engineering & Technology Programs in Korea:\n\n★ Top Engineering Universities:\n• KAIST - #1 for engineering globally\n• POSTECH - Research-focused excellence\n• SNU Engineering - Comprehensive programs\n• Hanyang University - Industry connections\n\n★ Popular Programs:\n• Computer Science & AI\n• Electrical & Electronic Engineering\n• Mechanical Engineering\n• Chemical Engineering\n• Biomedical Engineering\n\n★ Career Prospects:\n• Samsung, LG Electronics\n• Hyundai Motors, SK Group\n• Naver, Kakao (tech companies)\n• Global tech opportunities\n\n★ Program Duration:\n• Bachelor's: 4 years\n• Master's: 2 years\n• PhD: 3-4 years\n\nInterested in a specific engineering field?";
      }
      
      if (hasKeywords(['business', 'mba', 'management', 'economics'])) {
        return "★ Business & Management Programs in Korea:\n\n★ Top Business Schools:\n• Seoul National University Business School\n• Korea University Business School\n• Yonsei School of Business\n• KAIST Graduate School of Management\n\n★ Popular Programs:\n• International Business\n• Finance & Banking\n• Marketing & Brand Management\n• Technology Management\n• Entrepreneurship\n\n★ Global Opportunities:\n• Chaebols (Samsung, LG, Hyundai)\n• Korean wave (K-pop, entertainment)\n• Fintech & e-commerce\n• International trade\n\n★ ROI:\n• Average starting salary: 35-50M KRW/year\n• Rapid career advancement\n• Global networking opportunities\n\nWhich business specialization interests you?";
      }
      
      return "★ Academic Programs in Korea:\n\n★ Popular Fields:\n• Engineering & Technology (KAIST, POSTECH)\n• Business & Economics (SNU, Korea Univ)\n• Medicine & Healthcare (various universities)\n• Arts & Design (Hongik, Ewha)\n• International Studies (HUFS, Yonsei)\n• Korean Studies & Culture\n\n★ Unique Advantages:\n• Cutting-edge research facilities\n• Industry-academia partnerships\n• Cultural immersion opportunities\n• Gateway to Asian markets\n• High-quality education at affordable costs\n\nWhich field would you like to explore in detail?";
    }
    
    // 11. Visa & Immigration Information
    if (hasKeywords(['visa', 'immigration', 'documents', 'd-2', 'd-4', 'student visa'])) {
      return "★ Korean Student Visa Guide:\n\n★ Visa Types:\n• D-2: Degree-seeking students (Bachelor's/Master's/PhD)\n• D-4: Language training students\n• D-4-1: General Korean language programs\n• D-4-6: University language programs\n\n★ Required Documents:\n• Passport (6+ months validity)\n• Certificate of Admission\n• Financial proof (bank statements)\n• Health certificate & background check\n• Academic transcripts (apostilled)\n• Visa application form\n\n★ Financial Requirements:\n• Undergraduate: $18,000+ USD\n• Graduate: $20,000+ USD\n• Language students: $9,000+ USD\n\n★ Processing Time:\n• 5-10 business days (standard)\n• Express service available\n\n★ Extensions & Changes:\n• Extend before expiration\n• Change status possible\n\nNeed help with visa documentation? We provide complete support!";
    }
    
    // 12. Living in Korea Information
    if (hasKeywords(['living', 'cost', 'accommodation', 'dorm', 'housing', 'life in korea'])) {
      return "★ Living in Korea - Complete Guide:\n\n★ Monthly Living Costs:\n• Seoul: $800-1,200 USD\n• Other cities: $600-900 USD\n• Dormitory: $200-400 USD/month\n• Off-campus housing: $300-800 USD/month\n\n★ Food & Dining:\n• Campus meals: $3-5 USD\n• Local restaurants: $5-10 USD\n• Groceries: $200-300 USD/month\n• Convenience stores: 24/7 availability\n\n★ Transportation:\n• Subway/bus pass: $45-55 USD/month\n• Student discounts available\n• Excellent public transport system\n\n★ Mobile & Internet:\n• Mobile plan: $30-50 USD/month\n• High-speed internet included in dorms\n• Free WiFi widely available\n\n★ Healthcare:\n• National Health Insurance mandatory\n• Student rate: ~$20 USD/month\n• Quality healthcare system\n\nWant specific information about any aspect of Korean life?";
    }
    
    // 13. Korean Culture & Language
    if (hasKeywords(['culture', 'korean culture', 'k-pop', 'k-drama', 'tradition', 'customs'])) {
      return "★ Korean Culture & Student Life:\n\n★ Cultural Highlights:\n• K-pop phenomenon (BTS, Blackpink, etc.)\n• K-dramas & Korean cinema\n• Traditional festivals (Chuseok, Lunar New Year)\n• Taekwondo & traditional martial arts\n• Buddhist temples & Confucian heritage\n\n★ Campus Culture:\n• Strong senior-junior relationships (sunbae-hoobae)\n• Active club activities (동아리)\n• Festival seasons (spring/fall)\n• Study groups & academic cooperation\n\n★ Food Culture:\n• Korean BBQ & hot pot\n• Street food culture\n• Cafe culture for studying\n• Seasonal specialties\n\n★ Modern vs Traditional:\n• High-tech smart cities\n• Traditional palaces & hanok villages\n• Work-life balance awareness\n• Innovation & tradition blend\n\n★ Social Etiquette:\n• Respect for elders\n• Group harmony importance\n• Gift-giving customs\n• Bowing & formal greetings\n\nCurious about any specific cultural aspect?";
    }
    
    // 14. Other Asian Countries
    if (hasKeywords(['japan', 'china', 'singapore', 'hong kong', 'malaysia', 'asian countries'])) {
      return "★ Study in Other Asian Destinations:\n\n★ Japan:\n• University of Tokyo, Kyoto University\n• MEXT scholarships available\n• Strong in robotics, engineering\n• Cultural immersion opportunities\n\n★ Singapore:\n• National University of Singapore (NUS)\n• Nanyang Technological University (NTU)\n• English-taught programs\n• Gateway to Southeast Asia\n\n★ Hong Kong:\n• University of Hong Kong (HKU)\n• Hong Kong University of Science & Technology\n• International business hub\n• East-meets-West culture\n\n★ China:\n• Tsinghua University, Peking University\n• Chinese Government Scholarships\n• Largest education system globally\n• Rapidly growing economy\n\n★ Malaysia:\n• University of Malaya\n• Affordable education costs\n• Multicultural environment\n• Growing tech sector\n\nWhich Asian destination interests you most?";
    }
    
    // 15. Talk to human/live agent
    if (message.includes('human') || message.includes('agent') || message.includes('person') || message.includes('talk') || message.includes('speak')) {
      return "★ Connect with Our Human Experts!\n\n★ Direct Contact:\n- Phone/WhatsApp: +250 788 123 456\n- Email: info@kundapathways.com\n\n★ Business Hours:\n- Monday-Friday: 8 AM - 6 PM (EAT)\n- Saturday: 9 AM - 2 PM (EAT)\n- Emergency support available\n\n★ Or book a consultation: Our expert advisors are ready to discuss your goals in detail!\n\nWould you like me to help you schedule a call with our team right now?";
    }
    
    // Enhanced Study in Korea related queries
    if (message.includes('study') || message.includes('education') || message.includes('scholarship')) {
      if (message.includes('scholarship')) {
        return "★ Comprehensive Scholarship Guide for Korea & Asia:\n\n★ Korean Scholarships:\n• KGSP: Full coverage + living allowance\n• University scholarships: 25-100% tuition\n• Provincial government scholarships\n• Private foundation scholarships\n\n★ Other Asian Scholarships:\n• Japan: MEXT scholarships\n• Singapore: Government scholarships\n• China: Chinese Government Scholarships\n• Hong Kong: HKPFS for research\n\n★ Our Success Statistics:\n• KGSP: 85%+ acceptance rate\n• University scholarships: 90%+ rate\n• Complete application support\n• Interview preparation included\n\nReady to apply? Let's discuss your scholarship strategy!";
      }
      return "★ Comprehensive Study Abroad Services for Asia:\n\n★ Our Specialties:\n• Korea: Complete university & scholarship support\n• Japan: University admissions & MEXT scholarships\n• Singapore: NUS, NTU applications\n• China: Top university placements\n• Hong Kong: Research & business programs\n\n★ Complete Support Package:\n• University selection & applications\n• Scholarship applications & strategies\n• Visa processing & documentation\n• Language preparation (Korean/Japanese/Chinese)\n• Pre-departure orientation\n• Post-arrival support\n\n★ Investment: Starting from $200\n★ Success Rate: 95%+ admissions\n\nReady to start your Asian education journey?";
    }
    
    // F&B Consulting related queries
    if (message.includes('food') || message.includes('beverage') || message.includes('restaurant') || message.includes('business') || message.includes('consulting')) {
      return "★ F&B Market Entry Support: Business planning, market analysis, menu development, regulatory compliance, and operational setup. Our complete package is $12,000 (25% discount available!). We have MSc Food Science expertise and Korean market specialization. Ready to expand your F&B business?";
    }
    
    // Contact information queries
    if (message.includes('contact') || message.includes('phone') || message.includes('reach')) {
      return "📞 Contact Us: Phone/WhatsApp: +250 788 123 456 | 📧 Email: info@kundapathways.com | ⏰ Hours: Mon-Fri 8AM-6PM, Sat 9AM-2PM (EAT). Would you prefer a scheduled consultation or immediate contact?";
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
      "📋 How to book a consultation",
      "💵 Service pricing information", 
      "💳 Payment methods accepted",
      "📍 Our location & contact info",
      "🎓 Korean university applications",
      "🍽 F&B business consulting"
    ];
    
    return `I'd be happy to help! 🤖 Here are some topics I can assist with:\n\n${commonQuestions.join('\n')}\n\n💬 Just ask me about any of these, or feel free to ask anything else!\n\n🆓 Remember: We offer FREE 15-minute consultations with our expert advisors. Would you like me to help you schedule one?`;
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
