import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { Search, Edit, User, ArrowRight } from 'lucide-react';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'patient' | 'nurse' | 'admin';
  participantAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: '2',
    participantName: 'Sara Ali',
    participantRole: 'nurse',
    lastMessage: 'When will you be available for the next appointment?',
    timestamp: '2025-06-12T14:30:00Z',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    participantId: '3',
    participantName: 'Omar Khaled',
    participantRole: 'nurse',
    lastMessage: 'I\'ll be bringing the necessary supplies for the wound care.',
    timestamp: '2025-06-11T10:15:00Z',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '3',
    participantId: '1',
    participantName: 'Ahmed Hassan',
    participantRole: 'patient',
    lastMessage: 'Thank you for the great care yesterday.',
    timestamp: '2025-06-10T16:45:00Z',
    unreadCount: 0,
    isOnline: true
  },
  {
    id: '4',
    participantId: '4',
    participantName: 'Nour Samir',
    participantRole: 'patient',
    lastMessage: 'Could you provide more information about the blood glucose monitoring service?',
    timestamp: '2025-06-09T11:20:00Z',
    unreadCount: 1,
    isOnline: false
  }
];

const Messages: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  
  // Check if there's a request to start a new conversation
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patient');
    const providerId = searchParams.get('provider');
    
    if (patientId || providerId) {
      setIsNewMessageModalOpen(true);
    }
  }, [location]);
  
  // Filter conversations based on user role and search query
  const filteredConversations = mockConversations
    .filter(conversation => {
      // For patients, show conversations with nurses
      // For nurses, show conversations with patients
      if (user?.role === 'patient' && conversation.participantRole !== 'nurse' && conversation.participantRole !== 'admin') {
        return false;
      }
      
      if (user?.role === 'nurse' && conversation.participantRole !== 'patient' && conversation.participantRole !== 'admin') {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this week, show day of week
    const dayDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDiff < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const openConversation = (id: string) => {
    navigate(`/messages/${id}`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('messages.title')}
        </h1>
        
        <Button
          leftIcon={<Edit size={16} />}
          onClick={() => setIsNewMessageModalOpen(true)}
        >
          {t('messages.newMessage')}
        </Button>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
          fullWidth
        />
      </div>
      
      {filteredConversations.length > 0 ? (
        <Card>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                onClick={() => openConversation(conversation.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      initials={conversation.participantName.split(' ').map(n => n[0]).join('')}
                      size="md"
                      status={conversation.isOnline ? 'online' : 'offline'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {conversation.participantName}
                        </h3>
                        <Badge
                          variant={
                            conversation.participantRole === 'nurse' ? 'primary' :
                            conversation.participantRole === 'patient' ? 'secondary' :
                            'default'
                          }
                          className="ml-2 text-xs"
                        >
                          {conversation.participantRole === 'nurse' ? 'Provider' :
                           conversation.participantRole === 'patient' ? 'Patient' :
                           'Admin'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end min-w-fit ml-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatTimestamp(conversation.timestamp)}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-blue-600 text-white rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
              <User size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('messages.noMessages')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start a new conversation with a patient or healthcare provider.
            </p>
            <Button
              leftIcon={<Edit size={16} />}
              onClick={() => setIsNewMessageModalOpen(true)}
            >
              {t('messages.newMessage')}
            </Button>
          </div>
        </Card>
      )}
      
      {/* New Message Modal */}
      {isNewMessageModalOpen && (
        <NewMessageModal onClose={() => setIsNewMessageModalOpen(false)} />
      )}
    </div>
  );
};

interface NewMessageModalProps {
  onClose: () => void;
}

const NewMessageModal: React.FC<NewMessageModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data to message
  const userType = user?.role === 'patient' ? 'nurse' : 'patient';
  const mockUsers = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      role: 'patient',
      isOnline: true
    },
    {
      id: '2',
      name: 'Sara Ali',
      role: 'nurse',
      isOnline: true
    },
    {
      id: '3',
      name: 'Omar Khaled',
      role: 'nurse',
      isOnline: false
    },
    {
      id: '4',
      name: 'Nour Samir',
      role: 'patient',
      isOnline: false
    }
  ].filter(u => u.role === userType);
  
  // Check if there's a pre-selected user from URL params
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patient');
    const providerId = searchParams.get('provider');
    
    if (patientId && user?.role === 'nurse') {
      setSelectedUser(patientId);
    } else if (providerId && user?.role === 'patient') {
      setSelectedUser(providerId);
    }
  }, [location, user]);
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = async () => {
    if (!selectedUser || !message.trim()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call a backend endpoint to send the message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the conversation
      navigate(`/messages/${selectedUser}`);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose}></div>
        
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('messages.newMessage')}
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Recipient
                </label>
                
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={18} />}
                  fullWidth
                  className="mb-3"
                />
                
                <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
                  {filteredUsers.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 cursor-pointer ${
                            selectedUser === user.id 
                              ? 'bg-blue-50 dark:bg-blue-900/20' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => setSelectedUser(user.id)}
                        >
                          <div className="flex items-center">
                            <Avatar
                              initials={user.name.split(' ').map(n => n[0]).join('')}
                              size="sm"
                              status={user.isOnline ? 'online' : 'offline'}
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {user.role}
                              </p>
                            </div>
                            {selectedUser === user.id && (
                              <div className="ml-auto text-blue-600 dark:text-blue-400">
                                <Check size={16} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No users found
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full min-h-[120px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('messages.typeMessage')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
              >
                {t('common.cancel')}
              </Button>
              <Button
                rightIcon={<ArrowRight size={16} />}
                onClick={handleSendMessage}
                disabled={!selectedUser || !message.trim()}
                isLoading={isLoading}
              >
                {t('messages.send')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add a Check icon component
const Check = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Messages;