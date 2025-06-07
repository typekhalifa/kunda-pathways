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
  universityAdmissionStrategies: string;
  visaApplicationGuidance: string;
  koreanLanguagePreparation: string;
  culturalAdaptationSupport: string;
  fbExpertise: string;
  marketAnalysisEntryStrategies: string;
  productDevelopmentInnovation: string;
  businessPlanningFunding: string;
  keyAchievements: string;
  getInTouch: string;
  officeHours: string;
  mondayToFriday: string;
  saturdaySunday: string;
  koreanTime: string;
  myMission: string;
  missionStatement: string;

  // Book Consultation
  hotelBooking: string;
  phoneConsultation: string;
  reviewConsultation: string;
  consultationDetails: string;
  fullName: string;
  email: string;
  selectedService: string;
  totalPrice: string;
  paymentMethods: string;
  payWithCard: string;
  payWithMobile: string;
  payWithBank: string;
  backToEdit: string;
  phone: string;
  selectService: string;
  preferredDate: string;
  preferredTime: string;
  reviewConsultationRequest: string;

  // Privacy Policy
  privacyPolicyTitle: string;
  privacyPolicySubtitle: string;
  informationWeCollect: string;
  privacyCollectDescription: string;
  personalIdentificationInfo: string;
  educationalBackground: string;
  professionalExperience: string;
  communicationPreferences: string;
  howWeUseYourInfo: string;
  privacyUseDescription: string;
  providePersonalizedServices: string;
  processScholarshipApplications: string;
  sendRelevantUpdates: string;
  improveServices: string;
  complyLegalObligations: string;
  dataSecurity: string;
  dataSecurityDescription: string;
  encryptedDataTransmission: string;
  regularSecurityAudits: string;
  accessControls: string;
  employeeTraining: string;
  informationSharing: string;
  privacySharingDescription: string;
  educationalInstitutions: string;
  governmentAgencies: string;
  trustedServiceProviders: string;
  legalAuthorities: string;
  neverSellPersonalInfo: string;
  yourRights: string;
  yourRightsDescription: string;
  accessReviewPersonalInfo: string;
  requestCorrections: string;
  requestDeletion: string;
  optOutMarketing: string;
  dataPortability: string;
  lastUpdatedMarch2024: string;
  questionsContact: string;

  // Resources
  eightMinRead: string;
  march152024: string;
  twelveMinRead: string;
  march102024: string;
  sixMinRead: string;
  march52024: string;
  visaApplicationProcess: string;
  visaApplicationExcerpt: string;
  tenMinRead: string;
  february282024: string;
  foodSafetyRegulations: string;
  foodSafetyExcerpt: string;
  fifteenMinRead: string;
  february202024: string;
  culturalAdaptationGuide: string;
  culturalAdaptationExcerpt: string;
  sevenMinRead: string;
  february152024: string;
  johnDoe: string;

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
  universityAdmissionStrategies: "University admission strategies",
  visaApplicationGuidance: "Visa application guidance",
  koreanLanguagePreparation: "Korean language preparation",
  culturalAdaptationSupport: "Cultural adaptation support",
  fbExpertise: "F&B Expertise",
  marketAnalysisEntryStrategies: "Market analysis & entry strategies",
  productDevelopmentInnovation: "Product development & innovation",
  businessPlanningFunding: "Business planning & funding",
  keyAchievements: "Key Achievements",
  getInTouch: "Get in Touch",
  officeHours: "Office Hours",
  mondayToFriday: "Monday to Friday",
  saturdaySunday: "Saturday & Sunday",
  koreanTime: "Korean Standard Time",
  myMission: "My Mission",
  missionStatement: "To bridge cultures and create opportunities by guiding students towards world-class education in Korea and helping entrepreneurs build successful food businesses that connect global markets.",

  // Book Consultation
  hotelBooking: "Hotel Booking Assistance",
  phoneConsultation: "Phone Consultation",
  reviewConsultation: "Review Your Consultation Request",
  consultationDetails: "Consultation Details",
  fullName: "Full Name",
  email: "Email",
  selectedService: "Selected Service",
  totalPrice: "Total Price",
  paymentMethods: "Payment Methods",
  payWithCard: "Pay with Credit/Debit Card",
  payWithMobile: "Pay with Mobile Money",
  payWithBank: "Pay with Bank Transfer",
  backToEdit: "Back to Edit Details",
  phone: "Phone Number",
  selectService: "Select Service",
  preferredDate: "Preferred Date",
  preferredTime: "Preferred Time",
  reviewConsultationRequest: "Review Consultation Request",

  // Privacy Policy
  privacyPolicyTitle: "Privacy Policy",
  privacyPolicySubtitle: "Your privacy is our priority. Learn how we protect and handle your information.",
  informationWeCollect: "Information We Collect",
  privacyCollectDescription: "We collect information that you provide directly to us, such as:",
  personalIdentificationInfo: "Personal identification information (name, email address, phone number)",
  educationalBackground: "Educational background and academic records",
  professionalExperience: "Professional experience and business interests",
  communicationPreferences: "Communication preferences and feedback",
  howWeUseYourInfo: "How We Use Your Information",
  privacyUseDescription: "We use the information we collect to:",
  providePersonalizedServices: "Provide personalized educational and business consulting services",
  processScholarshipApplications: "Process scholarship applications and university admissions",
  sendRelevantUpdates: "Send you relevant updates about programs and opportunities",
  improveServices: "Improve our services and user experience",
  complyLegalObligations: "Comply with legal obligations and protect our rights",
  dataSecurity: "Data Security",
  dataSecurityDescription: "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:",
  encryptedDataTransmission: "Encrypted data transmission and storage",
  regularSecurityAudits: "Regular security audits and assessments",
  accessControls: "Access controls and authentication procedures",
  employeeTraining: "Employee training on data protection practices",
  informationSharing: "Information Sharing",
  privacySharingDescription: "We may share your information with:",
  educationalInstitutions: "Educational institutions for application processing",
  governmentAgencies: "Government agencies for visa and scholarship applications",
  trustedServiceProviders: "Trusted service providers who assist in our operations",
  legalAuthorities: "Legal authorities when required by law",
  neverSellPersonalInfo: "We never sell your personal information to third parties.",
  yourRights: "Your Rights",
  yourRightsDescription: "You have the right to:",
  accessReviewPersonalInfo: "Access and review your personal information",
  requestCorrections: "Request corrections to inaccurate data",
  requestDeletion: "Request deletion of your information",
  optOutMarketing: "Opt-out of marketing communications",
  dataPortability: "Data portability and transfer",
  lastUpdatedMarch2024: "Last updated: March 2024",
  questionsContact: "Questions? Contact us at privacy@kundapathways.com",

  // Resources
  eightMinRead: "8 min read",
  march152024: "March 15, 2024",
  twelveMinRead: "12 min read",
  march102024: "March 10, 2024",
  sixMinRead: "6 min read",
  march52024: "March 5, 2024",
  visaApplicationProcess: "Visa Application Process for Korean Universities",
  visaApplicationExcerpt: "Step-by-step guide to successfully obtaining your student visa for Korea...",
  tenMinRead: "10 min read",
  february282024: "February 28, 2024",
  foodSafetyRegulations: "Food Safety Regulations in Asian Markets",
  foodSafetyExcerpt: "Understanding compliance requirements for F&B businesses expanding into Asia...",
  fifteenMinRead: "15 min read",
  february202024: "February 20, 2024",
  culturalAdaptationGuide: "Cultural Adaptation Guide for International Students",
  culturalAdaptationExcerpt: "Essential tips for adapting to Korean culture and academic environment...",
  sevenMinRead: "7 min read",
  february152024: "February 15, 2024",
  johnDoe: "John Doe",

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
  universityAdmissionStrategies: "대학 입학 전략",
  visaApplicationGuidance: "비자 신청 지도",
  koreanLanguagePreparation: "한국어 준비",
  culturalAdaptationSupport: "문화 적응 지원",
  fbExpertise: "식음료 전문성",
  marketAnalysisEntryStrategies: "시장 분석 및 진출 전략",
  productDevelopmentInnovation: "제품 개발 및 혁신",
  businessPlanningFunding: "사업 계획 및 자금 조달",
  keyAchievements: "주요 성과",
  getInTouch: "연락하기",
  officeHours: "운영 시간",
  mondayToFriday: "월요일부터 금요일까지",
  saturdaySunday: "토요일 및 일요일",
  koreanTime: "한국 표준시",
  myMission: "나의 사명",
  missionStatement: "문화를 연결하고 학생들을 한국의 세계적 교육으로 안내하며 기업가들이 글로벌 시장을 연결하는 성공적인 식품 사업을 구축하도록 돕는 기회를 창출하는 것입니다.",

  // Book Consultation
  hotelBooking: "호텔 예약 지원",
  phoneConsultation: "전화 상담",
  reviewConsultation: "상담 요청 검토",
  consultationDetails: "상담 세부 사항",
  fullName: "성명",
  email: "이메일",
  selectedService: "선택된 서비스",
  totalPrice: "총 가격",
  paymentMethods: "결제 방법",
  payWithCard: "카드로 결제",
  payWithMobile: "모바일로 결제",
  payWithBank: "은행 송금으로 결제",
  backToEdit: "세부 사항 편집으로 돌아가기",
  phone: "전화번호",
  selectService: "서비스 선택",
  preferredDate: "선호 날짜",
  preferredTime: "선호 시간",
  reviewConsultationRequest: "상담 요청 검토",

  // Privacy Policy
  privacyPolicyTitle: "개인정보 보호정책",
  privacyPolicySubtitle: "귀하의 개인정보 보호가 우리의 우선순위입니다. 우리가 귀하의 정보를 어떻게 보호하고 처리하는지 알아보세요.",
  informationWeCollect: "수집하는 정보",
  privacyCollectDescription: "다음과 같이 귀하가 직접 제공하는 정보를 수집합니다:",
  personalIdentificationInfo: "개인 식별 정보 (이름, 이메일 주소, 전화번호)",
  educationalBackground: "교육 배경 및 학업 기록",
  professionalExperience: "전문 경험 및 비즈니스 관심사",
  communicationPreferences: "커뮤니케이션 선호도 및 피드백",
  howWeUseYourInfo: "정보 사용 방법",
  privacyUseDescription: "수집한 정보를 다음과 같이 사용합니다:",
  providePersonalizedServices: "개인화된 교육 및 비즈니스 컨설팅 서비스 제공",
  processScholarshipApplications: "장학금 신청 및 대학 입학 처리",
  sendRelevantUpdates: "프로그램 및 기회에 대한 관련 업데이트 전송",
  improveServices: "서비스 및 사용자 경험 개선",
  complyLegalObligations: "법적 의무 준수 및 권리 보호",
  dataSecurity: "데이터 보안",
  dataSecurityDescription: "무단 액세스, 변경, 공개 또는 파괴로부터 개인정보를 보호하기 위해 업계 표준 보안 조치를 구현합니다. 여기에는 다음이 포함됩니다:",
  encryptedDataTransmission: "암호화된 데이터 전송 및 저장",
  regularSecurityAudits: "정기적인 보안 감사 및 평가",
  accessControls: "액세스 제어 및 인증 절차",
  employeeTraining: "데이터 보호 관행에 대한 직원 교육",
  informationSharing: "정보 공유",
  privacySharingDescription: "다음과 같은 경우 귀하의 정보를 공유할 수 있습니다:",
  educationalInstitutions: "신청 처리를 위한 교육 기관",
  governmentAgencies: "비자 및 장학금 신청을 위한 정부 기관",
  trustedServiceProviders: "운영을 지원하는 신뢰할 수 있는 서비스 제공업체",
  legalAuthorities: "법률에 의해 요구되는 경우 법적 당국",
  neverSellPersonalInfo: "우리는 개인정보를 제3자에게 판매하지 않습니다.",
  yourRights: "귀하의 권리",
  yourRightsDescription: "다음과 같은 권리가 있습니다:",
  accessReviewPersonalInfo: "개인정보에 액세스하고 검토",
  requestCorrections: "부정확한 데이터의 수정 요청",
  requestDeletion: "정보 삭제 요청",
  optOutMarketing: "마케팅 커뮤니케이션 거부",
  dataPortability: "데이터 이동성 및 전송",
  lastUpdatedMarch2024: "최종 업데이트: 2024년 3월",
  questionsContact: "문의사항이 있으시면 privacy@kundapathways.com으로 연락하세요",

  // Resources
  eightMinRead: "8분 읽기",
  march152024: "2024년 3월 15일",
  twelveMinRead: "12분 읽기",
  march102024: "2024년 3월 10일",
  sixMinRead: "6분 읽기",
  march52024: "2024년 3월 5일",
  visaApplicationProcess: "한국 대학 비자 신청 절차",
  visaApplicationExcerpt: "한국 학생 비자를 성공적으로 취득하기 위한 단계별 가이드...",
  tenMinRead: "10분 읽기",
  february282024: "2024년 2월 28일",
  foodSafetyRegulations: "아시아 시장의 식품 안전 규정",
  foodSafetyExcerpt: "아시아로 확장하는 식음료 사업의 규정 준수 요구 사항 이해...",
  fifteenMinRead: "15분 읽기",
  february202024: "2024년 2월 20일",
  culturalAdaptationGuide: "국제 학생을 위한 문화 적응 가이드",
  culturalAdaptationExcerpt: "한국 문화와 학업 환경에 적응하기 위한 필수 팁...",
  sevenMinRead: "7분 읽기",
  february152024: "2024년 2월 15일",
  johnDoe: "홍길동",

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
  universityAdmissionStrategies: "Stratégies d'admission universitaire",
  visaApplicationGuidance: "Guide de demande de visa",
  koreanLanguagePreparation: "Préparation à la langue coréenne",
  culturalAdaptationSupport: "Support d'adaptation culturelle",
  fbExpertise: "Expertise F&B",
  marketAnalysisEntryStrategies: "Analyse de marché et stratégies d'entrée",
  productDevelopmentInnovation: "Développement de produits et innovation",
  businessPlanningFunding: "Planification d'affaires et financement",
  keyAchievements: "Réalisations clés",
  getInTouch: "Entrer en contact",
  officeHours: "Heures de bureau",
  mondayToFriday: "Lundi au vendredi",
  saturdaySunday: "Samedi et dimanche",
  koreanTime: "Heure standard coréenne",
  myMission: "Ma mission",
  missionStatement: "Créer des ponts entre les cultures et créer des opportunités en guidant les étudiants vers une éducation de classe mondiale en Corée et en aidant les entrepreneurs à construire des entreprises alimentaires prospères qui connectent les marchés mondiaux.",

  // Book Consultation
  hotelBooking: "Assistance réservation d'hôtel",
  phoneConsultation: "Consultation téléphonique",
  reviewConsultation: "Réviser votre demande de consultation",
  consultationDetails: "Détails de la consultation",
  fullName: "Nom complet",
  email: "Email",
  selectedService: "Service sélectionné",
  totalPrice: "Prix total",
  paymentMethods: "Méthodes de paiement",
  payWithCard: "Payer par carte de crédit/débit",
  payWithMobile: "Payer par mobile money",
  payWithBank: "Payer par virement bancaire",
  backToEdit: "Retour pour modifier les détails",
  phone: "Numéro de téléphone",
  selectService: "Sélectionner un service",
  preferredDate: "Date préférée",
  preferredTime: "Heure préférée",
  reviewConsultationRequest: "Réviser la demande de consultation",

  // Privacy Policy
  privacyPolicyTitle: "Politique de confidentialité",
  privacyPolicySubtitle: "Votre confidentialité est notre priorité. Découvrez comment nous protégeons et gérons vos informations.",
  informationWeCollect: "Informations que nous collectons",
  privacyCollectDescription: "Nous collectons les informations que vous nous fournissez directement, telles que :",
  personalIdentificationInfo: "Informations d'identification personnelle (nom, adresse e-mail, numéro de téléphone)",
  educationalBackground: "Contexte éducatif et dossiers académiques",
  professionalExperience: "Expérience professionnelle et intérêts commerciaux",
  communicationPreferences: "Préférences de communication et commentaires",
  howWeUseYourInfo: "Comment nous utilisons vos informations",
  privacyUseDescription: "Nous utilisons les informations que nous collectons pour :",
  providePersonalizedServices: "Fournir des services de conseil éducatif et commercial personnalisés",
  processScholarshipApplications: "Traiter les demandes de bourses et d'admissions universitaires",
  sendRelevantUpdates: "Vous envoyer des mises à jour pertinentes sur les programmes et opportunités",
  improveServices: "Améliorer nos services et l'expérience utilisateur",
  complyLegalObligations: "Respecter les obligations légales et protéger nos droits",
  dataSecurity: "Sécurité des données",
  dataSecurityDescription: "Nous mettons en place des mesures de sécurité standard de l'industrie pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Cela inclut :",
  encryptedDataTransmission: "Transmission et stockage de données cryptées",
  regularSecurityAudits: "Audits et évaluations de sécurité réguliers",
  accessControls: "Contrôles d'accès et procédures d'authentification",
  employeeTraining: "Formation des employés sur les pratiques de protection des données",
  informationSharing: "Partage d'informations",
  privacySharingDescription: "Nous pouvons partager vos informations avec :",
  educationalInstitutions: "Institutions éducatives pour le traitement des candidatures",
  governmentAgencies: "Agences gouvernementales pour les demandes de visa et de bourses",
  trustedServiceProviders: "Fournisseurs de services de confiance qui nous aident dans nos opérations",
  legalAuthorities: "Autorités légales lorsque requis par la loi",
  neverSellPersonalInfo: "Nous ne vendons jamais vos informations personnelles à des tiers.",
  yourRights: "Vos droits",
  yourRightsDescription: "Vous avez le droit de :",
  accessReviewPersonalInfo: "Accéder et réviser vos informations personnelles",
  requestCorrections: "Demander des corrections aux données inexactes",
  requestDeletion: "Demander la suppression de vos informations",
  optOutMarketing: "Vous désabonner des communications marketing",
  dataPortability: "Portabilité et transfert de données",
  lastUpdatedMarch2024: "Dernière mise à jour : Mars 2024",
  questionsContact: "Questions ? Contactez-nous à privacy@kundapathways.com",

  // Resources
  eightMinRead: "8 min de lecture",
  march152024: "15 mars 2024",
  twelveMinRead: "12 min de lecture",
  march102024: "10 mars 2024",
  sixMinRead: "6 min de lecture",
  march52024: "5 mars 2024",
  visaApplicationProcess: "Processus de demande de visa pour les universités coréennes",
  visaApplicationExcerpt: "Guide étape par étape pour obtenir avec succès votre visa étudiant pour la Corée...",
  tenMinRead: "10 min de lecture",
  february282024: "28 février 2024",
  foodSafetyRegulations: "Réglementations de sécurité alimentaire sur les marchés asiatiques",
  foodSafetyExcerpt: "Comprendre les exigences de conformité pour les entreprises F&B s'étendant en Asie...",
  fifteenMinRead: "15 min de lecture",
  february202024: "20 février 2024",
  culturalAdaptationGuide: "Guide d'adaptation culturelle pour les étudiants internationaux",
  culturalAdaptationExcerpt: "Conseils essentiels pour s'adapter à la culture coréenne et à l'environnement académique...",
  sevenMinRead: "7 min de lecture",
  february152024: "15 février 2024",
  johnDoe: "Jean Dupont",

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
