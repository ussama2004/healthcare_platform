import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { ArrowLeft, Send, Paperclip, Phone, Video } from 'lucide-react';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'patient' | 'nurse' | 'admin';
  participantAvatar?: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

// Mock conversation data
const mockConversation: Conversation = {
  id: '1',
  participantId: '2',
  participantName: 'Sara Ali',
  participantRole: 'nurse',
  isOnline: true
};

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '2',
    senderName: 'Sara Ali',
    text: 'Hello! How can I help you today?',
    timestamp: '2025-06-12T10:00:00Z',
    status: 'read'
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '1',
    senderName: 'Ahmed Hassan',
    text: 'I wanted to ask about the Blood Pressure Monitoring service.',
    timestamp: '2025-06-12T10:02:00Z',
    status: 'read'
  },
  {
    id: '3',
    conversationId: '1',
    senderId: '2',
    senderName: 'Sara Ali',
    text: 'Of course! The Blood Pressure Monitoring service includes regular measurements of your blood pressure using professional equipment. I can visit your home on a scheduled basis to perform the measurements and maintain a record of your readings over time.',
    timestamp: '2025-06-12T10:05:00Z',
    status: 'read'
  },
  {
    id: '4',
    conversationId: '1',
    senderId: '1',
    senderName: 'Ahmed Hassan',
    text: 'That sounds great. How often do you recommend monitoring for someone with hypertension?',
    timestamp: '2025-06-12T10:07:00Z',
    status: 'read'
  },
  {
    id: '5',
    conversationId: '1',
    senderId: '2',
    senderName: 'Sara Ali',
    text: 'For patients with hypertension, I typically recommend monitoring 2-3 times per week to establish a pattern. Once we have consistent readings, we might adjust to once a week or as advised by your doctor.',
    timestamp: '2025-06-12T10:10:00Z',
    status: 'read'
  },
  {
    id: '6',
    conversationId: '1',
    senderId: '1',
    senderName: 'Ahmed Hassan',
    text: 'Perfect. When will you be available for the next appointment?',
    timestamp: '2025-06-12T14:30:00Z',
    status: 'read'
  }
];

const ChatRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // In a real app, we would fetch the conversation and messages from the backend
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setConversation(mockConversation);
      setMessages(mockMessages);
      setIsLoading(false);
    };
    
    fetchData();
  }, [id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      conversationId: id || '',
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // In a real app, we would send the message to the backend
    // And handle the response
  };
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  };
  
  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach(message => {
    const date = formatDate(message.timestamp);
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2 lg:hidden"
            onClick={() => navigate('/messages')}
          >
            <ArrowLeft size={20} />
          </button>
          
          <Avatar
            initials={conversation?.participantName.split(' ').map(n => n[0]).join('') || ''}
            size="md"
            status={conversation?.isOnline ? 'online' : 'offline'}
          />
          
          <div className="ml-3">
            <div className="flex items-center">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {conversation?.participantName}
              </h3>
              <Badge
                variant={
                  conversation?.participantRole === 'nurse' ? 'primary' :
                  conversation?.participantRole === 'patient' ? 'secondary' :
                  'default'
                }
                className="ml-2 text-xs"
              >
                {conversation?.participantRole === 'nurse' ? 'Provider' :
                 conversation?.participantRole === 'patient' ? 'Patient' :
                 'Admin'}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {conversation?.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Video size={20} />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                {date}
              </span>
            </div>
            
            {dateMessages.map(message => {
              const isCurrentUser = message.senderId === user?.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className="flex items-end">
                    {!isCurrentUser && (
                      <Avatar
                        initials={message.senderName.split(' ').map(n => n[0]).join('')}
                        size="sm"
                        className="mr-2 mb-1"
                      />
                    )}
                    
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-t-lg ${
                        isCurrentUser 
                          ? 'bg-blue-600 text-white rounded-bl-lg rounded-br-none' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-br-lg rounded-bl-none border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-sm">
                        {message.text}
                      </div>
                      <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {isCurrentUser && (
                      <div className="ml-2 mb-1">
                        {message.status === 'read' && (
                          <div className="text-blue-600 dark:text-blue-400">
                            <svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.5 7.5L14.5 6.793L10.787 10.5L9.787 9.5L9.08 10.207L10.787 11.914L15.5 7.5Z" fill="currentColor" />
                              <path d="M10.5 7.5L9.5 6.793L5.787 10.5L4.787 9.5L4.08 10.207L5.787 11.914L10.5 7.5Z" fill="currentColor" />
                              <path d="M5.5 7.5L4.5 6.793L0.787 10.5L-0.213 9.5L-0.92 10.207L0.787 11.914L5.5 7.5Z" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex space-x-2">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            className="flex-1 h-10 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('messages.typeMessage')}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            className="px-3"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;