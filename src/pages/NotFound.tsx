import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        
        <div className="mt-6 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t('errors.notFound')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        
        <Link to="/dashboard">
          <Button
            leftIcon={<Home size={18} />}
            size="lg"
          >
            {t('errors.goHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;