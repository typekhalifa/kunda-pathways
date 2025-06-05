import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Translations {
  // Navigation
  home: string;
  about: string;
  services: string;
  contact: string;
  resources: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  learnMore: string;
  exploreStudyPrograms: string;
  
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
  studentsAssisted: string;
  foodScienceExpert: string;
  
  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  servicesDescription: string;
  studyInKorea: string;
  studyInKoreaDesc: string;
  fbConsulting: string;
  fbConsultingDesc: string;
  universityAdmissions: string;
  universityAdmissionsDesc: string;
  universityDescription: string;
  visaAssistance: string;
  visaAssistanceDesc: string;
  visaApplication: string;
  visaDescription: string;
  koreanLanguageTraining: string;
  languageDescription: string;
  scholarshipDescription: string;
  ourServices: string;
  letsStartYourJourney: string;
  journeyDescription: string;
  getExpertConsultation: string;
  getFullConsultation: string;
  viewAllPackagesPricing: string;
  
  // Study Programs
  studyProgramsTitle: string;
  studyProgramsSubtitle: string;
  scholarshipGuidance: string;
  scholarshipGuidanceDesc: string;
  universityAdmissionSupport: string;
  universityAdmissionSupportDesc: string;
  visaApplicationAssistance: string;
  visaApplicationAssistanceDesc: string;
  languagePreparation: string;
  languagePreparationDesc: string;
  
  // Study Programs Features
  scholarshipSearch: string;
  applicationAssistance: string;
  documentPreparation: string;
  universitySelection: string;
  applicationReview: string;
  interviewPreparation: string;
  visaDocumentPrep: string;
  applicationFiling: string;
  interviewCoaching: string;
  topikPreparation: string;
  conversationPractice: string;
  culturalOrientationAndAccommodation: string;
  culturalOrientation: string;
  
  // F&B Consulting
  fbConsultingTitle: string;
  businessStrategy: string;
  businessStrategyDesc: string;
  businessConsultation: string;
  businessDescription: string;
  marketAnalysis: string;
  marketAnalysisDesc: string;
  fbMarketAnalysis: string;
  productDevelopment: string;
  productDevelopmentDesc: string;
  productDescription: string;
  regulatoryCompliance: string;
  regulatoryComplianceDesc: string;
  complianceDescription: string;
  
  // F&B Features
  marketResearch: string;
  businessPlanning: string;
  strategyDevelopment: string;
  marketSizing: string;
  competitorAnalysis: string;
  trendIdentification: string;
  recipeDevelopment: string;
  productTesting: string;
  safetyStandards: string;
  certificationSupport: string;
  complianceAudits: string;
  
  // Common
  startYourJourney: string;
  backToHome: string;
  bookConsultation: string;
  getQuote: string;
  scheduleConsultation: string;
  
  // About
  aboutTitle: string;
  aboutDescription: string;
  aboutUs: string;
  
  // Contact
  contactTitle: string;
  contactDescription: string;
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
  officeHours: string;
  mondayFriday: string;
  saturday: string;
  sunday: string;
  closed: string;
  location: string;
  
  // Testimonials
  testimonialsTitle: string;
  
  // Blog
  blogTitle: string;
  blogDescription: string;
  readMore: string;
  latest: string;
  resourcesDescription: string;
  viewAllResources: string;
  blogPost1Title: string;
  blogPost1Excerpt: string;
  blogPost2Title: string;
  blogPost2Excerpt: string;
  blogPost3Title: string;
  blogPost3Excerpt: string;
  education: string;
  business: string;
  scholarships: string;
  
  // Newsletter
  newsletterTitle: string;
  newsletterDescription: string;
  subscribe: string;
  enterEmailAddress: string;
  newsletterThankYou: string;
  
  // Footer
  quickLinks: string;
  followUs: string;
  footerDescription: string;
  resourcesBlog: string;
  visitsHelp: string;
  legal: string;
  contactInfo: string;
  allRightsReserved: string;
  
  // Partners
  ourTrustedPartners: string;
  partnerDescription: string;
  
  // Legal pages
  privacyPolicy: string;
  termsOfService: string;
  sitemap: string;
  
  // WhatsApp button
  scheduleFreeFifteenMinuteConsultation: string;
}

