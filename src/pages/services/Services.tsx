import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Search, Filter, Clock, DollarSign, Heart, Star } from 'lucide-react';
import ServiceDetail from './ServiceDetail';

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

// Mock data
const mockServices: Service[] = [
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
  },
  {
    id: '4',
    name: 'Physical Therapy',
    description: 'Personalized physical therapy sessions to improve mobility, strength, and function.',
    category: 'Therapy',
    price: '$90',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewsCount: 112,
    popular: true
  },
  {
    id: '5',
    name: 'Glucose Monitoring',
    description: 'Blood glucose level testing and monitoring for diabetic patients.',
    category: 'Monitoring',
    price: '$40',
    duration: '30 min',
    image: 'https://images.pexels.com/photos/7446989/pexels-photo-7446989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    reviewsCount: 78,
    popular: true
  },
  {
    id: '6',
    name: 'Injections',
    description: 'Administration of prescribed injections by a qualified healthcare professional.',
    category: 'Medication',
    price: '$55',
    duration: '30 min',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    reviewsCount: 42,
    popular: false
  },
  {
    id: '7',
    name: 'Elderly Care',
    description: 'Comprehensive care services for elderly patients, including assistance with daily activities.',
    category: 'General',
    price: '$85',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewsCount: 136,
    popular: true
  },
  {
    id: '8',
    name: 'Post-Surgery Care',
    description: 'Specialized care for patients recovering from surgery, including wound care and monitoring.',
    category: 'Specialized',
    price: '$100',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewsCount: 64,
    popular: true
  }
];

// Get unique categories
const categories = Array.from(new Set(mockServices.map(service => service.category)));

const Services: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Popular services (for featured section)
  const popularServices = mockServices.filter(service => service.popular);
  
  // Filter and sort services
  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'price-low') {
      return parseInt(a.price.substring(1)) - parseInt(b.price.substring(1));
    } else if (sortBy === 'price-high') {
      return parseInt(b.price.substring(1)) - parseInt(a.price.substring(1));
    } else if (sortBy === 'duration') {
      return parseInt(a.duration) - parseInt(b.duration);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else { // popularity (default)
      return b.reviewsCount - a.reviewsCount;
    }
  });
  
  const openServiceDetail = (service: Service) => {
    setSelectedService(service);
    setIsDetailOpen(true);
  };
  
  const closeServiceDetail = () => {
    setIsDetailOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('services.title')}
        </h1>
      </div>
      
      {/* Search and filter bar */}
      <Card className="mb-8">
        <Card.Content className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <Input
                placeholder={t('services.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
                fullWidth
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Select
                placeholder={t('services.category')}
                options={[
                  { value: '', label: 'All Categories' },
                  ...categories.map(cat => ({ value: cat, label: cat }))
                ]}
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="w-full md:w-auto"
              />
              
              <Select
                placeholder="Sort by"
                options={[
                  { value: 'popularity', label: 'Popularity' },
                  { value: 'rating', label: 'Rating' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'duration', label: 'Duration' },
                ]}
                value={sortBy}
                onChange={setSortBy}
                className="w-full md:w-auto"
              />
              
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Filter size={16} />}
                className="md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {t('common.filter')}
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
      
      {/* Popular Services Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('services.popular')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.slice(0, 3).map((service) => (
            <Card 
              key={service.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
              onClick={() => openServiceDetail(service)}
            >
              <div className="relative h-48">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="primary" className="font-medium">
                    Popular
                  </Badge>
                </div>
              </div>
              <Card.Content className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    openServiceDetail(service);
                  }}
                >
                  {t('services.book')}
                </Button>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
      
      {/* All Services Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('services.all')}
          </h2>
        </div>
        
        {sortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.map((service) => (
              <Card 
                key={service.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
                onClick={() => openServiceDetail(service)}
              >
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md text-gray-400 hover:text-red-500 focus:outline-none transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                <Card.Content className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <Badge variant="secondary">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 h-10">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center mt-2">
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
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openServiceDetail(service);
                      }}
                    >
                      {t('services.details')}
                    </Button>
                    {user?.role === 'patient' && (
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          openServiceDetail(service);
                        }}
                      >
                        {t('services.book')}
                      </Button>
                    )}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
                <Search size={24} className="text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('services.noServices')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No services match your current filters. Try adjusting your search.
              </p>
            </div>
          </Card>
        )}
      </div>
      
      {/* Service Detail Modal */}
      {isDetailOpen && selectedService && (
        <ServiceDetail
          service={selectedService}
          onClose={closeServiceDetail}
        />
      )}
    </>
  );
};

export default Services;