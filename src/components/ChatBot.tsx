
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to help you with study abroad and F&B consulting questions. How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    
    // Simple bot response logic
    setTimeout(() => {
      const responses = [
        "Thank you for your question! For detailed information about our services, please contact us directly or book a consultation.",
        "I'd be happy to help! For specific guidance on studying in Korea, please reach out to our expert team.",
        "That's a great question about F&B consulting! Our MSc Food Science expert can provide detailed insights. Would you like to schedule a consultation?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
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
            <h3 className="font-semibold">GlobalConnect Assistant</h3>
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
