
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
  exploreStudyPrograms: string;
  studentsAssisted: string;
  countriesReached: string;
  foodScienceExpert: string;

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
  scholarshipDescription: string;
  scholarshipSearch: string;
  applicationAssistance: string;
  documentPreparation: string;
  universityDescription: string;
  universitySelection: string;
  applicationReview: string;
  interviewPreparation: string;
  visaDescription: string;
  applicationFiling: string;
  interviewCoaching: string;
  languageDescription: string;
  topikPreparation: string;
  conversationPractice: string;
  culturalOrientation: string;
  businessDescription: string;
  marketResearch: string;
  businessPlanning: string;
  strategyDevelopment: string;
  marketAnalysisDescription: string;
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
  ourServices: string;
  servicesDescription: string;
  startYourJourney: string;
  getExpertConsultation: string;
  letsStartYourJourney: string;
  journeyDescription: string;
  getFullConsultation: string;
  viewAllPackagesPricing: string;

  // Blog & Resources
  blogPost1Title: string;
  blogPost1Excerpt: string;
  blogPost2Title: string;
  blogPost2Excerpt: string;
  blogPost3Title: string;
  blogPost3Excerpt: string;
  education: string;
  business: string;
  scholarships: string;
  latest: string;
  resourcesDescription: string;
  readMore: string;
  viewAllResources: string;

  // Footer
  footerDescription: string;
  quickLinks: string;
  aboutUs: string;
  resourcesBlog: string;
  legal: string;
  contactInfo: string;
  allRightsReserved: string;

  // Newsletter
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterThankYou: string;
  enterEmailAddress: string;
  subscribe: string;

  // Partners
  ourTrustedPartners: string;
  partnerDescription: string;

  // Testimonials
  successStories: string;
  testimonialSubtitle: string;

  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: string;

  // About Advisor Page
  backToHome: string;
  advisorName: string;
  advisorTitle: string;
  professionalSummary: string;
  educationExpertise: string;
  koreanGovernmentScholarshipProgram: string;

  // Privacy & Terms
  privacyPolicyDescription: string;
  termsOfServiceDescription: string;
  privacyPolicy: string;
  termsOfService: string;
  sitemap: string;
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
  exploreStudyPrograms: "Explore Study Programs",
  studentsAssisted: "Students Assisted",
  countriesReached: "Countries Reached",
  foodScienceExpert: "Food Science Expert",

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
  scholarshipDescription: "Comprehensive scholarship search and application support",
  scholarshipSearch: "Scholarship Search",
  applicationAssistance: "Application Assistance",
  documentPreparation: "Document Preparation",
  universityDescription: "Complete university admission guidance",
  universitySelection: "University Selection",
  applicationReview: "Application Review",
  interviewPreparation: "Interview Preparation",
  visaDescription: "Complete visa application support",
  applicationFiling: "Application Filing",
  interviewCoaching: "Interview Coaching",
  languageDescription: "Korean language training and cultural preparation",
  topikPreparation: "TOPIK Preparation",
  conversationPractice: "Conversation Practice",
  culturalOrientation: "Cultural Orientation",
  businessDescription: "Strategic business consultation services",
  marketResearch: "Market Research",
  businessPlanning: "Business Planning",
  strategyDevelopment: "Strategy Development",
  marketAnalysisDescription: "Comprehensive market analysis and insights",
  marketSizing: "Market Sizing",
  competitorAnalysis: "Competitor Analysis",
  trendIdentification: "Trend Identification",
  productDescription: "Product development and innovation support",
  recipeDevelopment: "Recipe Development",
  productTesting: "Product Testing",
  complianceDescription: "Regulatory compliance and certification support",
  safetyStandards: "Safety Standards",
  certificationSupport: "Certification Support",
  complianceAudits: "Compliance Audits",
  ourServices: "Our Services",
  servicesDescription: "Comprehensive solutions for your global success",
  startYourJourney: "Start Your Journey",
  getExpertConsultation: "Get Expert Consultation",
  letsStartYourJourney: "Let's Start Your Journey",
  journeyDescription: "Ready to transform your dreams into reality?",
  getFullConsultation: "Get Full Consultation",
  viewAllPackagesPricing: "View All Packages & Pricing",

  // Blog & Resources
  blogPost1Title: "Complete Guide to Korean Universities",
  blogPost1Excerpt: "Everything you need to know about studying in Korea's top universities",
  blogPost2Title: "F&B Business Success in Asia",
  blogPost2Excerpt: "Strategies for expanding your food business in Asian markets",
  blogPost3Title: "Scholarship Opportunities 2024",
  blogPost3Excerpt: "Latest scholarship programs and application tips",
  education: "Education",
  business: "Business",
  scholarships: "Scholarships",
  latest: "Latest",
  resourcesDescription: "Stay updated with the latest insights and guides",
  readMore: "Read More",
  viewAllResources: "View All Resources",

  // Footer
  footerDescription: "Your trusted partner for global education and business success",
  quickLinks: "Quick Links",
  aboutUs: "About Us",
  resourcesBlog: "Resources & Blog",
  legal: "Legal",
  contactInfo: "Contact Info",
  allRightsReserved: "All rights reserved.",

  // Newsletter
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Get the latest updates on scholarships, programs, and business opportunities",
  newsletterThankYou: "Thank you for subscribing!",
  enterEmailAddress: "Enter your email address",
  subscribe: "Subscribe",

  // Partners
  ourTrustedPartners: "Our Trusted Partners",
  partnerDescription: "Working with leading institutions worldwide",

  // Testimonials
  successStories: "Success Stories",
  testimonialSubtitle: "What our clients say about their journey with us",

  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: "Schedule Free 15-min Consultation",

  // About Advisor Page
  backToHome: "Back to Home",
  advisorName: "Kunda Pathways Team",
  advisorTitle: "International Education & F&B Experts",
  professionalSummary: "Professional Summary",
  educationExpertise: "Education Expertise",
  koreanGovernmentScholarshipProgram: "Korean Government Scholarship Program",

  // Privacy & Terms
  privacyPolicyDescription: "Our privacy policy and data protection practices",
  termsOfServiceDescription: "Terms and conditions for using our services",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  sitemap: "Sitemap",
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
  exploreStudyPrograms: "학습 프로그램 탐색",
  studentsAssisted: "지원한 학생",
  countriesReached: "도달한 국가",
  foodScienceExpert: "식품과학 전문가",

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
  scholarshipDescription: "포괄적인 장학금 검색 및 신청 지원",
  scholarshipSearch: "장학금 검색",
  applicationAssistance: "지원 도움",
  documentPreparation: "서류 준비",
  universityDescription: "완전한 대학 입학 지도",
  universitySelection: "대학 선택",
  applicationReview: "지원서 검토",
  interviewPreparation: "면접 준비",
  visaDescription: "완전한 비자 신청 지원",
  applicationFiling: "신청서 제출",
  interviewCoaching: "면접 코칭",
  languageDescription: "한국어 교육 및 문화 준비",
  topikPreparation: "TOPIK 준비",
  conversationPractice: "회화 연습",
  culturalOrientation: "문화 적응",
  businessDescription: "전략적 비즈니스 컨설팅 서비스",
  marketResearch: "시장 조사",
  businessPlanning: "사업 계획",
  strategyDevelopment: "전략 개발",
  marketAnalysisDescription: "포괄적인 시장 분석 및 통찰",
  marketSizing: "시장 규모 조사",
  competitorAnalysis: "경쟁사 분석",
  trendIdentification: "트렌드 식별",
  productDescription: "제품 개발 및 혁신 지원",
  recipeDevelopment: "레시피 개발",
  productTesting: "제품 테스트",
  complianceDescription: "규제 준수 및 인증 지원",
  safetyStandards: "안전 기준",
  certificationSupport: "인증 지원",
  complianceAudits: "규정 준수 감사",
  ourServices: "우리의 서비스",
  servicesDescription: "글로벌 성공을 위한 종합 솔루션",
  startYourJourney: "여정 시작하기",
  getExpertConsultation: "전문가 상담 받기",
  letsStartYourJourney: "여정을 시작해봅시다",
  journeyDescription: "꿈을 현실로 만들 준비가 되셨나요?",
  getFullConsultation: "전체 상담 받기",
  viewAllPackagesPricing: "모든 패키지 및 가격 보기",

  // Blog & Resources
  blogPost1Title: "한국 대학교 완전 가이드",
  blogPost1Excerpt: "한국 최고 대학교 유학에 대해 알아야 할 모든 것",
  blogPost2Title: "아시아 식음료 사업 성공",
  blogPost2Excerpt: "아시아 시장에서 식음료 사업 확장 전략",
  blogPost3Title: "2024년 장학금 기회",
  blogPost3Excerpt: "최신 장학금 프로그램 및 지원 팁",
  education: "교육",
  business: "비즈니스",
  scholarships: "장학금",
  latest: "최신",
  resourcesDescription: "최신 통찰력과 가이드로 업데이트하세요",
  readMore: "더 읽기",
  viewAllResources: "모든 자료 보기",

  // Footer
  footerDescription: "글로벌 교육 및 비즈니스 성공을 위한 신뢰할 수 있는 파트너",
  quickLinks: "빠른 링크",
  aboutUs: "회사 소개",
  resourcesBlog: "자료 및 블로그",
  legal: "법적 정보",
  contactInfo: "연락처 정보",
  allRightsReserved: "모든 권리 보유.",

  // Newsletter
  newsletterTitle: "업데이트 받기",
  newsletterDescription: "장학금, 프로그램, 비즈니스 기회에 대한 최신 업데이트 받기",
  newsletterThankYou: "구독해 주셔서 감사합니다!",
  enterEmailAddress: "이메일 주소 입력",
  subscribe: "구독",

  // Partners
  ourTrustedPartners: "신뢰할 수 있는 파트너",
  partnerDescription: "전 세계 주요 기관과 협력",

  // Testimonials
  successStories: "성공 사례",
  testimonialSubtitle: "고객들이 우리와의 여정에 대해 말하는 것",

  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: "무료 15분 상담 예약",

  // About Advisor Page
  backToHome: "홈으로 돌아가기",
  advisorName: "쿤다 패스웨이즈 팀",
  advisorTitle: "국제 교육 및 식음료 전문가",
  professionalSummary: "전문가 요약",
  educationExpertise: "교육 전문성",
  koreanGovernmentScholarshipProgram: "한국 정부 장학금 프로그램",

  // Privacy & Terms
  privacyPolicyDescription: "개인정보 보호정책 및 데이터 보호 관행",
  termsOfServiceDescription: "서비스 이용 약관",
  privacyPolicy: "개인정보 보호정책",
  termsOfService: "서비스 이용약관",
  sitemap: "사이트맵",
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
  exploreStudyPrograms: "Explorer les programmes d'études",
  studentsAssisted: "Étudiants aidés",
  countriesReached: "Pays atteints",
  foodScienceExpert: "Expert en science alimentaire",

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
  scholarshipDescription: "Recherche complète de bourses et soutien aux candidatures",
  scholarshipSearch: "Recherche de bourses",
  applicationAssistance: "Assistance aux candidatures",
  documentPreparation: "Préparation de documents",
  universityDescription: "Guide complet d'admission universitaire",
  universitySelection: "Sélection d'université",
  applicationReview: "Révision de candidature",
  interviewPreparation: "Préparation d'entretien",
  visaDescription: "Support complet pour demande de visa",
  applicationFiling: "Dépôt de candidature",
  interviewCoaching: "Coaching d'entretien",
  languageDescription: "Formation en coréen et préparation culturelle",
  topikPreparation: "Préparation TOPIK",
  conversationPractice: "Pratique de conversation",
  culturalOrientation: "Orientation culturelle",
  businessDescription: "Services de consultation d'affaires stratégiques",
  marketResearch: "Recherche de marché",
  businessPlanning: "Planification d'affaires",
  strategyDevelopment: "Développement de stratégie",
  marketAnalysisDescription: "Analyse de marché complète et insights",
  marketSizing: "Dimensionnement du marché",
  competitorAnalysis: "Analyse de concurrents",
  trendIdentification: "Identification de tendances",
  productDescription: "Support de développement et d'innovation de produits",
  recipeDevelopment: "Développement de recettes",
  productTesting: "Test de produits",
  complianceDescription: "Support de conformité réglementaire et certification",
  safetyStandards: "Normes de sécurité",
  certificationSupport: "Support de certification",
  complianceAudits: "Audits de conformité",
  ourServices: "Nos services",
  servicesDescription: "Solutions complètes pour votre succès mondial",
  startYourJourney: "Commencez votre parcours",
  getExpertConsultation: "Obtenez une consultation d'expert",
  letsStartYourJourney: "Commençons votre parcours",
  journeyDescription: "Prêt à transformer vos rêves en réalité ?",
  getFullConsultation: "Obtenez une consultation complète",
  viewAllPackagesPricing: "Voir tous les forfaits et tarifs",

  // Blog & Resources
  blogPost1Title: "Guide complet des universités coréennes",
  blogPost1Excerpt: "Tout ce que vous devez savoir sur les études dans les meilleures universités de Corée",
  blogPost2Title: "Succès des entreprises F&B en Asie",
  blogPost2Excerpt: "Stratégies pour développer votre entreprise alimentaire sur les marchés asiatiques",
  blogPost3Title: "Opportunités de bourses 2024",
  blogPost3Excerpt: "Derniers programmes de bourses et conseils de candidature",
  education: "Éducation",
  business: "Affaires",
  scholarships: "Bourses",
  latest: "Dernières",
  resourcesDescription: "Restez à jour avec les derniers insights et guides",
  readMore: "Lire plus",
  viewAllResources: "Voir toutes les ressources",

  // Footer
  footerDescription: "Votre partenaire de confiance pour le succès éducatif et commercial mondial",
  quickLinks: "Liens rapides",
  aboutUs: "À propos de nous",
  resourcesBlog: "Ressources et blog",
  legal: "Légal",
  contactInfo: "Informations de contact",
  allRightsReserved: "Tous droits réservés.",

  // Newsletter
  newsletterTitle: "Restez informé",
  newsletterDescription: "Obtenez les dernières mises à jour sur les bourses, programmes et opportunités d'affaires",
  newsletterThankYou: "Merci de vous être abonné !",
  enterEmailAddress: "Entrez votre adresse email",
  subscribe: "S'abonner",

  // Partners
  ourTrustedPartners: "Nos partenaires de confiance",
  partnerDescription: "Travaillant avec les principales institutions du monde entier",

  // Testimonials
  successStories: "Histoires de succès",
  testimonialSubtitle: "Ce que nos clients disent de leur parcours avec nous",

  // WhatsApp Consultation
  scheduleFreeFifteenMinuteConsultation: "Planifier consultation gratuite 15min",

  // About Advisor Page
  backToHome: "Retour à l'accueil",
  advisorName: "Équipe Kunda Pathways",
  advisorTitle: "Experts en éducation internationale et F&B",
  professionalSummary: "Résumé professionnel",
  educationExpertise: "Expertise en éducation",
  koreanGovernmentScholarshipProgram: "Programme de bourses du gouvernement coréen",

  // Privacy & Terms
  privacyPolicyDescription: "Notre politique de confidentialité et nos pratiques de protection des données",
  termsOfServiceDescription: "Conditions générales d'utilisation de nos services",
  privacyPolicy: "Politique de confidentialité",
  termsOfService: "Conditions de service",
  sitemap: "Plan du site",
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
