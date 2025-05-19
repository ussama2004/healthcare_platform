import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Bell, Calendar, MessageSquare, Info, Check, X } from 'lucide-react';

const Notifications: React.FC = () => {
  const { t } = useLanguage();
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();
  
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    
    if (diffInHours < 24) {
      return `${diffInHours} hr ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day ago`;
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={18} className="text-blue-500" />;
      case 'message':
        return <MessageSquare size={18} className="text-teal-500" />;
      case 'system':
        return <Info size={18} className="text-purple-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };
  
  // Group notifications by read status
  const unreadNotifications = notifications.filter(notification => !notification.isRead);
  const readNotifications = notifications.filter(notification => notification.isRead);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('notifications.title')}
        </h1>
        
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
          >
            {t('notifications.markAllRead')}
          </Button>
        )}
      </div>
      
      {notifications.length > 0 ? (
        <div className="space-y-8">
          {/* Unread Notifications */}
          {unreadNotifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('notifications.new')}
              </h2>
              
              <div className="space-y-3">
                {unreadNotifications.map(notification => (
                  <Card
                    key={notification.id}
                    className="hover:shadow-md transition-shadow relative overflow-hidden border-l-4 border-l-blue-500 dark:border-l-blue-400"
                  >
                    <div className="p-4 pr-12">
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-3 right-3 flex flex-col space-y-1">
                      <button 
                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="p-1 rounded-full text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Read Notifications */}
          {readNotifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('notifications.earlier')}
              </h2>
              
              <div className="space-y-3">
                {readNotifications.map(notification => (
                  <Card
                    key={notification.id}
                    className="hover:shadow-md transition-shadow relative overflow-hidden opacity-75"
                  >
                    <div className="p-4 pr-12">
                      <div className="flex items-start">
                        <div className="mr-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-700 dark:text-gray-300">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <button 
                        className="p-1 rounded-full text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
              <Bell size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('notifications.noNotifications')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              You don't have any notifications right now.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Notifications;