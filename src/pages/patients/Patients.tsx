import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Search, Filter, MapPin, Phone, Mail, Calendar, FileText, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  age: number;
  gender: 'male' | 'female';
  address: string;
  phone: string;
  email: string;
  lastVisit?: string;
  upcomingAppointment?: string;
  conditions?: string[];
  status: 'active' | 'inactive';
}

// Mock data for patients
const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    age: 65,
    gender: 'male',
    address: 'Maadi, Cairo',
    phone: '+201234567890',
    email: 'ahmed.hassan@example.com',
    lastVisit: '2025-06-01',
    upcomingAppointment: '2025-06-15',
    conditions: ['Hypertension', 'Diabetes'],
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Omar',
    age: 72,
    gender: 'female',
    address: 'Heliopolis, Cairo',
    phone: '+201234567891',
    email: 'fatima.omar@example.com',
    lastVisit: '2025-05-28',
    upcomingAppointment: '2025-06-18',
    conditions: ['Arthritis', 'Heart Disease'],
    status: 'active'
  },
  {
    id: '3',
    firstName: 'Ali',
    lastName: 'Mahmoud',
    age: 58,
    gender: 'male',
    address: 'Dokki, Giza',
    phone: '+201234567892',
    email: 'ali.mahmoud@example.com',
    lastVisit: '2025-05-20',
    conditions: ['COPD'],
    status: 'inactive'
  },
  {
    id: '4',
    firstName: 'Nour',
    lastName: 'Samir',
    age: 45,
    gender: 'female',
    address: 'Nasr City, Cairo',
    phone: '+201234567893',
    email: 'nour.samir@example.com',
    lastVisit: '2025-06-05',
    upcomingAppointment: '2025-06-20',
    conditions: ['Post-surgery recovery'],
    status: 'active'
  },
  {
    id: '5',
    firstName: 'Khaled',
    lastName: 'Ibrahim',
    age: 68,
    gender: 'male',
    address: 'Mohandessin, Giza',
    phone: '+201234567894',
    email: 'khaled.ibrahim@example.com',
    lastVisit: '2025-05-15',
    conditions: ['Parkinson\'s Disease', 'Hypertension'],
    status: 'active'
  },
  {
    id: '6',
    firstName: 'Layla',
    lastName: 'Ahmed',
    age: 75,
    gender: 'female',
    address: '6th of October, Giza',
    phone: '+201234567895',
    email: 'layla.ahmed@example.com',
    lastVisit: '2025-05-10',
    upcomingAppointment: '2025-06-17',
    conditions: ['Diabetes', 'Osteoporosis'],
    status: 'active'
  }
];

const Patients: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit'>('lastVisit');
  
  // Filter and sort patients
  const filteredPatients = mockPatients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.conditions?.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         false;
    
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortBy === 'name') {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    } else {
      // Sort by last visit date (most recent first)
      if (!a.lastVisit) return 1;
      if (!b.lastVisit) return -1;
      return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
    }
  });
  
  const viewPatientDetail = (id: string) => {
    navigate(`/patients/${id}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('patients.title')}
        </h1>
      </div>
      
      {/* Search and filter bar */}
      <Card className="mb-8">
        <Card.Content className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="w-full md:w-auto flex-1">
              <Input
                placeholder={t('patients.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
                fullWidth
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <select
                className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Patients</option>
                <option value="active">Active Patients</option>
                <option value="inactive">Inactive Patients</option>
              </select>
              
              <select
                className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'lastVisit')}
              >
                <option value="lastVisit">Sort by Last Visit</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>
      
      {sortedPatients.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {sortedPatients.map((patient) => (
            <Card 
              key={patient.id}
              className="hover:shadow-md transition-shadow overflow-hidden"
            >
              <Card.Content className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center">
                    <Avatar
                      initials={`${patient.firstName[0]}${patient.lastName[0]}`}
                      size="lg"
                      status={patient.status === 'active' ? 'online' : 'offline'}
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <div className="flex flex-wrap items-center mt-1 gap-2">
                        <Badge variant="default" className="text-xs">
                          {patient.age} years
                        </Badge>
                        <Badge variant={patient.gender === 'male' ? 'info' : 'secondary'} className="text-xs">
                          {patient.gender}
                        </Badge>
                        {patient.conditions?.map((condition, index) => (
                          <Badge key={index} variant="warning" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                    <Badge
                      variant={patient.status === 'active' ? 'success' : 'danger'}
                      className="mb-2"
                    >
                      {patient.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                    <div className="flex sm:flex-col items-center sm:items-end mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>Last Visit: {formatDate(patient.lastVisit)}</span>
                      </div>
                      {patient.upcomingAppointment && (
                        <div className="ml-4 sm:ml-0 sm:mt-1 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>Next: {formatDate(patient.upcomingAppointment)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{patient.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{patient.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{patient.email}</span>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<FileText size={16} />}
                    className="mr-2"
                  >
                    Medical Records
                  </Button>
                  <Button
                    leftIcon={<User size={16} />}
                    size="sm"
                    onClick={() => viewPatientDetail(patient.id)}
                  >
                    View Profile
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
              <User size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('patients.noPatients')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No patients found with the current filters. Try adjusting your search.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Patients;