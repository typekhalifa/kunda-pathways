import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  Reply,
  Check,
  Clock,
  Send,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at: string;
  is_read: boolean;
  replied_at?: string;
}

const MessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState<ContactMessage | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, is_read: true } : msg
        )
      );
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message');
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setViewMessage(message);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const handleReplyMessage = (message: ContactMessage) => {
    setReplyMessage(message);
    setReplySubject(`Re: ${message.subject || 'Your inquiry'}`);
    setReplyContent('');
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const sendReply = async () => {
    if (!replyMessage || !replyContent.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    setSendingReply(true);
    try {
      const { error } = await supabase.functions.invoke('send-reply-email', {
        body: {
          to: replyMessage.email,
          subject: replySubject,
          message: replyContent,
          originalMessage: replyMessage.message,
          customerName: replyMessage.name
        }
      });

      if (error) throw error;

      // Update the message as replied
      await supabase
        .from('contact_messages')
        .update({ replied_at: new Date().toISOString() })
        .eq('id', replyMessage.id);

      setMessages(prev => 
        prev.map(msg => 
          msg.id === replyMessage.id 
            ? { ...msg, replied_at: new Date().toISOString() } 
            : msg
        )
      );

      toast.success('Reply sent successfully!');
      setReplyMessage(null);
      setReplyContent('');
      setReplySubject('');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(msg => !msg.is_read).length;
  const totalCount = messages.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{totalCount}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Check className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{totalCount - unreadCount}</p>
                <p className="text-sm text-muted-foreground">Read Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Messages
            </div>
            <Badge variant="secondary">{unreadCount} unread</Badge>
          </CardTitle>
          <CardDescription>
            View and respond to customer inquiries and contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={`transition-all duration-200 ${!message.is_read ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{message.name}</h3>
                        {!message.is_read && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {message.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(message.created_at)}
                        </div>
                      </div>

                      <div className="mb-3">
                        {message.subject && (
                          <p className="font-medium text-sm mb-1">Subject: {message.subject}</p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {message.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleReplyMessage(message)}
                      >
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      {!message.is_read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markAsRead(message.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Mark Read
                        </Button>
                      )}
                      {message.replied_at && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Replied
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">Messages from your contact form will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={!!viewMessage} onOpenChange={() => setViewMessage(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 rounded-3xl border-2 border-slate-200/50 dark:border-slate-700/50 shadow-2xl backdrop-blur-sm">
          <DialogHeader className="pb-6 border-b border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    Message from {viewMessage?.name}
                  </DialogTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Customer inquiry details
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMessage(null)}
                className="rounded-xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
          
          {viewMessage && (
            <div className="space-y-6 py-6 overflow-y-auto max-h-[60vh]">
              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <Label className="text-sm font-bold text-blue-700 dark:text-blue-300">Email Address</Label>
                    </div>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-11">{viewMessage.email}</p>
                  </div>
                  
                  {viewMessage.phone && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-2xl border border-green-200/50 dark:border-green-700/50">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <Label className="text-sm font-bold text-green-700 dark:text-green-300">Phone Number</Label>
                      </div>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-11">{viewMessage.phone}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {viewMessage.subject && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <Label className="text-sm font-bold text-purple-700 dark:text-purple-300">Subject</Label>
                      </div>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-11">{viewMessage.subject}</p>
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 rounded-2xl border border-orange-200/50 dark:border-orange-700/50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <Label className="text-sm font-bold text-orange-700 dark:text-orange-300">Date Received</Label>
                    </div>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-11">{formatDate(viewMessage.created_at)}</p>
                  </div>
                </div>
              </div>
              
              {/* Message Content */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 p-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-600/50 shadow-inner">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-4">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Customer Message</Label>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm">
                  <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">{viewMessage.message}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button 
                  onClick={() => {
                    setViewMessage(null);
                    handleReplyMessage(viewMessage);
                  }}
                  className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Reply className="w-5 h-5 mr-3" />
                  Reply to Customer
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setViewMessage(null)}
                  className="px-8 h-14 rounded-2xl border-2 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Message Dialog */}
      <Dialog open={!!replyMessage} onOpenChange={() => setReplyMessage(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 rounded-3xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-2xl backdrop-blur-sm">
          <DialogHeader className="pb-6 border-b border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Reply className="w-7 h-7 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                  Reply to {replyMessage?.name}
                </DialogTitle>
                <DialogDescription className="text-lg text-slate-600 dark:text-slate-400 mt-1">
                  Compose your response to <span className="font-semibold text-blue-600 dark:text-blue-400">{replyMessage?.email}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {replyMessage && (
            <div className="space-y-6 py-6 overflow-y-auto max-h-[70vh]">
              {/* Subject Field */}
              <div className="space-y-3">
                <Label htmlFor="reply-subject" className="text-base font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  Email Subject
                </Label>
                <Input
                  id="reply-subject"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="h-14 text-lg rounded-2xl border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-inner"
                />
              </div>
              
              {/* Reply Content */}
              <div className="space-y-3">
                <Label htmlFor="reply-content" className="text-base font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                  Your Reply
                </Label>
                <Textarea
                  id="reply-content"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Type your professional reply here..."
                  rows={10}
                  className="resize-none text-lg rounded-2xl border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-inner leading-relaxed"
                />
              </div>
              
              {/* Original Message Reference */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/70 dark:to-slate-700/70 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-600 shadow-inner">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-slate-600 rounded-xl flex items-center justify-center mr-3">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <Label className="text-base font-bold text-slate-700 dark:text-slate-300">Original Customer Message</Label>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-300 dark:border-slate-600 shadow-sm">
                  <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-600 dark:text-slate-400 italic">
                    "{replyMessage.message}"
                  </p>
                </div>
                <div className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                  Received on {formatDate(replyMessage.created_at)}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
                <Button
                  onClick={sendReply}
                  disabled={sendingReply || !replyContent.trim()}
                  className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
                >
                  {sendingReply ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Sending Reply...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 mr-3" />
                      Send Professional Reply
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setReplyMessage(null)}
                  disabled={sendingReply}
                  className="px-8 h-16 rounded-2xl border-2 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesManager;