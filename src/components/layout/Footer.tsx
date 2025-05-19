import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-primary-400" />
              <span className="mr-2 text-xl font-bold">الرعاية المنزلية</span>
            </div>
            <p className="text-gray-300 mb-4">
              منصة متخصصة تربط المرضى بالممرضين المؤهلين لتقديم خدمات الرعاية الصحية المنزلية بأعلى معايير الجودة.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  الخدمات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  الممرضين
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  عن المنصة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 ml-2" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 ml-2" />
                <span className="text-gray-300">info@homecare.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 ml-2 mt-1" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">النشرة الإخبارية</h3>
            <p className="text-gray-300 mb-4">
              اشترك في نشرتنا الإخبارية للحصول على أحدث العروض والأخبار.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="px-4 py-2 rounded-r-md flex-1 text-black"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-l-md"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-300">
          <p>© {new Date().getFullYear()} الرعاية المنزلية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;