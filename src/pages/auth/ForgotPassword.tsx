import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError(t('validation.required'));
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('validation.email'));
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    try {
      // In a real app, this would call a backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send password reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-8">
                <Link to="/login" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">
                  {t('auth.forgotPassword')}
                </h1>
              </div>
              
              {!isSubmitted ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Enter the email address associated with your account, and we'll send you a link to reset your password.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label={t('auth.email')}
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={error}
                      placeholder="example@email.com"
                      leftIcon={<Mail size={18} />}
                      fullWidth
                    />
                    
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      fullWidth
                    >
                      Send Reset Link
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Remember your password?{' '}
                        <Link 
                          to="/login" 
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          {t('auth.login')}
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 mb-4">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Check your email
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Back to Forgot Password
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;