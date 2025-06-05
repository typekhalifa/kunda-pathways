
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Translations {
  // Basic navigation and common
  home: string;
  about: string;
  services: string;
  contact: string;
  resources: string;
  bookConsultation: string;
  backToHome: string;
  latest: string;
  viewAllResources: string;
  
  // About section
  meetYourGlobalAdvisor: string;
  advisorName: string;
  advisorTitle: string;
  advisorDescription: string;
  readMoreAboutMe: string;
  educationExpert: string;
  educationExpertDesc: string;
  fbConsultant: string;
  fbConsultantDesc: string;
  studentsHelped: string;
  studentsHelpedDesc: string;
  countriesReached: string;
  countriesReachedDesc: string;
  
  // Services
  studyInKorea: string;
  studyInKoreaDesc: string;
  fbConsulting: string;
  fbConsultingDesc: string;
  scholarshipGuidance: string;
  scholarshipGuidanceDesc: string;
  scholarshipDescription: string;
  universityAdmissions: string;
  universityAdmissionsDesc: string;
  universityDescription: string;
  visaApplication: string;
  visaApplicationDesc: string;
  visaDescription: string;
  koreanLanguageTraining: string;
  languageDescription: string;
  visitsHelp: string;
  businessConsultation: string;
  fbBusinessConsulting: string;
  businessDescription: string;
  marketAnalysis: string;
  productDevelopment: string;
  regulatoryCompliance: string;
  ourServices: string;
  servicesDescription: string;
  
  // Service features
  scholarshipSearch: string;
  applicationAssistance: string;
  documentPreparation: string;
  universitySelection: string;
  applicationReview: string;
  interviewPreparation: string;
  applicationFiling: string;
  interviewCoaching: string;
  topikPreparation: string;
  conversationPractice: string;
  culturalOrientation: string;
  marketResearch: string;
  businessPlanning: string;
  strategyDevelopment: string;
  marketSizing: string;
  competitorAnalysis: string;
  trendIdentification: string;
  productDescription: string;
  recipeDevelopment: string;
  productTesting: string;
  complianceDescription: string;
  safetyStandards: string;
  certificationSupport: string;
  complianceAudits: string;
  
  // Contact section
  letsStartYourJourney: string;
  readyToTakeNextStep: string;
  sendUsMessage: string;
  fillFormBelow: string;
  yourName: string;
  yourEmail: string;
  selectService: string;
  generalInquiry: string;
  studyAbroadRelocation: string;
  fbConsultingService: string;
  bothServices: string;
  message: string;
  tellUsAboutGoals: string;
  sendMessage: string;
  quickContact: string;
  email: string;
  phoneKorea: string;
  whatsapp: string;
  bookAConsultation: string;
  scheduleFreeConsultation: string;
  scheduleConsultation: string;
  officeHours: string;
  mondayFriday: string;
  saturday: string;
  sunday: string;
  closed: string;
  
  // Footer
  footerDescription: string;
  quickLinks: string;
  legal: string;
  contactInfo: string;
  location: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  sitemap: string;
  resourcesBlog: string;
  
  // Blog/Resources
  blogPost1Title: string;
  blogPost1Excerpt: string;
  blogPost2Title: string;
  blogPost2Excerpt: string;
  blogPost3Title: string;
  blogPost3Excerpt: string;
  education: string;
  business: string;
  scholarships: string;
  resourcesDescription: string;
  readMore: string;
  
  // Hero section
  exploreStudyPrograms: string;
  studentsAssisted: string;
  foodScienceExpert: string;
  
  // Newsletter
  newsletterThankYou: string;
  
  // Partners
  ourTrustedPartners: string;
  partnerDescription: string;
  
  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: string;
  
  // About Advisor page
  professionalSummary: string;
  educationExpertise: string;
  koreanGovernmentScholarshipProgram: string;
  universityAdmissionStrategies: string;
  visaApplicationGuidance: string;
  koreanLanguagePreparation: string;
  culturalAdaptationSupport: string;
  fbExpertise: string;
  marketAnalysisEntryStrategies: string;
  productDevelopmentInnovation: string;
  supplyChainOptimization: string;
  businessPlanningFunding: string;
  keyAchievements: string;
  scholarshipSuccessRate: string;
  getInTouch: string;
  mondayToFriday: string;
  saturdaySunday: string;
  koreanTime: string;
  myMission: string;
  missionStatement: string;
  
  // Book Consultation page
  hotelBooking: string;
  phoneConsultation: string;
  reviewConsultation: string;
  consultationDetails: string;
  fullName: string;
  selectedService: string;
  totalPrice: string;
  paymentMethods: string;
  payWithCard: string;
  payWithMobile: string;
  payWithBank: string;
  backToEdit: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  reviewConsultationRequest: string;
  
  // Study Programs page
  universityAdmissionSupport: string;
  universityAdmissionSupportDesc: string;
  visaApplicationAssistance: string;
  visaApplicationAssistanceDesc: string;
  visaDocumentPrep: string;
  languagePreparation: string;
  languagePreparationDesc: string;
  culturalOrientationAndAccommodation: string;
  studyProgramsTitle: string;
  studyProgramsSubtitle: string;
  
  // Services component additional
  startYourJourney: string;
  getExpertConsultation: string;
  journeyDescription: string;
  getFullConsultation: string;
  viewAllPackagesPricing: string;
  
  // Cultural adaptation (from previous errors)
  culturalAdaptationGuide: string;
}

