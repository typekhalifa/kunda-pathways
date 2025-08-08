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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Message from {viewMessage?.name}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMessage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="text-sm">{viewMessage.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm">{viewMessage.email}</p>
                </div>
              </div>
              
              {viewMessage.phone && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="text-sm">{viewMessage.phone}</p>
                </div>
              )}
              
              {viewMessage.subject && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Subject</Label>
                  <p className="text-sm">{viewMessage.subject}</p>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                <p className="text-sm">{formatDate(viewMessage.created_at)}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Message</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{viewMessage.message}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => {
                  setViewMessage(null);
                  handleReplyMessage(viewMessage);
                }}>
                  <Reply className="w-4 h-4 mr-2" />
                  Reply to this message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Message Dialog */}
      <Dialog open={!!replyMessage} onOpenChange={() => setReplyMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to {replyMessage?.name}</DialogTitle>
            <DialogDescription>
              Compose your reply to {replyMessage?.email}
            </DialogDescription>
          </DialogHeader>
          {replyMessage && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reply-subject">Subject</Label>
                <Input
                  id="reply-subject"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  placeholder="Enter email subject"
                />
              </div>
              
              <div>
                <Label htmlFor="reply-content">Your Reply</Label>
                <Textarea
                  id="reply-content"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={8}
                  className="resize-none"
                />
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <Label className="text-sm font-medium text-muted-foreground">Original Message</Label>
                <p className="text-sm mt-1 whitespace-pre-wrap">{replyMessage.message}</p>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={sendReply}
                  disabled={sendingReply || !replyContent.trim()}
                >
                  {sendingReply ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setReplyMessage(null)}
                  disabled={sendingReply}
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