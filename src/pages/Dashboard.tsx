import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
  Calendar,
  Users,
  Clipboard,
  Activity,
  DollarSign,
  Star,
  ChevronRight,
  Clock
} from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

// Types
interface Appointment {
  id: string;
  serviceName: string;
  providerName: string;
  providerAvatar?: string;
  patientName: string;
  patientAvatar?: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'canceled' | 'completed';
}

interface ServiceRequest {
  id: string;
  serviceName: string;
  patientName: string;
  patientAvatar?: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}

interface Nurse {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  rating: number;
  distance: string;
}

// Sample data
const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    serviceName: 'Blood Pressure Monitoring',
    providerName: 'Sara Ali',
    patientName: 'Ahmed Hassan',
    date: '2025-06-15',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: '2',
    serviceName: 'Medication Administration',
    providerName: 'Sara Ali',
    patientName: 'Ahmed Hassan',
    date: '2025-06-18',
    time: '02:30 PM',
    status: 'pending'
  }
];

const recentRequests: ServiceRequest[] = [
  {
    id: '1',
    serviceName: 'Wound Care',
    patientName: 'Ahmed Hassan',
    createdAt: '2025-06-12T14:20:00Z',
    status: 'pending'
  },
  {
    id: '2',
    serviceName: 'Blood Glucose Monitoring',
    patientName: 'Ahmed Hassan',
    createdAt: '2025-06-10T09:15:00Z',
    status: 'accepted'
  }
];

const nearbyNurses: Nurse[] = [
  {
    id: '1',
    name: 'Sara Ali',
    specialty: 'General Care',
    rating: 4.8,
    distance: '2.5 km'
  },
  {
    id: '2',
    name: 'Layla Mohamed',
    specialty: 'Elderly Care',
    rating: 4.7,
    distance: '3.2 km'
  },
  {
    id: '3',
    name: 'Omar Khaled',
    specialty: 'Wound Care',
    rating: 4.9,
    distance: '4.1 km'
  }
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day ago`;
};

// Status badge mapping
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <Badge variant="primary">Confirmed</Badge>;
    case 'pending':
      return <Badge variant="warning">Pending</Badge>;
    case 'canceled':
      return <Badge variant="danger">Canceled</Badge>;
    case 'completed':
      return <Badge variant="success">Completed</Badge>;
    case 'accepted':
      return <Badge variant="primary">Accepted</Badge>;
    case 'rejected':
      return <Badge variant="danger">Rejected</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Display data based on user role
  const isPatient = user?.role === 'patient';
  const isNurse = user?.role === 'nurse';
  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcome')}
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      {/* Stats Section */}
      {(isNurse || isAdmin) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border-0 shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  {isNurse ? t('dashboard.earnings') : t('dashboard.nurses')}
                </h3>
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-blue-300">
                  {isNurse ? <DollarSign size={20} /> : <Users size={20} />}
                </div>
              </div>
              <div className="flex items-end space-x-2 mb-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isNurse ? '$1,240' : '24'}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +12% ↑
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isNurse ? 'This month' : 'Active providers'}
              </p>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/40 dark:to-teal-800/40 border-0 shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  {t('dashboard.patients')}
                </h3>
                <div className="p-2 bg-teal-100 dark:bg-teal-800 rounded-full text-teal-600 dark:text-teal-300">
                  <Users size={20} />
                </div>
              </div>
              <div className="flex items-end space-x-2 mb-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isNurse ? '8' : '156'}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +5% ↑
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isNurse ? 'Active patients' : 'Total patients'}
              </p>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40 border-0 shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  {isNurse ? t('dashboard.appointments') : t('services.title')}
                </h3>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-full text-indigo-600 dark:text-indigo-300">
                  {isNurse ? <Calendar size={20} /> : <Clipboard size={20} />}
                </div>
              </div>
              <div className="flex items-end space-x-2 mb-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isNurse ? '12' : '18'}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +8% ↑
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isNurse ? 'This week' : 'Active services'}
              </p>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 border-0 shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  {t('dashboard.rating')}
                </h3>
                <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full text-purple-600 dark:text-purple-300">
                  <Star size={20} />
                </div>
              </div>
              <div className="flex items-end space-x-2 mb-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isNurse ? '4.8/5' : '4.6/5'}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +0.2 ↑
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isNurse ? 'From 32 reviews' : 'Platform average'}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Admin Analytics Preview */}
      {isAdmin && (
        <Card className="overflow-hidden">
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>{t('sidebar.analytics')}</Card.Title>
              <Button variant="outline" size="sm" rightIcon={<ChevronRight size={16} />}>
                {t('common.viewAll')}
              </Button>
            </div>
          </Card.Header>
          <Card.Content className="pb-6">
            <div className="relative h-64 w-full mt-4">
              {/* Simplified Analytics Chart */}
              <div className="absolute inset-0 flex items-end">
                <div className="flex w-full h-full items-end justify-around px-2">
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '60%' }}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '85%' }}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '75%' }}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '90%' }}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '65%' }}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '80%' }}></div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t" style={{ height: '95%' }}></div>
                </div>
              </div>
              <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700"></div>
              <div className="absolute bottom-0 flex justify-around w-full pb-2 text-xs text-gray-500 dark:text-gray-400 px-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Appointments Section */}
      {(isPatient || isNurse) && (
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>{t('dashboard.upcomingAppointments')}</Card.Title>
              <Button 
                variant="outline" 
                size="sm" 
                rightIcon={<ChevronRight size={16} />}
                onClick={() => window.location.href = '/appointments'}
              >
                {t('common.viewAll')}
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full text-blue-600 dark:text-blue-300">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {appointment.serviceName}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isPatient ? 'Provider:' : 'Patient:'} {isPatient ? appointment.providerName : appointment.patientName}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(appointment.date)}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.location.href = `/appointments#${appointment.id}`}
                      >
                        {t('appointments.details')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {t('dashboard.noAppointments')}
                </p>
              </div>
            )}
          </Card.Content>
        </Card>
      )}
      
      {/* Service Requests Section */}
      {(isPatient || isNurse) && (
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>{t('dashboard.recentRequests')}</Card.Title>
              <Button 
                variant="outline" 
                size="sm" 
                rightIcon={<ChevronRight size={16} />}
                onClick={() => window.location.href = '/requests'}
              >
                {t('common.viewAll')}
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            {recentRequests.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full text-teal-600 dark:text-teal-300">
                          <Clipboard size={18} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {request.serviceName}
                          </h4>
                          {isNurse && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              From: {request.patientName}
                            </p>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock size={14} className="mr-1" />
                        <span>{formatTimeAgo(request.createdAt)}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.location.href = `/requests#${request.id}`}
                      >
                        {t('appointments.details')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {t('dashboard.noRequests')}
                </p>
              </div>
            )}
          </Card.Content>
        </Card>
      )}
      
      {/* Nearby Nurses Section */}
      {isPatient && (
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>{t('dashboard.nearbyNurses')}</Card.Title>
              <Button 
                variant="outline" 
                size="sm" 
                rightIcon={<ChevronRight size={16} />}
                onClick={() => window.location.href = '/nurses'}
              >
                {t('common.viewAll')}
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyNurses.map((nurse) => (
                <div 
                  key={nurse.id}
                  className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar
                      initials={nurse.name.split(' ').map(n => n[0]).join('')}
                      size="md"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {nurse.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {nurse.specialty}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} className="fill-current" />
                      <span className="ml-1">{nurse.rating}</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {nurse.distance}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => window.location.href = `/nurses/${nurse.id}`}
                  >
                    {t('nurses.viewProfile')}
                  </Button>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;