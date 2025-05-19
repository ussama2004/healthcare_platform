import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Search, Filter, MapPin, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Nurse {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  background: string;
  location: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  servicesOffered: string[];
  availability: boolean;
}

// Mock data
const mockNurses: Nurse[] = [
  {
    id: '1',
    name: 'Sara Ali',
    specialty: 'General Care',
    background: 'BSc Nursing with 5 years experience in home healthcare',
    location: 'Cairo, Egypt',
    distance: '2.5 km',
    rating: 4.8,
    reviewsCount: 124,
    experience: '5 years',
    servicesOffered: ['Blood Pressure Monitoring', 'Medication Administration', 'Wound Care', 'Injections'],
    availability: true
  },
  {
    id: '2',
    name: 'Layla Mohamed',
    specialty: 'Elderly Care',
    background: 'MSc Geriatric Nursing with 7 years specialized experience',
    location: 'Giza, Egypt',
    distance: '3.2 km',
    rating: 4.7,
    reviewsCount: 98,
    experience: '7 years',
    servicesOffered: ['Elderly Care', 'Medication Administration', 'Glucose Monitoring'],
    availability: true
  },
  {
    id: '3',
    name: 'Omar Khaled',
    specialty: 'Wound Care',
    background: 'BSc Nursing with specialized training in advanced wound care',
    location: 'Cairo, Egypt',
    distance: '4.1 km',
    rating: 4.9,
    reviewsCount: 156,
    experience: '6 years',
    servicesOffered: ['Wound Care', 'Post-Surgery Care', 'Injections'],
    availability: true
  },
  {
    id: '4',
    name: 'Nour Hassan',
    specialty: 'Physical Therapy',
    background: 'MSc Physical Therapy with focus on rehabilitation',
    location: 'Cairo, Egypt',
    distance: '5.8 km',
    rating: 4.6,
    reviewsCount: 87,
    experience: '4 years',
    servicesOffered: ['Physical Therapy', 'Mobility Assistance', 'Rehabilitation Exercises'],
    availability: false
  },
  {
    id: '5',
    name: 'Ahmed Mahmoud',
    specialty: 'Medication Management',
    background: 'BSc Nursing with additional certification in medication management',
    location: 'Giza, Egypt',
    distance: '7.3 km',
    rating: 4.5,
    reviewsCount: 76,
    experience: '3 years',
    servicesOffered: ['Medication Administration', 'Glucose Monitoring', 'Injections'],
    availability: true
  },
  {
    id: '6',
    name: 'Dalia Adel',
    specialty: 'Pediatric Care',
    background: 'BSc Nursing with pediatric specialization',
    location: 'Cairo, Egypt',
    distance: '6.2 km',
    rating: 4.9,
    reviewsCount: 112,
    experience: '8 years',
    servicesOffered: ['Pediatric Care', 'Medication Administration', 'Vaccination'],
    availability: true
  }
];

// Get unique specialties for filtering
const specialties = Array.from(new Set(mockNurses.map(nurse => nurse.specialty)));

// Experience options
const experienceOptions = [
  { value: 'any', label: 'Any Experience' },
  { value: '1-3', label: '1-3 years' },
  { value: '4-6', label: '4-6 years' },
  { value: '7+', label: '7+ years' },
];

