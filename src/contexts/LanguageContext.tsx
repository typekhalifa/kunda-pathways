
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  // Navigation & Header
  home: string;
  services: string;
  about: string;
  contact: string;
  resources: string;
  bookConsultation: string;

  // Services
  studyInKorea: string;
  fbConsulting: string;
  scholarshipGuidance: string;
  universityAdmissions: string;
  visaApplication: string;
  koreanLanguageTraining: string;
  visitsHelp: string;
  businessConsultation: string;
  fbMarketAnalysis: string;
  productDevelopment: string;
  regulatoryCompliance: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  learnMore: string;
  watchVideo: string;

  // About Section
  aboutDescription: string;
  ourMission: string;
  missionDescription: string;
  personalizedGuidance: string;
  expertConsultation: string;
  endToEndSupport: string;
  meetYourGlobalAdvisor: string;
  internationalEducationExpert: string;
  advisorDescription: string;
  successfulStudents: string;
  businessesHelped: string;
  scholarshipSuccessRate: string;
  yearsExperience: string;

  // Contact Section
  readyToTakeNextStep: string;
  sendUsMessage: string;
  fillFormBelow: string;
  yourName: string;
  yourEmail: string;
  subject: string;
  selectSubject: string;
  generalInquiry: string;
  studyAbroadRelocation: string;
  fbConsultingService: string;
  bothServices: string;
  message: string;
  tellUsAboutGoals: string;
  sendMessage: string;
  messageSent: string;
  quickContact: string;
  phoneKorea: string;
  whatsapp: string;
  location: string;
  bookAConsultation: string;
  scheduleFreeConsultation: string;
  scheduleConsultation: string;
  businessHours: string;
  mondayFriday: string;
  saturday: string;
  sunday: string;
  closed: string;

  // Services specific
  serviceDescription: string;
  supplyChainOptimization: string;

  // Privacy & Terms
  privacyPolicyDescription: string;
  termsOfServiceDescription: string;
}

const englishTranslations: Translations = {
  // Navigation & Header
  home: "Home",
  services: "Services",
  about: "About",
  contact: "Contact",
  resources: "Resources",
  bookConsultation: "Book Consultation",

  // Services
  studyInKorea: "Study in Korea",
  fbConsulting: "F&B Consulting",
  scholarshipGuidance: "Scholarship Guidance",
  universityAdmissions: "University Admissions",
  visaApplication: "Visa Application",
  koreanLanguageTraining: "Korean Language Training",
  visitsHelp: "Study Visits",
  businessConsultation: "Business Consultation",
  fbMarketAnalysis: "Market Analysis",
  productDevelopment: "Product Development",
  regulatoryCompliance: "Regulatory Compliance",

  // Hero Section
  heroTitle: "Your Gateway to Global Success",
  heroSubtitle: "Expert guidance for studying abroad and building successful F&B businesses",
  getStarted: "Get Started",
  learnMore: "Learn More",
  watchVideo: "Watch Video",

  // About Section
  aboutDescription: "Empowering dreams through education and business excellence. We bridge cultures and create opportunities for global success.",
  ourMission: "Our Mission",
  missionDescription: "To provide comprehensive, personalized guidance that transforms educational aspirations and business ventures into successful realities. We believe in the power of quality education and strategic business planning to change lives.",
  personalizedGuidance: "Personalized guidance tailored to your unique goals",
  expertConsultation: "Expert consultation with proven track record",
  endToEndSupport: "End-to-end support throughout your journey",
  meetYourGlobalAdvisor: "Meet Your Global Advisor",
  internationalEducationExpert: "International Education & F&B Expert",
  advisorDescription: "With over 8 years of experience in international education consulting and MSc in Food Science, our team has helped over 500 students achieve their academic dreams and numerous businesses expand globally.",
  successfulStudents: "Successful Students",
  businessesHelped: "Businesses Helped",
  scholarshipSuccessRate: "Scholarship Success Rate",
  yearsExperience: "Years Experience",

  // Contact Section
  readyToTakeNextStep: "Ready to take the next step in your journey? We're here to help you every step of the way.",
  sendUsMessage: "Send us a message",
  fillFormBelow: "Fill out the form below and we'll get back to you within 24 hours.",
  yourName: "Your Name",
  yourEmail: "Your Email",
  subject: "Subject",
  selectSubject: "Select a subject",
  generalInquiry: "General Inquiry",
  studyAbroadRelocation: "Study Abroad & Relocation",
  fbConsultingService: "F&B Consulting Services",
  bothServices: "Both Services",
  message: "Message",
  tellUsAboutGoals: "Tell us about your goals and how we can help you achieve them...",
  sendMessage: "Send Message",
  messageSent: "Message sent successfully!",
  quickContact: "Quick Contact",
  phoneKorea: "Phone (Korea)",
  whatsapp: "WhatsApp",
  location: "Location",
  bookAConsultation: "Book a Consultation",
  scheduleFreeConsultation: "Schedule a free 15-minute consultation to discuss your goals.",
  scheduleConsultation: "Schedule Consultation",
  businessHours: "Business Hours",
  mondayFriday: "Monday - Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  closed: "Closed",

  // Services specific
  serviceDescription: "Professional consulting services",
  supplyChainOptimization: "Supply Chain Optimization",

  // Privacy & Terms
  privacyPolicyDescription: "Our privacy policy and data protection practices",
  termsOfServiceDescription: "Terms and conditions for using our services",
};

