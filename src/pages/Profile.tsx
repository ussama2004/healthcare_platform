import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToaster } from '../components/ui/Toaster';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Select from '../components/ui/Select';
import { User, Mail, Phone, Lock, Save, Upload, MapPin, Briefcase, Plus } from 'lucide-react';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const { addToast } = useToaster();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const isNurse = user?.role === 'nurse';
  
  // Form state
  const [formState, setFormState] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: '',
    bio: '',
    // Nurse-specific fields
    specialty: '',
    yearsOfExperience: '',
    education: '',
    certifications: '',
    languages: ['Arabic', 'English']
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would update the full profile in the backend
      await updateUser({
        firstName: formState.firstName,
        lastName: formState.lastName,
        phoneNumber: formState.phoneNumber
      });
      
      setIsEditing(false);
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call a backend endpoint to change the password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsPasswordModalOpen(false);
      addToast('Password updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update password', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('profile.title')}
        </h1>
        
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
          >
            {t('common.edit')}
          </Button>
        ) : (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              leftIcon={<Save size={16} />}
              onClick={handleSaveProfile}
              isLoading={isLoading}
            >
              {t('common.save')}
            </Button>
          </div>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar and Basic Info */}
        <Card className="lg:col-span-1">
          <Card.Content className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar
                  initials={`${user.firstName[0]}${user.lastName[0]}`}
                  size="xl"
                />
                {isEditing && (
                  <button className="absolute -right-2 bottom-0 p-1.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700">
                    <Upload size={14} />
                  </button>
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center capitalize mt-1">
                {user.role}
              </p>
              
              {!isEditing && (
                <Button
                  variant="outline"
                  leftIcon={<Lock size={16} />}
                  className="mt-6"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  {t('profile.changePassword')}
                </Button>
              )}
            </div>
          </Card.Content>
        </Card>
        
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>{t('profile.personalInfo')}</Card.Title>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                leftIcon={<User size={18} />}
              />
              
              <Input
                label="Last Name"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                leftIcon={<User size={18} />}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                label="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                disabled={true} // Email cannot be changed
                leftIcon={<Mail size={18} />}
              />
              
              <Input
                label="Phone Number"
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                leftIcon={<Phone size={18} />}
              />
            </div>
            
            <div className="mt-4">
              <Input
                label="Address"
                name="address"
                value={formState.address}
                onChange={handleChange}
                disabled={!isEditing}
                leftIcon={<MapPin size={18} />}
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full min-h-[100px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </Card.Content>
        </Card>
        
        {/* Nurse-specific Professional Information */}
        {isNurse && (
          <Card className="lg:col-span-3">
            <Card.Header>
              <Card.Title>{t('profile.professionalInfo')}</Card.Title>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Select
                    label="Specialty"
                    name="specialty"
                    value={formState.specialty}
                    onChange={(value) => setFormState(prev => ({ ...prev, specialty: value }))}
                    options={[
                      { value: '', label: 'Select Specialty' },
                      { value: 'General Care', label: 'General Care' },
                      { value: 'Elderly Care', label: 'Elderly Care' },
                      { value: 'Wound Care', label: 'Wound Care' },
                      { value: 'Physical Therapy', label: 'Physical Therapy' },
                      { value: 'Medication Management', label: 'Medication Management' },
                      { value: 'Pediatric Care', label: 'Pediatric Care' },
                      { value: 'Post-Surgery Care', label: 'Post-Surgery Care' }
                    ]}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Select
                    label="Years of Experience"
                    name="yearsOfExperience"
                    value={formState.yearsOfExperience}
                    onChange={(value) => setFormState(prev => ({ ...prev, yearsOfExperience: value }))}
                    options={[
                      { value: '', label: 'Select Experience' },
                      { value: '1-3', label: '1-3 years' },
                      { value: '4-6', label: '4-6 years' },
                      { value: '7-10', label: '7-10 years' },
                      { value: '10+', label: '10+ years' }
                    ]}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 min-h-[40px]">
                    {formState.languages.map((lang, index) => (
                      <div 
                        key={index}
                        className="flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-md text-sm"
                      >
                        <span>{lang}</span>
                        {isEditing && (
                          <button
                            className="ml-1 text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              const newLanguages = [...formState.languages];
                              newLanguages.splice(index, 1);
                              setFormState(prev => ({ ...prev, languages: newLanguages }));
                            }}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button 
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center"
                        onClick={() => {
                          const language = prompt('Add a language');
                          if (language && !formState.languages.includes(language)) {
                            setFormState(prev => ({
                              ...prev,
                              languages: [...prev.languages, language]
                            }));
                          }
                        }}
                      >
                        <Plus size={14} className="mr-1" /> Add
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Input
                    label="Education"
                    name="education"
                    value={formState.education}
                    onChange={handleChange}
                    disabled={!isEditing}
                    leftIcon={<Briefcase size={18} />}
                    placeholder="e.g. BSc Nursing, Cairo University (2015-2019)"
                  />
                </div>
                
                <div className="md:col-span-2 lg:col-span-1">
                  <Input
                    label="Certifications"
                    name="certifications"
                    value={formState.certifications}
                    onChange={handleChange}
                    disabled={!isEditing}
                    leftIcon={<Briefcase size={18} />}
                    placeholder="e.g. BLS, Wound Care Specialist"
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                    Services Offered
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-md flex items-center justify-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50">
                      <Plus size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Add Service</span>
                    </div>
                  </div>
                </div>
              )}
            </Card.Content>
          </Card>
        )}
      </div>
      
      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <PasswordChangeModal
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handleChangePassword}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

interface PasswordChangeModalProps {
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  onClose,
  onSubmit,
  isLoading
}) => {
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    await onSubmit(currentPassword, newPassword);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose}></div>
        
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('profile.changePassword')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
                fullWidth
                leftIcon={<Lock size={18} />}
              />
              
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                fullWidth
                leftIcon={<Lock size={18} />}
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                fullWidth
                leftIcon={<Lock size={18} />}
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={onClose}
                  type="button"
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                >
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add a X icon component
const X = ({ size }: { size: number }) => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default Profile;