const Nurses: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('any');
  const [selectedRating, setSelectedRating] = useState('any');
  const [sortBy, setSortBy] = useState('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter nurses
  const filteredNurses = mockNurses.filter(nurse => {
    const matchesSearch = nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nurse.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty ? nurse.specialty === selectedSpecialty : true;
    
    let matchesExperience = true;
    if (selectedExperience === '1-3') {
      const years = parseInt(nurse.experience);
      matchesExperience = years >= 1 && years <= 3;
    } else if (selectedExperience === '4-6') {
      const years = parseInt(nurse.experience);
      matchesExperience = years >= 4 && years <= 6;
    } else if (selectedExperience === '7+') {
      const years = parseInt(nurse.experience);
      matchesExperience = years >= 7;
    }
    
    let matchesRating = true;
    if (selectedRating === '4+') {
      matchesRating = nurse.rating >= 4.0;
    } else if (selectedRating === '4.5+') {
      matchesRating = nurse.rating >= 4.5;
    } else if (selectedRating === '4.8+') {
      matchesRating = nurse.rating >= 4.8;
    }
    
    return matchesSearch && matchesSpecialty && matchesExperience && matchesRating;
  });
  
  // Sort nurses
  const sortedNurses = [...filteredNurses].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'experience') {
      return parseInt(b.experience) - parseInt(a.experience);
    } else { // reviewsCount
      return b.reviewsCount - a.reviewsCount;
    }
  });
  
  // View nurse profile
  const viewNurseProfile = (id: string) => {
    navigate(`/nurses/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('nurses.title')}
        </h1>
      </div>
      
      {/* Search and filter bar */}
      <Card className="mb-8">
        <Card.Content className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-auto">
              <Input
                placeholder={t('nurses.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
                fullWidth
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <Select
                placeholder={t('nurses.specialty')}
                options={[
                  { value: '', label: 'All Specialties' },
                  ...specialties.map(specialty => ({ value: specialty, label: specialty }))
                ]}
                value={selectedSpecialty}
                onChange={setSelectedSpecialty}
              />
              
              <Select
                placeholder={t('nurses.experience')}
                options={experienceOptions}
                value={selectedExperience}
                onChange={setSelectedExperience}
              />
              
              <Select
                placeholder={t('nurses.rating')}
                options={[
                  { value: 'any', label: 'Any Rating' },
                  { value: '4+', label: '4.0+' },
                  { value: '4.5+', label: '4.5+' },
                  { value: '4.8+', label: '4.8+' }
                ]}
                value={selectedRating}
                onChange={setSelectedRating}
              />
              
              <Select
                placeholder={t('common.sort')}
                options={[
                  { value: 'rating', label: 'Highest Rating' },
                  { value: 'reviewsCount', label: 'Most Reviews' },
                  { value: 'distance', label: 'Closest First' },
                  { value: 'experience', label: 'Most Experienced' }
                ]}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>
            
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {t('nurses.filters')}
            </Button>
          </div>
          
          {/* Mobile filters - shown when filter button is clicked */}
          {isFilterOpen && (
            <div className="mt-4 space-y-4 md:hidden">
              <Select
                label={t('nurses.specialty')}
                options={[
                  { value: '', label: 'All Specialties' },
                  ...specialties.map(specialty => ({ value: specialty, label: specialty }))
                ]}
                value={selectedSpecialty}
                onChange={setSelectedSpecialty}
                fullWidth
              />
              
              <Select
                label={t('nurses.experience')}
                options={experienceOptions}
                value={selectedExperience}
                onChange={setSelectedExperience}
                fullWidth
              />
              
              <Select
                label={t('nurses.rating')}
                options={[
                  { value: 'any', label: 'Any Rating' },
                  { value: '4+', label: '4.0+' },
                  { value: '4.5+', label: '4.5+' },
                  { value: '4.8+', label: '4.8+' }
                ]}
                value={selectedRating}
                onChange={setSelectedRating}
                fullWidth
              />
              
              <Select
                label={t('common.sort')}
                options={[
                  { value: 'rating', label: 'Highest Rating' },
                  { value: 'reviewsCount', label: 'Most Reviews' },
                  { value: 'distance', label: 'Closest First' },
                  { value: 'experience', label: 'Most Experienced' }
                ]}
                value={sortBy}
                onChange={setSortBy}
                fullWidth
              />
            </div>
          )}
        </Card.Content>
      </Card>
      
      {sortedNurses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNurses.map((nurse) => (
            <Card key={nurse.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar
                    initials={nurse.name.split(' ').map(n => n[0]).join('')}
                    size="lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {nurse.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{nurse.specialty}</p>
                    <Badge 
                      variant={nurse.availability ? 'success' : 'danger'}
                      className="mt-1"
                    >
                      {nurse.availability ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {nurse.background}
                </div>
                
                <div className="mb-4 flex flex-wrap gap-1">
                  {nurse.servicesOffered.slice(0, 3).map((service, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs"
                    >
                      {service}
                    </Badge>
                  ))}
                  {nurse.servicesOffered.length > 3 && (
                    <Badge variant="default" className="text-xs">
                      +{nurse.servicesOffered.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={14} className="mr-1" />
                    <span>{nurse.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} className="fill-current" />
                      <span className="ml-1 font-medium">{nurse.rating}</span>
                    </div>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="text-gray-500 dark:text-gray-400">{nurse.reviewsCount} reviews</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => viewNurseProfile(nurse.id)}
                  >
                    {t('nurses.viewProfile')}
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate(`/nurses/${nurse.id}?booking=true`)}
                  >
                    {t('nurses.bookAppointment')}
                  </Button>
                </div>
              </div>
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
              {t('nurses.noNurses')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No healthcare providers match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Nurses;