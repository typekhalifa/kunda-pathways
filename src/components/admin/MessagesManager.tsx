import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  Reply,
  Check,
  Clock
} from 'lucide-react';

const MessagesManager = () => {
  const [messages] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      subject: 'Inquiry about study programs',
      message: 'Hello, I would like to know more about your educational consulting services for studying in Korea.',
      created_at: '2024-01-15T10:30:00Z',
      is_read: false
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 234 567 8901',
      subject: 'University application help',
      message: 'I need assistance with my university application process. Can you help me with the requirements?',
      created_at: '2024-01-14T14:20:00Z',
      is_read: true
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: null,
      subject: 'Scholarship opportunities',
      message: 'Are there any scholarship opportunities available for international students?',
      created_at: '2024-01-13T09:15:00Z',
      is_read: false
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
                        <p className="font-medium text-sm mb-1">Subject: {message.subject}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="default">
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      {!message.is_read && (
                        <Button size="sm" variant="ghost">
                          <Check className="w-4 h-4 mr-2" />
                          Mark Read
                        </Button>
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
    </div>
  );
};

export default MessagesManager;