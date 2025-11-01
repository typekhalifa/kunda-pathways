
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hello! I'm Aria, your AI-powered Kunda Pathways Assistant. I'm here to help you with study abroad opportunities in Korea and F&B consulting services. How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Convert phone numbers, emails, and URLs to clickable links
  const processMessageText = useCallback((text: string) => {
    let processed = text;

    // Replace website URLs with clickable links (must be before phone number regex)
    processed = processed.replace(/(https?:\/\/[^\s<]+[^\s<.,;!?)])/g, (match) => {
      return `[${match}](${match})`;
    });

    // Replace phone numbers with WhatsApp links (including formats like +82-10 2607-7012)
    processed = processed.replace(/(\+?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{3,4}[-\s]?\d{3,4})/g, (match) => {
      const cleanNumber = match.replace(/[\s-]/g, '');
      const message = encodeURIComponent("Hi, I would like to request a free 15 mins consultation so that we can talk.");
      return `[${match}](https://wa.me/${cleanNumber}?text=${message})`;
    });

    // Replace email addresses with mailto links
    processed = processed.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, (match) => {
      const subject = encodeURIComponent("Requesting free 15 mins consultation");
      return `[${match}](mailto:${match}?subject=${subject})`;
    });

    return processed;
  }, []);

  // Custom markdown components for styling links
  const markdownComponents: Components = {
    a: ({ node, children, href, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        {...props}
      >
        {children}
      </a>
    ),
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = useCallback((input: string) => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .trim();
  }, []);

  // Stream AI response from edge function
  const streamAIResponse = useCallback(async (userMessage: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/aria-chat`;
    
    // Build conversation history for context
    const conversationHistory = messages.map(msg => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text
    }));

    // Add current user message
    conversationHistory.push({
      role: "user",
      content: userMessage
    });

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: conversationHistory,
          sessionId 
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to start AI stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantText = "";

      // Add initial empty assistant message
      setMessages(prev => [...prev, { text: "", isBot: true }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              // Update the last message with accumulated text
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { text: assistantText, isBot: true };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error("Error streaming AI response:", error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at +250 788 123 456.", 
        isBot: true 
      }]);
      setIsTyping(false);
    }
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    const sanitized = sanitizeInput(inputMessage);
    if (!sanitized || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { text: sanitized, isBot: false }]);
    setInputMessage("");
    setIsTyping(true);

    // Stream AI response
    streamAIResponse(sanitized);
  }, [inputMessage, isTyping, sanitizeInput, streamAIResponse]);

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
        className="fixed bottom-24 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open chat assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 sm:w-80 h-96 sm:h-96 max-h-[calc(100vh-200px)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden md:w-96 md:h-[500px]">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" alt="Aria Assistant" />
                <AvatarFallback className="bg-white/20 text-white text-xs">AR</AvatarFallback>
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
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    message.isBot
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600 prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  }`}
                >
                  {message.isBot ? (
                    <ReactMarkdown components={markdownComponents}>
                      {processMessageText(message.text)}
                    </ReactMarkdown>
                  ) : (
                    <span className="whitespace-pre-line">{message.text}</span>
                  )}
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
                className="bg-blue-500 hover:bg-blue-600 rounded-xl px-4 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
