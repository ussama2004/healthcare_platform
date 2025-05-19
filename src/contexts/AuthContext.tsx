import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToaster } from '../components/ui/Toaster';

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'nurse' | 'admin';
  avatar?: string;
  phoneNumber?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock API functions - in a real app, these would connect to a backend
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Predefined users for demo
  const users = [
    {
      id: '1',
      email: 'patient@example.com',
      password: 'password',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      role: 'patient' as const,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'nurse@example.com',
      password: 'password',
      firstName: 'Sara',
      lastName: 'Ali',
      role: 'nurse' as const,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      email: 'admin@example.com',
      password: 'password',
      firstName: 'Mohammed',
      lastName: 'Khaled',
      role: 'admin' as const,
      createdAt: new Date().toISOString(),
    },
  ];
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const mockRegister = async (userData: Partial<User> & { password: string }): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would validate and send data to a backend
  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    role: userData.role || 'patient',
    createdAt: new Date().toISOString(),
  };
  
  return newUser;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToaster();
  
  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockLogin(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      addToast(`Welcome back, ${user.firstName}!`, 'success');
      navigate('/dashboard');
    } catch (error) {
      addToast('Invalid email or password', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      const newUser = await mockRegister(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      addToast('Registration successful', 'success');
      navigate('/dashboard');
    } catch (error) {
      addToast('Registration failed', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    addToast('You have been logged out', 'info');
    navigate('/login');
  };
  
  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // In a real app, this would send data to a backend
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser as User);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update profile', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};