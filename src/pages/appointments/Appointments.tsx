import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { Calendar, Clock, MapPin, User, Search, Plus, Calendar as CalendarIcon } from 'lucide-react';
import AppointmentDetail from './AppointmentDetail';

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

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    serviceName: 'Blood Pressure Monitoring',
    serviceDescription: 'Regular monitoring of blood pressure levels',
    providerName: 'Sara Ali',
    providerSpecialty: 'General Care',
    patientName: 'Ahmed Hassan',
    location: 'Patient\'s Home',
    date: '2025-06-15',
    time: '10:00 AM',
    duration: '30 min',
    price: '$45',
    status: 'confirmed',
    notes: 'Please bring your own blood pressure monitor if you have one.'
  },
  {
    id: '2',
    serviceName: 'Medication Administration',
    serviceDescription: 'Administering prescribed medications',
    providerName: 'Sara Ali',
    providerSpecialty: 'General Care',
    patientName: 'Ahmed Hassan',
    location: 'Patient\'s Home',
    date: '2025-06-18',
    time: '02:30 PM',
    duration: '45 min',
    price: '$60',
    status: 'pending',
    notes: 'Have all medications ready and prescription details available.'
  },
  {
    id: '3',
    serviceName: 'Wound Dressing Change',
    serviceDescription: 'Professional wound cleaning and dressing',
    providerName: 'Omar Khaled',
    providerSpecialty: 'Wound Care',
    patientName: 'Ahmed Hassan',
    location: 'Patient\'s Home',
    date: '2025-06-10',
    time: '11:15 AM',
    duration: '45 min',
    price: '$75',
    status: 'completed'
  },
  {
    id: '4',
    serviceName: 'Physical Therapy Session',
    serviceDescription: 'Mobility exercises and physical therapy',
    providerName: 'Layla Mohamed',
    providerSpecialty: 'Physical Therapy',
    patientName: 'Ahmed Hassan',
    location: 'Patient\'s Home',
    date: '2025-06-05',
    time: '09:00 AM',
    duration: '60 min',
    price: '$90',
    status: 'canceled',
    notes: 'Canceled due to patient illness.'
  },
  {
    id: '5',
    serviceName: 'Blood Pressure Monitoring',
    serviceDescription: 'Regular monitoring of blood pressure levels',
    providerName: 'Sara Ali',
    providerSpecialty: 'General Care',
    patientName: 'Fatima Omar',
    location: 'Patient\'s Home',
    date: '2025-06-16',
    time: '03:00 PM',
    duration: '30 min',
    price: '$45',
    status: 'confirmed'
  }
];

const Appointments: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'canceled'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const filteredAppointments = mockAppointments
    .filter(appointment => {
      // Filter based on user role
      if (user?.role === 'patient') {
        return appointment.patientName === user.firstName + ' ' + user.lastName;
      } else if (user?.role === 'nurse') {
        return appointment.providerName === user.firstName + ' ' + user.lastName;
      }
      return true; // Admin sees all
    })
    .filter(appointment => {
      // Filter based on search query
      const searchLower = searchQuery.toLowerCase();
      return (
        appointment.serviceName.toLowerCase().includes(searchLower) ||
        appointment.providerName.toLowerCase().includes(searchLower) ||
        appointment.patientName.toLowerCase().includes(searchLower)
      );
    })
    .filter(appointment => {
      // Filter based on active tab
      const today = new Date();
      const appointmentDate = new Date(appointment.date);
      
      if (activeTab === 'upcoming') {
        return (
          appointmentDate >= today && 
          (appointment.status === 'confirmed' || appointment.status === 'pending')
        );
      } else if (activeTab === 'past') {
        return (
          appointmentDate < today || appointment.status === 'completed'
        );
      } else if (activeTab === 'canceled') {
        return appointment.status === 'canceled';
      }
      
      return true;
    });
  
  const openAppointmentDetail = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailOpen(true);
  };
  
  const closeAppointmentDetail = () => {
    setIsDetailOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('appointments.title')}
        </h1>
        
        {user?.role === 'patient' && (
          <Button 
            leftIcon={<Plus size={16} />}
            onClick={() => window.location.href = '/services'}
          >
            {t('appointments.schedule')}
          </Button>
        )}
      </div>
      
      <Card className="mb-8">
        <Card.Content className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-1">
              <Button
                variant={activeTab === 'upcoming' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('upcoming')}
              >
                {t('appointments.upcoming')}
              </Button>
              <Button
                variant={activeTab === 'past' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('past')}
              >
                {t('appointments.past')}
              </Button>
              <Button
                variant={activeTab === 'canceled' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('canceled')}
              >
                {t('appointments.canceled')}
              </Button>
            </div>
            
            <div className="w-full md:w-auto">
              <Input
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
                fullWidth
              />
            </div>
          </div>
        </Card.Content>
      </Card>
      
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card 
              key={appointment.id} 
              className="hover:shadow-md transition-shadow"
              onClick={() => openAppointmentDetail(appointment)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <div className="hidden md:block">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-blue-600 dark:text-blue-300">
                        <CalendarIcon size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {appointment.serviceName}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <User size={14} className="mr-2" />
                          {user?.role === 'patient' 
                            ? `${t('appointments.provider')}: ${appointment.providerName}` 
                            : `${t('appointments.patient')}: ${appointment.patientName}`}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Calendar size={14} className="mr-2" />
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin size={14} className="mr-2" />
                          {appointment.location}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock size={14} className="mr-2" />
                          {appointment.time} ({appointment.duration})
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <Badge
                      variant={
                        appointment.status === 'confirmed' ? 'primary' :
                        appointment.status === 'pending' ? 'warning' :
                        appointment.status === 'canceled' ? 'danger' :
                        'success'
                      }
                      className="mb-2"
                    >
                      {t(`appointments.${appointment.status}`)}
                    </Badge>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {appointment.price}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
              <Calendar size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('appointments.noAppointments')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {activeTab === 'upcoming' 
                ? 'You have no upcoming appointments.' 
                : activeTab === 'past' 
                ? 'You have no past appointments.'
                : 'You have no canceled appointments.'}
            </p>
            
            {user?.role === 'patient' && (
              <Button 
                leftIcon={<Plus size={16} />}
                onClick={() => window.location.href = '/services'}
              >
                {t('appointments.schedule')}
              </Button>
            )}
          </div>
        </Card>
      )}
      
      {/* Appointment Detail Modal */}
      {isDetailOpen && selectedAppointment && (
        <AppointmentDetail
          appointment={selectedAppointment}
          onClose={closeAppointmentDetail}
        />
      )}
    </>
  );
};

export default Appointments;