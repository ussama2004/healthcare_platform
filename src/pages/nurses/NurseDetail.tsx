import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Briefcase, 
  CheckCircle, 
  Calendar as CalendarIcon,
  MessageSquare,
  Heart,
  Award
} from 'lucide-react';
import ServiceDetail from '../services/ServiceDetail';

interface Nurse {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  background: string;
  bio: string;
  location: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  email: string;
  phone: string;
  servicesOffered: Service[];
  education: string[];
  certifications: string[];
  languages: string[];
  availability: {
    days: string[];
    hours: string;
  };
}

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

interface Review {
  id: string;
  patientName: string;
  patientAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data for a nurse
const mockNurse: Nurse = {
  id: '1',
  name: 'Sara Ali',
  specialty: 'General Care',
  background: 'BSc Nursing with 5 years experience in home healthcare',
  bio: 'I am a dedicated nursing professional with over 5 years of experience in home healthcare. I specialize in general care services including medication management, vital signs monitoring, wound care, and patient education. I am passionate about providing high-quality care in the comfort of patients\' homes and building trusting relationships with my patients.',
  location: 'Cairo, Egypt',
  distance: '2.5 km',
  rating: 4.8,
  reviewsCount: 124,
  experience: '5 years',
  email: 'sara.ali@example.com',
  phone: '+201234567890',
  servicesOffered: [
    {
      id: '1',
      name: 'Blood Pressure Monitoring',
      description: 'Regular monitoring of blood pressure levels for patients with hypertension or other cardiovascular conditions.',
      category: 'Monitoring',
      price: '$45',
      duration: '30 min',
      image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.8,
      reviewsCount: 124,
      popular: true
    },
    {
      id: '2',
      name: 'Medication Administration',
      description: 'Professional administration of prescribed medications, ensuring proper dosage and timing.',
      category: 'Medication',
      price: '$60',
      duration: '45 min',
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.9,
      reviewsCount: 89,
      popular: true
    },
    {
      id: '3',
      name: 'Wound Care',
      description: 'Professional cleaning, treatment and dressing of wounds to promote proper healing.',
      category: 'Treatment',
      price: '$75',
      duration: '45 min',
      image: 'https://images.pexels.com/photos/7088843/pexels-photo-7088843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.7,
      reviewsCount: 56,
      popular: false
    }
  ],
  education: [
    'BSc Nursing, Cairo University (2015-2019)',
    'Advanced Certification in Home Healthcare (2020)'
  ],
  certifications: [
    'Basic Life Support (BLS)',
    'Certified Wound Care Specialist',
    'IV Therapy Certification'
  ],
  languages: ['Arabic', 'English'],
  availability: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    hours: '9:00 AM - 5:00 PM'
  }
};

// Mock reviews
const mockReviews: Review[] = [
  {
    id: '1',
    patientName: 'Ahmed Hassan',
    rating: 5,
    comment: 'Sara was very professional and attentive to my needs. She was punctual and made me feel comfortable throughout the whole process. Highly recommend her services!',
    date: '2025-05-15'
  },
  {
    id: '2',
    patientName: 'Fatima Omar',
    rating: 4,
    comment: 'Great service. Sara is knowledgeable and patient. She explained everything clearly and was very gentle during the procedure.',
    date: '2025-05-10'
  },
  {
    id: '3',
    patientName: 'Mohammed Khaled',
    rating: 5,
    comment: 'Excellent service! Sara was on time, professional, and very caring. She provided detailed instructions for aftercare as well.',
    date: '2025-05-01'
  }
];

const NurseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);
  
  // Check if coming from a booking link
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isBooking = searchParams.get('booking');
    
    if (isBooking === 'true') {
      setActiveTab('services');
    }
  }, [location]);
  
  const openServiceDetail = (service: Service) => {
    setSelectedService(service);
    setIsServiceDetailOpen(true);
  };
  
  const closeServiceDetail = () => {
    setIsServiceDetailOpen(false);
    setSelectedService(null);
  };

  return (
    <div>
      {/* Nurse Profile Header */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-6 flex items-center w-full">
          <Avatar
            initials={mockNurse.name.split(' ').map(n => n[0]).join('')}
            size="xl"
            className="border-4 border-white dark:border-gray-800"
          />
          <div className="ml-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white">
                {mockNurse.name}
              </h1>
              <button className="ml-4 text-white/80 hover:text-white">
                <Heart size={20} />
              </button>
            </div>
            <div className="flex items-center mt-1">
              <Badge
                variant="secondary"
                className="mr-2"
              >
                {mockNurse.specialty}
              </Badge>
              <div className="flex items-center text-white">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>{mockNurse.rating}</span>
                <span className="mx-1 text-white/70">•</span>
                <span className="text-white/70">{mockNurse.reviewsCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'about'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('about')}
        >
          {t('nurses.about')}
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'services'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'reviews'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          {t('nurses.reviews')} ({mockReviews.length})
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <Card>
                <Card.Header>
                  <Card.Title>About</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-gray-700 dark:text-gray-300">
                    {mockNurse.bio}
                  </p>
                  
                  <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                      Education
                    </h4>
                    <ul className="space-y-3">
                      {mockNurse.education.map((edu, index) => (
                        <li key={index} className="flex items-start">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                            <Award size={14} />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                      Certifications
                    </h4>
                    <ul className="space-y-3">
                      {mockNurse.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <div className="p-1 bg-teal-100 dark:bg-teal-900/40 rounded-full text-teal-600 dark:text-teal-400 mr-3 mt-0.5">
                            <CheckCircle size={14} />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mockNurse.languages.map((lang, index) => (
                        <Badge key={index} variant="default">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Services Offered
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockNurse.servicesOffered.map((service) => (
                  <Card 
                    key={service.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openServiceDetail(service)}
                  >
                    <div className="relative h-40">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        {service.popular && (
                          <Badge variant="primary" className="font-medium">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Card.Content className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {service.name}
                        </h4>
                        <Badge variant="secondary">
                          {service.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center mt-2 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{service.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{service.reviewsCount} reviews</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Clock size={16} className="mr-1" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {service.price}
                        </div>
                      </div>
                      
                      <Button
                        variant="primary"
                        className="w-full mt-4"
                      >
                        Book This Service
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('nurses.reviews')} ({mockReviews.length})
                </h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white mr-2">{mockNurse.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(mockNurse.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <Card.Content className="p-6">
                      <div className="flex items-start">
                        <Avatar
                          initials={review.patientName.split(' ').map(n => n[0]).join('')}
                          size="md"
                          className="mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                              {review.patientName}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                              />
                            ))}
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info Card */}
          <Card>
            <Card.Header>
              <Card.Title>{t('nurses.contactInfo')}</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">{mockNurse.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">{mockNurse.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <span className="text-gray-900 dark:text-white">{mockNurse.location}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {mockNurse.distance} from your location
                    </p>
                  </div>
                </div>
              </div>
              
              {user?.role === 'patient' && (
                <div className="mt-6">
                  <Button
                    variant="primary"
                    leftIcon={<CalendarIcon size={16} />}
                    fullWidth
                    onClick={() => setActiveTab('services')}
                  >
                    Book Appointment
                  </Button>
                  
                  <Button
                    variant="outline"
                    leftIcon={<MessageSquare size={16} />}
                    fullWidth
                    className="mt-3"
                    onClick={() => navigate('/messages/new?provider=' + mockNurse.id)}
                  >
                    Send Message
                  </Button>
                </div>
              )}
            </Card.Content>
          </Card>
          
          {/* Work Experience */}
          <Card>
            <Card.Header>
              <Card.Title>Experience</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="flex items-center mb-4">
                <Briefcase size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                <span className="text-gray-900 dark:text-white">{mockNurse.experience} of experience</span>
              </div>
            </Card.Content>
          </Card>
          
          {/* Availability */}
          <Card>
            <Card.Header>
              <Card.Title>{t('nurses.availability')}</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">
                    {mockNurse.availability.days.join(', ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">
                    {mockNurse.availability.hours}
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
      
      {/* Service Detail Modal */}
      {isServiceDetailOpen && selectedService && (
        <ServiceDetail 
          service={selectedService}
          onClose={closeServiceDetail}
        />
      )}
    </div>
  );
};

export default NurseDetail;