import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToaster } from '../../components/ui/Toaster';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { Search, Clock, Calendar, MapPin, User, Check, X, MessageSquare, AlertTriangle } from 'lucide-react';

interface ServiceRequest {
  id: string;
  serviceName: string;
  serviceDescription: string;
  patientId: string;
  patientName: string;
  patientAddress: string;
  patientAvatar?: string;
  providerId?: string;
  providerName?: string;
  providerAvatar?: string;
  requestedDate: string;
  requestedTime: string;
  createdAt: string;
  price: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  note?: string;
}

// Mock data
const mockRequests: ServiceRequest[] = [
  {
    id: '1',
    serviceName: 'Blood Pressure Monitoring',
    serviceDescription: 'Regular monitoring of blood pressure levels',
    patientId: '1',
    patientName: 'Ahmed Hassan',
    patientAddress: 'Maadi, Cairo',
    providerId: '2',
    providerName: 'Sara Ali',
    requestedDate: '2025-06-18',
    requestedTime: '10:00 AM',
    createdAt: '2025-06-12T14:20:00Z',
    price: '$45',
    status: 'pending',
    note: 'I need regular monitoring for my hypertension.'
  },
  {
    id: '2',
    serviceName: 'Wound Care',
    serviceDescription: 'Professional cleaning and dressing of wounds',
    patientId: '1',
    patientName: 'Ahmed Hassan',
    patientAddress: 'Maadi, Cairo',
    requestedDate: '2025-06-20',
    requestedTime: '02:30 PM',
    createdAt: '2025-06-10T09:15:00Z',
    price: '$75',
    status: 'accepted',
    providerId: '3',
    providerName: 'Omar Khaled'
  },
  {
    id: '3',
    serviceName: 'Medication Administration',
    serviceDescription: 'Administering prescribed medications',
    patientId: '2',
    patientName: 'Fatima Omar',
    patientAddress: 'Heliopolis, Cairo',
    providerId: '2',
    providerName: 'Sara Ali',
    requestedDate: '2025-06-15',
    requestedTime: '09:00 AM',
    createdAt: '2025-06-08T11:30:00Z',
    price: '$60',
    status: 'completed'
  },
  {
    id: '4',
    serviceName: 'Blood Glucose Monitoring',
    serviceDescription: 'Blood glucose level testing and monitoring',
    patientId: '4',
    patientName: 'Nour Samir',
    patientAddress: 'Nasr City, Cairo',
    providerId: '2',
    providerName: 'Sara Ali',
    requestedDate: '2025-06-19',
    requestedTime: '11:30 AM',
    createdAt: '2025-06-11T10:45:00Z',
    price: '$40',
    status: 'rejected',
    note: 'Sorry, I am fully booked on this date.'
  }
];

