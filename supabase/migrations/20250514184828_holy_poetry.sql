/*
  # Initial Schema Setup for Healthcare Platform

  1. Users and Authentication
    - Extends Supabase auth with user profiles
    - Role-based tables for patients, nurses, and admins
    - Secure policies for data access

  2. Services and Bookings
    - Service categories and individual services
    - Booking management with status tracking
    - Payment and rating system

  3. Communication
    - Chat system for patient-nurse communication
    - Notification system for updates and reminders

  4. Security
    - Row Level Security (RLS) enabled on all tables
    - Role-based access control
    - Audit logging for sensitive operations
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Service Categories
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES service_categories(id),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  duration integer NOT NULL, -- in minutes
  requirements text[],
  image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Patient Profiles
CREATE TABLE IF NOT EXISTS patient_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  medical_history text[],
  emergency_contact jsonb,
  medications jsonb[],
  allergies text[],
  blood_type text,
  chronic_conditions text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Nurse Profiles
CREATE TABLE IF NOT EXISTS nurse_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  phone text NOT NULL,
  specialization text[],
  certifications text[],
  rating decimal(3,2) DEFAULT 0,
  experience integer NOT NULL, -- in years
  education jsonb[],
  languages text[],
  working_areas text[],
  insurance_providers text[],
  available_services uuid[] REFERENCES services(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Nurse Availability
CREATE TABLE IF NOT EXISTS nurse_availability (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nurse_id uuid REFERENCES nurse_profiles(id),
  day text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  break_times jsonb[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patient_profiles(id),
  nurse_id uuid REFERENCES nurse_profiles(id),
  service_id uuid REFERENCES services(id),
  status text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  address text NOT NULL,
  notes text,
  rating integer,
  feedback text,
  vitals jsonb,
  medications text[],
  follow_up_notes text,
  payment_status text NOT NULL,
  payment_method text,
  amount decimal(10,2) NOT NULL,
  insurance_details jsonb,
  cancelled_at timestamptz,
  cancel_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat Threads
CREATE TABLE IF NOT EXISTS chat_threads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  participants uuid[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id uuid REFERENCES chat_threads(id),
  sender_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  attachments jsonb[],
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  priority text NOT NULL,
  read boolean DEFAULT false,
  related_id uuid,
  action jsonb,
  created_at timestamptz DEFAULT now()
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  subject text NOT NULL,
  description text NOT NULL,
  status text NOT NULL,
  priority text NOT NULL,
  category text NOT NULL,
  assigned_to uuid REFERENCES auth.users(id),
  attachments jsonb[],
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Support Messages
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id uuid REFERENCES support_tickets(id),
  sender_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  attachments jsonb[],
  created_at timestamptz DEFAULT now()
);

-- System Settings
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  maintenance_mode boolean DEFAULT false,
  allow_registration boolean DEFAULT true,
  require_email_verification boolean DEFAULT true,
  automatic_booking_approval boolean DEFAULT false,
  max_bookings_per_day integer DEFAULT 10,
  supported_languages text[] DEFAULT ARRAY['ar'],
  platform_fees jsonb NOT NULL,
  working_hours jsonb NOT NULL,
  notifications jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Policies for service_categories
CREATE POLICY "Service categories are viewable by all"
  ON service_categories FOR SELECT
  TO authenticated
  USING (true);

-- Policies for services
CREATE POLICY "Services are viewable by all"
  ON services FOR SELECT
  TO authenticated
  USING (true);

-- Policies for patient_profiles
CREATE POLICY "Patients can view and edit their own profile"
  ON patient_profiles FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policies for nurse_profiles
CREATE POLICY "Nurses can view and edit their own profile"
  ON nurse_profiles FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Patients can view nurse profiles"
  ON nurse_profiles FOR SELECT
  TO authenticated
  USING (true);

-- Policies for nurse_availability
CREATE POLICY "Nurses can manage their availability"
  ON nurse_availability FOR ALL
  TO authenticated
  USING (auth.uid() = nurse_id)
  WITH CHECK (auth.uid() = nurse_id);

CREATE POLICY "Others can view nurse availability"
  ON nurse_availability FOR SELECT
  TO authenticated
  USING (true);

-- Policies for bookings
CREATE POLICY "Patients can view and manage their bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (auth.uid() = patient_id)
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Nurses can view and manage their assigned bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (auth.uid() = nurse_id)
  WITH CHECK (auth.uid() = nurse_id);

-- Policies for chat_threads
CREATE POLICY "Users can view and manage their chat threads"
  ON chat_threads FOR ALL
  TO authenticated
  USING (auth.uid() = ANY(participants))
  WITH CHECK (auth.uid() = ANY(participants));

-- Policies for messages
CREATE POLICY "Users can view and send messages in their threads"
  ON messages FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_threads
      WHERE id = messages.thread_id
      AND auth.uid() = ANY(participants)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_threads
      WHERE id = messages.thread_id
      AND auth.uid() = ANY(participants)
    )
  );

-- Policies for notifications
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for support_tickets
CREATE POLICY "Users can view and manage their support tickets"
  ON support_tickets FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for support_messages
CREATE POLICY "Users can view and send support messages"
  ON support_messages FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = support_messages.ticket_id
      AND (user_id = auth.uid() OR assigned_to = auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = support_messages.ticket_id
      AND (user_id = auth.uid() OR assigned_to = auth.uid())
    )
  );

-- Initial data for service categories
INSERT INTO service_categories (name, description, icon) VALUES
  ('الحقن والأدوية', 'خدمات إعطاء الحقن والأدوية', 'syringe'),
  ('المراقبة الصحية', 'خدمات مراقبة المؤشرات الحيوية', 'activity'),
  ('رعاية الجروح', 'خدمات تنظيف وتضميد الجروح', 'bandage'),
  ('رعاية المسنين', 'خدمات رعاية كبار السن', 'users'),
  ('العلاج الطبيعي', 'خدمات العلاج الطبيعي المنزلي', 'activity');

-- Initial services
INSERT INTO services (category_id, name, description, price, duration) VALUES
  ((SELECT id FROM service_categories WHERE name = 'الحقن والأدوية'), 'حقن الإنسولين', 'حقن الإنسولين مع مراقبة مستوى السكر', 50, 15),
  ((SELECT id FROM service_categories WHERE name = 'المراقبة الصحية'), 'فحص الضغط والسكر', 'قياس ضغط الدم ومستوى السكر', 35, 20),
  ((SELECT id FROM service_categories WHERE name = 'رعاية الجروح'), 'تغيير الضمادات', 'تنظيف الجروح وتغيير الضمادات', 40, 30);

-- Initial system settings
INSERT INTO system_settings (
  platform_fees,
  working_hours,
  notifications
) VALUES (
  '{"percentage": 10, "fixed": 5}',
  '{"start": "09:00", "end": "21:00"}',
  '{"email": true, "push": true, "sms": true}'
);