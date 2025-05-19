import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  Bell, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut,
  Stethoscope,
  UserCheck,
  Activity,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Avatar from '../ui/Avatar';

interface SidebarLink {
  icon: React.ReactNode;
  label: string;
  to: string;
  roles: string[];
}

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage === 'ar';
  
  const links: SidebarLink[] = [
    { icon: <Home size={20} />, label: t('sidebar.dashboard'), to: '/dashboard', roles: ['patient', 'nurse', 'admin'] },
    { icon: <Calendar size={20} />, label: t('sidebar.appointments'), to: '/appointments', roles: ['patient', 'nurse', 'admin'] },
    { icon: <Stethoscope size={20} />, label: t('sidebar.services'), to: '/services', roles: ['patient', 'nurse', 'admin'] },
    { icon: <UserCheck size={20} />, label: t('sidebar.nurses'), to: '/nurses', roles: ['patient', 'admin'] },
    { icon: <Users size={20} />, label: t('sidebar.patients'), to: '/patients', roles: ['nurse', 'admin'] },
    { icon: <ClipboardList size={20} />, label: t('sidebar.requests'), to: '/requests', roles: ['patient', 'nurse'] },
    { icon: <Activity size={20} />, label: t('sidebar.analytics'), to: '/analytics', roles: ['admin'] },
    { icon: <Bell size={20} />, label: t('sidebar.notifications'), to: '/notifications', roles: ['patient', 'nurse', 'admin'] },
    { icon: <MessageSquare size={20} />, label: t('sidebar.messages'), to: '/messages', roles: ['patient', 'nurse', 'admin'] },
    { icon: <Settings size={20} />, label: t('sidebar.settings'), to: '/settings', roles: ['patient', 'nurse', 'admin'] },
    { icon: <HelpCircle size={20} />, label: t('sidebar.help'), to: '/help', roles: ['patient', 'nurse', 'admin'] },
  ];

  // Filter links based on user role
  const filteredLinks = links.filter(link => 
    user && link.roles.includes(user.role)
  );

  return (
    <aside className={`h-screen w-64 fixed top-0 ${isRtl ? 'right-0' : 'left-0'} bg-white dark:bg-gray-900 border-${isRtl ? 'l' : 'r'} border-gray-200 dark:border-gray-800 shadow-sm z-30`}>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              CareConnect
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors 
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {user && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <Avatar
                src={user.avatar}
                initials={`${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`}
                alt={`${user.firstName} ${user.lastName}`}
                size="sm"
                status="online"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              {t('sidebar.logout')}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;