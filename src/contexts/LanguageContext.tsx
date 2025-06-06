import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  // Navigation & Header
  home: string;
  about: string;
  services: string;
  resources: string;
  contact: string;
  bookConsultation: string;
  studyInKorea: string;
  fbConsulting: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  exploreStudyPrograms: string;
  studentsAssisted: string;
  foodScienceExpert: string;

  // About Section
  meetYourGlobalAdvisor: string;
  advisorName: string;
  advisorTitle: string;
  advisorDescription: string;
  readMoreAboutMe: string;
  educationExpert: string;
  educationExpertDesc: string;
  fbConsultant: string;
  fbConsultantDesc: string;
  countriesReached: string;
  countriesReachedDesc: string;
  studentsHelped: string;
  studentsHelpedDesc: string;

  // Services Section
  servicesDescription: string;
  scholarshipGuidance: string;
  scholarshipDescription: string;
  scholarshipSearch: string;
  applicationAssistance: string;
  documentPreparation: string;
  universityAdmissions: string;
  universityAdmissionsDesc: string;
  universityDescription: string;
  universitySelection: string;
  applicationReview: string;
  interviewPreparation: string;
  visaApplication: string;
  visaDescription: string;
  applicationFiling: string;
  interviewCoaching: string;
  koreanLanguageTraining: string;
  languageDescription: string;
  topikPreparation: string;
  conversationPractice: string;
  culturalOrientation: string;
  fbBusinessConsulting: string;
  businessConsultation: string;
  businessDescription: string;
  marketResearch: string;
  businessPlanning: string;
  strategyDevelopment: string;
  marketAnalysis: string;
  fbMarketAnalysis: string;
  marketAnalysisDescription: string;
  marketSizing: string;
  competitorAnalysis: string;
  trendIdentification: string;
  productDevelopment: string;
  productDescription: string;
  recipeDevelopment: string;
  productTesting: string;
  regulatoryCompliance: string;
  complianceDescription: string;
  safetyStandards: string;
  certificationSupport: string;
  complianceAudits: string;
  ourServices: string;
  startYourJourney: string;
  getExpertConsultation: string;
  journeyDescription: string;
  getFullConsultation: string;
  viewAllPackagesPricing: string;

  // Blog/Resources Section
  latest: string;
  blogPost1Title: string;
  blogPost1Excerpt: string;
  blogPost2Title: string;
  blogPost2Excerpt: string;
  blogPost3Title: string;
  blogPost3Excerpt: string;
  readMore: string;
  viewAllResources: string;
  resourcesBlog: string;
  resourcesDescription: string;
  eightMinRead: string;
  twelveMinRead: string;
  sixMinRead: string;
  tenMinRead: string;
  fifteenMinRead: string;
  sevenMinRead: string;
  march152024: string;
  march102024: string;
  march52024: string;
  february282024: string;
  february202024: string;
  february152024: string;
  visaApplicationProcess: string;
  visaApplicationExcerpt: string;
  foodSafetyRegulations: string;
  foodSafetyExcerpt: string;
  culturalAdaptationGuide: string;
  culturalAdaptationExcerpt: string;
  johnDoe: string;

  // Contact Section
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
  aboutUs: string;
  legal: string;
  privacyPolicy: string;
  termsOfService: string;
  sitemap: string;
  contactInfo: string;
  location: string;
  allRightsReserved: string;
  visitsHelp: string;

  // Newsletter
  newsletterTitle: string;
  newsletterDescription: string;
  enterEmailAddress: string;
  subscribe: string;
  newsletterThankYou: string;

  // Testimonials
  successStories: string;
  testimonialSubtitle: string;

  // Partners
  ourTrustedPartners: string;
  partnerDescription: string;

  // Common Categories
  education: string;
  business: string;
  scholarships: string;

  // Common Actions
  backToHome: string;

  // Study Programs
  studyProgramsTitle: string;
  studyProgramsSubtitle: string;
  scholarshipGuidanceDesc: string;
  universityAdmissionSupport: string;
  universityAdmissionSupportDesc: string;
  visaApplicationAssistance: string;
  visaApplicationAssistanceDesc: string;
  visaDocumentPrep: string;
  languagePreparation: string;
  languagePreparationDesc: string;
  culturalOrientationAndAccommodation: string;

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

  // Book Consultation
  fullName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  reviewConsultation: string;
  consultationDetails: string;
  selectedService: string;
  totalPrice: string;
  paymentMethods: string;
  payWithCard: string;
  payWithMobile: string;
  payWithBank: string;
  backToEdit: string;
  reviewConsultationRequest: string;
  hotelBooking: string;
  phoneConsultation: string;

  // WhatsApp Button
  scheduleFreeFifteenMinuteConsultation: string;

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

  // Sitemap
  mainPages: string;
  homepageDescription: string;
  aboutDescription: string;
  contactDescription: string;
  blogResources: string;
  blogDescription: string;
  successStoriesDescription: string;
  newsletter: string;
  privacyPolicyDescription: string;
  termsOfServiceDescription: string;
  sitemapDescription: string;
  studyInKoreaDescription: string;
  fbConsultingDescription: string;
  universityAdmissionsDescription: string;
  sitemapTitle: string;
  sitemapSubtitle: string;
  needHelpFinding: string;
  cantFindWhatLooking: string;
  contactSupport: string;
  allPagesMobileResponsive: string;

  // Terms of Service
  termsOfServiceTitle: string;
  termsOfServiceSubtitle: string;
  acceptanceOfTerms: string;
  serviceDescription: string;
  kundaPathwaysProvides: string;
  educationalConsultingScholarshipGuidance: string;
  universityAdmissionAssistance: string;
  marketAnalysisBusinessDevelopment: string;
  visaApplicationRelocation: string;
  userResponsibilities: string;
  userResponsibilitiesDescription: string;
  provideAccurateInfo: string;
  maintainAccountConfidentiality: string;
  useServicesLawfully: string;
  respectIntellectualProperty: string;
  followApplicableLaws: string;
  limitationsDisclaimers: string;
  limitationsDescription: string;
  successfulAdmission: string;
  approvalScholarshipVisa: string;
  specificBusinessOutcomes: string;
  availabilityPrograms: string;
  servicesAdvisoryNature: string;
  paymentRefundPolicy: string;
  paymentTermsInclude: string;
  paymentRequiredBeforeService: string;
  refundsCaseByCase: string;
  serviceFeesNonRefundable: string;
  cancellationsWithin48Hours: string;
  governingLaw: string;
  governingLawDescription: string;
  questionsContactLegal: string;
  intellectualProperty: string;
  terminationDescription: string;
  responsibilitiesDescription: string;
  changesDescription: string;
  acceptanceDescription: string;
}

