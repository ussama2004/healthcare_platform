import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, ShieldCheck, Users, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  const { authState } = useAuth();
  
  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!authState.isAuthenticated || !authState.user) return '/auth';
    
    switch (authState.user.role) {
      case UserRole.PATIENT:
        return '/patient/dashboard';
      case UserRole.NURSE:
        return '/nurse/dashboard';
      case UserRole.ADMIN:
        return '/admin/dashboard';
      default:
        return '/auth';
    }
  };
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="الرعاية الصحية المنزلية" 
                className="rounded-lg shadow-xl max-w-full mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="flex items-center mb-6">
                <Heart className="h-10 w-10 text-white" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mr-3">الرعاية المنزلية</h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                رعاية صحية متميزة في منزلك
              </h2>
              <p className="text-white opacity-90 text-lg mb-8">
                منصة تربط المرضى بالممرضين المؤهلين لتقديم خدمات الرعاية الصحية المنزلية.
                احصل على الخدمة التي تحتاجها بسهولة وأمان.
              </p>
              <div className="flex flex-wrap gap-4">
                {authState.isAuthenticated ? (
                  <Link to={getDashboardPath()}>
                    <Button size="lg">
                      الذهاب إلى لوحة التحكم
                      <ArrowLeft className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button size="lg">
                        تسجيل الدخول
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button size="lg" variant="secondary">
                        إنشاء حساب
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">مميزات المنصة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">رعاية عالية الجودة</h3>
              <p className="text-gray-600">
                نوفر ممرضين ذوي خبرة وتدريب عالي للتأكد من حصول المرضى على أفضل رعاية ممكنة.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-secondary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">خصوصية وأمان</h3>
              <p className="text-gray-600">
                نضمن خصوصية وأمان بياناتك الشخصية والطبية، مع التزامنا بأعلى معايير الأمان.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-accent-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">سهولة الاستخدام</h3>
              <p className="text-gray-600">
                واجهة سهلة الاستخدام تمكنك من طلب الخدمة التي تحتاجها ومتابعتها بكل سهولة.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">كيف تعمل المنصة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  ١
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">إنشاء حساب</h3>
                <p className="text-gray-600">
                  سجل كمريض أو ممرض وأكمل ملفك الشخصي مع معلوماتك الأساسية.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 h-2 w-1/2 bg-primary-600 left-full"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  ٢
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">اختر الخدمة</h3>
                <p className="text-gray-600">
                  للمرضى: ابحث عن الممرضين واطلب الخدمة التي تحتاجها.
                  <br />
                  للممرضين: أضف خدماتك وأوقات توفرك.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 h-2 w-1/2 bg-primary-600 left-full"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  ٣
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">احصل على الرعاية</h3>
                <p className="text-gray-600">
                  يقوم الممرض بتقديم الخدمة في الموعد المحدد، وبعدها يمكنك تقييم الخدمة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">آراء المستخدمين</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-xl">م</span>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold">محمد العلي</h4>
                  <p className="text-sm text-gray-500">مريض</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "كانت تجربة ممتازة مع منصة الرعاية المنزلية. وجدت ممرضة محترفة لمساعدتي في حقن الإنسولين بشكل يومي، وكانت الخدمة دقيقة ومريحة جداً."
              </p>
              <div className="flex text-warning-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-secondary-700 font-bold text-xl">ن</span>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold">نورة الأحمد</h4>
                  <p className="text-sm text-gray-500">ممرضة</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "المنصة ساعدتني في إيجاد المزيد من الفرص لتقديم خدماتي التمريضية. أستطيع تنظيم جدولي بمرونة والتواصل مباشرة مع المرضى. تجربة رائعة!"
              </p>
              <div className="flex text-warning-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-700 font-bold text-xl">س</span>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold">سلمان الحربي</h4>
                  <p className="text-sm text-gray-500">مريض</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "أحتاج إلى علاج طبيعي بشكل منتظم، وقد وفرت لي المنصة ممرضين متخصصين ومؤهلين. الحجز سهل والخدمة ممتازة."
              </p>
              <div className="flex text-warning-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-300">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">ابدأ بالحصول على الرعاية الصحية المنزلية اليوم</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            انضم إلى منصتنا اليوم واحصل على خدمات الرعاية الصحية المنزلية بسهولة وأمان.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {authState.isAuthenticated ? (
              <Link to={getDashboardPath()}>
                <Button size="lg">
                  الذهاب إلى لوحة التحكم
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;