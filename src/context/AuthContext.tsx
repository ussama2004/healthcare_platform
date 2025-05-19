import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState, LoginCredentials, SignupData } from '../types';

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'محمد أحمد',
    email: 'patient@example.com',
    password: 'password123',
    phone: '0501234567',
    role: UserRole.PATIENT,
    address: 'الرياض، حي النزهة',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'سارة محمد',
    email: 'nurse@example.com',
    password: 'password123',
    phone: '0567891234',
    role: UserRole.NURSE,
    specialization: ['تمريض عام', 'رعاية المسنين'],
    services: [
      {
        id: '1',
        name: 'حقن الإنسولين',
        description: 'إعطاء حقن الإنسولين للمرضى',
        price: 50,
        duration: 15,
        category: 'حقن'
      }
    ],
    certifications: ['شهادة البكالوريوس في التمريض'],
    rating: 4.8,
    availability: [
      { day: 'الأحد', startTime: '09:00', endTime: '17:00' },
      { day: 'الإثنين', startTime: '09:00', endTime: '17:00' },
      { day: 'الثلاثاء', startTime: '09:00', endTime: '17:00' },
    ],
    experience: 5,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'أحمد خالد',
    email: 'admin@example.com',
    password: 'password123',
    phone: '0512345678',
    role: UserRole.ADMIN,
    department: 'إدارة المنصة',
    createdAt: new Date(),
  }
];

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState({ ...authState, loading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user (this would be an API call in a real app)
      const user = MOCK_USERS.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      
      if (!user) {
        throw new Error('بيانات الدخول غير صحيحة');
      }
      
      // Remove password before storing
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setAuthState({
        user: userWithoutPassword as User,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الدخول',
      });
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    setAuthState({ ...authState, loading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === data.email)) {
        throw new Error('البريد الإلكتروني مستخدم بالفعل');
      }
      
      // Create a new user (this would be an API call in a real app)
      const newUser = {
        id: Math.random().toString(36).substring(2, 11),
        ...data,
        createdAt: new Date(),
      };
      
      // Add to mock users (this is just for demo)
      MOCK_USERS.push(newUser);
      
      // Remove password before storing
      const { password, ...userWithoutPassword } = newUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setAuthState({
        user: userWithoutPassword as User,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء الحساب',
      });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};