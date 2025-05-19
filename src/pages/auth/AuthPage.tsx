import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';
import { Heart } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Image/Banner Section - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-700 text-white p-12 items-center justify-center">
        <div className="max-w-md">
          <div className="flex items-center mb-6">
            <Heart className="h-12 w-12 text-white" />
            <h1 className="text-3xl font-bold mr-3">الرعاية المنزلية</h1>
          </div>
          <h2 className="text-2xl font-bold mb-4">رعاية صحية متميزة في منزلك</h2>
          <p className="text-primary-100 mb-6">
            منصة تربط المرضى بالممرضين المؤهلين لتقديم خدمات الرعاية الصحية المنزلية. احصل على الخدمة التي تحتاجها بسهولة وأمان.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-primary-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">مرضى</h3>
              <p className="text-primary-200 text-sm">
                احصل على الخدمات المنزلية من ممرضين محترفين وسجل احتياجاتك
              </p>
            </div>
            <div className="bg-primary-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">ممرضين</h3>
              <p className="text-primary-200 text-sm">
                قدم خدماتك للمرضى وأدر جدولك بمرونة تامة
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold mr-2 text-gray-800">الرعاية المنزلية</h1>
            </div>
          </div>
          
          {/* Auth Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {isLogin ? (
              <LoginForm onSwitchToSignup={toggleAuthMode} />
            ) : (
              <SignupForm onSwitchToLogin={toggleAuthMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;