const translations = {
  EN: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    resources: "Resources",
    
    // Hero section
    heroTitle: "Your Gateway to Korean Education & F&B Success",
    heroSubtitle: "Scholarships • University Admissions • F&B Consulting",
    heroDescription: "From scholarship guidance to food business consulting, we bridge Africa and Korea with personalized pathways to your success.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    exploreStudyPrograms: "Explore Study Programs",
    
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
    studentsAssisted: "500+ Students Assisted",
    foodScienceExpert: "Food Science Expert",
    
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive solutions for your educational and business goals",
    servicesDescription: "Comprehensive support for your educational and business goals",
    studyInKorea: "Study in Korea",
    studyInKoreaDesc: "Complete guidance for scholarships and university admissions",
    fbConsulting: "F&B Consulting",
    fbConsultingDesc: "Expert consulting for food & beverage businesses",
    universityAdmissions: "University Admissions",
    universityAdmissionsDesc: "End-to-end support for university applications",
    universityDescription: "End-to-end university admission support",
    visaAssistance: "Visa Assistance",
    visaAssistanceDesc: "Professional help with visa applications and documentation",
    visaApplication: "Visa Application",
    visaDescription: "Comprehensive visa application assistance",
    koreanLanguageTraining: "Korean Language Training",
    languageDescription: "Professional Korean language preparation",
    scholarshipDescription: "Complete guidance for finding and applying to scholarships",
    ourServices: "Our Services",
    letsStartYourJourney: "Let's Start Your Journey",
    journeyDescription: "Ready to take the next step? Get personalized guidance for your goals.",
    getExpertConsultation: "Get Expert Consultation",
    getFullConsultation: "Get Full Consultation",
    viewAllPackagesPricing: "View All Packages & Pricing and Get 25% Off",
    
    // Study Programs
    studyProgramsTitle: "Study Programs & Services",
    studyProgramsSubtitle: "Comprehensive support for your Korean education journey",
    scholarshipGuidance: "Scholarship Guidance",
    scholarshipGuidanceDesc: "Expert help in finding and applying to scholarships",
    universityAdmissionSupport: "University Admission Support",
    universityAdmissionSupportDesc: "End-to-end university admission support",
    visaApplicationAssistance: "Visa Application Assistance",
    visaApplicationAssistanceDesc: "Professional visa application assistance",
    languagePreparation: "Language Preparation",
    languagePreparationDesc: "Korean language test preparation",
    
    // Study Programs Features
    scholarshipSearch: "Scholarship search",
    applicationAssistance: "Application assistance",
    documentPreparation: "Document preparation",
    universitySelection: "University selection",
    applicationReview: "Application review",
    interviewPreparation: "Interview preparation",
    visaDocumentPrep: "Document preparation",
    applicationFiling: "Application filing",
    interviewCoaching: "Interview coaching",
    topikPreparation: "TOPIK preparation",
    conversationPractice: "Conversation practice",
    culturalOrientationAndAccommodation: "Cultural orientation and accommodation",
    culturalOrientation: "Cultural orientation",
    
    // F&B Consulting
    fbConsultingTitle: "F&B Consulting",
    businessStrategy: "Business Strategy",
    businessStrategyDesc: "Strategic business planning and market entry",
    businessConsultation: "Business Consultation",
    businessDescription: "Strategic business planning and market entry",
    marketAnalysis: "Market Analysis",
    marketAnalysisDesc: "In-depth market analysis and competitive intelligence",
    fbMarketAnalysis: "F&B Market Analysis",
    productDevelopment: "Product Development",
    productDevelopmentDesc: "Food product development and innovation",
    productDescription: "Food product development and innovation",
    regulatoryCompliance: "Regulatory Compliance",
    regulatoryComplianceDesc: "Navigate food safety and regulatory requirements",
    complianceDescription: "Navigate food safety and regulatory requirements",
    
    // F&B Features
    marketResearch: "Market research",
    businessPlanning: "Business planning",
    strategyDevelopment: "Strategy development",
    marketSizing: "Market sizing",
    competitorAnalysis: "Competitor analysis",
    trendIdentification: "Trend identification",
    recipeDevelopment: "Recipe development",
    productTesting: "Product testing",
    safetyStandards: "Safety standards",
    certificationSupport: "Certification support",
    complianceAudits: "Compliance audits",
    
    // Common
    startYourJourney: "Start Your Journey",
    backToHome: "Back to Home",
    bookConsultation: "Book Consultation",
    getQuote: "Get Quote",
    scheduleConsultation: "Schedule Consultation",
    
    // About
    aboutTitle: "About Us",
    aboutDescription: "Learn about our mission and expertise",
    aboutUs: "About Us",
    
    // Contact
    contactTitle: "Contact Us",
    contactDescription: "Get in touch with our team",
    readyToTakeNextStep: "Ready to take the next step towards your goals?",
    sendUsMessage: "Send Us a Message",
    fillFormBelow: "Fill out the form below and we'll get back to you within 24 hours.",
    yourName: "Your Name",
    yourEmail: "Your Email",
    selectService: "Select Service",
    generalInquiry: "General Inquiry",
    studyAbroadRelocation: "Study Abroad & Relocation",
    fbConsultingService: "F&B Consulting",
    bothServices: "Both Services",
    message: "Message",
    tellUsAboutGoals: "Tell us about your goals and how we can help",
    sendMessage: "Send Message",
    quickContact: "Quick Contact",
    email: "Email",
    phoneKorea: "Phone (Korea)",
    whatsapp: "WhatsApp",
    bookAConsultation: "Book a Consultation",
    scheduleFreeConsultation: "Schedule a free consultation to discuss your goals",
    officeHours: "Office Hours",
    mondayFriday: "Monday - Friday: 9:00 AM - 6:00 PM (KST)",
    saturday: "Saturday: 10:00 AM - 4:00 PM (KST)",
    sunday: "Sunday",
    closed: "Closed",
    location: "Seoul, South Korea",
    
    // Testimonials
    testimonialsTitle: "Success Stories",
    
    // Blog
    blogTitle: "Latest Resources",
    blogDescription: "Stay updated with the latest insights",
    readMore: "Read More",
    latest: "Latest",
    resourcesDescription: "Essential guides and insights for your journey",
    viewAllResources: "View All Resources",
    blogPost1Title: "Complete Guide to Korean University Scholarships",
    blogPost1Excerpt: "Everything you need to know about finding and applying for scholarships in Korea.",
    blogPost2Title: "Starting Your F&B Business in Korea",
    blogPost2Excerpt: "Step-by-step guide to launching your food business in the Korean market.",
    blogPost3Title: "TOPIK Test Preparation Tips",
    blogPost3Excerpt: "Expert strategies to ace your Korean language proficiency test.",
    education: "Education",
    business: "Business",
    scholarships: "Scholarships",
    
    // Newsletter
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Get the latest updates and opportunities",
    subscribe: "Subscribe",
    enterEmailAddress: "Enter your email address",
    newsletterThankYou: "Thank you for subscribing!",
    
    // Footer
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    footerDescription: "Your trusted partner for Korean education and F&B success",
    resourcesBlog: "Resources & Blog",
    visitsHelp: "Visa & Help",
    legal: "Legal",
    contactInfo: "Contact Info",
    allRightsReserved: "All rights reserved.",
    
    // Partners
    ourTrustedPartners: "Our Trusted Partners",
    partnerDescription: "Working with leading institutions and organizations",
    
    // Legal pages
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    sitemap: "Sitemap",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "Schedule a free 15-minute consultation"
  },
  
  KO: {
    // Navigation
    home: "홈",
    about: "소개", 
    services: "서비스",
    contact: "연락처",
    resources: "자료",
    
    // Hero section
    heroTitle: "한국 교육 및 F&B 성공의 관문",
    heroSubtitle: "장학금 • 대학 입학 • F&B 컨설팅",
    heroDescription: "장학금 안내부터 식품 사업 컨설팅까지, 아프리카와 한국을 연결하는 맞춤형 성공 경로를 제공합니다.",
    getStarted: "시작하기",
    learnMore: "자세히 보기",
    exploreStudyPrograms: "스터디 프로그램 탐색",
    
    // About section
    meetYourGlobalAdvisor: "당신의 전문가를 만나보세요",
    advisorName: "드. 시아라 존슨",
    advisorTitle: "국제 교육 및 F&B 컨설팅 전문가",
    advisorDescription: "아프리카 학생들을 한국 대학과 식품 사업을 전 세계로 확장시키는 데 10년 이상의 경험을 가지고 있습니다.",
    readMoreAboutMe: "자세히 알아보기",
    educationExpert: "교육 전문가",
    educationExpertDesc: "한국 대학 입학에 대한 전문적인 안내",
    fbConsultant: "F&B 컨설팅 전문가",
    fbConsultantDesc: "식음료 및 음료 사업에 대한 전문적인 조언",
    studentsHelped: "500+ 학생 지원",
    studentsHelpedDesc: "학생들을 한국 대학에 성공적으로 안내했습니다.",
    countriesReached: "15+ 국가에 도달",
    countriesReachedDesc: "아프리카의 학생들이 이익을 받았습니다.",
    studentsAssisted: "500+ 학생 지원",
    foodScienceExpert: "식품 과학 전문가",
    
    // Services
    servicesTitle: "우리의 서비스",
    servicesSubtitle: "교육 및 사업 목표를 위한 종합 솔루션",
    servicesDescription: "교육 및 사업 목표를 위한 종합 지원",
    studyInKorea: "한국 유학",
    studyInKoreaDesc: "장학금 및 대학 입학을 위한 완전한 안내",
    fbConsulting: "F&B 컨설팅",
    fbConsultingDesc: "식음료 및 음료 사업을 위한 전문 컨설팅",
    universityAdmissions: "대학교 입학",
    universityAdmissionsDesc: "대학 지원을 위한 전 과정 지원",
    universityDescription: "전 과정 대학 지원",
    visaAssistance: "비자 지원",
    visaAssistanceDesc: "비자 신청 및 서류 작성 전문 도움",
    visaApplication: "비자 신청",
    visaDescription: "전체적인 비자 신청 지원",
    koreanLanguageTraining: "한국어 준비",
    languageDescription: "한국어 시험 준비",
    scholarshipDescription: "장학금 찾기 및 지원에 대한 전문적인 도움",
    ourServices: "우리의 서비스",
    letsStartYourJourney: "여행을 시작하세요",
    journeyDescription: "다음 단계를 준비하시겠습니까? 목표에 맞춤형 안내를 받으세요.",
    getExpertConsultation: "전문가 상담 받기",
    getFullConsultation: "전체 상담 받기",
    viewAllPackagesPricing: "모든 패키지 및 가격 확인 및 25% 할인 받기",
    
    // Study Programs
    studyProgramsTitle: "유학 프로그램 및 서비스",
    studyProgramsSubtitle: "한국 교육 여정을 위한 종합 지원",
    scholarshipGuidance: "장학금 안내",
    scholarshipGuidanceDesc: "장학금 찾기 및 지원에 대한 전문적인 도움",
    universityAdmissionSupport: "대학교 입학 지원",
    universityAdmissionSupportDesc: "전 과정 대학 입학 지원",
    visaApplicationAssistance: "비자 신청 지원",
    visaApplicationAssistanceDesc: "전문적인 비자 신청 지원",
    languagePreparation: "언어 준비",
    languagePreparationDesc: "한국어 시험 준비",
    
    // Study Programs Features
    scholarshipSearch: "장학금 검색",
    applicationAssistance: "지원 도움",
    documentPreparation: "서류 준비", 
    universitySelection: "대학교 선택",
    applicationReview: "지원서 검토",
    interviewPreparation: "면접 준비",
    visaDocumentPrep: "서류 준비",
    applicationFiling: "신청서 제출",
    interviewCoaching: "면접 코칭",
    topikPreparation: "TOPIK 준비",
    conversationPractice: "회화 연습",
    culturalOrientationAndAccommodation: "문화적 오리엔테이션 및 장학 지원",
    culturalOrientation: "문화적 오리엔테이션",
    
    // F&B Consulting
    fbConsultingTitle: "F&B 컨설팅",
    businessStrategy: "비즈니스 전략",
    businessStrategyDesc: "전략적 사업 계획 및 시장 진입",
    businessConsultation: "비즈니스 조언",
    businessDescription: "전략적 사업 계획 및 시장 진입",
    marketAnalysis: "F&B 시장 분석",
    marketAnalysisDesc: "심층 시장 분석 및 경쟁 정보",
    fbMarketAnalysis: "F&B 시장 분석",
    productDevelopment: "제품 개발",
    productDevelopmentDesc: "식품 제품 개발 및 혁신",
    productDescription: "식품 제품 개발 및 혁신",
    regulatoryCompliance: "규제 준수",
    regulatoryComplianceDesc: "식품 안전 및 규제 요구사항 탐색",
    complianceDescription: "식품 안전 및 규제 요구사항 탐색",
    
    // F&B Features
    marketResearch: "시장 조사",
    businessPlanning: "사업 계획",
    strategyDevelopment: "전략 개발",
    marketSizing: "시장 규모 측정",
    competitorAnalysis: "경쟁사 분석",
    trendIdentification: "Trend identification",
    recipeDevelopment: "레시피 개발",
    productTesting: "제품 테스트",
    safetyStandards: "안전 기준",
    certificationSupport: "인증 지원",
    complianceAudits: "Compliance audits",
    
    // Common
    startYourJourney: "여행을 시작하세요",
    backToHome: "홈으로 돌아가기",
    bookConsultation: "상담 예약",
    getQuote: "견적 받기",
    scheduleConsultation: "상담 일정 잡기",
    
    // About
    aboutTitle: "회사 소개",
    aboutDescription: "우리의 사명과 전문성에 대해 알아보세요",
    aboutUs: "회사 소개",
    
    // Contact
    contactTitle: "연락처",
    contactDescription: "우리 팀과 연락하세요",
    readyToTakeNextStep: "다음 단계를 준비하시겠습니까?",
    sendUsMessage: "메시지를 보내주세요",
    fillFormBelow: "아래 양식을 채우시고 24시간 내에 연락드리겠습니다.",
    yourName: "이름",
    yourEmail: "이메일",
    selectService: "서비스 선택",
    generalInquiry: "일반 문의",
    studyAbroadRelocation: "해외 학습 및 이동",
    fbConsultingService: "F&B 컨설팅",
    bothServices: "두 서비스",
    message: "메시지",
    tellUsAboutGoals: "목표에 대해 알려주세요",
    sendMessage: "메시지 보내기",
    quickContact: "빠른 연락",
    email: "이메일",
    phoneKorea: "한국 전화번호",
    whatsapp: "WhatsApp",
    bookAConsultation: "상담 예약",
    scheduleFreeConsultation: "무료 상담 예약",
    officeHours: "오피스 운영 시간",
    mondayFriday: "월요일 - 금요일: 9:00 AM - 6:00 PM (KST)",
    saturday: "토요일: 10:00 AM - 4:00 PM (KST)",
    sunday: "일요일",
    closed: "휴무",
    location: "서울, 대한민국",
    
    // Testimonials
    testimonialsTitle: "성공 사례",
    
    // Blog
    blogTitle: "최신 자료",
    blogDescription: "최신 인사이트로 업데이트하세요",
    readMore: "더 읽기",
    latest: "최신",
    resourcesDescription: "여행 경로를 위한 필수 가이드와 인사이트",
    viewAllResources: "모든 자료 보기",
    blogPost1Title: "한국 대학 장학금 찾기 및 지원",
    blogPost1Excerpt: "한국 대학 장학금 찾기 및 지원에 대한 모든 정보",
    blogPost2Title: "한국에서 식품 사업 시작하기",
    blogPost2Excerpt: "한국 식품 사업을 시작하는 단계별 가이드",
    blogPost3Title: "TOPIK 시험 준비 팁",
    blogPost3Excerpt: "한국어 전문성 향상에 대한 전문적인 전략",
    education: "교육",
    business: "사업",
    scholarships: "장학금",
    
    // Newsletter
    newsletterTitle: "업데이트 받기",
    newsletterDescription: "최신 업데이트와 기회를 받아보세요",
    subscribe: "구독하기",
    enterEmailAddress: "이메일 주소를 입력하세요",
    newsletterThankYou: "구독해주셔서 감사합니다!",
    
    // Footer
    quickLinks: "빠른 링크",
    followUs: "팔로우하기",
    footerDescription: "한국 교육 및 F&B 성공의 전문가",
    resourcesBlog: "자료 및 블로그",
    visitsHelp: "비자 및 도움",
    legal: "법적",
    contactInfo: "연락처 정보",
    allRightsReserved: "모든 권리는 저작권에 있습니다.",
    
    // Partners
    ourTrustedPartners: "신뢰할 수 있는 파트너",
    partnerDescription: "우리와 함께하는 최고의 기관과 조직",
    
    // Legal pages
    privacyPolicy: "개인정보 보호정책",
    termsOfService: "서비스 약관",
    sitemap: "사이트맵",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "무료 15분 상담 예약하기"
  },
  
  FR: {
    // Navigation
    home: "Accueil",
    about: "À propos",
    services: "Services", 
    contact: "Contact",
    resources: "Ressources",
    
    // Hero section
    heroTitle: "Votre passerelle vers l'éducation coréenne et le succès F&B",
    heroSubtitle: "Bourses • Admissions universitaires • Conseil F&B",
    heroDescription: "De l'orientation sur les bourses au conseil en entreprise alimentaire, nous relions l'Afrique et la Corée avec des parcours personnalisés vers votre succès.",
    getStarted: "Commencer",
    learnMore: "En savoir plus",
    exploreStudyPrograms: "Explorer les programmes d'études",
    
    // About section
    meetYourGlobalAdvisor: "Rencontrez votre conseiller international",
    advisorName: "Dr. Sarah Johnson",
    advisorTitle: "Consultant en éducation internationale et F&B",
    advisorDescription: "Avec plus de 10 ans d'expérience en connectant des étudiants africains aux universités coréennes et en aidant les entreprises alimentaires à se développer globalement.",
    readMoreAboutMe: "En savoir plus sur moi",
    educationExpert: "Expert en éducation",
    educationExpertDesc: "Aide spécialisée pour les admissions universitaires coréennes",
    fbConsultant: "Consultant en F&B",
    fbConsultantDesc: "Conseil expert pour les entreprises alimentaires et boissons",
    studentsHelped: "500+ étudiants aidés",
    studentsHelpedDesc: "Aidés à réussir leurs admissions universitaires coréennes",
    countriesReached: "15+ pays atteints",
    countriesReachedDesc: "Des étudiants d'Afrique ont bénéficié",
    studentsAssisted: "500+ étudiants aidés",
    foodScienceExpert: "Expert en sciences alimentaires",
    
    // Services
    servicesTitle: "Nos Services",
    servicesSubtitle: "Solutions complètes pour vos objectifs éducatifs et commerciaux",
    servicesDescription: "Solutions complètes pour vos objectifs éducatifs et commerciaux",
    studyInKorea: "Étudier en Corée",
    studyInKoreaDesc: "Guidance complète pour les bourses et admissions universitaires",
    fbConsulting: "Conseil F&B",
    fbConsultingDesc: "Conseil expert pour les entreprises alimentaires et boissons",
    universityAdmissions: "Admissions Universitaires",
    universityAdmissionsDesc: "Support de bout en bout pour les candidatures universitaires",
    universityDescription: "Support de bout en bout pour les admissions universitaires",
    visaAssistance: "Assistance Visa",
    visaAssistanceDesc: "Aide professionnelle pour les demandes de visa et la documentation",
    visaApplication: "Visa Application",
    visaDescription: "Assistance complète pour les demandes de visa",
    koreanLanguageTraining: "Formation en coréen",
    languageDescription: "Formation en coréen",
    scholarshipDescription: "Aide complète pour trouver et postuler aux bourses",
    ourServices: "Nos Services",
    letsStartYourJourney: "Commencez votre voyage",
    journeyDescription: "Prêt à prendre le prochain pas? Obtenez une assistance personnalisée pour vos objectifs.",
    getExpertConsultation: "Obtenir une consultation experte",
    getFullConsultation: "Obtenir une consultation complète",
    viewAllPackagesPricing: "Voir tous les packages et tarifs et bénéficier d'une réduction de 25%",
    
    // Study Programs
    studyProgramsTitle: "Programmes d'études et services",
    studyProgramsSubtitle: "Support complet pour votre parcours éducatif coréen",
    scholarshipGuidance: "Guidance des bourses",
    scholarshipGuidanceDesc: "Aide experte pour trouver et postuler aux bourses",
    universityAdmissionSupport: "Support d'admission universitaire",
    universityAdmissionSupportDesc: "Support d'admission universitaire de bout en bout",
    visaApplicationAssistance: "Assistance de demande de visa",
    visaApplicationAssistanceDesc: "Assistance professionnelle de demande de visa",
    languagePreparation: "Préparation linguistique",
    languagePreparationDesc: "Préparation aux tests de langue coréenne",
    
    // Study Programs Features
    scholarshipSearch: "Recherche de bourses",
    applicationAssistance: "Assistance d'application",
    documentPreparation: "Préparation de documents",
    universitySelection: "Sélection d'université",
    applicationReview: "Révision d'application",
    interviewPreparation: "Préparation d'entretien",
    visaDocumentPrep: "Préparation de documents",
    applicationFiling: "Dépôt d'application",
    interviewCoaching: "Coaching d'entretien",
    topikPreparation: "Préparation TOPIK",
    conversationPractice: "Pratique de conversation",
    culturalOrientationAndAccommodation: "Orientation culturelle et logement",
    culturalOrientation: "Orientation culturelle",
    
    // F&B Consulting
    fbConsultingTitle: "Conseil F&B",
    businessStrategy: "Stratégie d'entreprise",
    businessStrategyDesc: "Planification stratégique d'entreprise et entrée sur le marché",
    businessConsultation: "Consultation d'entreprise",
    businessDescription: "Planification stratégique d'entreprise et entrée sur le marché",
    marketAnalysis: "Analyse de marché",
    marketAnalysisDesc: "Analyse approfondie du marché et intelligence concurrentielle",
    fbMarketAnalysis: "Analyse de marché F&B",
    productDevelopment: "Développement de produits",
    productDevelopmentDesc: "Développement et innovation de produits alimentaires",
    productDescription: "Développement et innovation de produits alimentaires",
    regulatoryCompliance: "Conformité réglementaire",
    regulatoryComplianceDesc: "Naviguer dans la sécurité alimentaire et les exigences réglementaires",
    complianceDescription: "Naviguer dans la sécurité alimentaire et les exigences réglementaires",
    
    // F&B Features
    marketResearch: "Recherche de marché",
    businessPlanning: "Planification d'entreprise",
    strategyDevelopment: "Développement de stratégie",
    marketSizing: "Dimensionnement du marché",
    competitorAnalysis: "Analyse des concurrents",
    trendIdentification: "Trend identification",
    recipeDevelopment: "Développement de recettes",
    productTesting: "Test de produits",
    safetyStandards: "Normes de sécurité",
    certificationSupport: "Support de certification",
    complianceAudits: "Audits de conformité",
    
    // Common
    startYourJourney: "Commencez votre voyage",
    backToHome: "Retour à l'accueil",
    bookConsultation: "Réserver une consultation",
    getQuote: "Obtenir un devis",
    scheduleConsultation: "Programmer une consultation",
    
    // About
    aboutTitle: "À propos de nous",
    aboutDescription: "Découvrez notre mission et notre expertise",
    aboutUs: "À propos de nous",
    
    // Contact
    contactTitle: "Contactez-nous",
    contactDescription: "Entrez en contact avec notre équipe",
    readyToTakeNextStep: "Prêt à prendre le prochain pas?",
    sendUsMessage: "Envoyez-nous un message",
    fillFormBelow: "Remplissez le formulaire ci-dessous et nous vous répondrons dans 24 heures.",
    yourName: "Votre nom",
    yourEmail: "Votre adresse e-mail",
    selectService: "Sélectionnez le service",
    generalInquiry: "Demande générale",
    studyAbroadRelocation: "Études à l'étranger et déplacement",
    fbConsultingService: "Conseil F&B",
    bothServices: "Les deux services",
    message: "Message",
    tellUsAboutGoals: "Dites-nous vos objectifs et comment nous pouvons vous aider",
    sendMessage: "Envoyer le message",
    quickContact: "Contact rapide",
    email: "Email",
    phoneKorea: "Téléphone (Corée)",
    whatsapp: "WhatsApp",
    bookAConsultation: "Réserver une consultation",
    scheduleFreeConsultation: "Réserver une consultation gratuite pour discuter de vos objectifs",
    officeHours: "Heures d'ouverture",
    mondayFriday: "Lundi à vendredi: 9h00 - 18h00 (KST)",
    saturday: "Samedi: 10h00 - 14h00 (KST)",
    sunday: "Dimanche",
    closed: "Fermé",
    location: "Seoul, Corée du Sud",
    
    // Testimonials
    testimonialsTitle: "Histoires de succès",
    
    // Blog
    blogTitle: "Dernières ressources",
    blogDescription: "Restez à jour avec les dernières perspectives",
    readMore: "Lire la suite",
    latest: "Dernières",
    resourcesDescription: "Guides et informations essentielles pour votre voyage",
    viewAllResources: "Voir toutes les ressources",
    blogPost1Title: "Guide complet des bourses coréennes",
    blogPost1Excerpt: "Tout ce que vous devez savoir sur les bourses coréennes et comment les postuler.",
    blogPost2Title: "Démarrer votre entreprise alimentaire en Corée",
    blogPost2Excerpt: "Guide étape par étape pour lancer votre entreprise alimentaire au marché coréen.",
    blogPost3Title: "Conseils pour réussir le test TOPIK",
    blogPost3Excerpt: "Stratégies expertes pour réussir votre test de langue coréenne.",
    education: "Éducation",
    business: "Buisson",
    scholarships: "Bourses",
    
    // Newsletter
    newsletterTitle: "Restez informé",
    newsletterDescription: "Recevez les dernières mises à jour et opportunités",
    subscribe: "S'abonner",
    enterEmailAddress: "Entrez votre adresse e-mail",
    newsletterThankYou: "Merci d'avoir souscrit!",
    
    // Footer
    quickLinks: "Liens rapides",
    followUs: "Suivez-nous",
    footerDescription: "Votre partenaire de confiance pour l'éducation coréenne et le succès F&B",
    resourcesBlog: "Ressources & Blog",
    visitsHelp: "Visa & Aide",
    legal: "Loi",
    contactInfo: "Informations de contact",
    allRightsReserved: "Tous droits réservés.",
    
    // Partners
    ourTrustedPartners: "Nos partenaires de confiance",
    partnerDescription: "Collaboration avec des institutions et des organisations leaders",
    
    // Legal pages
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions de service",
    sitemap: "Plan du site",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "Programmer une consultation gratuite de 15 minutes"
  },
  
  RW: {
    // Navigation
    home: "Ahabanza",
    about: "Ibibazo",
    services: "Serivisi",
    contact: "Twandikire",
    resources: "Ibikoresho",
    
    // Hero section
    heroTitle: "Inzira yawe yo kwiga muri Koreya no gutsinda muri F&B",
    heroSubtitle: "Impano • Kwinjira muri kaminuza • Inama za F&B",
    heroDescription: "Kuva mu buyobozi bw'impano kugeza mu nama z'ubucuruzi bw'ibiryo, tuhuza Afurika na Koreya n'inzira zigenga kugera ku ntsinzi yawe.",
    getStarted: "Tangira",
    learnMore: "Menya byinshi",
    exploreStudyPrograms: "Kugera kubikira gahunda z'amashuri na serivisi",
    
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
    studentsAssisted: "500+ Students Assisted",
    foodScienceExpert: "Food Science Expert",
    
    // Services
    servicesTitle: "Serivisi zacu",
    servicesSubtitle: "Ibisubizo byuzuye ku ntego zawe z'uburezi n'ubucuruzi",
    servicesDescription: "Solutions complètes pour vos objectifs éducatifs et commerciaux",
    studyInKorea: "Kwiga muri Koreya",
    studyInKoreaDesc: "Guidance complète pour les bourses et admissions universitaires",
    fbConsulting: "Inama za F&B",
    fbConsultingDesc: "Inama z'impuguke ku bucuruzi bw'ibiryo n'ibinyobwa",
    universityAdmissions: "Kwinjira muri kaminuza",
    universityAdmissionsDesc: "Ubufasha bwuzuye ku busaba bwa kaminuza",
    universityDescription: "Ubufasha bwuzuye ku busaba bwa kaminuza",
    visaAssistance: "Ubufasha bwa viza",
    visaAssistanceDesc: "Ubufasha bw'umwuga ku busaba bwa viza n'inyandiko",
    visaApplication: "Visa Application",
    visaDescription: "Assistance complète pour les demandes de visa",
    koreanLanguageTraining: "Korean Language Training",
    languageDescription: "Formation en coréen",
    scholarshipDescription: "Aide complète pour trouver et postuler aux bourses",
    ourServices: "Our Services",
    letsStartYourJourney: "Let's Start Your Journey",
    journeyDescription: "Prêt à prendre le prochain pas? Obtenez une assistance personnalisée pour vos objectifs.",
    getExpertConsultation: "Obtenir une consultation experte",
    getFullConsultation: "Obtenir une consultation complète",
    viewAllPackagesPricing: "Voir tous les packages et tarifs et bénéficier d'une réduction de 25%",
    
    // Study Programs
    studyProgramsTitle: "Gahunda z'amashuri na serivisi",
    studyProgramsSubtitle: "Ubufasha buzuye ku rugendo rwawe rw'uburezi bwa Koreya",
    scholarshipGuidance: "Ubuyobozi bw'impano",
    scholarshipGuidanceDesc: "Ubufasha bw'impuguke mu gushaka no gusaba impano",
    universityAdmissionSupport: "Ubufasha bwo kwinjira muri kaminuza",
    universityAdmissionSupportDesc: "Ubufasha bwo kwinjira muri kaminuza bwuzuye",
    visaApplicationAssistance: "Ubufasha bwo gusaba viza",
    visaApplicationAssistanceDesc: "Ubufasha bw'umwuga bwo gusaba viza",
    languagePreparation: "Gutegura ururimi",
    languagePreparationDesc: "Gutegura ibizamini by'ururimi rwa Koreya",
    
    // Study Programs Features
    scholarshipSearch: "Gushaka impano",
    applicationAssistance: "Assistance d'application",
    documentPreparation: "Gutegura inyandiko",
    universitySelection: "Guhitamo kaminuza",
    applicationReview: "Gusuzuma ubusaba",
    interviewPreparation: "Gutegura ikiganiro",
    visaDocumentPrep: "Gutegura inyandiko",
    applicationFiling: "Kohereza ubusaba",
    interviewCoaching: "Imyitozo y'ikiganiro",
    topikPreparation: "Gutegura TOPIK",
    conversationPractice: "Kwimenyereza ikiganiro",
    culturalOrientationAndAccommodation: "Kwerekana umuco no gutura",
    culturalOrientation: "Kwerekana umuco",
    
    // F&B Consulting
    fbConsultingTitle: "Inama za F&B",
    businessStrategy: "Ingamba z'ubucuruzi",
    businessStrategyDesc: "Gutegura ingamba z'ubucuruzi no kwinjira mu isoko",
    businessConsultation: "Business Consultation",
    businessDescription: "Strategic business planning and market entry",
    marketAnalysis: "Isesengura ry'isoko",
    marketAnalysisDesc: "Isesengura ry'imbere ry'isoko n'ubunyangamugayo bw'abanywanyi",
    fbMarketAnalysis: "F&B Market Analysis",
    productDevelopment: "Guteza imbere ibicuruzwa",
    productDevelopmentDesc: "Guteza imbere no guhanga ibicuruzwa by'ibiryo",
    productDescription: "Guteza imbere no guhanga ibicuruzwa by'ibiryo",
    regulatoryCompliance: "Kubahiriza amategeko",
    regulatoryComplianceDesc: "Kuyobora mu mutekano w'ibiryo n'ibisabwa n'amategeko",
    complianceDescription: "Kuyobora mu mutekano w'ibiryo n'ibisabwa n'amategeko",
    
    // F&B Features
    marketResearch: "Ubushakashatsi bw'isoko",
    businessPlanning: "Gutegura ubucuruzi",
    strategyDevelopment: "Strategy development",
    marketSizing: "Gupima isoko",
    competitorAnalysis: "Isesengura ry'abanywanyi",
    trendIdentification: "Trend identification",
    recipeDevelopment: "Guteza imbere uburyo bwo guteka",
    productTesting: "Gupima ibicuruzwa",
    safetyStandards: "Ibipimo by'umutekano",
    certificationSupport: "Ubufasha bw'icyemezo",
    complianceAudits: "Compliance audits",
    
    // Common
    startYourJourney: "Tangira urugendo rwawe",
    backToHome: "Garuka ku ntangiriro",
    bookConsultation: "Andika inama",
    getQuote: "Saba igiciro",
    scheduleConsultation: "Tegura inama",
    
    // About
    aboutTitle: "Ibibazo byacu",
    aboutDescription: "Menya intego zacu n'ubuhanga bwacu",
    aboutUs: "About Us",
    
    // Contact
    contactTitle: "Twandikire",
    contactDescription: "Mana n'itsinda ryacu",
    readyToTakeNextStep: "Prêt à prendre le prochain pas?",
    sendUsMessage: "Envoyez-nous un message",
    fillFormBelow: "Remplissez le formulaire ci-dessous et nous vous répondrons dans 24 heures.",
    yourName: "Votre nom",
    yourEmail: "Votre adresse e-mail",
    selectService: "Sélectionnez le service",
    generalInquiry: "Demande générale",
    studyAbroadRelocation: "Études à l'étranger et déplacement",
    fbConsultingService: "F&B Consulting",
    bothServices: "Les deux services",
    message: "Message",
    tellUsAboutGoals: "Dites-nous vos objectifs et comment nous pouvons vous aider",
    sendMessage: "Envoyer le message",
    quickContact: "Contact rapide",
    email: "Email",
    phoneKorea: "Téléphone (Corée)",
    whatsapp: "WhatsApp",
    bookAConsultation: "Réserver une consultation",
    scheduleFreeConsultation: "Réserver une consultation gratuite pour discuter de vos objectifs",
    officeHours: "Heures d'ouverture",
    mondayFriday: "Lundi à vendredi: 9h00 - 18h00 (KST)",
    saturday: "Samedi: 10h00 - 14h00 (KST)",
    sunday: "Dimanche",
    closed: "Fermé",
    location: "Seoul, Corée du Sud",
    
    // Testimonials
    testimonialsTitle: "Inkuru z'intsinzi",
    
    // Blog
    blogTitle: "Ibikoresho biheruka",
    blogDescription: "Komeza wibwirizwa n'ibitekerezo bishya",
    readMore: "Soma byinshi",
    latest: "Dernières",
    resourcesDescription: "Guides et informations essentielles pour votre voyage",
    viewAllResources: "Voir toutes les ressources",
    blogPost1Title: "Guide complet des bourses coréennes",
    blogPost1Excerpt: "Tout ce que vous devez savoir sur les bourses coréennes et comment les postuler.",
    blogPost2Title: "Démarrer votre entreprise alimentaire en Corée",
    blogPost2Excerpt: "Guide étape par étape pour lancer votre entreprise alimentaire au marché coréen.",
    blogPost3Title: "Conseils pour réussir le test TOPIK",
    blogPost3Excerpt: "Stratégies expertes pour réussir votre test de langue coréenne.",
    education: "Éducation",
    business: "Buisson",
    scholarships: "Bourses",
    
    // Newsletter
    newsletterTitle: "Komeza wibwirizwa",
    newsletterDescription: "Bonera amakuru mashya n'amahirwe",
    subscribe: "Kwiyandikisha",
    enterEmailAddress: "Injiza aderesi ya imeri yawe",
    newsletterThankYou: "Merci d'avoir souscrit!",
    
    // Footer
    quickLinks: "Ihuza ryihuse",
    followUs: "Dukurikire",
    footerDescription: "Votre partenaire de confiance pour l'éducation coréenne et le succès F&B",
    resourcesBlog: "Ressources & Blog",
    visitsHelp: "Visa & Aide",
    legal: "Loi",
    contactInfo: "Informations de contact",
    allRightsReserved: "Tous droits réservés.",
    
    // Partners
    ourTrustedPartners: "Nos partenaires de confiance",
    partnerDescription: "Collaboration avec des institutions et des organisations leaders",
    
    // Legal pages
    privacyPolicy: "Politiki y'ibanga",
    termsOfService: "Amabwiriza ya serivisi",
    sitemap: "Ikarita y'urubuga",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "Programmer une consultation gratuite de 15 minutes"
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const currentTranslations = translations[language as keyof typeof translations] || translations.EN;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
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
