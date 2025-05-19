import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import {
  ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, FileText, 
  User, MessageSquare, Activity, Thermometer, Heart, 
  Droplet, Clipboard, PenTool, Pill
} from 'lucide-react';

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
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  },
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: {
      name: string;
      dosage: string;
      frequency: string;
    }[];
    surgeries: {
      procedure: string;
      date: string;
    }[];
  };
  vitalSigns: {
    date: string;
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    bloodGlucose?: string;
  }[];
  appointments: {
    id: string;
    service: string;
    date: string;
    time: string;
    provider: string;
    status: 'upcoming' | 'completed' | 'canceled';
  }[];
  notes: {
    id: string;
    date: string;
    content: string;
    author: string;
  }[];
  status: 'active' | 'inactive';
}

// Mock data for a single patient
const mockPatient: Patient = {
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
  emergencyContact: {
    name: 'Mohamed Hassan',
    relation: 'Son',
    phone: '+201234567899'
  },
  medicalHistory: {
    conditions: ['Hypertension', 'Type 2 Diabetes', 'Osteoarthritis'],
    allergies: ['Penicillin', 'Shellfish'],
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily'
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily with meals'
      },
      {
        name: 'Acetaminophen',
        dosage: '500mg',
        frequency: 'As needed for pain'
      }
    ],
    surgeries: [
      {
        procedure: 'Appendectomy',
        date: '1990-05-15'
      },
      {
        procedure: 'Knee replacement (right)',
        date: '2020-03-10'
      }
    ]
  },
  vitalSigns: [
    {
      date: '2025-06-01',
      bloodPressure: '135/85 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6°F (37°C)',
      respiratoryRate: '18 breaths/min',
      bloodGlucose: '110 mg/dL'
    },
    {
      date: '2025-05-15',
      bloodPressure: '140/90 mmHg',
      heartRate: '75 bpm',
      temperature: '98.8°F (37.1°C)',
      respiratoryRate: '20 breaths/min',
      bloodGlucose: '125 mg/dL'
    },
    {
      date: '2025-05-01',
      bloodPressure: '145/88 mmHg',
      heartRate: '78 bpm',
      temperature: '98.6°F (37°C)',
      respiratoryRate: '19 breaths/min',
      bloodGlucose: '118 mg/dL'
    }
  ],
  appointments: [
    {
      id: '1',
      service: 'Blood Pressure Monitoring',
      date: '2025-06-15',
      time: '10:00 AM',
      provider: 'Sara Ali',
      status: 'upcoming'
    },
    {
      id: '2',
      service: 'Medication Administration',
      date: '2025-06-01',
      time: '11:30 AM',
      provider: 'Sara Ali',
      status: 'completed'
    },
    {
      id: '3',
      service: 'Blood Glucose Monitoring',
      date: '2025-05-15',
      time: '09:00 AM',
      provider: 'Sara Ali',
      status: 'completed'
    }
  ],
  notes: [
    {
      id: '1',
      date: '2025-06-01',
      content: 'Patient\'s blood pressure is slightly elevated. Recommended lifestyle modifications including reduced sodium intake and increased physical activity.',
      author: 'Sara Ali'
    },
    {
      id: '2',
      date: '2025-05-15',
      content: 'Blood glucose levels are above target range. Reviewed medication compliance and dietary habits. Patient reports occasional missed doses of Metformin and increased carbohydrate intake.',
      author: 'Sara Ali'
    }
  ],
  status: 'active'
};

