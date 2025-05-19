import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole, SignupData } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const { signup, authState } = useAuth();
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: UserRole.PATIENT,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const role = e.target.value as UserRole;
    setFormData((prev) => ({ ...prev, role }));
  };
  
  const handleNextStep = () => {
    setStep(2);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(formData);
  };
  
  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        {t('auth.signup')}
      </h2>
      
      {step === 1 ? (
        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
          <Input
            label={t('auth.fullName')}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('auth.fullNamePlaceholder')}
            required
          />
          
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
            minLength={8}
          />
          
          <Input
            label={t('auth.phone')}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('auth.phonePlaceholder')}
            required
            pattern="^0[0-9]{9}$"
          />
          
          <div className="mb-4">
            <label className="form-label">{t('auth.accountType')}</label>
            <div className="flex space-x-4 space-x-reverse mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="patient"
                  name="role"
                  value={UserRole.PATIENT}
                  checked={formData.role === UserRole.PATIENT}
                  onChange={handleRoleChange}
                  className="h-4 w-4 text-primary-600 dark:text-primary-400"
                />
                <label htmlFor="patient" className="mr-2 text-gray-700 dark:text-gray-300">
                  {t('auth.patient')}
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="nurse"
                  name="role"
                  value={UserRole.NURSE}
                  checked={formData.role === UserRole.NURSE}
                  onChange={handleRoleChange}
                  className="h-4 w-4 text-primary-600 dark:text-primary-400"
                />
                <label htmlFor="nurse" className="mr-2 text-gray-700 dark:text-gray-300">
                  {t('auth.nurse')}
                </label>
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            fullWidth
          >
            {t('common.next')}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              {t('auth.hasAccount')}{' '}
              <button
                type="button"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                onClick={onSwitchToLogin}
              >
                {t('auth.login')}
              </button>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.role === UserRole.PATIENT && (
            <>
              <Input
                label={t('auth.address')}
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder={t('auth.addressPlaceholder')}
                required
              />
              
              <div className="mb-4">
                <label className="form-label">{t('auth.medicalHistory')}</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory || ''}
                  onChange={handleChange}
                  placeholder={t('auth.medicalHistoryPlaceholder')}
                  className="form-input"
                  rows={4}
                />
              </div>
            </>
          )}
          
          {formData.role === UserRole.NURSE && (
            <>
              <Input
                label={t('auth.specialization')}
                type="text"
                name="specialization"
                value={(formData.specialization || []).join(', ')}
                onChange={(e) => {
                  const specializations = e.target.value.split(',').map(s => s.trim());
                  setFormData((prev) => ({ ...prev, specialization: specializations }));
                }}
                placeholder={t('auth.specializationPlaceholder')}
                required
              />
              
              <Input
                label={t('auth.experience')}
                type="number"
                name="experience"
                value={formData.experience || ''}
                onChange={handleChange}
                placeholder={t('auth.experiencePlaceholder')}
                required
                min={0}
              />
              
              <div className="mb-4">
                <label className="form-label">{t('auth.certifications')}</label>
                <textarea
                  name="certifications"
                  value={(formData.certifications || []).join('\n')}
                  onChange={(e) => {
                    const certs = e.target.value.split('\n').map(c => c.trim()).filter(Boolean);
                    setFormData((prev) => ({ ...prev, certifications: certs }));
                  }}
                  placeholder={t('auth.certificationsPlaceholder')}
                  className="form-input"
                  rows={4}
                  required
                />
              </div>
            </>
          )}
          
          {authState.error && (
            <div className="p-3 bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-200 rounded-md">
              {authState.error}
            </div>
          )}
          
          <div className="flex space-x-4 space-x-reverse">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              {t('common.back')}
            </Button>
            
            <Button
              type="submit"
              loading={authState.loading}
              className="flex-1"
            >
              {t('auth.signup')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;