import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToaster } from '../../components/ui/Toaster';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  DollarSign, 
  X, 
  FileText,
  MessageSquare,
  Calendar as CalendarIcon,
  AlertTriangle
} from 'lucide-react';

interface Appointment {
  id: string;
  serviceName: string;
  serviceDescription: string;
  providerName: string;
  providerAvatar?: string;
  providerSpecialty: string;
  patientName: string;
  patientAvatar?: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: 'confirmed' | 'pending' | 'canceled' | 'completed';
  notes?: string;
}

interface AppointmentDetailProps {
  appointment: Appointment;
  onClose: () => void;
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({
  appointment,
  onClose
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  
  const isPatient = user?.role === 'patient';
  const isNurse = user?.role === 'nurse';
  const isPastOrCompleted = new Date(appointment.date) < new Date() || appointment.status === 'completed';
  const isCancelable = appointment.status === 'confirmed' || appointment.status === 'pending';
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleCancelAppointment = async () => {
    setIsLoading(true);
    // In a real app, this would call a backend endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast('Appointment canceled successfully', 'success');
      onClose();
    } catch (error) {
      addToast('Failed to cancel appointment', 'error');
    } finally {
      setIsLoading(false);
      setIsCancelModalOpen(false);
    }
  };
  
  const handleCompleteAppointment = async () => {
    setIsLoading(true);
    // In a real app, this would call a backend endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast('Appointment marked as completed', 'success');
      onClose();
    } catch (error) {
      addToast('Failed to update appointment', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMessage = () => {
    // In a real app, this would navigate to the chat with the other party
    window.location.href = `/messages/new?${isPatient ? 'provider' : 'patient'}=${appointment.id}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose}></div>
        
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
          <div className="absolute top-4 right-4">
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Header with service info */}
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full text-blue-600 dark:text-blue-300">
                <CalendarIcon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {appointment.serviceName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {appointment.serviceDescription}
                </p>
                <div className="mt-2">
                  <Badge
                    variant={
                      appointment.status === 'confirmed' ? 'primary' :
                      appointment.status === 'pending' ? 'warning' :
                      appointment.status === 'canceled' ? 'danger' :
                      'success'
                    }
                  >
                    {t(`appointments.${appointment.status}`)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Appointment details */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-y-4">
              <div className="flex items-center">
                <div className="w-8 text-gray-400 dark:text-gray-500">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-gray-900 dark:text-white">{formatDate(appointment.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 text-gray-400 dark:text-gray-500">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="text-gray-900 dark:text-white">{appointment.time} ({appointment.duration})</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 text-gray-400 dark:text-gray-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white">{appointment.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 text-gray-400 dark:text-gray-500">
                  <DollarSign size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-gray-900 dark:text-white">{appointment.price}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 text-gray-400 dark:text-gray-500">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isPatient ? 'Healthcare Provider' : 'Patient'}
                  </p>
                  <div className="flex items-center mt-1">
                    <Avatar
                      initials={isPatient 
                        ? appointment.providerName.split(' ').map(n => n[0]).join('') 
                        : appointment.patientName.split(' ').map(n => n[0]).join('')}
                      size="sm"
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isPatient ? appointment.providerName : appointment.patientName}
                    </span>
                    {isPatient && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ({appointment.providerSpecialty})
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="flex items-start mt-2">
                  <div className="w-8 text-gray-400 dark:text-gray-500 mt-1">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                    <p className="text-gray-900 dark:text-white">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex justify-end space-x-4">
            <Button
              variant="outline"
              leftIcon={<MessageSquare size={16} />}
              onClick={handleMessage}
            >
              Message
            </Button>
            
            {isCancelable && !isPastOrCompleted && (
              <Button
                variant="danger"
                onClick={() => setIsCancelModalOpen(true)}
              >
                {t('appointments.cancel')}
              </Button>
            )}
            
            {isNurse && appointment.status === 'confirmed' && !isPastOrCompleted && (
              <Button
                onClick={handleCompleteAppointment}
                isLoading={isLoading}
              >
                {t('appointments.complete')}
              </Button>
            )}
          </div>
          
          {/* Cancel Confirmation Modal */}
          {isCancelModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center p-4 text-center">
                <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={() => setIsCancelModalOpen(false)}></div>
                
                <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
                  <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
                      <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Cancel Appointment
                    </h3>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Are you sure you want to cancel this appointment? This action cannot be undone.
                    </p>
                    
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCancelModalOpen(false)}
                      >
                        No, Keep It
                      </Button>
                      
                      <Button
                        variant="danger"
                        onClick={handleCancelAppointment}
                        isLoading={isLoading}
                      >
                        Yes, Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;