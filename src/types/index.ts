// User Types
export enum UserRole {
  PATIENT = 'patient',
  NURSE = 'nurse',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: UserRole.PATIENT;
  address: string;
  medicalHistory?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medications?: Medication[];
  allergies?: string[];
  bloodType?: string;
  chronicConditions?: string[];
}

export interface Nurse extends User {
  role: UserRole.NURSE;
  specialization: string[];
  services: Service[];
  certifications: string[];
  rating: number;
  availability: Availability[];
  experience: number; // in years
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
  languages?: string[];
  workingAreas?: string[]; // Supported geographical areas
  insuranceProviders?: string[]; // Accepted insurance providers
}

export interface Admin extends User {
  role: UserRole.ADMIN;
  department: string;
  permissions: string[];
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
  requirements?: string[];
  image?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  breakTimes?: {
    start: string;
    end: string;
  }[];
}

// Booking Types
export enum BookingStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  IN_PROGRESS = 'in_progress',
  SCHEDULED = 'scheduled',
}

export interface Booking {
  id: string;
  patientId: string;
  nurseId: string;
  serviceId: string;
  status: BookingStatus;
  date: Date;
  time: string;
  address: string;
  notes?: string;
  rating?: number;
  feedback?: string;
  vitals?: VitalSigns;
  medications?: string[];
  followUpNotes?: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  amount: number;
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    coverage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  cancelReason?: string;
}

export interface VitalSigns {
  temperature?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  bloodSugar?: number;
  recordedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed',
  PARTIALLY_PAID = 'partially_paid',
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  // Additional fields based on role
  [key: string]: any;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  type: NotificationType;
  priority: NotificationPriority;
  relatedId?: string; // ID of related entity (booking, message, etc.)
  action?: {
    type: string;
    url: string;
  };
}

export enum NotificationType {
  BOOKING_REQUEST = 'booking_request',
  BOOKING_UPDATE = 'booking_update',
  PAYMENT = 'payment',
  SYSTEM = 'system',
  MESSAGE = 'message',
  REMINDER = 'reminder',
  EMERGENCY = 'emergency',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// Chat Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
  read: boolean;
  createdAt: Date;
}

export interface ChatThread {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Report Types
export interface Report {
  id: string;
  type: ReportType;
  data: any;
  generatedBy: string;
  generatedAt: Date;
  format: 'pdf' | 'csv' | 'excel';
  status: 'generating' | 'ready' | 'failed';
  url?: string;
}

export enum ReportType {
  BOOKING_SUMMARY = 'booking_summary',
  FINANCIAL = 'financial',
  USER_ACTIVITY = 'user_activity',
  SERVICE_ANALYTICS = 'service_analytics',
  NURSE_PERFORMANCE = 'nurse_performance',
}

// Settings Types
export interface SystemSettings {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  automaticBookingApproval: boolean;
  maxBookingsPerDay: number;
  supportedLanguages: string[];
  platformFees: {
    percentage: number;
    fixed: number;
  };
  workingHours: {
    start: string;
    end: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Support Types
export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo?: string;
  attachments?: {
    url: string;
    name: string;
    type: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  content: string;
  attachments?: {
    url: string;
    name: string;
    type: string;
  }[];
  createdAt: Date;
}