const koreanTranslations: Translations = {
  // Navigation & Header
  home: "홈",
  services: "서비스",
  about: "소개",
  contact: "연락처",
  resources: "자료",
  bookConsultation: "상담 예약",

  // Services
  studyInKorea: "한국 유학",
  fbConsulting: "식음료 컨설팅",
  scholarshipGuidance: "장학금 안내",
  universityAdmissions: "대학 입학",
  visaApplication: "비자 신청",
  koreanLanguageTraining: "한국어 교육",
  visitsHelp: "학업 방문",
  businessConsultation: "비즈니스 상담",
  fbMarketAnalysis: "시장 분석",
  productDevelopment: "제품 개발",
  regulatoryCompliance: "규제 준수",

  // Hero Section
  heroTitle: "글로벌 성공의 관문",
  heroSubtitle: "해외 유학과 성공적인 식음료 사업 구축을 위한 전문 가이드",
  getStarted: "시작하기",
  learnMore: "더 알아보기",
  watchVideo: "비디오 보기",

  // About Section
  aboutDescription: "교육과 비즈니스 우수성을 통해 꿈을 실현합니다. 문화를 연결하고 글로벌 성공의 기회를 창출합니다.",
  ourMission: "우리의 미션",
  missionDescription: "교육적 열망과 비즈니스 벤처를 성공적인 현실로 변화시키는 포괄적이고 개인화된 가이드를 제공합니다. 우리는 질 높은 교육과 전략적 비즈니스 계획의 힘으로 삶을 변화시킬 수 있다고 믿습니다.",
  personalizedGuidance: "당신의 고유한 목표에 맞춘 개인화된 가이드",
  expertConsultation: "검증된 실적을 가진 전문가 상담",
  endToEndSupport: "여정 전반에 걸친 종합적 지원",
  meetYourGlobalAdvisor: "글로벌 어드바이저를 만나보세요",
  internationalEducationExpert: "국제 교육 및 식음료 전문가",
  advisorDescription: "8년 이상의 국제 교육 컨설팅 경험과 식품과학 석사 학위를 보유한 우리 팀은 500명 이상의 학생들이 학업 꿈을 달성하도록 도왔으며 수많은 기업의 글로벌 확장을 지원했습니다.",
  successfulStudents: "성공한 학생들",
  businessesHelped: "지원한 비즈니스",
  scholarshipSuccessRate: "장학금 성공률",
  yearsExperience: "년 경험",

  // Contact Section
  readyToTakeNextStep: "여정의 다음 단계로 나아갈 준비가 되셨나요? 우리가 모든 단계에서 도와드리겠습니다.",
  sendUsMessage: "메시지 보내기",
  fillFormBelow: "아래 양식을 작성해 주시면 24시간 내에 답변드리겠습니다.",
  yourName: "성함",
  yourEmail: "이메일",
  subject: "제목",
  selectSubject: "제목을 선택하세요",
  generalInquiry: "일반 문의",
  studyAbroadRelocation: "해외 유학 및 이주",
  fbConsultingService: "식음료 컨설팅 서비스",
  bothServices: "두 서비스 모두",
  message: "메시지",
  tellUsAboutGoals: "목표와 저희가 어떻게 도울 수 있는지 알려주세요...",
  sendMessage: "메시지 보내기",
  messageSent: "메시지가 성공적으로 전송되었습니다!",
  quickContact: "빠른 연락",
  phoneKorea: "전화 (한국)",
  whatsapp: "왓츠앱",
  location: "위치",
  bookAConsultation: "상담 예약",
  scheduleFreeConsultation: "목표에 대해 논의할 무료 15분 상담을 예약하세요.",
  scheduleConsultation: "상담 예약하기",
  businessHours: "영업 시간",
  mondayFriday: "월 - 금",
  saturday: "토요일",
  sunday: "일요일",
  closed: "휴무",

  // Services specific
  serviceDescription: "전문 컨설팅 서비스",
  supplyChainOptimization: "공급망 최적화",

  // Privacy & Terms
  privacyPolicyDescription: "개인정보 보호정책 및 데이터 보호 관행",
  termsOfServiceDescription: "서비스 이용 약관",
};