const englishTranslations: Translations = {
  // Basic navigation and common
  home: "Home",
  about: "About",
  services: "Services", 
  contact: "Contact",
  resources: "Resources",
  bookConsultation: "Book Consultation",
  backToHome: "Back to Home",
  latest: "Latest",
  viewAllResources: "View All Resources",
  
  // About section
  meetYourGlobalAdvisor: "Meet Your Global Advisor",
  advisorName: "Dr. Sarah Johnson",
  advisorTitle: "International Education & F&B Consultant",
  advisorDescription: "With over 10 years of experience connecting African students to Korean universities and helping food businesses expand globally.",
  readMoreAboutMe: "Read More About Me",
  educationExpert: "Education Expert",
  educationExpertDesc: "Specialized guidance for Korean university admissions",
  fbConsultant: "F&B Consultant",
  fbConsultantDesc: "Expert advice for food & beverage businesses",
  studentsHelped: "500+ Students Helped",
  studentsHelpedDesc: "Successfully guided students to Korean universities",
  countriesReached: "15+ Countries Reached",
  countriesReachedDesc: "Students from across Africa benefited",
  
  // Services
  studyInKorea: "Study in Korea",
  studyInKoreaDesc: "Complete guidance for studying in Korean universities",
  fbConsulting: "F&B Consulting",
  fbConsultingDesc: "Professional consulting for food & beverage businesses",
  scholarshipGuidance: "Scholarship Guidance",
  scholarshipGuidanceDesc: "Expert guidance for scholarship applications",
  scholarshipDescription: "Get expert help finding and applying for scholarships",
  universityAdmissions: "University Admissions",
  universityAdmissionsDesc: "Complete support for university applications",
  universityDescription: "Comprehensive university admission support",
  visaApplication: "Visa Application",
  visaApplicationDesc: "Professional visa application assistance",
  visaDescription: "Complete visa application guidance",
  koreanLanguageTraining: "Korean Language Training",
  languageDescription: "Learn Korean with native speakers",
  visitsHelp: "Study Visits",
  businessConsultation: "Business Consultation",
  fbBusinessConsulting: "F&B Business Consulting",
  businessDescription: "Strategic business consulting services",
  marketAnalysis: "Market Analysis",
  productDevelopment: "Product Development",
  regulatoryCompliance: "Regulatory Compliance",
  ourServices: "Our Services",
  servicesDescription: "Comprehensive consulting services for education and business",
  
  // Service features
  scholarshipSearch: "Scholarship Search",
  applicationAssistance: "Application Assistance",
  documentPreparation: "Document Preparation",
  universitySelection: "University Selection",
  applicationReview: "Application Review",
  interviewPreparation: "Interview Preparation",
  applicationFiling: "Application Filing",
  interviewCoaching: "Interview Coaching",
  topikPreparation: "TOPIK Preparation",
  conversationPractice: "Conversation Practice",
  culturalOrientation: "Cultural Orientation",
  marketResearch: "Market Research",
  businessPlanning: "Business Planning",
  strategyDevelopment: "Strategy Development",
  marketSizing: "Market Sizing",
  competitorAnalysis: "Competitor Analysis",
  trendIdentification: "Trend Identification",
  productDescription: "Product Development Services",
  recipeDevelopment: "Recipe Development",
  productTesting: "Product Testing",
  complianceDescription: "Regulatory Compliance Services",
  safetyStandards: "Safety Standards",
  certificationSupport: "Certification Support",
  complianceAudits: "Compliance Audits",
  
  // Contact section
  letsStartYourJourney: "Let's Start Your Journey",
  readyToTakeNextStep: "Ready to take the next step? Get in touch for a free consultation",
  sendUsMessage: "Send us a Message",
  fillFormBelow: "Fill out the form below and we'll respond within 24 hours",
  yourName: "Your Name",
  yourEmail: "Your Email",
  selectService: "Select Service",
  generalInquiry: "General Inquiry",
  studyAbroadRelocation: "Study Abroad & Relocation",
  fbConsultingService: "F&B Consulting",
  bothServices: "Both Services",
  message: "Message",
  tellUsAboutGoals: "Tell us about your goals and how we can help...",
  sendMessage: "Send Message",
  quickContact: "Quick Contact",
  email: "Email",
  phoneKorea: "Phone (Korea)",
  whatsapp: "WhatsApp",
  bookAConsultation: "Book a Consultation",
  scheduleFreeConsultation: "Schedule a free 15-minute consultation to discuss your goals and get personalized advice.",
  scheduleConsultation: "Schedule Free Consultation",
  officeHours: "Office Hours",
  mondayFriday: "Monday - Friday:",
  saturday: "Saturday:",
  sunday: "Sunday:",
  closed: "Closed",
  
  // Footer
  footerDescription: "Empowering students and entrepreneurs to achieve their dreams through expert guidance and personalized support.",
  quickLinks: "Quick Links",
  legal: "Legal",
  contactInfo: "Contact Info",
  location: "Seoul, South Korea",
  allRightsReserved: "All rights reserved.",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  sitemap: "Sitemap",
  resourcesBlog: "Resources & Blog",
  
  // Blog/Resources
  blogPost1Title: "Complete Guide to Korean University Scholarships",
  blogPost1Excerpt: "Everything you need to know about securing scholarships for Korean universities, including application tips and deadlines.",
  blogPost2Title: "F&B Market Opportunities in Asia",
  blogPost2Excerpt: "Discover the growing food and beverage market opportunities across Asian countries and how to capitalize on them.",
  blogPost3Title: "Student Success Stories from Korea",
  blogPost3Excerpt: "Read inspiring stories from students who successfully transitioned to studying and living in Korea.",
  education: "Education",
  business: "Business",
  scholarships: "Scholarships",
  resourcesDescription: "Helpful guides, tips, and insights for your journey",
  readMore: "Read More",
  
  // Hero section
  exploreStudyPrograms: "Explore Study Programs",
  studentsAssisted: "Students Assisted",
  foodScienceExpert: "Food Science Expert",
  
  // Newsletter
  newsletterThankYou: "Thank you for subscribing!",
  
  // Partners
  ourTrustedPartners: "Our Trusted Partners",
  partnerDescription: "We work with leading institutions and organizations",
  
  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: "Schedule Free 15-Minute Consultation",
  
  // About Advisor page
  professionalSummary: "Professional Summary",
  educationExpertise: "Education Expertise",
  koreanGovernmentScholarshipProgram: "Korean Government Scholarship Program (KGSP)",
  universityAdmissionStrategies: "University admission strategies",
  visaApplicationGuidance: "Visa application guidance",
  koreanLanguagePreparation: "Korean language preparation",
  culturalAdaptationSupport: "Cultural adaptation support",
  fbExpertise: "F&B Expertise",
  marketAnalysisEntryStrategies: "Market analysis & entry strategies",
  productDevelopmentInnovation: "Product development & innovation",
  supplyChainOptimization: "Supply chain optimization",
  businessPlanningFunding: "Business planning & funding",
  keyAchievements: "Key Achievements",
  scholarshipSuccessRate: "Scholarship Success Rate",
  getInTouch: "Get in Touch",
  mondayToFriday: "Monday to Friday",
  saturdaySunday: "Saturday & Sunday",
  koreanTime: "Korean Standard Time",
  myMission: "My Mission",
  missionStatement: "To bridge cultures and create opportunities by guiding students towards world-class education in Korea and helping entrepreneurs build successful food businesses that connect global markets.",
  
  // Book Consultation page
  hotelBooking: "Hotel Booking Assistance",
  phoneConsultation: "Phone Consultation",
  reviewConsultation: "Review Your Consultation Request",
  consultationDetails: "Consultation Details",
  fullName: "Full Name",
  selectedService: "Selected Service",
  totalPrice: "Total Price",
  paymentMethods: "Payment Methods",
  payWithCard: "Pay with Credit/Debit Card",
  payWithMobile: "Pay with Mobile Money",
  payWithBank: "Pay with Bank Transfer",
  backToEdit: "Back to Edit Details",
  phone: "Phone Number",
  preferredDate: "Preferred Date",
  preferredTime: "Preferred Time",
  reviewConsultationRequest: "Review Consultation Request",
  
  // Study Programs page
  universityAdmissionSupport: "University Admission Support",
  universityAdmissionSupportDesc: "Complete support for university applications and admission process",
  visaApplicationAssistance: "Visa Application Assistance",
  visaApplicationAssistanceDesc: "Professional help with visa applications and documentation",
  visaDocumentPrep: "Visa Document Preparation",
  languagePreparation: "Language Preparation",
  languagePreparationDesc: "Korean language training and TOPIK preparation",
  culturalOrientationAndAccommodation: "Cultural Orientation & Accommodation",
  studyProgramsTitle: "Study Programs & Services",
  studyProgramsSubtitle: "Comprehensive support for your Korean education journey",
  
  // Services component additional
  startYourJourney: "Start Your Journey",
  getExpertConsultation: "Get Expert Consultation",
  journeyDescription: "Ready to take the next step in your journey?",
  getFullConsultation: "Get Full Consultation",
  viewAllPackagesPricing: "View All Packages & Pricing",
  
  // Cultural adaptation
  culturalAdaptationGuide: "Cultural Adaptation Guide"
};

