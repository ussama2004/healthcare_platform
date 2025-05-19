import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, SunMoon, Globe } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, isAuthenticated, isLoading } = useAuth();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('validation.email');
    }
    
    if (!password) {
      newErrors.password = t('validation.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // For demo purposes, pre-filled credentials
  const fillCredentials = (role: 'patient' | 'nurse' | 'admin') => {
    if (role === 'patient') {
      setEmail('patient@example.com');
      setPassword('password');
    } else if (role === 'nurse') {
      setEmail('nurse@example.com');
      setPassword('password');
    } else if (role === 'admin') {
      setEmail('admin@example.com');
      setPassword('password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950">
      <header className="p-4 flex justify-end">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <SunMoon size={20} />
          </button>
          
          <button 
            onClick={() => changeLanguage(currentLanguage === 'en' ? 'ar' : 'en')}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <Globe size={20} />
          </button>
        </div>
      </header>
    
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('app.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('app.tagline')}
                </p>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                {t('auth.login')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label={t('auth.email')}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="example@email.com"
                  leftIcon={<Mail size={18} />}
                  fullWidth
                />
                
                <Input
                  label={t('auth.password')}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} />}
                  fullWidth
                />
                
                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                
                <Button
                  type="submit"
                  isLoading={isLoading}
                  fullWidth
                >
                  {t('auth.login')}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('auth.noAccount')}{' '}
                    <Link 
                      to="/register" 
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      {t('auth.register')}
                    </Link>
                  </p>
                </div>
              </form>
              
              {/* Demo accounts for easy testing */}
              <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                  Demo Accounts
                </p>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => fillCredentials('patient')}
                    className="text-xs px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Patient: patient@example.com / password
                  </button>
                  <button
                    onClick={() => fillCredentials('nurse')}
                    className="text-xs px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Nurse: nurse@example.com / password
                  </button>
                  <button
                    onClick={() => fillCredentials('admin')}
                    className="text-xs px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Admin: admin@example.com / password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;