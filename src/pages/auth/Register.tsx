import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { Mail, Lock, User, Phone, SunMoon, Globe } from 'lucide-react';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: 'patient' | 'nurse';
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'patient',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const { register, isAuthenticated, isLoading } = useAuth();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) {
      newErrors.firstName = t('validation.required');
    }
    
    if (!formData.lastName) {
      newErrors.lastName = t('validation.required');
    }
    
    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.email');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = t('validation.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('validation.passwordLength');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordMatch');
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = t('validation.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
    
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
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
                {t('auth.register')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        label={t('auth.firstName')}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder="John"
                        leftIcon={<User size={18} />}
                        fullWidth
                      />
                      
                      <Input
                        label={t('auth.lastName')}
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        placeholder="Doe"
                        leftIcon={<User size={18} />}
                        fullWidth
                      />
                    </div>
                    
                    <Input
                      label={t('auth.email')}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="example@email.com"
                      leftIcon={<Mail size={18} />}
                      fullWidth
                    />
                    
                    <Select
                      label={t('auth.roleSelection')}
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={(value) => setFormData(prev => ({ ...prev, role: value as 'patient' | 'nurse' }))}
                      options={[
                        { value: 'patient', label: t('auth.patient') },
                        { value: 'nurse', label: t('auth.nurse') },
                      ]}
                      fullWidth
                    />
                    
                    <Button
                      type="button"
                      onClick={nextStep}
                      fullWidth
                    >
                      {t('common.next')}
                    </Button>
                  </>
                )}
                
                {currentStep === 2 && (
                  <>
                    <Input
                      label={t('auth.phoneNumber')}
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      error={errors.phoneNumber}
                      placeholder="+1 (555) 000-0000"
                      leftIcon={<Phone size={18} />}
                      fullWidth
                    />
                    
                    <Input
                      label={t('auth.password')}
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      placeholder="••••••••"
                      leftIcon={<Lock size={18} />}
                      fullWidth
                    />
                    
                    <Input
                      label={t('auth.confirmPassword')}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      placeholder="••••••••"
                      leftIcon={<Lock size={18} />}
                      fullWidth
                    />
                    
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        fullWidth
                      >
                        {t('common.back')}
                      </Button>
                      
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        fullWidth
                      >
                        {t('auth.register')}
                      </Button>
                    </div>
                  </>
                )}
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('auth.haveAccount')}{' '}
                    <Link 
                      to="/login" 
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      {t('auth.login')}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;