const frenchTranslations: Translations = {
  // Navigation & Header
  home: "Accueil",
  services: "Services",
  about: "À propos",
  contact: "Contact",
  resources: "Ressources",
  bookConsultation: "Réserver une consultation",

  // Services
  studyInKorea: "Étudier en Corée",
  fbConsulting: "Conseil F&B",
  scholarshipGuidance: "Guide des bourses",
  universityAdmissions: "Admissions universitaires",
  visaApplication: "Demande de visa",
  koreanLanguageTraining: "Formation en coréen",
  visitsHelp: "Visites d'études",
  businessConsultation: "Consultation d'affaires",
  fbMarketAnalysis: "Analyse de marché",
  productDevelopment: "Développement de produits",
  regulatoryCompliance: "Conformité réglementaire",

  // Hero Section
  heroTitle: "Votre passerelle vers le succès mondial",
  heroSubtitle: "Conseils d'experts pour étudier à l'étranger et créer des entreprises F&B prospères",
  getStarted: "Commencer",
  learnMore: "En savoir plus",
  watchVideo: "Regarder la vidéo",

  // About Section
  aboutDescription: "Donner du pouvoir aux rêves grâce à l'excellence éducative et commerciale. Nous relions les cultures et créons des opportunités de succès mondial.",
  ourMission: "Notre mission",
  missionDescription: "Fournir des conseils complets et personnalisés qui transforment les aspirations éducatives et les entreprises commerciales en réalités réussies. Nous croyons au pouvoir de l'éducation de qualité et de la planification stratégique des affaires pour changer des vies.",
  personalizedGuidance: "Conseils personnalisés adaptés à vos objectifs uniques",
  expertConsultation: "Consultation d'experts avec un historique prouvé",
  endToEndSupport: "Support de bout en bout tout au long de votre parcours",
  meetYourGlobalAdvisor: "Rencontrez votre conseiller mondial",
  internationalEducationExpert: "Expert en éducation internationale et F&B",
  advisorDescription: "Avec plus de 8 ans d'expérience en conseil en éducation internationale et un MSc en science alimentaire, notre équipe a aidé plus de 500 étudiants à réaliser leurs rêves académiques et de nombreuses entreprises à s'étendre mondialement.",
  successfulStudents: "Étudiants réussis",
  businessesHelped: "Entreprises aidées",
  scholarshipSuccessRate: "Taux de réussite des bourses",
  yearsExperience: "Années d'expérience",

  // Contact Section
  readyToTakeNextStep: "Prêt à franchir la prochaine étape de votre parcours ? Nous sommes là pour vous aider à chaque étape.",
  sendUsMessage: "Envoyez-nous un message",
  fillFormBelow: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.",
  yourName: "Votre nom",
  yourEmail: "Votre email",
  subject: "Sujet",
  selectSubject: "Sélectionnez un sujet",
  generalInquiry: "Demande générale",
  studyAbroadRelocation: "Études à l'étranger et relocalisation",
  fbConsultingService: "Services de conseil F&B",
  bothServices: "Les deux services",
  message: "Message",
  tellUsAboutGoals: "Parlez-nous de vos objectifs et de la façon dont nous pouvons vous aider à les atteindre...",
  sendMessage: "Envoyer le message",
  messageSent: "Message envoyé avec succès !",
  quickContact: "Contact rapide",
  phoneKorea: "Téléphone (Corée)",
  whatsapp: "WhatsApp",
  location: "Localisation",
  bookAConsultation: "Réserver une consultation",
  scheduleFreeConsultation: "Planifiez une consultation gratuite de 15 minutes pour discuter de vos objectifs.",
  scheduleConsultation: "Planifier une consultation",
  businessHours: "Heures d'ouverture",
  mondayFriday: "Lundi - Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
  closed: "Fermé",

  // Services specific
  serviceDescription: "Services de conseil professionnel",
  supplyChainOptimization: "Optimisation de la chaîne d'approvisionnement",

  // Privacy & Terms
  privacyPolicyDescription: "Notre politique de confidentialité et nos pratiques de protection des données",
  termsOfServiceDescription: "Conditions générales d'utilisation de nos services",
};

const translations = {
  en: englishTranslations,
  ko: koreanTranslations,
  fr: frenchTranslations,
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
    translations: translations[language as keyof typeof translations] || translations.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