const englishTranslations: Translations = {
  // Navigation & Header
  home: "Home",
  about: "About",
  services: "Services",
  resources: "Resources",
  contact: "Contact",
  bookConsultation: "Book Consultation",
  studyInKorea: "Study in Korea",
  fbConsulting: "F&B Consulting",

  // Hero Section
  heroTitle: "Your Gateway to Korean Education & Global F&B Success",
  heroSubtitle: "Expert guidance for studying in Korea and expanding your food business across Asian markets",
  exploreStudyPrograms: "Explore Study Programs",
  studentsAssisted: "Students Assisted",
  foodScienceExpert: "F&B Expert",

  // About Section
  meetYourGlobalAdvisor: "Meet Your Global Advisor",
  advisorName: "Dr. Sarah Johnson",
  advisorTitle: "International Education & F&B Consultant",
  advisorDescription: "With over 10 years of experience connecting African students to Korean universities and helping food businesses expand globally.",
  readMoreAboutMe: "Read More About Me",
  educationExpert: "Education Expert",
  educationExpertDesc: "Specialized guidance for Korean university admissions",
  fbConsultant: "F&B Consultant",
  fbConsultantDesc: "Expert advice for food & beverage businesses",
  countriesReached: "15+ Countries Reached",
  countriesReachedDesc: "Students from across Africa benefited",
  studentsHelped: "500+ Students Helped",
  studentsHelpedDesc: "Successfully guided students to Korean universities",

  // Services Section
  servicesDescription: "Comprehensive support for your educational journey and business expansion",
  scholarshipGuidance: "Scholarship Guidance",
  scholarshipDescription: "Expert assistance in finding and applying for scholarships",
  scholarshipSearch: "Scholarship Search",
  applicationAssistance: "Application Assistance",
  documentPreparation: "Document Preparation",
  universityAdmissions: "University Admissions",
  universityAdmissionsDesc: "End-to-end support for university applications",
  universityDescription: "Complete university application support",
  universitySelection: "University Selection",
  applicationReview: "Application Review",
  interviewPreparation: "Interview Preparation",
  visaApplication: "Visa Application",
  visaDescription: "Expert visa application assistance",
  applicationFiling: "Application Filing",
  interviewCoaching: "Interview Coaching",
  koreanLanguageTraining: "Korean Language Training",
  languageDescription: "Comprehensive Korean language preparation",
  topikPreparation: "TOPIK Preparation",
  conversationPractice: "Conversation Practice",
  culturalOrientation: "Cultural Orientation",
  fbBusinessConsulting: "F&B Business Consulting",
  businessConsultation: "Business Consultation",
  businessDescription: "Strategic consulting for food & beverage businesses",
  marketResearch: "Market Research",
  businessPlanning: "Business Planning",
  strategyDevelopment: "Strategy Development",
  marketAnalysis: "Market Analysis",
  fbMarketAnalysis: "F&B Market Analysis",
  marketAnalysisDescription: "Comprehensive market analysis for Asian markets",
  marketSizing: "Market Sizing",
  competitorAnalysis: "Competitor Analysis",
  trendIdentification: "Trend Identification",
  productDevelopment: "Product Development",
  productDescription: "Custom product development for Asian markets",
  recipeDevelopment: "Recipe Development",
  productTesting: "Product Testing",
  regulatoryCompliance: "Regulatory Compliance",
  complianceDescription: "Navigate food safety regulations",
  safetyStandards: "Safety Standards",
  certificationSupport: "Certification Support",
  complianceAudits: "Compliance Audits",
  ourServices: "Our Services",
  startYourJourney: "Start Your Journey Today",
  getExpertConsultation: "Get Expert Consultation",
  journeyDescription: "Ready to pursue your dreams? Let us guide you through every step of your journey.",
  getFullConsultation: "Get Full Consultation",
  viewAllPackagesPricing: "View All Packages & Pricing",

  // Blog/Resources Section
  latest: "Latest",
  blogPost1Title: "Top 10 Korean Universities Offering Scholarships for African Students",
  blogPost1Excerpt: "Discover the best opportunities for funded education in South Korea...",
  blogPost2Title: "Breaking into the Korean F&B Market: A Complete Guide",
  blogPost2Excerpt: "Everything you need to know about food business regulations in Korea...",
  blogPost3Title: "KGSP 2024: Application Tips and Deadlines",
  blogPost3Excerpt: "Get insider tips for the Korean Government Scholarship Program...",
  readMore: "Read More",
  viewAllResources: "View All Resources",
  resourcesBlog: "Resources & Articles",
  resourcesDescription: "Stay updated with scholarship opportunities, industry insights, and success tips",
  eightMinRead: "8 min read",
  twelveMinRead: "12 min read",
  sixMinRead: "6 min read",
  tenMinRead: "10 min read",
  fifteenMinRead: "15 min read",
  sevenMinRead: "7 min read",
  march152024: "March 15, 2024",
  march102024: "March 10, 2024",
  march52024: "March 5, 2024",
  february282024: "February 28, 2024",
  february202024: "February 20, 2024",
  february152024: "February 15, 2024",
  visaApplicationProcess: "Visa Application Process for Korean Universities",
  visaApplicationExcerpt: "Step-by-step guide to successfully obtaining your student visa for Korea...",
  foodSafetyRegulations: "Food Safety Regulations in Asian Markets",
  foodSafetyExcerpt: "Understanding compliance requirements for F&B businesses expanding into Asia...",
  culturalAdaptationGuide: "Cultural Adaptation Guide for International Students",
  culturalAdaptationExcerpt: "Essential tips for adapting to Korean culture and academic environment...",
  johnDoe: "John Doe",

  // Contact Section
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
  footerDescription: "Your trusted partner for education and business success in Korea and beyond.",
  quickLinks: "Quick Links",
  aboutUs: "About Us",
  legal: "Legal",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  sitemap: "Sitemap",
  contactInfo: "Contact Info",
  location: "Seoul, South Korea",
  allRightsReserved: "All rights reserved.",
  visitsHelp: "Study Visits",

  // Newsletter
  newsletterTitle: "Stay Updated with Global Opportunities",
  newsletterDescription: "Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.",
  enterEmailAddress: "Enter your email address",
  subscribe: "Subscribe",
  newsletterThankYou: "Thank you for subscribing!",

  // Testimonials
  successStories: "Success Stories",
  testimonialSubtitle: "Hear from our successful students and business partners",

  // Partners
  ourTrustedPartners: "Our Trusted Partners",
  partnerDescription: "We work with leading universities and organizations to provide the best opportunities",

  // Common Categories
  education: "Education",
  business: "Business",
  scholarships: "Scholarships",

  // Common Actions
  backToHome: "Back to Home",

  // Study Programs
  studyProgramsTitle: "Study Programs in Korea",
  studyProgramsSubtitle: "Comprehensive support for your Korean education journey",
  scholarshipGuidanceDesc: "Complete guidance for finding and applying to scholarships",
  universityAdmissionSupport: "University Admission Support",
  universityAdmissionSupportDesc: "End-to-end university application support",
  visaApplicationAssistance: "Visa Application Assistance",
  visaApplicationAssistanceDesc: "Expert assistance with student visa applications",
  visaDocumentPrep: "Visa Document Preparation",
  languagePreparation: "Language Preparation",
  languagePreparationDesc: "Personalized Korean language lessons",
  culturalOrientationAndAccommodation: "Cultural Orientation & Accommodation",

  // About Advisor
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

  // Book Consultation
  fullName: "Full Name",
  phone: "Phone Number",
  preferredDate: "Preferred Date",
  preferredTime: "Preferred Time",
  reviewConsultation: "Review Your Consultation Request",
  consultationDetails: "Consultation Details",
  selectedService: "Selected Service",
  totalPrice: "Total Price",
  paymentMethods: "Payment Methods",
  payWithCard: "Pay with Credit/Debit Card",
  payWithMobile: "Pay with Mobile Money",
  payWithBank: "Pay with Bank Transfer",
  backToEdit: "Back to Edit Details",
  reviewConsultationRequest: "Review Consultation Request",
  hotelBooking: "Hotel Booking Assistance",
  phoneConsultation: "Phone Consultation",

  // WhatsApp Button
  scheduleFreeFifteenMinuteConsultation: "Schedule Free 15-Minute Consultation",

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

  // Sitemap
  mainPages: "Main Pages",
  homepageDescription: "Main landing page with overview of services",
  aboutDescription: "Learn about our mission and team",
  contactDescription: "Get in touch with our team",
  blogResources: "Blog & Resources",
  blogDescription: "Educational articles and insights",
  successStoriesDescription: "Latest articles and success stories",
  newsletter: "Newsletter",
  privacyPolicyDescription: "How we protect your personal information",
  termsOfServiceDescription: "Terms and conditions for using our services",
  sitemapDescription: "Complete overview of all website pages",
  studyInKoreaDescription: "Complete guide to studying in Korean universities",
  fbConsultingDescription: "Business consulting for food & beverage companies",
  universityAdmissionsDescription: "University admission guidance and support",
  sitemapTitle: "Sitemap",
  sitemapSubtitle: "Find everything you need on our website",
  needHelpFinding: "Need Help Finding Something?",
  cantFindWhatLooking: "Can't find what you're looking for? Our team is here to help!",
  contactSupport: "Contact Support",
  allPagesMobileResponsive: "All pages are mobile-responsive and optimized for search engines",

  // Terms of Service
  termsOfServiceTitle: "Terms of Service",
  termsOfServiceSubtitle: "Please read these terms carefully before using our services.",
  acceptanceOfTerms: "Acceptance of Terms",
  serviceDescription: "Service Description",
  kundaPathwaysProvides: "Kunda Pathways provides:",
  educationalConsultingScholarshipGuidance: "Educational consulting and scholarship guidance",
  universityAdmissionAssistance: "University admission assistance",
  marketAnalysisBusinessDevelopment: "Market analysis and business development support",
  visaApplicationRelocation: "Visa application and relocation assistance",
  userResponsibilities: "User Responsibilities",
  userResponsibilitiesDescription: "As a user of our services, you agree to:",
  provideAccurateInfo: "Provide accurate and complete information",
  maintainAccountConfidentiality: "Maintain the confidentiality of your account",
  useServicesLawfully: "Use our services only for lawful purposes",
  respectIntellectualProperty: "Respect intellectual property rights",
  followApplicableLaws: "Follow all applicable laws and regulations",
  limitationsDisclaimers: "Limitations and Disclaimers",
  limitationsDescription: "While we strive to provide accurate information and quality services, we cannot guarantee:",
  successfulAdmission: "Successful admission to educational institutions",
  approvalScholarshipVisa: "Approval of scholarship or visa applications",
  specificBusinessOutcomes: "Specific business outcomes or profits",
  availabilityPrograms: "Availability of programs or opportunities",
  servicesAdvisoryNature: "Our services are advisory in nature and success depends on various external factors.",
  paymentRefundPolicy: "Payment and Refund Policy",
  paymentTermsInclude: "Our payment terms include:",
  paymentRequiredBeforeService: "Payment is required before service delivery",
  refundsCaseByCase: "Refunds are considered on a case-by-case basis",
  serviceFeesNonRefundable: "Service fees are non-refundable once work has commenced",
  cancellationsWithin48Hours: "Cancellations must be made within 48 hours of booking",
  governingLaw: "Governing Law",
  governingLawDescription: "These terms shall be governed by and construed in accordance with the laws of South Korea. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Seoul, South Korea.",
  questionsContactLegal: "Questions? Contact us at legal@kundapathways.com",
  intellectualProperty: "Intellectual Property",
  terminationDescription: "Termination",
  responsibilitiesDescription: "User Responsibilities",
  changesDescription: "Changes to Terms",
  acceptanceDescription: "By accessing and using Kunda Pathways' services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
};

