const translations = {
  app: {
    title: 'CareConnect',
    tagline: 'Professional Healthcare at Your Doorstep',
  },
  auth: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    loginSuccess: 'Login successful',
    loginError: 'Invalid email or password',
    registerSuccess: 'Registration successful',
    logoutSuccess: 'You have been logged out',
    roleSelection: 'I am a',
    patient: 'Patient',
    nurse: 'Healthcare Provider',
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    passwordLength: 'Password must be at least 6 characters',
    passwordMatch: 'Passwords do not match',
    phoneNumber: 'Please enter a valid phone number',
  },
  header: {
    welcome: 'Welcome',
    search: 'Search',
    notifications: 'Notifications',
    settings: 'Settings',
  },
  sidebar: {
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    services: 'Services',
    nurses: 'Healthcare Providers',
    patients: 'Patients',
    requests: 'Requests',
    analytics: 'Analytics',
    notifications: 'Notifications',
    messages: 'Messages',
    settings: 'Settings',
    help: 'Help & Support',
    logout: 'Logout',
  },
  dashboard: {
    welcome: 'Welcome to CareConnect',
    upcomingAppointments: 'Upcoming Appointments',
    recentRequests: 'Recent Requests',
    nearbyNurses: 'Nearby Healthcare Providers',
    noAppointments: 'No upcoming appointments',
    noRequests: 'No recent requests',
    noNurses: 'No healthcare providers found nearby',
    viewAll: 'View All',
    stats: 'Quick Stats',
    earnings: 'Earnings',
    patients: 'Patients',
    reviews: 'Reviews',
    rating: 'Rating',
  },
  appointments: {
    title: 'Appointments',
    upcoming: 'Upcoming',
    past: 'Past',
    canceled: 'Canceled',
    noAppointments: 'No appointments found',
    schedule: 'Schedule Appointment',
    date: 'Date',
    time: 'Time',
    service: 'Service',
    status: 'Status',
    actions: 'Actions',
    cancel: 'Cancel',
    reschedule: 'Reschedule',
    complete: 'Complete',
    details: 'Details',
    patient: 'Patient',
    provider: 'Provider',
    confirmed: 'Confirmed',
    completed: 'Completed',
    canceled: 'Canceled',
    pending: 'Pending',
  },
  services: {
    title: 'Services',
    search: 'Search services',
    category: 'Category',
    price: 'Price',
    duration: 'Duration',
    book: 'Book Now',
    details: 'View Details',
    popular: 'Popular Services',
    all: 'All Services',
    noServices: 'No services found',
  },
  nurses: {
    title: 'Healthcare Providers',
    search: 'Search providers',
    specialty: 'Specialty',
    experience: 'Experience',
    rating: 'Rating',
    availability: 'Availability',
    viewProfile: 'View Profile',
    bookAppointment: 'Book Appointment',
    noNurses: 'No healthcare providers found',
    filters: 'Filters',
    sortBy: 'Sort by',
    reviews: 'Reviews',
    about: 'About',
    location: 'Location',
    contactInfo: 'Contact Information',
  },
  patients: {
    title: 'Patients',
    search: 'Search patients',
    noPatients: 'No patients found',
    recentAppointments: 'Recent Appointments',
    medicalHistory: 'Medical History',
    contactInfo: 'Contact Information',
  },
  profile: {
    title: 'Profile',
    personalInfo: 'Personal Information',
    contactInfo: 'Contact Information',
    professionalInfo: 'Professional Information',
    updateProfile: 'Update Profile',
    changePassword: 'Change Password',
    education: 'Education',
    certificates: 'Certificates',
    experience: 'Experience',
    services: 'Services Offered',
    availability: 'Availability',
    reviews: 'Reviews',
  },
  settings: {
    title: 'Settings',
    account: 'Account',
    notifications: 'Notifications',
    privacy: 'Privacy',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    save: 'Save Changes',
    saved: 'Changes saved successfully',
  },
  notifications: {
    title: 'Notifications',
    markAllRead: 'Mark All as Read',
    noNotifications: 'No notifications',
    new: 'New',
    earlier: 'Earlier',
  },
  messages: {
    title: 'Messages',
    noMessages: 'No messages',
    newMessage: 'New Message',
    send: 'Send',
    typeMessage: 'Type a message...',
  },
  bookings: {
    title: 'Booking',
    selectService: 'Select Service',
    selectProvider: 'Select Provider',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    reviewBooking: 'Review Booking',
    confirm: 'Confirm Booking',
    back: 'Back',
    next: 'Next',
    bookingSuccess: 'Booking successful',
    bookingDetails: 'Booking Details',
    totalPrice: 'Total Price',
  },
  reviews: {
    title: 'Reviews',
    writeReview: 'Write a Review',
    rating: 'Rating',
    comment: 'Comment',
    submit: 'Submit Review',
    reviewSuccess: 'Review submitted successfully',
    noReviews: 'No reviews yet',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    viewAll: 'View All',
    noResults: 'No results found',
    seeMore: 'See More',
    seeLess: 'See Less',
  },
  role: {
    patient: 'Patient',
    nurse: 'Healthcare Provider',
    admin: 'Admin',
  },
  errors: {
    notFound: 'Page not found',
    goHome: 'Go to Dashboard',
    serverError: 'Server error',
    unauthorized: 'Unauthorized access',
    sessionExpired: 'Your session has expired. Please login again.',
  },
};

export default translations;