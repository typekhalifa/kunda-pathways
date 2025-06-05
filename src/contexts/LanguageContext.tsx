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
  marketAnalysisDescription: string;
  
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
  successStories: string;
  testimonialSubtitle: string;
  
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
  rightsDescription: string;
  accessYourData: string;
  correctInaccurateInfo: string;
  deleteYourData: string;
  optOutCommunications: string;
  contactUs: string;
  updatesToPolicy: string;
  updatesDescription: string;
  
  // Terms of Service
  termsOfServiceTitle: string;
  termsOfServiceSubtitle: string;
  acceptanceOfTerms: string;
  acceptanceDescription: string;
  servicesProvided: string;
  servicesDescription: string;
  userResponsibilities: string;
  responsibilitiesDescription: string;
  intellectualProperty: string;
  intellectualPropertyDescription: string;
  limitationOfLiability: string;
  liabilityDescription: string;
  terminationOfServices: string;
  terminationDescription: string;
  governingLaw: string;
  governingLawDescription: string;
  changesTerms: string;
  changesDescription: string;
  
  // About Advisor
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
  
  // Consultation Booking
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
    marketAnalysisDescription: "In-depth market analysis and competitive intelligence",
    
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
    successStories: "Success Stories",
    testimonialSubtitle: "Hear from our satisfied clients who achieved their dreams",
    
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
    privacyPolicyTitle: "Privacy Policy",
    privacyPolicySubtitle: "How we collect, use, and protect your information",
    informationWeCollect: "Information We Collect",
    privacyCollectDescription: "We collect information to provide better services to our users:",
    personalIdentificationInfo: "Personal identification information (name, email, phone)",
    educationalBackground: "Educational background and academic goals",
    professionalExperience: "Professional experience and career objectives",
    communicationPreferences: "Communication preferences and language choices",
    howWeUseYourInfo: "How We Use Your Information",
    privacyUseDescription: "We use the information we collect for the following purposes:",
    providePersonalizedServices: "Provide personalized educational and consulting services",
    processScholarshipApplications: "Process scholarship and university applications",
    sendRelevantUpdates: "Send relevant updates and opportunities",
    improveServices: "Improve our services and user experience",
    complyLegalObligations: "Comply with legal obligations and requirements",
    dataSecurity: "Data Security",
    dataSecurityDescription: "We implement robust security measures to protect your information:",
    encryptedDataTransmission: "Encrypted data transmission and storage",
    regularSecurityAudits: "Regular security audits and assessments",
    accessControls: "Strict access controls and authentication",
    employeeTraining: "Employee training on data protection practices",
    informationSharing: "Information Sharing",
    privacySharingDescription: "We may share your information with trusted partners only when necessary:",
    educationalInstitutions: "Educational institutions for application processing",
    governmentAgencies: "Government agencies for visa and permit applications",
    trustedServiceProviders: "Trusted service providers who assist in our operations",
    legalAuthorities: "Legal authorities when required by law",
    neverSellPersonalInfo: "We never sell your personal information to third parties.",
    yourRights: "Your Rights",
    rightsDescription: "You have the right to:",
    accessYourData: "Access your personal data",
    correctInaccurateInfo: "Correct inaccurate information",
    deleteYourData: "Delete your data",
    optOutCommunications: "Opt out of communications",
    contactUs: "Contact Us",
    updatesToPolicy: "Updates to This Policy",
    updatesDescription: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.",
    
    // Terms of Service
    termsOfServiceTitle: "Terms of Service",
    termsOfServiceSubtitle: "Terms and conditions for using our services",
    acceptanceOfTerms: "Acceptance of Terms",
    acceptanceDescription: "By using our services, you agree to these terms and conditions.",
    servicesProvided: "Services Provided",
    servicesDescription: "We provide educational consulting and F&B business consulting services.",
    userResponsibilities: "User Responsibilities",
    responsibilitiesDescription: "Users are responsible for providing accurate information and following our guidelines.",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyDescription: "All content and materials are protected by intellectual property laws.",
    limitationOfLiability: "Limitation of Liability",
    liabilityDescription: "Our liability is limited to the extent permitted by law.",
    terminationOfServices: "Termination of Services",
    terminationDescription: "We reserve the right to terminate services for violation of terms.",
    governingLaw: "Governing Law",
    governingLawDescription: "These terms are governed by the laws of South Korea.",
    changesTerms: "Changes to Terms",
    changesDescription: "We may update these terms from time to time.",
    
    // About Advisor
    professionalSummary: "Professional Summary",
    educationExpertise: "Education Expertise",
    koreanGovernmentScholarshipProgram: "Korean Government Scholarship Program guidance",
    universityAdmissionStrategies: "University admission strategies",
    visaApplicationGuidance: "Visa application guidance",
    koreanLanguagePreparation: "Korean language preparation",
    culturalAdaptationSupport: "Cultural adaptation support",
    fbExpertise: "F&B Expertise",
    marketAnalysisEntryStrategies: "Market analysis and entry strategies",
    productDevelopmentInnovation: "Product development and innovation",
    supplyChainOptimization: "Supply chain optimization",
    businessPlanningFunding: "Business planning and funding",
    keyAchievements: "Key Achievements",
    scholarshipSuccessRate: "95% scholarship success rate",
    getInTouch: "Get in Touch",
    mondayToFriday: "Monday to Friday",
    saturdaySunday: "Saturday & Sunday",
    koreanTime: "Korean Time (KST)",
    myMission: "My Mission",
    missionStatement: "To bridge the gap between African talent and Korean opportunities, creating pathways for educational and business success.",
    
    // Consultation Booking
    hotelBooking: "In-person consultation",
    phoneConsultation: "Phone consultation",
    reviewConsultation: "Review Consultation",
    consultationDetails: "Consultation Details",
    fullName: "Full Name",
    selectedService: "Selected Service",
    totalPrice: "Total Price",
    paymentMethods: "Payment Methods",
    payWithCard: "Pay with Card",
    payWithMobile: "Pay with Mobile Money",
    payWithBank: "Pay with Bank Transfer",
    backToEdit: "Back to Edit",
    phone: "Phone",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time",
    reviewConsultationRequest: "Review Consultation Request",
    
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
    marketAnalysisDescription: "심층 시장 분석 및 경쟁 정보",
    
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
    marketAnalysis: "시장 분석",
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
    trendIdentification: "트렌드 식별",
    recipeDevelopment: "레시피 개발",
    productTesting: "제품 테스트",
    safetyStandards: "안전 기준",
    certificationSupport: "인증 지원",
    complianceAudits: "규정 준수 감사",
    
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
    successStories: "성공 사례",
    testimonialSubtitle: "꿈을 실현한 만족한 고객들의 이야기를 들어보세요",
    
    // Blog and other translations...
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
    privacyPolicyTitle: "개인정보 보호정책",
    privacyPolicySubtitle: "우리가 귀하의 정보를 수집, 사용 및 보호하는 방법",
    informationWeCollect: "수집하는 정보",
    privacyCollectDescription: "더 나은 서비스를 제공하기 위해 정보를 수집합니다:",
    personalIdentificationInfo: "개인 식별 정보 (이름, 이메일, 전화번호)",
    educationalBackground: "교육 배경 및 학업 목표",
    professionalExperience: "전문 경험 및 경력 목표",
    communicationPreferences: "의사소통 선호도 및 언어 선택",
    howWeUseYourInfo: "정보 사용 방법",
    privacyUseDescription: "수집한 정보를 다음 목적으로 사용합니다:",
    providePersonalizedServices: "개인화된 교육 및 컨설팅 서비스 제공",
    processScholarshipApplications: "장학금 및 대학 지원서 처리",
    sendRelevantUpdates: "관련 업데이트 및 기회 전송",
    improveServices: "서비스 및 사용자 경험 개선",
    complyLegalObligations: "법적 의무 및 요구사항 준수",
    dataSecurity: "데이터 보안",
    dataSecurityDescription: "귀하의 정보를 보호하기 위해 강력한 보안 조치를 구현합니다:",
    encryptedDataTransmission: "암호화된 데이터 전송 및 저장",
    regularSecurityAudits: "정기적인 보안 감사 및 평가",
    accessControls: "엄격한 액세스 제어 및 인증",
    employeeTraining: "데이터 보호 관행에 대한 직원 교육",
    informationSharing: "정보 공유",
    privacySharingDescription: "필요한 경우에만 신뢰할 수 있는 파트너와 정보를 공유할 수 있습니다:",
    educationalInstitutions: "지원서 처리를 위한 교육 기관",
    governmentAgencies: "비자 및 허가 신청을 위한 정부 기관",
    trustedServiceProviders: "운영을 지원하는 신뢰할 수 있는 서비스 제공업체",
    legalAuthorities: "법률에 의해 요구되는 경우 법적 당국",
    neverSellPersonalInfo: "귀하의 개인 정보를 제3자에게 판매하지 않습니다.",
    yourRights: "귀하의 권리",
    rightsDescription: "다음과 같은 권리가 있습니다:",
    accessYourData: "개인 데이터 액세스",
    correctInaccurateInfo: "부정확한 정보 수정",
    deleteYourData: "데이터 삭제",
    optOutCommunications: "커뮤니케이션 거부",
    contactUs: "문의하기",
    updatesToPolicy: "정책 업데이트",
    updatesDescription: "이 개인정보 보호정책을 수시로 업데이트할 수 있습니다. 이 페이지에 새 정책을 게시하여 변경 사항을 알려드립니다.",
    
    // Terms of Service
    termsOfServiceTitle: "서비스 약관",
    termsOfServiceSubtitle: "우리 서비스 사용에 대한 이용약관",
    acceptanceOfTerms: "약관 동의",
    acceptanceDescription: "우리 서비스를 사용함으로써 이 이용약관에 동의하게 됩니다.",
    servicesProvided: "제공되는 서비스",
    servicesDescription: "교육 컨설팅 및 F&B 비즈니스 컨설팅 서비스를 제공합니다.",
    userResponsibilities: "사용자 책임",
    responsibilitiesDescription: "사용자는 정확한 정보를 제공하고 우리의 가이드라인을 따를 책임이 있습니다.",
    intellectualProperty: "지적 재산권",
    intellectualPropertyDescription: "모든 콘텐츠와 자료는 지적 재산권법으로 보호됩니다.",
    limitationOfLiability: "책임 제한",
    liabilityDescription: "우리의 책임은 법이 허용하는 범위로 제한됩니다.",
    terminationOfServices: "서비스 종료",
    terminationDescription: "약관 위반 시 서비스를 종료할 권리를 보유합니다.",
    governingLaw: "준거법",
    governingLawDescription: "이 약관은 대한민국 법률에 따라 규율됩니다.",
    changesTerms: "약관 변경",
    changesDescription: "수시로 이 약관을 업데이트할 수 있습니다.",
    
    // About Advisor
    professionalSummary: "전문가 요약",
    educationExpertise: "교육 전문성",
    koreanGovernmentScholarshipProgram: "한국 정부 장학금 프로그램 안내",
    universityAdmissionStrategies: "대학 입학 전략",
    visaApplicationGuidance: "비자 신청 안내",
    koreanLanguagePreparation: "한국어 준비",
    culturalAdaptationSupport: "문화적 적응 지원",
    fbExpertise: "F&B 전문성",
    marketAnalysisEntryStrategies: "시장 분석 및 진입 전략",
    productDevelopmentInnovation: "제품 개발 및 혁신",
    supplyChainOptimization: "공급망 최적화",
    businessPlanningFunding: "사업 계획 및 자금 조달",
    keyAchievements: "주요 성과",
    scholarshipSuccessRate: "95% 장학금 성공률",
    getInTouch: "연락하기",
    mondayToFriday: "월요일~금요일",
    saturdaySunday: "토요일 및 일요일",
    koreanTime: "한국 시간 (KST)",
    myMission: "나의 사명",
    missionStatement: "아프리카의 재능과 한국의 기회 사이의 격차를 해소하여 교육 및 비즈니스 성공을 위한 경로를 만드는 것입니다.",
    
    // Consultation Booking
    hotelBooking: "대면 상담",
    phoneConsultation: "전화 상담",
    reviewConsultation: "상담 검토",
    consultationDetails: "상담 세부사항",
    fullName: "성명",
    selectedService: "선택된 서비스",
    totalPrice: "총 가격",
    paymentMethods: "결제 방법",
    payWithCard: "카드로 결제",
    payWithMobile: "모바일 머니로 결제",
    payWithBank: "은행 송금으로 결제",
    backToEdit: "편집으로 돌아가기",
    phone: "전화번호",
    preferredDate: "선호 날짜",
    preferredTime: "선호 시간",
    reviewConsultationRequest: "상담 요청 검토",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "무료 15분 상담 예약하기"
  },
  
  FR: {
    // ... keep existing code (French translations with all new keys added)
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
    visaApplication: "Demande de Visa",
    visaDescription: "Assistance complète pour les demandes de visa",
    koreanLanguageTraining: "Formation en coréen",
    languageDescription: "Formation professionnelle en langue coréenne",
    scholarshipDescription: "Aide complète pour trouver et postuler aux bourses",
    ourServices: "Nos Services",
    letsStartYourJourney: "Commencez votre voyage",
    journeyDescription: "Prêt à prendre le prochain pas? Obtenez une assistance personnalisée pour vos objectifs.",
    getExpertConsultation: "Obtenir une consultation experte",
    getFullConsultation: "Obtenir une consultation complète",
    viewAllPackagesPricing: "Voir tous les packages et tarifs et bénéficier d'une réduction de 25%",
    marketAnalysisDescription: "Analyse approfondie du marché et intelligence concurrentielle",
    
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
    trendIdentification: "Identification des tendances",
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
    successStories: "Histoires de succès",
    testimonialSubtitle: "Écoutez nos clients satisfaits qui ont réalisé leurs rêves",
    
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
    business: "Business",
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
    legal: "Légal",
    contactInfo: "Informations de contact",
    allRightsReserved: "Tous droits réservés.",
    
    // Partners
    ourTrustedPartners: "Nos partenaires de confiance",
    partnerDescription: "Collaboration avec des institutions et des organisations leaders",
    
    // Legal pages
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions de service",
    sitemap: "Plan du site",
    privacyPolicyTitle: "Politique de confidentialité",
    privacyPolicySubtitle: "Comment nous collectons, utilisons et protégeons vos informations",
    informationWeCollect: "Informations que nous collectons",
    privacyCollectDescription: "Nous collectons des informations pour fournir de meilleurs services à nos utilisateurs:",
    personalIdentificationInfo: "Informations d'identification personnelle (nom, email, téléphone)",
    educationalBackground: "Contexte éducatif et objectifs académiques",
    professionalExperience: "Expérience professionnelle et objectifs de carrière",
    communicationPreferences: "Préférences de communication et choix de langue",
    howWeUseYourInfo: "Comment nous utilisons vos informations",
    privacyUseDescription: "Nous utilisons les informations que nous collectons aux fins suivantes:",
    providePersonalizedServices: "Fournir des services éducatifs et de conseil personnalisés",
    processScholarshipApplications: "Traiter les demandes de bourses et d'universités",
    sendRelevantUpdates: "Envoyer des mises à jour et opportunités pertinentes",
    improveServices: "Améliorer nos services et l'expérience utilisateur",
    complyLegalObligations: "Respecter les obligations et exigences légales",
    dataSecurity: "Sécurité des données",
    dataSecurityDescription: "Nous mettons en place des mesures de sécurité robustes pour protéger vos informations:",
    encryptedDataTransmission: "Transmission et stockage de données cryptées",
    regularSecurityAudits: "Audits et évaluations de sécurité réguliers",
    accessControls: "Contrôles d'accès stricts et authentification",
    employeeTraining: "Formation des employés sur les pratiques de protection des données",
    informationSharing: "Partage d'informations",
    privacySharingDescription: "Nous pouvons partager vos informations avec des partenaires de confiance uniquement lorsque nécessaire:",
    educationalInstitutions: "Institutions éducatives pour le traitement des candidatures",
    governmentAgencies: "Agences gouvernementales pour les demandes de visa et de permis",
    trustedServiceProviders: "Prestataires de services de confiance qui nous aident dans nos opérations",
    legalAuthorities: "Autorités légales lorsque requis par la loi",
    neverSellPersonalInfo: "Nous ne vendons jamais vos informations personnelles à des tiers.",
    yourRights: "Vos droits",
    rightsDescription: "Vous avez le droit de:",
    accessYourData: "Accéder à vos données personnelles",
    correctInaccurateInfo: "Corriger les informations inexactes",
    deleteYourData: "Supprimer vos données",
    optOutCommunications: "Vous désabonner des communications",
    contactUs: "Nous contacter",
    updatesToPolicy: "Mises à jour de cette politique",
    updatesDescription: "Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.",
    
    // Terms of Service
    termsOfServiceTitle: "Conditions de service",
    termsOfServiceSubtitle: "Conditions générales d'utilisation de nos services",
    acceptanceOfTerms: "Acceptation des conditions",
    acceptanceDescription: "En utilisant nos services, vous acceptez ces conditions générales.",
    servicesProvided: "Services fournis",
    servicesDescription: "Nous fournissons des services de conseil éducatif et de conseil en entreprise F&B.",
    userResponsibilities: "Responsabilités de l'utilisateur",
    responsibilitiesDescription: "Les utilisateurs sont responsables de fournir des informations exactes et de suivre nos directives.",
    intellectualProperty: "Propriété intellectuelle",
    intellectualPropertyDescription: "Tout le contenu et les matériaux sont protégés par les lois sur la propriété intellectuelle.",
    limitationOfLiability: "Limitation de responsabilité",
    liabilityDescription: "Notre responsabilité est limitée dans la mesure permise par la loi.",
    terminationOfServices: "Résiliation des services",
    terminationDescription: "Nous nous réservons le droit de résilier les services pour violation des conditions.",
    governingLaw: "Loi applicable",
    governingLawDescription: "Ces conditions sont régies par les lois de la Corée du Sud.",
    changesTerms: "Modifications des conditions",
    changesDescription: "Nous pouvons mettre à jour ces conditions de temps en temps.",
    
    // About Advisor
    professionalSummary: "Résumé professionnel",
    educationExpertise: "Expertise en éducation",
    koreanGovernmentScholarshipProgram: "Guidance du programme de bourses du gouvernement coréen",
    universityAdmissionStrategies: "Stratégies d'admission universitaire",
    visaApplicationGuidance: "Guidance pour les demandes de visa",
    koreanLanguagePreparation: "Préparation en langue coréenne",
    culturalAdaptationSupport: "Support d'adaptation culturelle",
    fbExpertise: "Expertise F&B",
    marketAnalysisEntryStrategies: "Analyse de marché et stratégies d'entrée",
    productDevelopmentInnovation: "Développement de produits et innovation",
    supplyChainOptimization: "Optimisation de la chaîne d'approvisionnement",
    businessPlanningFunding: "Planification d'entreprise et financement",
    keyAchievements: "Réalisations clés",
    scholarshipSuccessRate: "95% de taux de réussite des bourses",
    getInTouch: "Entrer en contact",
    mondayToFriday: "Lundi à vendredi",
    saturdaySunday: "Samedi et dimanche",
    koreanTime: "Heure coréenne (KST)",
    myMission: "Ma mission",
    missionStatement: "Combler le fossé entre le talent africain et les opportunités coréennes, créant des voies vers le succès éducatif et commercial.",
    
    // Consultation Booking
    hotelBooking: "Consultation en personne",
    phoneConsultation: "Consultation téléphonique",
    reviewConsultation: "Révision de la consultation",
    consultationDetails: "Détails de la consultation",
    fullName: "Nom complet",
    selectedService: "Service sélectionné",
    totalPrice: "Prix total",
    paymentMethods: "Méthodes de paiement",
    payWithCard: "Payer par carte",
    payWithMobile: "Payer par mobile money",
    payWithBank: "Payer par virement bancaire",
    backToEdit: "Retour à l'édition",
    phone: "Téléphone",
    preferredDate: "Date préférée",
    preferredTime: "Heure préférée",
    reviewConsultationRequest: "Révision de la demande de consultation",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "Programmer une consultation gratuite de 15 minutes"
  },
  
  RW: {
    // ... keep existing code (Kinyarwanda translations with all new keys added)
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
    meetYourGlobalAdvisor: "Huza n'umujyanama wawe w'isi yose",
    advisorName: "Dr. Sarah Johnson",
    advisorTitle: "Umujyanama w'uburezi mpuzamahanga na F&B",
    advisorDescription: "Hamwe n'uburambe bw'imyaka irenga 10 bwo guhuza abanyeshuri b'Abanyafurika n'amashuri makuru ya Koreya no gufasha ubucuruzi bw'ibiryo gukura ku isi.",
    readMoreAboutMe: "Soma byinshi kuri njye",
    educationExpert: "Impuguke mu burezi",
    educationExpertDesc: "Ubuyobozi bwihariye bwo kwinjira mu mashuri makuru ya Koreya",
    fbConsultant: "Umujyanama wa F&B",
    fbConsultantDesc: "Inama z'impuguke ku bucuruzi bw'ibiryo n'ibinyobwa",
    studentsHelped: "500+ Abanyeshuri bafashijwe",
    studentsHelpedDesc: "Bayobowe neza mu mashuri makuru ya Koreya",
    countriesReached: "15+ Ibihugu byagezweho",
    countriesReachedDesc: "Abanyeshuri bo muri Afurika bongeye kubona inyungu",
    studentsAssisted: "500+ Abanyeshuri bafashijwe",
    foodScienceExpert: "Impuguke mu bya siyanse y'ibiryo",
    
    // Services
    servicesTitle: "Serivisi zacu",
    servicesSubtitle: "Ibisubizo byuzuye ku ntego zawe z'uburezi n'ubucuruzi",
    servicesDescription: "Ubufasha buzuye ku ntego zawe z'uburezi n'ubucuruzi",
    studyInKorea: "Kwiga muri Koreya",
    studyInKoreaDesc: "Ubuyobozi buzuye bw'impano no kwinjira mu mashuri makuru",
    fbConsulting: "Inama za F&B",
    fbConsultingDesc: "Inama z'impuguke ku bucuruzi bw'ibiryo n'ibinyobwa",
    universityAdmissions: "Kwinjira muri kaminuza",
    universityAdmissionsDesc: "Ubufasha bwuzuye ku busaba bwa kaminuza",
    universityDescription: "Ubufasha bwuzuye bwo kwinjira muri kaminuza",
    visaAssistance: "Ubufasha bwa viza",
    visaAssistanceDesc: "Ubufasha bw'umwuga ku busaba bwa viza n'inyandiko",
    visaApplication: "Gusaba viza",
    visaDescription: "Ubufasha buzuye bwo gusaba viza",
    koreanLanguageTraining: "Imyitozo y'ururimi rwa Koreya",
    languageDescription: "Gutegura ururimi rwa Koreya mu buryo bw'umwuga",
    scholarshipDescription: "Ubuyobozi buzuye bwo gushaka no gusaba impano",
    ourServices: "Serivisi zacu",
    letsStartYourJourney: "Reka dutangire urugendo rwawe",
    journeyDescription: "Witeguye gufata intambwe ikurikira? Bonera ubuyobozi bwigenga ku ntego zawe.",
    getExpertConsultation: "Bonera inama z'impuguke",
    getFullConsultation: "Bonera inama zuzuye",
    viewAllPackagesPricing: "Reba paki zose n'ibiciro hanyuma ubonere igabanura rya 25%",
    marketAnalysisDescription: "Isesengura ry'imbere ry'isoko n'ubunyangamugayo bw'abanywanyi",
    
    // Study Programs
    studyProgramsTitle: "Gahunda z'amashuri na serivisi",
    studyProgramsSubtitle: "Ubufasha buzuye ku rugendo rwawe rw'uburezi bwa Koreya",
    scholarshipGuidance: "Ubuyobozi bw'impano",
    scholarshipGuidanceDesc: "Ubufasha bw'impuguke mu gushaka no gusaba impano",
    universityAdmissionSupport: "Ubufasha bwo kwinjira muri kaminuza",
    universityAdmissionSupportDesc: "Ubufasha bwuzuye bwo kwinjira muri kaminuza",
    visaApplicationAssistance: "Ubufasha bwo gusaba viza",
    visaApplicationAssistanceDesc: "Ubufasha bw'umwuga bwo gusaba viza",
    languagePreparation: "Gutegura ururimi",
    languagePreparationDesc: "Gutegura ibizamini by'ururimi rwa Koreya",
    
    // Study Programs Features
    scholarshipSearch: "Gushaka impano",
    applicationAssistance: "Ubufasha bwo gusaba",
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
    businessConsultation: "Inama z'ubucuruzi",
    businessDescription: "Gutegura ingamba z'ubucuruzi no kwinjira mu isoko",
    marketAnalysis: "Isesengura ry'isoko",
    marketAnalysisDesc: "Isesengura ry'imbere ry'isoko n'ubunyangamugayo bw'abanywanyi",
    fbMarketAnalysis: "Isesengura ry'isoko rya F&B",
    productDevelopment: "Guteza imbere ibicuruzwa",
    productDevelopmentDesc: "Guteza imbere no guhanga ibicuruzwa by'ibiryo",
    productDescription: "Guteza imbere no guhanga ibicuruzwa by'ibiryo",
    regulatoryCompliance: "Kubahiriza amategeko",
    regulatoryComplianceDesc: "Kuyobora mu mutekano w'ibiryo n'ibisabwa n'amategeko",
    complianceDescription: "Kuyobora mu mutekano w'ibiryo n'ibisabwa n'amategeko",
    
    // F&B Features
    marketResearch: "Ubushakashatsi bw'isoko",
    businessPlanning: "Gutegura ubucuruzi",
    strategyDevelopment: "Guteza imbere ingamba",
    marketSizing: "Gupima isoko",
    competitorAnalysis: "Isesengura ry'abanywanyi",
    trendIdentification: "Kumenya icyerekezo",
    recipeDevelopment: "Guteza imbere uburyo bwo guteka",
    productTesting: "Gupima ibicuruzwa",
    safetyStandards: "Ibipimo by'umutekano",
    certificationSupport: "Ubufasha bw'icyemezo",
    complianceAudits: "Isuzuma ry'ubwubahirizi",
    
    // Common
    startYourJourney: "Tangira urugendo rwawe",
    backToHome: "Garuka ku ntangiriro",
    bookConsultation: "Andika inama",
    getQuote: "Saba igiciro",
    scheduleConsultation: "Tegura inama",
    
    // About
    aboutTitle: "Ibibazo byacu",
    aboutDescription: "Menya intego zacu n'ubuhanga bwacu",
    aboutUs: "Ibibazo byacu",
    
    // Contact
    contactTitle: "Twandikire",
    contactDescription: "Mana n'itsinda ryacu",
    readyToTakeNextStep: "Witeguye gufata intambwe ikurikira?",
    sendUsMessage: "Twoherereze ubutumwa",
    fillFormBelow: "Uzuza ifishi iri hepfo tuzagusubiza mu masaha 24.",
    yourName: "Izina ryawe",
    yourEmail: "Imeri yawe",
    selectService: "Hitamo serivisi",
    generalInquiry: "Ibibazo rusange",
    studyAbroadRelocation: "Kwiga mu mahanga no kwimuka",
    fbConsultingService: "Inama za F&B",
    bothServices: "Serivisi zombi",
    message: "Ubutumwa",
    tellUsAboutGoals: "Tubwire ku ntego zawe n'uburyo dushobora kugufasha",
    sendMessage: "Ohereza ubutumwa",
    quickContact: "Kuvugana vuba",
    email: "Imeri",
    phoneKorea: "Telefoni (Koreya)",
    whatsapp: "WhatsApp",
    bookAConsultation: "Andika inama",
    scheduleFreeConsultation: "Tegura inama y'ubusa kugira ngo muganire ku ntego zanyu",
    officeHours: "Amasaha y'ibiro",
    mondayFriday: "Ku wa mbere - Ku wa gatanu: 9:00 AM - 6:00 PM (KST)",
    saturday: "Ku wa gatandatu: 10:00 AM - 4:00 PM (KST)",
    sunday: "Ku cyumweru",
    closed: "Birafunze",
    location: "Seoul, Koreya y'Epfo",
    
    // Testimonials
    testimonialsTitle: "Inkuru z'intsinzi",
    successStories: "Inkuru z'intsinzi",
    testimonialSubtitle: "Wumva ku bakiriya bacu bashimye bagezeho ku nzozi zabo",
    
    // Blog
    blogTitle: "Ibikoresho biheruka",
    blogDescription: "Komeza wibwirizwa n'ibitekerezo bishya",
    readMore: "Soma byinshi",
    latest: "Biheruka",
    resourcesDescription: "Ibyegeranyo by'ingenzi n'ubwenge ku rugendo rwawe",
    viewAllResources: "Reba ibikoresho byose",
    blogPost1Title: "Ibyegeranyo byuzuye by'impano z'amashuri makuru ya Koreya",
    blogPost1Excerpt: "Ibintu byose ukeneye kumenya ku gushaka no gusaba impano muri Koreya.",
    blogPost2Title: "Gutangira ubucuruzi bwawe bw'ibiryo muri Koreya",
    blogPost2Excerpt: "Ibyegeranyo bya buri ntambwe yo gutangiza ubucuruzi bwawe bw'ibiryo mu isoko rya Koreya.",
    blogPost3Title: "Amakuru yo gutegura ikizamini cya TOPIK",
    blogPost3Excerpt: "Ingamba z'impuguke zo gutsinda ikizamini cyawe cy'ubumenyi bw'ururimi rwa Koreya.",
    education: "Uburezi",
    business: "Ubucuruzi",
    scholarships: "Impano",
    
    // Newsletter
    newsletterTitle: "Komeza wibwirizwa",
    newsletterDescription: "Bonera amakuru mashya n'amahirwe",
    subscribe: "Kwiyandikisha",
    enterEmailAddress: "Injiza aderesi ya imeri yawe",
    newsletterThankYou: "Urakoze kwiyandikisha!",
    
    // Footer
    quickLinks: "Ihuza ryihuse",
    followUs: "Dukurikire",
    footerDescription: "Umunyangana wawe wizewe mu burezi bwa Koreya no gutsinda F&B",
    resourcesBlog: "Ibikoresho na Blog",
    visitsHelp: "Viza n'ubufasha",
    legal: "Amategeko",
    contactInfo: "Amakuru y'aho duhurira",
    allRightsReserved: "Uburenganzira bwose burarinzwe.",
    
    // Partners
    ourTrustedPartners: "Abo dufatanyirizanya nabo dushize ukwizera",
    partnerDescription: "Gukorana n'inziko zikomeye n'imiryango",
    
    // Legal pages
    privacyPolicy: "Politiki y'ibanga",
    termsOfService: "Amabwiriza ya serivisi",
    sitemap: "Ikarita y'urubuga",
    privacyPolicyTitle: "Politiki y'ibanga",
    privacyPolicySubtitle: "Uburyo dukusanya, dukoresha, kandi dukingira amakuru yawe",
    informationWeCollect: "Amakuru dukusanya",
    privacyCollectDescription: "Dukusanya amakuru kugira ngo dutange serivisi nziza ku bakoresha bacu:",
    personalIdentificationInfo: "Amakuru yo kwimenyekanisha (izina, imeri, telefoni)",
    educationalBackground: "Amateka y'uburezi n'intego z'amashuri",
    professionalExperience: "Uburambe bw'umwuga n'intego z'umwuga",
    communicationPreferences: "Ibyo ukunda mu itumanaho n'amururimi uhitamo",
    howWeUseYourInfo: "Uburyo dukoresha amakuru yawe",
    privacyUseDescription: "Dukoresha amakuru dukusanya kuri izi ntego:",
    providePersonalizedServices: "Gutanga serivisi z'uburezi n'inama zigenewe wowe",
    processScholarshipApplications: "Gutunganya ubusaba bw'impano na kaminuza",
    sendRelevantUpdates: "Kohereza amakuru mashya n'amahirwe ajyanye nawe",
    improveServices: "Kunoza serivisi zacu n'uburambe bw'abakoresha",
    complyLegalObligations: "Kubahiriza inshingano n'ibisabwa n'amategeko",
    dataSecurity: "Umutekano w'amakuru",
    dataSecurityDescription: "Dushyira mu bikorwa ingamba z'umutekano zikomeye zo kurinda amakuru yawe:",
    encryptedDataTransmission: "Kohereza no kubika amakuru ahishwe",
    regularSecurityAudits: "Isuzuma ry'umutekano rihoraho n'isuzuma",
    accessControls: "Ubufuzi bukomeye bwo kwinjira no kwemeza",
    employeeTraining: "Imyitozo y'abakozi ku micungire yo kurinda amakuru",
    informationSharing: "Gusangira amakuru",
    privacySharingDescription: "Dushobora gusangira amakuru yawe n'abo dufatanyirizanya nabo twizemo ubwoba igihe bibaye ngombwa gusa:",
    educationalInstitutions: "Inziko z'uburezi zo gutunganya ubusaba",
    governmentAgencies: "Ibigo bya guverinoma byo gusaba viza n'uruhushya",
    trustedServiceProviders: "Abatanga serivisi tuzizeho badufasha mu bikorwa byacu",
    legalAuthorities: "Ubuyobozi bw'amategeko igihe byabisabwe n'amategeko",
    neverSellPersonalInfo: "Ntituzigera tugurisha amakuru yawe bwite ku bandi.",
    yourRights: "Uburenganzira bwawe",
    rightsDescription: "Ufite uburenganzira bwo:",
    accessYourData: "Kubona amakuru yawe bwite",
    correctInaccurateInfo: "Guhindura amakuru atari yo",
    deleteYourData: "Gusiba amakuru yawe",
    optOutCommunications: "Kureka itumanaho",
    contactUs: "Duhamagare",
    updatesToPolicy: "Amahinduka kuri politiki iyi",
    updatesDescription: "Dushobora kuvugurura politiki iyi y'ibanga icyo giciro. Tuzakumenyesha amahinduka yose dusobanura politiki nshya kuri uyu paji.",
    
    // Terms of Service
    termsOfServiceTitle: "Amabwiriza ya serivisi",
    termsOfServiceSubtitle: "Amategeko n'amabwiriza yo gukoresha serivisi zacu",
    acceptanceOfTerms: "Kwemera amabwiriza",
    acceptanceDescription: "Ukoresha serivisi zacu, wemera aya mategeko n'amabwiriza.",
    servicesProvided: "Serivisi zitangwa",
    servicesDescription: "Dutanga serivisi z'inama z'uburezi n'inama z'ubucuruzi bwa F&B.",
    userResponsibilities: "Inshingano z'uwukoresha",
    responsibilitiesDescription: "Abakoresha bashinzwe gutanga amakuru nyayo no gukurikiza amabwiriza ya bacu.",
    intellectualProperty: "Umutungo w'ubwenge",
    intellectualPropertyDescription: "Ibikubiye n'ibikoresho byose birinzwe n'amategeko y'umutungo w'ubwenge.",
    limitationOfLiability: "Igabanywa ry'uburyozwe",
    liabilityDescription: "Uburyozwe bwacu bugarukira ku rugero rwemewe n'amategeko.",
    terminationOfServices: "Guhagarika serivisi",
    terminationDescription: "Twibikiye uburenganzira bwo guhagarika serivisi kubera gukuka k'amabwiriza.",
    governingLaw: "Itegeko rigenza",
    governingLawDescription: "Aya mabwiriza agengwa n'amategeko ya Koreya y'Epfo.",
    changesTerms: "Impinduka mu mabwiriza",
    changesDescription: "Dushobora kuvugurura aya mabwiriza rimwe na rimwe.",
    
    // About Advisor
    professionalSummary: "Incamake y'umwuga",
    educationExpertise: "Ubuhanga mu burezi",
    koreanGovernmentScholarshipProgram: "Ubuyobozi bwa porogarama y'impano za guverinoma ya Koreya",
    universityAdmissionStrategies: "Ingamba zo kwinjira muri kaminuza",
    visaApplicationGuidance: "Ubuyobozi bwo gusaba viza",
    koreanLanguagePreparation: "Gutegura ururimi rwa Koreya",
    culturalAdaptationSupport: "Ubufasha bwo kumenyera umuco",
    fbExpertise: "Ubuhanga muri F&B",
    marketAnalysisEntryStrategies: "Isesengura ry'isoko n'ingamba zo kwinjira",
    productDevelopmentInnovation: "Guteza imbere ibicuruzwa n'ubuhanga",
    supplyChainOptimization: "Kunoza uruhererekane rw'ibigira abandi",
    businessPlanningFunding: "Gutegura ubucuruzi no gufasha imari",
    keyAchievements: "Ibyangombwa bizwi neza",
    scholarshipSuccessRate: "95% by'impano zatsinda",
    getInTouch: "Vugana natwe",
    mondayToFriday: "Kuwa mbere kugeza kuwa gatanu",
    saturdaySunday: "Kuwa gatandatu n'Icyumweru",
    koreanTime: "Isaha ya Koreya (KST)",
    myMission: "Intego yanjye",
    missionStatement: "Gufunga umwanya hagati y'impano z'Abanyafurika n'amahirwe ya Koreya, dushyiraho inzira zijyana ku ntsinzi y'uburezi n'ubucuruzi.",
    
    // Consultation Booking
    hotelBooking: "Inama y'imbonankubone",
    phoneConsultation: "Inama ku telefoni",
    reviewConsultation: "Gusuzuma inama",
    consultationDetails: "Ibisobanuro by'inama",
    fullName: "Amazina yose",
    selectedService: "Serivisi yatoranijwe",
    totalPrice: "Igiciro cyose",
    paymentMethods: "Uburyo bwo kwishyura",
    payWithCard: "Kwishyura na karita",
    payWithMobile: "Kwishyura n'amafaranga ya mobile",
    payWithBank: "Kwishyura n'ubikorwa bya banki",
    backToEdit: "Subira ku guhinduza",
    phone: "Telefoni",
    preferredDate: "Itariki wifuza",
    preferredTime: "Isaha wifuza",
    reviewConsultationRequest: "Gusuzuma ubusabe bw'inama",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "Tegura inama y'ubusa ya miniti 15"
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
