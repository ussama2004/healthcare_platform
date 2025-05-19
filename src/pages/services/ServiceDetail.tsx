import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToaster } from '../../components/ui/Toaster';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import {
  X, Clock, DollarSign, Calendar, Star, Info, ChevronRight,
  User, MapPin, CalendarCheck
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  image: string;
  rating: number;
  reviewsCount: number;
  popular: boolean;
}

// Mock data for nurses that provide this service
const serviceProviders = [
  {
    id: '1',
    name: 'Sara Ali',
    avatar: '',
    specialty: 'General Care',
    rating: 4.8,
    reviewsCount: 124,
    distance: '2.5 km',
  },
  {
    id: '2',
    name: 'Layla Mohamed',
    avatar: '',
    specialty: 'Elderly Care',
    rating: 4.7,
    reviewsCount: 98,
    distance: '3.2 km',
  },
  {
    id: '3',
    name: 'Omar Khaled',
    avatar: '',
    specialty: 'Wound Care',
    rating: 4.9,
    reviewsCount: 156,
    distance: '4.1 km',
  },
];

interface ServiceDetailProps {
  service: Service;
  onClose: () => void;
}

type BookingStep = 'provider' | 'date' | 'confirm';

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToaster();
  const [isBooking, setIsBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState<BookingStep>('provider');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const isPatient = user?.role === 'patient';
  
  const availableDates = [
    { date: '2025-06-15', day: 'Monday, June 15, 2025' },
    { date: '2025-06-16', day: 'Tuesday, June 16, 2025' },
    { date: '2025-06-17', day: 'Wednesday, June 17, 2025' },
    { date: '2025-06-18', day: 'Thursday, June 18, 2025' },
    { date: '2025-06-19', day: 'Friday, June 19, 2025' },
  ];
  
  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];
  
  const handleStartBooking = () => {
    setIsBooking(true);
    setCurrentStep('provider');
  };
  
  const handleSelectProvider = (providerId: string) => {
    setSelectedProvider(providerId);
    setCurrentStep('date');
  };
  
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleProceedToConfirm = () => {
    if (!selectedDate || !selectedTime) {
      addToast('Please select a date and time', 'error');
      return;
    }
    setCurrentStep('confirm');
  };
  
  const handleConfirmBooking = async () => {
    if (!selectedProvider || !selectedDate || !selectedTime) {
      addToast('Please complete all booking information', 'error');
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would call a backend endpoint to create the appointment
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast('Appointment booked successfully', 'success');
      onClose();
    } catch (error) {
      addToast('Failed to book appointment', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'date') {
      setCurrentStep('provider');
    } else if (currentStep === 'confirm') {
      setCurrentStep('date');
    } else {
      setIsBooking(false);
    }
  };
  
  const selectedProviderData = selectedProvider 
    ? serviceProviders.find(provider => provider.id === selectedProvider) 
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose}></div>
        
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all relative">
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-black/20 text-white hover:bg-black/30"
            >
              <X size={20} />
            </button>
          </div>
          
          {!isBooking ? (
            <>
              {/* Service image and details */}
              <div className="relative h-64 w-full">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <Badge variant="secondary" className="self-start mb-2">
                    {service.category}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">
                    {service.name}
                  </h3>
                  <div className="flex items-center mt-2 text-white">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{service.rating}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{service.reviewsCount} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap justify-between mb-6">
                  <div className="flex items-center mb-2 md:mb-0">
                    <Clock size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{service.duration}</span>
                  </div>
                  
                  <div className="flex items-center font-semibold text-xl text-gray-900 dark:text-white">
                    <DollarSign size={18} className="mr-1" />
                    <span>{service.price}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
                
                {/* Quick info about the service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-0">
                    <Card.Content className="p-4">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mr-4">
                          <Info size={20} />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">What's Included</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Professional healthcare provider</li>
                            <li>• Complete service at your home</li>
                            <li>• Basic supplies and equipment</li>
                          </ul>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                  
                  <Card className="bg-teal-50 dark:bg-teal-900/20 border-0">
                    <Card.Content className="p-4">
                      <div className="flex items-start">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-full text-teal-600 dark:text-teal-300 mr-4">
                          <Info size={20} />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">What to Prepare</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Clear space for the procedure</li>
                            <li>• Medical history documents</li>
                            <li>• List of current medications</li>
                          </ul>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                {isPatient && (
                  <Button
                    variant="primary"
                    leftIcon={<Calendar size={16} />}
                    onClick={handleStartBooking}
                  >
                    {t('services.book')}
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Booking process */
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('bookings.title')}: {service.name}
                </h3>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.price}
                </div>
              </div>
              
              {/* Progress steps */}
              <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
                
                <div className={`relative z-10 flex flex-col items-center ${currentStep === 'provider' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 'provider' ? 'bg-blue-600 text-white' : currentStep === 'date' || currentStep === 'confirm' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {currentStep === 'date' || currentStep === 'confirm' ? <Check size={16} /> : 1}
                  </div>
                  <span className="text-sm mt-1">{t('bookings.selectProvider')}</span>
                </div>
                
                <div className={`relative z-10 flex flex-col items-center ${currentStep === 'date' ? 'text-blue-600 dark:text-blue-500' : currentStep === 'confirm' ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 'date' ? 'bg-blue-600 text-white' : currentStep === 'confirm' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {currentStep === 'confirm' ? <Check size={16} /> : 2}
                  </div>
                  <span className="text-sm mt-1">{t('bookings.selectDate')}</span>
                </div>
                
                <div className={`relative z-10 flex flex-col items-center ${currentStep === 'confirm' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 'confirm' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    3
                  </div>
                  <span className="text-sm mt-1">{t('bookings.reviewBooking')}</span>
                </div>
              </div>
              
              {/* Step content */}
              <div className="mb-6">
                {currentStep === 'provider' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('bookings.selectProvider')}
                    </h4>
                    
                    <div className="space-y-4">
                      {serviceProviders.map((provider) => (
                        <div 
                          key={provider.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedProvider === provider.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => handleSelectProvider(provider.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 overflow-hidden">
                                {provider.avatar ? (
                                  <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                                ) : (
                                  provider.name.split(' ').map(n => n[0]).join('')
                                )}
                              </div>
                              <div className="ml-3">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {provider.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {provider.specialty}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({provider.reviewsCount})</span>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {provider.distance}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentStep === 'date' && selectedProvider && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('bookings.selectDate')}
                    </h4>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">Select a Date</h5>
                        <div className="space-y-2">
                          {availableDates.map((dateOption) => (
                            <div 
                              key={dateOption.date}
                              className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedDate === dateOption.date 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                              onClick={() => handleDateSelection(dateOption.date)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                                  <span className="text-gray-900 dark:text-white">{dateOption.day}</span>
                                </div>
                                {selectedDate === dateOption.date && (
                                  <div className="text-blue-600 dark:text-blue-400">
                                    <Check size={18} />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">Select a Time</h5>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimes.map((time) => (
                            <div 
                              key={time}
                              className={`p-2 text-center border rounded-md cursor-pointer transition-colors ${selectedTime === time 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                              }`}
                              onClick={() => handleTimeSelection(time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Input
                          label="Additional Notes (Optional)"
                          placeholder="Any specific requirements or information the provider should know..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 'confirm' && selectedProvider && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('bookings.reviewBooking')}
                    </h4>
                    
                    <Card className="mb-6">
                      <Card.Content className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">{service.name}</h5>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{service.category}</p>
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {service.price}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <User size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Provider</p>
                              <p className="text-gray-900 dark:text-white">{selectedProviderData?.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                              <p className="text-gray-900 dark:text-white">
                                {new Date(selectedDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                              <p className="text-gray-900 dark:text-white">{selectedTime} ({service.duration})</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                              <p className="text-gray-900 dark:text-white">Your Home Address</p>
                            </div>
                          </div>
                          
                          {notes && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                {notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </Card.Content>
                    </Card>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-blue-300 mr-3">
                          <Info size={18} />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Booking Information</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            By confirming this booking, you agree to the terms and conditions of our service. 
                            The provider will visit your registered address at the specified time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  {t('common.back')}
                </Button>
                
                {currentStep === 'provider' && selectedProvider && (
                  <Button
                    onClick={() => setCurrentStep('date')}
                    rightIcon={<ChevronRight size={16} />}
                  >
                    {t('common.next')}
                  </Button>
                )}
                
                {currentStep === 'date' && (
                  <Button
                    onClick={handleProceedToConfirm}
                    disabled={!selectedDate || !selectedTime}
                    rightIcon={<ChevronRight size={16} />}
                  >
                    {t('common.next')}
                  </Button>
                )}
                
                {currentStep === 'confirm' && (
                  <Button
                    onClick={handleConfirmBooking}
                    isLoading={isLoading}
                    leftIcon={<CalendarCheck size={16} />}
                  >
                    {t('bookings.confirm')}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add a Check icon component
const Check = ({ size }: { size: number }) => (
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ServiceDetail;