// Tabs for the patient detail view
type PatientTab = 'overview' | 'medical' | 'appointments' | 'notes';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<PatientTab>('overview');
  
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
      {/* Patient Profile Header */}
      <div className="mb-8">
        <button 
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
          onClick={() => navigate('/patients')}
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back to Patients</span>
        </button>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex items-center">
                <Avatar
                  initials={`${mockPatient.firstName[0]}${mockPatient.lastName[0]}`}
                  size="xl"
                  status={mockPatient.status === 'active' ? 'online' : 'offline'}
                />
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockPatient.firstName} {mockPatient.lastName}
                  </h1>
                  <div className="flex flex-wrap items-center mt-2 gap-2">
                    <Badge variant="default" className="text-xs">
                      ID: {mockPatient.id}
                    </Badge>
                    <Badge variant="default" className="text-xs">
                      {mockPatient.age} years
                    </Badge>
                    <Badge variant={mockPatient.gender === 'male' ? 'info' : 'secondary'} className="text-xs">
                      {mockPatient.gender}
                    </Badge>
                    <Badge
                      variant={mockPatient.status === 'active' ? 'success' : 'danger'}
                    >
                      {mockPatient.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  leftIcon={<MessageSquare size={16} />}
                  onClick={() => navigate(`/messages/new?patient=${mockPatient.id}`)}
                >
                  Send Message
                </Button>
                <Button
                  leftIcon={<Calendar size={16} />}
                  onClick={() => navigate('/appointments')}
                >
                  Schedule Visit
                </Button>
              </div>
            </div>
            
            {/* Contact information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="flex items-center">
                <Phone size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{mockPatient.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{mockPatient.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{mockPatient.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'medical'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('medical')}
        >
          Medical History
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'notes'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('notes')}
        >
          Clinical Notes
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="space-y-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Emergency Contact */}
            <Card className="xl:col-span-1">
              <Card.Header>
                <Card.Title className="flex items-center">
                  <User size={18} className="mr-2 text-red-500" />
                  Emergency Contact
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{mockPatient.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Relationship</p>
                    <p className="font-medium text-gray-900 dark:text-white">{mockPatient.emergencyContact.relation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{mockPatient.emergencyContact.phone}</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
            
            {/* Medical Conditions Overview */}
            <Card className="xl:col-span-2">
              <Card.Header>
                <div className="flex justify-between items-center">
                  <Card.Title className="flex items-center">
                    <Activity size={18} className="mr-2 text-blue-500" />
                    Medical Conditions
                  </Card.Title>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveTab('medical')}
                  >
                    View Full History
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conditions</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockPatient.medicalHistory.conditions.map((condition, index) => (
                        <Badge key={index} variant="warning">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockPatient.medicalHistory.allergies.map((allergy, index) => (
                        <Badge key={index} variant="danger">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Medications</h4>
                  <div className="space-y-2">
                    {mockPatient.medicalHistory.medications.map((med, index) => (
                      <div key={index} className="flex items-center">
                        <Pill size={16} className="text-teal-500 mr-2" />
                        <span className="text-gray-900 dark:text-white">{med.name} ({med.dosage}) - {med.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
            
            {/* Latest Vitals */}
            <Card className="xl:col-span-3">
              <Card.Header>
                <Card.Title className="flex items-center">
                  <Activity size={18} className="mr-2 text-green-500" />
                  Latest Vital Signs
                </Card.Title>
                <Card.Description>
                  Recorded on {formatDate(mockPatient.vitalSigns[0]?.date)}
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Heart size={18} className="text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mockPatient.vitalSigns[0]?.bloodPressure}
                    </p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Activity size={18} className="text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mockPatient.vitalSigns[0]?.heartRate}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Thermometer size={18} className="text-orange-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Temperature</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mockPatient.vitalSigns[0]?.temperature}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Activity size={18} className="text-purple-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Respiratory Rate</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mockPatient.vitalSigns[0]?.respiratoryRate}
                    </p>
                  </div>
                  
                  <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Droplet size={18} className="text-teal-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Blood Glucose</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mockPatient.vitalSigns[0]?.bloodGlucose || 'N/A'}
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card>
            
            {/* Recent Appointments */}
            <Card className="xl:col-span-3">
              <Card.Header>
                <div className="flex justify-between items-center">
                  <Card.Title className="flex items-center">
                    <Calendar size={18} className="mr-2 text-indigo-500" />
                    Recent Appointments
                  </Card.Title>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveTab('appointments')}
                  >
                    View All
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Provider
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatient.appointments.map((appointment) => (
                        <tr 
                          key={appointment.id}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatDate(appointment.date)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {appointment.time}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {appointment.service}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {appointment.provider}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Badge
                              variant={
                                appointment.status === 'upcoming' ? 'primary' :
                                appointment.status === 'completed' ? 'success' :
                                'danger'
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
        
        {/* Medical History Tab */}
        {activeTab === 'medical' && (
          <div className="space-y-6">
            {/* Conditions and Allergies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Card.Header>
                  <Card.Title className="flex items-center">
                    <Activity size={18} className="mr-2 text-red-500" />
                    Medical Conditions
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-2">
                    {mockPatient.medicalHistory.conditions.map((condition, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-gray-800 dark:text-gray-200">{condition}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {mockPatient.medicalHistory.conditions.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No known medical conditions
                    </p>
                  )}
                </Card.Content>
              </Card>
              
              <Card>
                <Card.Header>
                  <Card.Title className="flex items-center">
                    <Clipboard size={18} className="mr-2 text-orange-500" />
                    Allergies
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-2">
                    {mockPatient.medicalHistory.allergies.map((allergy, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-gray-800 dark:text-gray-200">{allergy}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {mockPatient.medicalHistory.allergies.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No known allergies
                    </p>
                  )}
                </Card.Content>
              </Card>
            </div>
            
            {/* Medications */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <Pill size={18} className="mr-2 text-teal-500" />
                  Current Medications
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Medication
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Dosage
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Frequency
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatient.medicalHistory.medications.map((medication, index) => (
                        <tr 
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {medication.name}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {medication.dosage}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {medication.frequency}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {mockPatient.medicalHistory.medications.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic py-4">
                    No current medications
                  </p>
                )}
              </Card.Content>
            </Card>
            
            {/* Surgeries */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <PenTool size={18} className="mr-2 text-blue-500" />
                  Surgical History
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Procedure
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatient.medicalHistory.surgeries.map((surgery, index) => (
                        <tr 
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {surgery.procedure}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {formatDate(surgery.date)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {mockPatient.medicalHistory.surgeries.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic py-4">
                    No surgical history
                  </p>
                )}
              </Card.Content>
            </Card>
            
            {/* Vital Signs History */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <Activity size={18} className="mr-2 text-green-500" />
                  Vital Signs History
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Blood Pressure
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Heart Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Temperature
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Respiratory Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Blood Glucose
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatient.vitalSigns.map((vital, index) => (
                        <tr 
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatDate(vital.date)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {vital.bloodPressure}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {vital.heartRate}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {vital.temperature}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {vital.respiratoryRate}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {vital.bloodGlucose || 'N/A'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
        
        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Patient Appointments
              </h2>
              <Button
                leftIcon={<Calendar size={16} />}
                onClick={() => navigate('/appointments')}
              >
                Schedule New Appointment
              </Button>
            </div>
            
            <Card>
              <Card.Content className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Provider
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatient.appointments.map((appointment) => (
                        <tr 
                          key={appointment.id}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatDate(appointment.date)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {appointment.time}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {appointment.service}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {appointment.provider}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                appointment.status === 'upcoming' ? 'primary' :
                                appointment.status === 'completed' ? 'success' :
                                'danger'
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/appointments#${appointment.id}`)}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
        
        {/* Clinical Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Clinical Notes
              </h2>
              <Button
                leftIcon={<PenTool size={16} />}
              >
                Add Note
              </Button>
            </div>
            
            <div className="space-y-6">
              {mockPatient.notes.map((note) => (
                <Card key={note.id}>
                  <Card.Content className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          Note from {note.author}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(note.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {note.content}
                    </div>
                  </Card.Content>
                </Card>
              ))}
              
              {mockPatient.notes.length === 0 && (
                <div className="text-center py-8">
                  <FileText size={40} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No clinical notes available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;