const Requests: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToaster();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationNote, setConfirmationNote] = useState('');
  
  const isPatient = user?.role === 'patient';
  const isNurse = user?.role === 'nurse';
  
  // Filter requests based on user role and filters
  const filteredRequests = mockRequests.filter(request => {
    // Filter by user role
    if (isPatient && request.patientId !== user.id) {
      return false;
    }
    
    if (isNurse && request.providerId && request.providerId !== user.id) {
      return false;
    }
    
    // Filter by search query
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = request.serviceName.toLowerCase().includes(searchLower) ||
                          request.patientName.toLowerCase().includes(searchLower) ||
                          (request.providerName && request.providerName.toLowerCase().includes(searchLower));
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const openRequestDetails = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };
  
  const closeRequestDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedRequest(null);
  };
  
  const handleAction = (requestId: string, action: 'accept' | 'reject') => {
    const request = mockRequests.find(r => r.id === requestId);
    if (!request) return;
    
    setSelectedRequest(request);
    setActionType(action);
    setIsConfirmModalOpen(true);
  };
  
  const confirmAction = async () => {
    setIsLoading(true);
    
    // In a real app, this would call a backend endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (actionType === 'accept') {
        addToast('Request accepted successfully', 'success');
      } else {
        addToast('Request rejected successfully', 'info');
      }
      
      setIsConfirmModalOpen(false);
      setIsDetailsModalOpen(false);
    } catch (error) {
      addToast('Failed to process request', 'error');
    } finally {
      setIsLoading(false);
      setActionType(null);
      setConfirmationNote('');
    }
  };
  
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
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="primary">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sidebar.requests')}
        </h1>
      </div>
      
      {/* Search and filter bar */}
      <Card className="mb-8">
        <Card.Content className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto sm:flex-1">
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
                fullWidth
              />
            </div>
            
            <div className="w-full sm:w-auto flex items-center space-x-4">
              <select
                className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>
      
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card 
              key={request.id}
              className="hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start">
                    <div className="hidden md:block">
                      {isPatient ? (
                        request.providerAvatar || request.providerName ? (
                          <Avatar
                            initials={request.providerName?.split(' ').map(n => n[0]).join('') || ''}
                            size="lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <User size={24} className="text-blue-600 dark:text-blue-400" />
                          </div>
                        )
                      ) : (
                        <Avatar
                          initials={request.patientName.split(' ').map(n => n[0]).join('')}
                          size="lg"
                        />
                      )}
                    </div>
                    <div className="md:ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {request.serviceName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isPatient ? (
                          request.providerName ? (
                            <>Provider: {request.providerName}</>
                          ) : (
                            <>Awaiting provider</>
                          )
                        ) : (
                          <>Patient: {request.patientName}</>
                        )}
                      </p>
                      <div className="mt-2">
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Created {formatTimeAgo(request.createdAt)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {formatDate(request.requestedDate)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    {request.requestedTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {request.patientAddress}
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<MessageSquare size={16} />}
                    onClick={() => navigate(`/messages/new?${isPatient ? 'provider' : 'patient'}=${request.id}`)}
                  >
                    Message
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openRequestDetails(request)}
                  >
                    View Details
                  </Button>
                  
                  {isNurse && request.status === 'pending' && (
                    <>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<X size={16} />}
                        onClick={() => handleAction(request.id, 'reject')}
                      >
                        Decline
                      </Button>
                      
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Check size={16} />}
                        onClick={() => handleAction(request.id, 'accept')}
                      >
                        Accept
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
              <Clock size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No requests found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {isPatient 
                ? 'You have no service requests. Browse services to make a new request.'
                : 'You have no service requests matching the current filters.'}
            </p>
            
            {isPatient && (
              <Button
                className="mt-6"
                onClick={() => navigate('/services')}
              >
                Browse Services
              </Button>
            )}
          </div>
        </Card>
      )}
      
      {/* Request Details Modal */}
      {isDetailsModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={closeRequestDetails}></div>
            
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={closeRequestDetails}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Service Request Details
                </h3>
                
                <div className="flex justify-center mb-6">
                  {getStatusBadge(selectedRequest.status)}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Service
                    </h4>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.serviceName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {selectedRequest.serviceDescription}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {isPatient ? 'Provider' : 'Patient'}
                    </h4>
                    <div className="flex items-center mt-1">
                      <Avatar
                        initials={isPatient 
                          ? selectedRequest.providerName?.split(' ').map(n => n[0]).join('') || '?' 
                          : selectedRequest.patientName.split(' ').map(n => n[0]).join('')}
                        size="sm"
                        className="mr-2"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {isPatient ? selectedRequest.providerName || 'Awaiting provider' : selectedRequest.patientName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(selectedRequest.requestedDate)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Time
                      </h4>
                      <p className="text-gray-900 dark:text-white">{selectedRequest.requestedTime}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h4>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.patientAddress}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Price
                    </h4>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.price}</p>
                  </div>
                  
                  {selectedRequest.note && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Note
                      </h4>
                      <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-800 rounded-md mt-1">
                        {selectedRequest.note}
                      </p>
                    </div>
                  )}
                </div>
                
                {isNurse && selectedRequest.status === 'pending' && (
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="danger"
                      leftIcon={<X size={16} />}
                      onClick={() => {
                        handleAction(selectedRequest.id, 'reject');
                        closeRequestDetails();
                      }}
                    >
                      Decline
                    </Button>
                    
                    <Button
                      variant="primary"
                      leftIcon={<Check size={16} />}
                      onClick={() => {
                        handleAction(selectedRequest.id, 'accept');
                        closeRequestDetails();
                      }}
                    >
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {isConfirmModalOpen && selectedRequest && actionType && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={() => setIsConfirmModalOpen(false)}></div>
            
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  {actionType === 'accept' 
                    ? <Check className="text-blue-600 dark:text-blue-400" size={24} />
                    : <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                  }
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {actionType === 'accept' 
                    ? 'Accept Service Request' 
                    : 'Decline Service Request'}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {actionType === 'accept' 
                    ? 'Are you sure you want to accept this service request?' 
                    : 'Are you sure you want to decline this service request?'}
                </p>
                
                <Input
                  label={actionType === 'accept' ? 'Add a note (optional)' : 'Reason for declining (optional)'}
                  placeholder={actionType === 'accept' 
                    ? 'Any specific instructions for the patient...' 
                    : 'Please provide a reason for declining...'}
                  value={confirmationNote}
                  onChange={(e) => setConfirmationNote(e.target.value)}
                  fullWidth
                  className="mb-6"
                />
                
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    variant={actionType === 'accept' ? 'primary' : 'danger'}
                    onClick={confirmAction}
                    isLoading={isLoading}
                  >
                    {actionType === 'accept' ? 'Accept' : 'Decline'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Add navigation function
const navigate = (path: string) => {
  window.location.href = path;
};

export default Requests;