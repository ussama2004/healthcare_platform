const translations = {
  app: {
    title: 'كير كونيكت',
    tagline: 'رعاية صحية احترافية في منزلك',
  },
  auth: {
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phoneNumber: 'رقم الهاتف',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    loginSuccess: 'تم تسجيل الدخول بنجاح',
    loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    registerSuccess: 'تم التسجيل بنجاح',
    logoutSuccess: 'تم تسجيل الخروج',
    roleSelection: 'أنا',
    patient: 'مريض',
    nurse: 'مقدم رعاية صحية',
  },
  validation: {
    required: 'هذا الحقل مطلوب',
    email: 'يرجى إدخال عنوان بريد إلكتروني صالح',
    passwordLength: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
    passwordMatch: 'كلمات المرور غير متطابقة',
    phoneNumber: 'يرجى إدخال رقم هاتف صالح',
  },
  header: {
    welcome: 'مرحبا',
    search: 'بحث',
    notifications: 'الإشعارات',
    settings: 'الإعدادات',
  },
  sidebar: {
    dashboard: 'لوحة التحكم',
    appointments: 'المواعيد',
    services: 'الخدمات',
    nurses: 'مقدمي الرعاية الصحية',
    patients: 'المرضى',
    requests: 'الطلبات',
    analytics: 'التحليلات',
    notifications: 'الإشعارات',
    messages: 'الرسائل',
    settings: 'الإعدادات',
    help: 'المساعدة والدعم',
    logout: 'تسجيل الخروج',
  },
  dashboard: {
    welcome: 'مرحبا بك في كير كونيكت',
    upcomingAppointments: 'المواعيد القادمة',
    recentRequests: 'الطلبات الحديثة',
    nearbyNurses: 'مقدمي الرعاية الصحية القريبين',
    noAppointments: 'لا توجد مواعيد قادمة',
    noRequests: 'لا توجد طلبات حديثة',
    noNurses: 'لم يتم العثور على مقدمي رعاية صحية قريبين',
    viewAll: 'عرض الكل',
    stats: 'إحصائيات سريعة',
    earnings: 'الأرباح',
    patients: 'المرضى',
    reviews: 'التقييمات',
    rating: 'التقييم',
  },
  appointments: {
    title: 'المواعيد',
    upcoming: 'القادمة',
    past: 'السابقة',
    canceled: 'الملغاة',
    noAppointments: 'لم يتم العثور على مواعيد',
    schedule: 'جدولة موعد',
    date: 'التاريخ',
    time: 'الوقت',
    service: 'الخدمة',
    status: 'الحالة',
    actions: 'الإجراءات',
    cancel: 'إلغاء',
    reschedule: 'إعادة جدولة',
    complete: 'إكمال',
    details: 'التفاصيل',
    patient: 'المريض',
    provider: 'مقدم الخدمة',
    confirmed: 'مؤكد',
    completed: 'مكتمل',
    canceled: 'ملغي',
    pending: 'قيد الانتظار',
  },
  services: {
    title: 'الخدمات',
    search: 'البحث عن خدمات',
    category: 'الفئة',
    price: 'السعر',
    duration: 'المدة',
    book: 'احجز الآن',
    details: 'عرض التفاصيل',
    popular: 'الخدمات الشائعة',
    all: 'جميع الخدمات',
    noServices: 'لم يتم العثور على خدمات',
  },
  nurses: {
    title: 'مقدمي الرعاية الصحية',
    search: 'البحث عن مقدمي الخدمة',
    specialty: 'التخصص',
    experience: 'الخبرة',
    rating: 'التقييم',
    availability: 'التوفر',
    viewProfile: 'عرض الملف الشخصي',
    bookAppointment: 'حجز موعد',
    noNurses: 'لم يتم العثور على مقدمي رعاية صحية',
    filters: 'المرشحات',
    sortBy: 'ترتيب حسب',
    reviews: 'التقييمات',
    about: 'نبذة',
    location: 'الموقع',
    contactInfo: 'معلومات الاتصال',
  },
  patients: {
    title: 'المرضى',
    search: 'البحث عن المرضى',
    noPatients: 'لم يتم العثور على مرضى',
    recentAppointments: 'المواعيد الحديثة',
    medicalHistory: 'التاريخ الطبي',
    contactInfo: 'معلومات الاتصال',
  },
  profile: {
    title: 'الملف الشخصي',
    personalInfo: 'المعلومات الشخصية',
    contactInfo: 'معلومات الاتصال',
    professionalInfo: 'المعلومات المهنية',
    updateProfile: 'تحديث الملف الشخصي',
    changePassword: 'تغيير كلمة المرور',
    education: 'التعليم',
    certificates: 'الشهادات',
    experience: 'الخبرة',
    services: 'الخدمات المقدمة',
    availability: 'التوفر',
    reviews: 'التقييمات',
  },
  settings: {
    title: 'الإعدادات',
    account: 'الحساب',
    notifications: 'الإشعارات',
    privacy: 'الخصوصية',
    language: 'اللغة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    save: 'حفظ التغييرات',
    saved: 'تم حفظ التغييرات بنجاح',
  },
  notifications: {
    title: 'الإشعارات',
    markAllRead: 'تحديد الكل كمقروء',
    noNotifications: 'لا توجد إشعارات',
    new: 'جديد',
    earlier: 'سابق',
  },
  messages: {
    title: 'الرسائل',
    noMessages: 'لا توجد رسائل',
    newMessage: 'رسالة جديدة',
    send: 'إرسال',
    typeMessage: 'اكتب رسالة...',
  },
  bookings: {
    title: 'الحجز',
    selectService: 'اختر الخدمة',
    selectProvider: 'اختر مقدم الخدمة',
    selectDate: 'اختر التاريخ',
    selectTime: 'اختر الوقت',
    reviewBooking: 'مراجعة الحجز',
    confirm: 'تأكيد الحجز',
    back: 'رجوع',
    next: 'التالي',
    bookingSuccess: 'تم الحجز بنجاح',
    bookingDetails: 'تفاصيل الحجز',
    totalPrice: 'السعر الإجمالي',
  },
  reviews: {
    title: 'التقييمات',
    writeReview: 'كتابة تقييم',
    rating: 'التقييم',
    comment: 'التعليق',
    submit: 'إرسال التقييم',
    reviewSuccess: 'تم إرسال التقييم بنجاح',
    noReviews: 'لا توجد تقييمات حتى الآن',
  },
  common: {
    loading: 'جار التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    confirm: 'تأكيد',
    back: 'رجوع',
    next: 'التالي',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    viewAll: 'عرض الكل',
    noResults: 'لا توجد نتائج',
    seeMore: 'رؤية المزيد',
    seeLess: 'رؤية أقل',
  },
  role: {
    patient: 'مريض',
    nurse: 'مقدم رعاية صحية',
    admin: 'مسؤول',
  },
  errors: {
    notFound: 'الصفحة غير موجودة',
    goHome: 'الذهاب إلى لوحة التحكم',
    serverError: 'خطأ في الخادم',
    unauthorized: 'وصول غير مصرح به',
    sessionExpired: 'انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.',
  },
};

export default translations;