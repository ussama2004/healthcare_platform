import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToaster } from '../components/ui/Toaster';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Search, ChevronDown, ChevronUp, HelpCircle, Send, Phone, MessageSquare } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'patient' | 'provider' | 'payment';
}

// Mock FAQs
const faqs: FAQ[] = [
  {
    question: 'What is CareConnect?',
    answer: 'CareConnect is a platform that connects patients with qualified healthcare providers for home healthcare services. Our mission is to make healthcare more accessible by bringing quality care directly to patients\' homes.',
    category: 'general'
  },
  {
    question: 'How does CareConnect work?',
    answer: 'Patients can sign up, browse available healthcare providers, and book appointments for specific services. Healthcare providers visit patients at their homes to provide the requested services. After the service is completed, patients can leave reviews and ratings.',
    category: 'general'
  },
  {
    question: 'Is CareConnect available in my area?',
    answer: 'Currently, CareConnect is available in select cities in Egypt. We\'re continuously expanding our service area. You can check if we serve your location by entering your address during sign-up or in your profile settings.',
    category: 'general'
  },
  {
    question: 'How do I book an appointment?',
    answer: 'To book an appointment, log in to your account, browse available services or healthcare providers, select the service you need, choose a preferred date and time, and confirm your booking. You\'ll receive a confirmation notification once the booking is complete.',
    category: 'patient'
  },
  {
    question: 'Can I cancel or reschedule an appointment?',
    answer: 'Yes, you can cancel or reschedule appointments through your account. Please note that cancellations made less than 24 hours before the scheduled appointment may incur a cancellation fee.',
    category: 'patient'
  },
  {
    question: 'How are healthcare providers verified?',
    answer: 'All healthcare providers on CareConnect undergo a thorough verification process. This includes license verification, background checks, reference checks, and an interview process. We only approve qualified and experienced healthcare professionals.',
    category: 'general'
  },
  {
    question: 'How do I get paid as a healthcare provider?',
    answer: 'Healthcare providers receive payments directly through the platform. After a service is completed, the payment is processed and transferred to your account within 2-3 business days. You can track your earnings in the Analytics section.',
    category: 'provider'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'CareConnect accepts various payment methods including credit/debit cards, bank transfers, and mobile payment services. You can add and manage payment methods in your account settings.',
    category: 'payment'
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Yes, CareConnect prioritizes data security and privacy. We employ industry-standard encryption and security measures to protect your personal information. We never share your information with third parties without your consent.',
    category: 'general'
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer: 'If you\'re not satisfied with a service, you can report the issue through the platform. Our customer support team will investigate and take appropriate action, which may include a refund or service credits depending on the circumstances.',
    category: 'patient'
  }
];

const Help: React.FC = () => {
  const { t } = useLanguage();
  const { addToast } = useToaster();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQs, setExpandedFAQs] = useState<Record<string, boolean>>({});
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call a backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast('Your message has been sent successfully', 'success');
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      addToast('Failed to send message', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sidebar.help')}
        </h1>
      </div>
      
      {/* Search and filter */}
      <div className="mb-8">
        <Input
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
          fullWidth
        />
        
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'general'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setSelectedCategory('general')}
          >
            General
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'patient'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setSelectedCategory('patient')}
          >
            For Patients
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'provider'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setSelectedCategory('provider')}
          >
            For Providers
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedCategory === 'payment'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setSelectedCategory('payment')}
          >
            Payment
          </button>
        </div>
      </div>
      
      {/* FAQs */}
      <Card className="mb-8">
        <Card.Header>
          <Card.Title className="flex items-center">
            <HelpCircle size={20} className="mr-2 text-blue-500" />
            Frequently Asked Questions
          </Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="py-4 px-6">
                  <button
                    className="flex justify-between items-center w-full text-left focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      {expandedFAQs[index] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  
                  {expandedFAQs[index] && (
                    <div className="mt-2 text-gray-600 dark:text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                No FAQs found matching your search criteria.
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
      
      {/* Contact Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <Card.Header>
            <Card.Title className="flex items-center">
              <Mail size={20} className="mr-2 text-teal-500" />
              Contact Support
            </Card.Title>
            <Card.Description>
              Have a specific question? Send us a message and we'll get back to you.
            </Card.Description>
          </Card.Header>
          <Card.Content className="p-6">
            <form onSubmit={handleSubmitContactForm}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  error={formErrors.name}
                  fullWidth
                />
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  error={formErrors.email}
                  leftIcon={<Mail size={18} />}
                  fullWidth
                />
              </div>
              
              <Input
                label="Subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
                error={formErrors.subject}
                className="mb-4"
                fullWidth
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  className={`w-full min-h-[150px] rounded-md border ${
                    formErrors.message 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2`}
                  placeholder="How can we help you?"
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">{formErrors.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                leftIcon={<Send size={16} />}
                isLoading={isSubmitting}
              >
                Send Message
              </Button>
            </form>
          </Card.Content>
        </Card>
        
        {/* Contact Info */}
        <Card>
          <Card.Header>
            <Card.Title>Contact Information</Card.Title>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <Phone size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Phone Support
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  +20 123 456 7890
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Available 9:00 AM - 6:00 PM, Sunday-Thursday
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Mail size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Email Support
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  support@careconnect.example
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  We aim to respond within 24 hours
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <MessageSquare size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Live Chat
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Available on our website
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  9:00 AM - 10:00 PM, everyday
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<MessageSquare size={14} />}
                  className="mt-4"
                >
                  Start Chat
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Help;