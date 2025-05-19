import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginCredentials } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const { login, authState } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };
  
  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        {t('auth.login')}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('auth.email')}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('auth.emailPlaceholder')}
          required
        />
        
        <Input
          label={t('auth.password')}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t('auth.passwordPlaceholder')}
          required
        />
        
        {authState.error && (
          <div className="p-3 bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-200 rounded-md">
            {authState.error}
          </div>
        )}
        
        <Button
          type="submit"
          fullWidth
          loading={authState.loading}
        >
          {t('auth.login')}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            {t('auth.noAccount')}{' '}
            <button
              type="button"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
              onClick={onSwitchToSignup}
            >
              {t('auth.signup')}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;