const koreanTranslations: Translations = {
  // Basic navigation and common
  home: "홈",
  about: "소개",
  services: "서비스",
  contact: "연락처",
  resources: "자료",
  bookConsultation: "상담 예약",
  backToHome: "홈으로 돌아가기",
  latest: "최신",
  viewAllResources: "모든 자료 보기",
  
  // About section
  meetYourGlobalAdvisor: "글로벌 어드바이저를 만나보세요",
  advisorName: "사라 존슨 박사",
  advisorTitle: "국제교육 및 F&B 컨설턴트",
  advisorDescription: "아프리카 학생들을 한국 대학교로 연결하고 식품 사업체의 글로벌 확장을 도운 10년 이상의 경험을 보유하고 있습니다.",
  readMoreAboutMe: "더 자세히 알아보기",
  educationExpert: "교육 전문가",
  educationExpertDesc: "한국 대학교 입학을 위한 전문 지도",
  fbConsultant: "F&B 컨설턴트",
  fbConsultantDesc: "식음료 사업을 위한 전문 조언",
  studentsHelped: "500명 이상 학생 지원",
  studentsHelpedDesc: "한국 대학교 진학을 성공적으로 지원",
  countriesReached: "15개국 이상 도달",
  countriesReachedDesc: "아프리카 전역의 학생들이 혜택을 받았습니다",
  
  // Services
  studyInKorea: "한국 유학",
  studyInKoreaDesc: "한국 대학교 유학을 위한 완전한 가이드",
  fbConsulting: "F&B 컨설팅",
  fbConsultingDesc: "식음료 사업을 위한 전문 컨설팅",
  scholarshipGuidance: "장학금 안내",
  scholarshipGuidanceDesc: "장학금 신청을 위한 전문 지도",
  scholarshipDescription: "장학금 찾기 및 신청을 위한 전문 도움",
  universityAdmissions: "대학교 입학",
  universityAdmissionsDesc: "대학교 지원을 위한 완전한 지원",
  universityDescription: "포괄적인 대학교 입학 지원",
  visaApplication: "비자 신청",
  visaApplicationDesc: "전문적인 비자 신청 지원",
  visaDescription: "완전한 비자 신청 가이드",
  koreanLanguageTraining: "한국어 교육",
  languageDescription: "원어민과 함께하는 한국어 학습",
  visitsHelp: "유학 방문",
  businessConsultation: "비즈니스 상담",
  fbBusinessConsulting: "F&B 비즈니스 컨설팅",
  businessDescription: "전략적 비즈니스 컨설팅 서비스",
  marketAnalysis: "시장 분석",
  productDevelopment: "제품 개발",
  regulatoryCompliance: "규제 준수",
  ourServices: "우리의 서비스",
  servicesDescription: "교육 및 비즈니스를 위한 포괄적인 컨설팅 서비스",
  
  // Service features
  scholarshipSearch: "장학금 검색",
  applicationAssistance: "지원 도움",
  documentPreparation: "서류 준비",
  universitySelection: "대학교 선택",
  applicationReview: "지원서 검토",
  interviewPreparation: "면접 준비",
  applicationFiling: "지원서 제출",
  interviewCoaching: "면접 코칭",
  topikPreparation: "TOPIK 준비",
  conversationPractice: "회화 연습",
  culturalOrientation: "문화 오리엔테이션",
  marketResearch: "시장 조사",
  businessPlanning: "사업 계획",
  strategyDevelopment: "전략 개발",
  marketSizing: "시장 규모 조사",
  competitorAnalysis: "경쟁사 분석",
  trendIdentification: "트렌드 식별",
  productDescription: "제품 개발 서비스",
  recipeDevelopment: "레시피 개발",
  productTesting: "제품 테스트",
  complianceDescription: "규제 준수 서비스",
  safetyStandards: "안전 기준",
  certificationSupport: "인증 지원",
  complianceAudits: "준수 감사",
  
  // Contact section
  letsStartYourJourney: "여행을 시작하세요",
  readyToTakeNextStep: "다음 단계를 준비되셨나요? 무료 상담을 위해 연락주세요",
  sendUsMessage: "메시지 보내기",
  fillFormBelow: "아래 양식을 작성하시면 24시간 내에 답변드리겠습니다",
  yourName: "성함",
  yourEmail: "이메일",
  selectService: "서비스 선택",
  generalInquiry: "일반 문의",
  studyAbroadRelocation: "유학 및 이주",
  fbConsultingService: "F&B 컨설팅",
  bothServices: "두 서비스 모두",
  message: "메시지",
  tellUsAboutGoals: "목표와 어떻게 도울 수 있는지 알려주세요...",
  sendMessage: "메시지 보내기",
  quickContact: "빠른 연락",
  email: "이메일",
  phoneKorea: "전화 (한국)",
  whatsapp: "왓츠앱",
  bookAConsultation: "상담 예약",
  scheduleFreeConsultation: "목표를 논의하고 맞춤형 조언을 받기 위한 무료 15분 상담을 예약하세요.",
  scheduleConsultation: "무료 상담 예약",
  officeHours: "운영 시간",
  mondayFriday: "월요일 - 금요일:",
  saturday: "토요일:",
  sunday: "일요일:",
  closed: "휴무",
  
  // Footer
  footerDescription: "전문적인 지도와 맞춤형 지원을 통해 학생과 기업가들이 꿈을 실현할 수 있도록 돕습니다.",
  quickLinks: "빠른 링크",
  legal: "법적 정보",
  contactInfo: "연락처 정보",
  location: "서울, 대한민국",
  allRightsReserved: "모든 권리 보유.",
  privacyPolicy: "개인정보 보호정책",
  termsOfService: "서비스 약관",
  sitemap: "사이트맵",
  resourcesBlog: "자료 및 블로그",
  
  // Blog/Resources
  blogPost1Title: "한국 대학교 장학금 완전 가이드",
  blogPost1Excerpt: "한국 대학교 장학금 확보에 대해 알아야 할 모든 것, 지원 팁과 마감일 포함.",
  blogPost2Title: "아시아 F&B 시장 기회",
  blogPost2Excerpt: "아시아 국가들의 성장하는 식음료 시장 기회를 발견하고 활용하는 방법.",
  blogPost3Title: "한국 학생 성공 사례",
  blogPost3Excerpt: "한국에서 성공적으로 유학하고 생활하고 있는 학생들의 감동적인 이야기를 읽어보세요.",
  education: "교육",
  business: "비즈니스",
  scholarships: "장학금",
  resourcesDescription: "여러분의 여정을 위한 유용한 가이드, 팁, 인사이트",
  readMore: "더 읽기",
  
  // Hero section
  exploreStudyPrograms: "유학 프로그램 탐색",
  studentsAssisted: "지원한 학생 수",
  foodScienceExpert: "식품 과학 전문가",
  
  // Newsletter
  newsletterThankYou: "구독해 주셔서 감사합니다!",
  
  // Partners
  ourTrustedPartners: "신뢰받는 파트너들",
  partnerDescription: "우리는 선도적인 기관 및 조직과 협력합니다",
  
  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: "무료 15분 상담 예약",
  
  // About Advisor page
  professionalSummary: "전문가 요약",
  educationExpertise: "교육 전문성",
  koreanGovernmentScholarshipProgram: "한국정부장학금 프로그램 (KGSP)",
  universityAdmissionStrategies: "대학교 입학 전략",
  visaApplicationGuidance: "비자 신청 가이드",
  koreanLanguagePreparation: "한국어 준비",
  culturalAdaptationSupport: "문화 적응 지원",
  fbExpertise: "F&B 전문성",
  marketAnalysisEntryStrategies: "시장 분석 및 진입 전략",
  productDevelopmentInnovation: "제품 개발 및 혁신",
  supplyChainOptimization: "공급망 최적화",
  businessPlanningFunding: "사업 계획 및 자금 조달",
  keyAchievements: "주요 성과",
  scholarshipSuccessRate: "장학금 성공률",
  getInTouch: "연락하기",
  mondayToFriday: "월요일부터 금요일",
  saturdaySunday: "토요일 및 일요일",
  koreanTime: "한국 표준시",
  myMission: "나의 사명",
  missionStatement: "한국의 세계 수준 교육으로 학생들을 인도하고 글로벌 시장을 연결하는 성공적인 식품 사업을 구축하도록 기업가들을 도움으로써 문화를 연결하고 기회를 창조하는 것입니다.",
  
  // Book Consultation page
  hotelBooking: "호텔 예약 지원",
  phoneConsultation: "전화 상담",
  reviewConsultation: "상담 요청 검토",
  consultationDetails: "상담 세부사항",
  fullName: "성명",
  selectedService: "선택된 서비스",
  totalPrice: "총 가격",
  paymentMethods: "결제 방법",
  payWithCard: "신용/직불카드로 결제",
  payWithMobile: "모바일 머니로 결제",
  payWithBank: "은행 송금으로 결제",
  backToEdit: "세부사항 편집으로 돌아가기",
  phone: "전화번호",
  preferredDate: "희망 날짜",
  preferredTime: "희망 시간",
  reviewConsultationRequest: "상담 요청 검토",
  
  // Study Programs page
  universityAdmissionSupport: "대학교 입학 지원",
  universityAdmissionSupportDesc: "대학교 지원 및 입학 과정을 위한 완전한 지원",
  visaApplicationAssistance: "비자 신청 지원",
  visaApplicationAssistanceDesc: "비자 신청 및 서류 작성을 위한 전문적인 도움",
  visaDocumentPrep: "비자 서류 준비",
  languagePreparation: "언어 준비",
  languagePreparationDesc: "한국어 교육 및 TOPIK 준비",
  culturalOrientationAndAccommodation: "문화 오리엔테이션 및 숙박",
  studyProgramsTitle: "유학 프로그램 및 서비스",
  studyProgramsSubtitle: "한국 교육 여정을 위한 포괄적인 지원",
  
  // Services component additional
  startYourJourney: "여행을 시작하세요",
  getExpertConsultation: "전문가 상담 받기",
  journeyDescription: "여정의 다음 단계를 준비되셨나요?",
  getFullConsultation: "전체 상담 받기",
  viewAllPackagesPricing: "모든 패키지 및 가격 보기",
  
  // Cultural adaptation
  culturalAdaptationGuide: "문화 적응 가이드"
};

const translations = {
  EN: englishTranslations,
  KO: koreanTranslations,
  RW: englishTranslations, // Using English as fallback for Kinyarwanda
  FR: englishTranslations, // Using English as fallback for French
};

interface LanguageContextType {
  currentLanguage: string;
  translations: Translations;
  switchLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'EN';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.EN;

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      translations: currentTranslations,
      switchLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