const koreanTranslations: Translations = {
  // Navigation & Header
  home: "홈",
  about: "소개",
  services: "서비스",
  resources: "자료",
  contact: "연락처",
  bookConsultation: "상담 예약",
  studyInKorea: "한국 유학",
  fbConsulting: "F&B 컨설팅",

  // Hero Section
  heroTitle: "한국 교육과 글로벌 F&B 성공을 위한 관문",
  heroSubtitle: "한국 유학과 아시아 시장 식품 사업 확장을 위한 전문 가이드",
  exploreStudyPrograms: "유학 프로그램 탐색",
  studentsAssisted: "지원한 학생 수",
  foodScienceExpert: "F&B 전문가",

  // About Section
  meetYourGlobalAdvisor: "글로벌 어드바이저를 만나보세요",
  advisorName: "사라 존슨 박사",
  advisorTitle: "국제 교육 및 F&B 컨설턴트",
  advisorDescription: "아프리카 학생들을 한국 대학교와 연결하고 식품 사업의 글로벌 확장을 돕는 10년 이상의 경험을 보유하고 있습니다.",
  readMoreAboutMe: "더 자세히 알아보기",
  educationExpert: "교육 전문가",
  educationExpertDesc: "한국 대학 입학을 위한 전문 지도",
  fbConsultant: "F&B 컨설턴트",
  fbConsultantDesc: "식음료 사업을 위한 전문 조언",
  countriesReached: "15개국 이상 도달",
  countriesReachedDesc: "아프리카 전역의 학생들이 혜택을 받았습니다",
  studentsHelped: "500명 이상의 학생 도움",
  studentsHelpedDesc: "한국 대학교로의 성공적인 학생 지도",

  // Services Section
  servicesDescription: "교육 여정과 사업 확장을 위한 종합적인 지원",
  scholarshipGuidance: "장학금 안내",
  scholarshipDescription: "장학금 찾기 및 신청에 대한 전문 지원",
  scholarshipSearch: "장학금 검색",
  applicationAssistance: "지원 도움",
  documentPreparation: "서류 준비",
  universityAdmissions: "대학 입학",
  universityAdmissionsDesc: "대학 지원을 위한 전 과정 지원",
  universityDescription: "완전한 대학 지원 서비스",
  universitySelection: "대학 선택",
  applicationReview: "지원서 검토",
  interviewPreparation: "면접 준비",
  visaApplication: "비자 신청",
  visaDescription: "전문 비자 신청 지원",
  applicationFiling: "신청서 제출",
  interviewCoaching: "면접 코칭",
  koreanLanguageTraining: "한국어 교육",
  languageDescription: "종합적인 한국어 준비",
  topikPreparation: "TOPIK 준비",
  conversationPractice: "회화 연습",
  culturalOrientation: "문화 적응",
  fbBusinessConsulting: "F&B 비즈니스 컨설팅",
  businessConsultation: "비즈니스 컨설테이션",
  businessDescription: "식음료 사업을 위한 전략적 컨설팅",
  marketResearch: "시장 조사",
  businessPlanning: "사업 계획",
  strategyDevelopment: "전략 개발",
  marketAnalysis: "시장 분석",
  fbMarketAnalysis: "F&B 시장 분석",
  marketAnalysisDescription: "아시아 시장을 위한 종합적인 시장 분석",
  marketSizing: "시장 규모 조사",
  competitorAnalysis: "경쟁사 분석",
  trendIdentification: "트렌드 식별",
  productDevelopment: "제품 개발",
  productDescription: "아시아 시장을 위한 맞춤형 제품 개발",
  recipeDevelopment: "레시피 개발",
  productTesting: "제품 테스트",
  regulatoryCompliance: "규제 준수",
  complianceDescription: "식품 안전 규정 탐색",
  safetyStandards: "안전 기준",
  certificationSupport: "인증 지원",
  complianceAudits: "준수 감사",
  ourServices: "우리의 서비스",
  startYourJourney: "오늘 여정을 시작하세요",
  getExpertConsultation: "전문 상담 받기",
  journeyDescription: "꿈을 추구할 준비가 되셨나요? 여정의 모든 단계를 안내해 드리겠습니다.",
  getFullConsultation: "전체 상담 받기",
  viewAllPackagesPricing: "모든 패키지 및 가격 보기",

  // Blog/Resources Section
  latest: "최신",
  blogPost1Title: "아프리카 학생들에게 장학금을 제공하는 한국 대학교 상위 10곳",
  blogPost1Excerpt: "한국에서 자금 지원을 받는 교육의 최고 기회를 발견하세요...",
  blogPost2Title: "한국 F&B 시장 진출: 완전 가이드",
  blogPost2Excerpt: "한국의 식품 사업 규정에 대해 알아야 할 모든 것...",
  blogPost3Title: "KGSP 2024: 지원 팁과 마감일",
  blogPost3Excerpt: "한국 정부 장학금 프로그램에 대한 내부 팁을 얻으세요...",
  readMore: "더 읽기",
  viewAllResources: "모든 자료 보기",
  resourcesBlog: "자료 및 기사",
  resourcesDescription: "장학금 기회, 업계 인사이트, 성공 팁을 최신 정보로 받아보세요",
  eightMinRead: "8분 읽기",
  twelveMinRead: "12분 읽기",
  sixMinRead: "6분 읽기",
  tenMinRead: "10분 읽기",
  fifteenMinRead: "15분 읽기",
  sevenMinRead: "7분 읽기",
  march152024: "2024년 3월 15일",
  march102024: "2024년 3월 10일",
  march52024: "2024년 3월 5일",
  february282024: "2024년 2월 28일",
  february202024: "2024년 2월 20일",
  february152024: "2024년 2월 15일",
  visaApplicationProcess: "한국 대학교를 위한 비자 신청 절차",
  visaApplicationExcerpt: "한국 학생 비자를 성공적으로 취득하기 위한 단계별 가이드...",
  foodSafetyRegulations: "아시아 시장의 식품 안전 규정",
  foodSafetyExcerpt: "아시아로 확장하는 F&B 사업의 준수 요구사항 이해...",
  culturalAdaptationGuide: "국제학생을 위한 문화 적응 가이드",
  culturalAdaptationExcerpt: "한국 문화와 학업 환경에 적응하기 위한 필수 팁...",
  johnDoe: "홍길동",

  // Contact Section
  letsStartYourJourney: "여정을 시작해 봅시다",
  readyToTakeNextStep: "다음 단계를 밟을 준비가 되셨나요? 무료 상담을 위해 연락주세요",
  sendUsMessage: "메시지 보내기",
  fillFormBelow: "아래 양식을 작성해 주시면 24시간 내에 답변드리겠습니다",
  yourName: "성함",
  yourEmail: "이메일",
  selectService: "서비스 선택",
  generalInquiry: "일반 문의",
  studyAbroadRelocation: "유학 및 이주",
  fbConsultingService: "F&B 컨설팅",
  bothServices: "두 서비스 모두",
  message: "메시지",
  tellUsAboutGoals: "목표와 저희가 어떻게 도울 수 있는지 알려주세요...",
  sendMessage: "메시지 보내기",
  quickContact: "빠른 연락",
  email: "이메일",
  phoneKorea: "전화 (한국)",
  whatsapp: "왓츠앱",
  bookAConsultation: "상담 예약",
  scheduleFreeConsultation: "목표를 논의하고 개인 맞춤 조언을 받기 위한 무료 15분 상담을 예약하세요.",
  scheduleConsultation: "무료 상담 예약",
  officeHours: "업무 시간",
  mondayFriday: "월요일 - 금요일:",
  saturday: "토요일:",
  sunday: "일요일:",
  closed: "휴무",

  // Footer
  footerDescription: "한국과 그 이상에서 교육과 사업 성공을 위한 신뢰할 수 있는 파트너입니다.",
  quickLinks: "빠른 링크",
  aboutUs: "회사 소개",
  legal: "법적 고지",
  privacyPolicy: "개인정보 보호정책",
  termsOfService: "서비스 약관",
  sitemap: "사이트맵",
  contactInfo: "연락처 정보",
  location: "서울, 대한민국",
  allRightsReserved: "모든 권리 보유.",
  visitsHelp: "학습 방문",

  // Newsletter
  newsletterTitle: "글로벌 기회에 대한 최신 정보 받기",
  newsletterDescription: "최신 장학금 발표, 유학 팁, F&B 업계 인사이트를 받아보세요.",
  enterEmailAddress: "이메일 주소 입력",
  subscribe: "구독",
  newsletterThankYou: "구독해 주셔서 감사합니다!",

  // Testimonials
  successStories: "성공 사례",
  testimonialSubtitle: "성공한 학생들과 비즈니스 파트너들의 이야기를 들어보세요",

  // Partners
  ourTrustedPartners: "신뢰할 수 있는 파트너들",
  partnerDescription: "최고의 기회를 제공하기 위해 선도적인 대학교와 기관들과 협력합니다",

  // Common Categories
  education: "교육",
  business: "비즈니스",
  scholarships: "장학금",

  // Common Actions
  backToHome: "홈으로 돌아가기",

  // Study Programs
  studyProgramsTitle: "한국 유학 프로그램",
  studyProgramsSubtitle: "한국 교육 여정을 위한 종합적인 지원",
  scholarshipGuidanceDesc: "장학금 찾기 및 신청을 위한 완전한 안내",
  universityAdmissionSupport: "대학 입학 지원",
  universityAdmissionSupportDesc: "대학 지원을 위한 전 과정 지원",
  visaApplicationAssistance: "비자 신청 지원",
  visaApplicationAssistanceDesc: "학생 비자 신청에 대한 전문 지원",
  visaDocumentPrep: "비자 서류 준비",
  languagePreparation: "언어 준비",
  languagePreparationDesc: "개인 맞춤 한국어 수업",
  culturalOrientationAndAccommodation: "문화 적응 및 숙박",

  // About Advisor
  professionalSummary: "전문가 요약",
  educationExpertise: "교육 전문성",
  koreanGovernmentScholarshipProgram: "한국 정부 장학금 프로그램 (KGSP)",
  universityAdmissionStrategies: "대학 입학 전략",
  visaApplicationGuidance: "비자 신청 안내",
  koreanLanguagePreparation: "한국어 준비",
  culturalAdaptationSupport: "문화 적응 지원",
  fbExpertise: "F&B 전문성",
  marketAnalysisEntryStrategies: "시장 분석 및 진출 전략",
  productDevelopmentInnovation: "제품 개발 및 혁신",
  supplyChainOptimization: "공급망 최적화",
  businessPlanningFunding: "사업 계획 및 자금 조달",
  keyAchievements: "주요 성과",
  scholarshipSuccessRate: "장학금 성공률",
  getInTouch: "연락하기",
  mondayToFriday: "월요일부터 금요일까지",
  saturdaySunday: "토요일 및 일요일",
  koreanTime: "한국 표준시",
  myMission: "나의 사명",
  missionStatement: "문화를 연결하고 기회를 창출하여 학생들을 한국의 세계적 수준의 교육으로 안내하고 기업가들이 글로벌 시장을 연결하는 성공적인 식품 사업을 구축할 수 있도록 돕는 것입니다.",

  // Book Consultation
  fullName: "성명",
  phone: "전화번호",
  preferredDate: "희망 날짜",
  preferredTime: "희망 시간",
  reviewConsultation: "상담 요청 검토",
  consultationDetails: "상담 세부사항",
  selectedService: "선택한 서비스",
  totalPrice: "총 가격",
  paymentMethods: "결제 방법",
  payWithCard: "신용/직불카드로 결제",
  payWithMobile: "모바일 머니로 결제",
  payWithBank: "은행 송금으로 결제",
  backToEdit: "세부사항 수정으로 돌아가기",
  reviewConsultationRequest: "상담 요청 검토",
  hotelBooking: "호텔 예약 지원",
  phoneConsultation: "전화 상담",

  // WhatsApp Button
  scheduleFreeFifteenMinuteConsultation: "무료 15분 상담 예약",

  // Privacy Policy
  privacyPolicyTitle: "개인정보 보호정책",
  privacyPolicySubtitle: "고객의 개인정보는 저희의 우선순위입니다. 정보를 어떻게 보호하고 처리하는지 알아보세요.",
  informationWeCollect: "수집하는 정보",
  privacyCollectDescription: "다음과 같이 고객이 직접 제공하는 정보를 수집합니다:",
  personalIdentificationInfo: "개인 식별 정보 (이름, 이메일 주소, 전화번호)",
  educationalBackground: "교육 배경 및 학업 기록",
  professionalExperience: "전문 경험 및 사업 관심사",
  communicationPreferences: "커뮤니케이션 선호도 및 피드백",
  howWeUseYourInfo: "정보 사용 방법",
  privacyUseDescription: "수집한 정보를 다음과 같이 사용합니다:",
  providePersonalizedServices: "개인 맞춤 교육 및 사업 컨설팅 서비스 제공",
  processScholarshipApplications: "장학금 신청 및 대학 입학 처리",
  sendRelevantUpdates: "프로그램 및 기회에 대한 관련 업데이트 발송",
  improveServices: "서비스 및 사용자 경험 개선",
  complyLegalObligations: "법적 의무 준수 및 권리 보호",
  dataSecurity: "데이터 보안",
  dataSecurityDescription: "무단 접근, 변경, 공개 또는 파괴로부터 개인정보를 보호하기 위해 업계 표준 보안 조치를 구현합니다. 여기에는 다음이 포함됩니다:",
  encryptedDataTransmission: "암호화된 데이터 전송 및 저장",
  regularSecurityAudits: "정기적인 보안 감사 및 평가",
  accessControls: "접근 제어 및 인증 절차",
  employeeTraining: "데이터 보호 관행에 대한 직원 교육",
  informationSharing: "정보 공유",
  privacySharingDescription: "다음과 같은 경우 정보를 공유할 수 있습니다:",
  educationalInstitutions: "지원 처리를 위한 교육 기관",
  governmentAgencies: "비자 및 장학금 신청을 위한 정부 기관",
  trustedServiceProviders: "운영을 지원하는 신뢰할 수 있는 서비스 제공업체",
  legalAuthorities: "법적으로 요구되는 경우 법적 당국",
  neverSellPersonalInfo: "제3자에게 개인정보를 판매하지 않습니다.",
  yourRights: "고객의 권리",
  yourRightsDescription: "다음과 같은 권리가 있습니다:",
  accessReviewPersonalInfo: "개인정보 접근 및 검토",
  requestCorrections: "부정확한 데이터 수정 요청",
  requestDeletion: "정보 삭제 요청",
  optOutMarketing: "마케팅 커뮤니케이션 거부",
  dataPortability: "데이터 이동성 및 전송",
  lastUpdatedMarch2024: "최종 업데이트: 2024년 3월",
  questionsContact: "문의사항? privacy@kundapathways.com으로 연락주세요",

  // Sitemap
  mainPages: "주요 페이지",
  homepageDescription: "서비스 개요가 포함된 메인 랜딩 페이지",
  aboutDescription: "우리의 사명과 팀에 대해 알아보세요",
  contactDescription: "우리 팀과 연락하세요",
  blogResources: "블로그 및 자료",
  blogDescription: "교육 기사 및 인사이트",
  successStoriesDescription: "최신 기사 및 성공 사례",
  newsletter: "뉴스레터",
  privacyPolicyDescription: "개인정보 보호 방법",
  termsOfServiceDescription: "서비스 이용 약관",
  sitemapDescription: "모든 웹사이트 페이지의 완전한 개요",
  studyInKoreaDescription: "한국 대학교 유학 완전 가이드",
  fbConsultingDescription: "식음료 회사를 위한 비즈니스 컨설팅",
  universityAdmissionsDescription: "대학 입학 지도 및 지원",
  sitemapTitle: "사이트맵",
  sitemapSubtitle: "웹사이트에서 필요한 모든 것을 찾아보세요",
  needHelpFinding: "찾는 데 도움이 필요하신가요?",
  cantFindWhatLooking: "찾고 계신 것을 찾을 수 없나요? 저희 팀이 도와드리겠습니다!",
  contactSupport: "지원팀 연락",
  allPagesMobileResponsive: "모든 페이지는 모바일 반응형이며 검색 엔진에 최적화되어 있습니다",

  // Terms of Service
  termsOfServiceTitle: "서비스 약관",
  termsOfServiceSubtitle: "서비스를 사용하기 전에 이 약관을 주의 깊게 읽어주세요.",
  acceptanceOfTerms: "약관 동의",
  serviceDescription: "서비스 설명",
  kundaPathwaysProvides: "Kunda Pathways는 다음을 제공합니다:",
  educationalConsultingScholarshipGuidance: "교육 컨설팅 및 장학금 안내",
  universityAdmissionAssistance: "대학 입학 지원",
  marketAnalysisBusinessDevelopment: "시장 분석 및 사업 개발 지원",
  visaApplicationRelocation: "비자 신청 및 이주 지원",
  userResponsibilities: "사용자 책임",
  userResponsibilitiesDescription: "서비스 사용자로서 다음에 동의합니다:",
  provideAccurateInfo: "정확하고 완전한 정보 제공",
  maintainAccountConfidentiality: "계정 기밀성 유지",
  useServicesLawfully: "법적으로 윤리적으로 서비스 사용",
  respectIntellectualProperty: "지적 재산권 존중",
  followApplicableLaws: "모든 해당 법률 및 규정 준수",
  limitationsDisclaimers: "제한 사항 및 면책 조항",
  limitationsDescription: "우수성을 위해 노력하지만 다음을 보장할 수 없습니다:",
  successfulAdmission: "교육 기관에 대한 성공적인 입학",
  approvalScholarshipVisa: "장학금 또는 비자 신청 승인",
  specificBusinessOutcomes: "특정 사업 결과 또는 이익",
  availabilityPrograms: "프로그램 또는 기회의 가용성",
  servicesAdvisoryNature: "저희 서비스는 자문 성격이며 성공은 다양한 외부 요인에 따라 달라집니다.",
  paymentRefundPolicy: "결제 및 환불 정책",
  paymentTermsInclude: "결제 조건에는 다음이 포함됩니다:",
  paymentRequiredBeforeService: "서비스 제공 전 결제 필요",
  refundsCaseByCase: "환불은 케이스별로 고려",
  serviceFeesNonRefundable: "작업이 시작된 후 서비스 수수료는 환불되지 않음",
  cancellationsWithin48Hours: "예약 후 48시간 내에 취소해야 함",
  governingLaw: "준거법",
  governingLawDescription: "이 약관은 대한민국 법률에 따라 관리되고 해석됩니다. 이 약관에 따른 모든 분쟁은 대한민국 서울 법원의 전속 관할에 따릅니다.",
  questionsContactLegal: "문의사항? legal@kundapathways.com으로 연락주세요",
  intellectualProperty: "지적 재산권",
  terminationDescription: "종료",
  responsibilitiesDescription: "사용자 책임",
  changesDescription: "약관 변경",
  acceptanceDescription: "Kunda Pathways의 서비스에 접근하고 사용함으로써 이 계약의 조건에 구속되는 것에 동의합니다. 위 사항에 동의하지 않으면 이 서비스를 사용하지 마십시오.",
};

interface LanguageContextType {
  language: 'en' | 'ko';
  setLanguage: (lang: 'en' | 'ko') => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  const translations = language === 'en' ? englishTranslations : koreanTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
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
