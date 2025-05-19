import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToaster } from '../components/ui/Toaster';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { Sun, Moon, Globe, BellRing, ShieldCheck } from 'lucide-react';

const Settings: React.FC = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    messages: true,
    reminders: true,
    marketing: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showRatings: true,
    allowContactByProviders: true,
    allowContactByPatients: true
  });
  
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call a backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast(t('settings.saved'), 'success');
    } catch (error) {
      addToast('Failed to save changes', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Language and Theme */}
        <Card>
          <Card.Header>
            <Card.Title>Appearance</Card.Title>
            <Card.Description>
              Customize your language and theme preferences
            </Card.Description>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-base font-medium text-gray-900 dark:text-white mb-3">
                  <Globe size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                  {t('settings.language')}
                </label>
                <div className="flex space-x-3">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      currentLanguage === 'en'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      currentLanguage === 'ar'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => changeLanguage('ar')}
                  >
                    العربية
                  </button>
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-base font-medium text-gray-900 dark:text-white mb-3">
                  {theme === 'light' ? (
                    <Sun size={18} className="mr-2 text-amber-500" />
                  ) : (
                    <Moon size={18} className="mr-2 text-indigo-500" />
                  )}
                  {t('settings.theme')}
                </label>
                <div className="flex space-x-3">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                      theme === 'light'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      if (theme === 'dark') toggleTheme();
                    }}
                  >
                    <Sun size={16} className="mr-1" />
                    {t('settings.light')}
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                      theme === 'dark'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      if (theme === 'light') toggleTheme();
                    }}
                  >
                    <Moon size={16} className="mr-1" />
                    {t('settings.dark')}
                  </button>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <BellRing size={18} className="mr-2 text-teal-500" />
              {t('settings.notifications')}
            </Card.Title>
            <Card.Description>
              Choose what notifications you receive
            </Card.Description>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Appointments</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified about appointment confirmations, reminders, and changes.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.appointments}
                    name="appointments"
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Messages</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified when you receive new messages.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.messages}
                    name="messages"
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Reminders</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get reminders for upcoming appointments and tasks.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.reminders}
                    name="reminders"
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Marketing</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive emails about new features, promotions, and news.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.marketing}
                    name="marketing"
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card.Content>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <ShieldCheck size={18} className="mr-2 text-indigo-500" />
              {t('settings.privacy')}
            </Card.Title>
            <Card.Description>
              Manage your privacy settings
            </Card.Description>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Online Status</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show others when you're online
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={privacySettings.showOnlineStatus}
                    name="showOnlineStatus"
                    onChange={handlePrivacyChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ratings & Reviews</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show your ratings and reviews to others
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={privacySettings.showRatings}
                    name="showRatings"
                    onChange={handlePrivacyChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {/* Role-specific settings */}
              {user?.role === 'patient' && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Provider Contact</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow healthcare providers to contact you directly
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={privacySettings.allowContactByProviders}
                      name="allowContactByProviders"
                      onChange={handlePrivacyChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              )}
              
              {user?.role === 'nurse' && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Patient Contact</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow patients to contact you directly
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={privacySettings.allowContactByPatients}
                      name="allowContactByPatients"
                      onChange={handlePrivacyChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button
          leftIcon={<Save size={16} />}
          onClick={handleSave}
          isLoading={isLoading}
        >
          {t('settings.save')}
        </Button>
      </div>
    </div>
  );
};

export default Settings;