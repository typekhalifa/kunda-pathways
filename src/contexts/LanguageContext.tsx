import React, { createContext, useContext, useState } from 'react';

// Define the translation interface
interface Translations {
  // Navigation and basic content
  home: string;
  about: string;
  aboutUs: string;
  services: string;
  contact: string;
  resources: string;
  latest: string;
  viewAllResources: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  learnMore: string;
  exploreStudyPrograms: string;
  studentsAssisted: string;
  foodScienceExpert: string;
  
  // About section
  meetYourGlobalAdvisor: string;
  advisorName: string;
  advisorTitle: string;
  advisorDescription: string;
  readMoreAboutMe: string;
  educationExpert: string;
  educationExpertDesc: string;
  fbConsultant: string;
  fbConsultingDesc: string;
  studentsHelped: string;
  studentsHelpedDesc: string;
  countriesReached: string;
  countriesReachedDesc: string;
  
  // Services section
  servicesTitle: string;
  servicesDescription: string;
  studyInKorea: string;
  studyInKoreaDesc: string;
  fbConsulting: string;
  universityAdmissions: string;
  universityAdmissionsDesc: string;
  marketAnalysis: string;
  marketAnalysisDesc: string;
  scholarshipGuidance: string;
  scholarshipDescription: string;
  scholarshipSearch: string;
  applicationAssistance: string;
  documentPreparation: string;
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
  businessConsultation: string;
  businessDescription: string;
  marketResearch: string;
  businessPlanning: string;
  productDevelopment: string;
  regulatoryCompliance: string;
  fbMarketAnalysis: string;
  visitsHelp: string;
  
  // Testimonials
  successStories: string;
  testimonialSubtitle: string;
  
  // Contact
  contactTitle: string;
  contactSubtitle: string;
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
  bookConsultation: string;
  
  // Footer
  footerDescription: string;
  quickLinks: string;
  legal: string;
  privacyPolicy: string;
  termsOfService: string;
  sitemap: string;
  followUs: string;
  allRightsReserved: string;
  contactInfo: string;
  location: string;
  
  // Blog/Resources
  resourcesBlog: string;
  resourcesDescription: string;
  blogPost1Title: string;
  blogPost1Excerpt: string;
  blogPost2Title: string;
  blogPost2Excerpt: string;
  blogPost3Title: string;
  blogPost3Excerpt: string;
  education: string;
  business: string;
  scholarships: string;
  readMore: string;
  backToHome: string;
  newsletterTitle: string;
  newsletterDescription: string;
  enterEmailAddress: string;
  subscribe: string;
  newsletterThankYou: string;
  
  // Partners
  ourTrustedPartners: string;
  partnerDescription: string;
  
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
  
  // Terms of Service
  termsOfServiceTitle: string;
  termsOfServiceSubtitle: string;
  acceptanceOfTerms: string;
  acceptanceDescription: string;
  serviceDescription: string;
  kundaPathwaysProvides: string;
  educationalConsultingScholarshipGuidance: string;
  universityAdmissionAssistance: string;
  fbBusinessConsulting: string;
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
  
  // Sitemap
  sitemapTitle: string;
  sitemapSubtitle: string;
  mainPages: string;
  homepageDescription: string;
  aboutDescription: string;
  contactDescription: string;
  blogResources: string;
  blogDescription: string;
  successStoriesDescription: string;
  newsletter: string;
  newsletterDescriptionSitemap: string;
  privacyPolicyDescription: string;
  termsOfServiceDescription: string;
  sitemapDescription: string;
  studyInKoreaDescription: string;
  fbConsultingDescription: string;
  universityAdmissionsDescription: string;
  marketAnalysisDescription: string;
  needHelpFinding: string;
  cantFindWhatLooking: string;
  contactSupport: string;
  allPagesMobileResponsive: string;
  
  // Resources specific
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
}

// Define the English translations
const englishTranslations: Translations = {
  // Navigation and basic content
  home: "Home",
  about: "About",
  aboutUs: "About Us",
  services: "Services", 
  contact: "Contact",
  resources: "Resources",
  latest: "Latest",
  viewAllResources: "View All Resources",
  
  // Hero section
  heroTitle: "Your Gateway to Korean Universities & Global F&B Success",
  heroSubtitle: "Expert guidance for African students seeking education in Korea and food entrepreneurs expanding globally",
  getStarted: "Get Started",
  learnMore: "Learn More",
  exploreStudyPrograms: "Explore Study Programs",
  studentsAssisted: "Students Assisted",
  foodScienceExpert: "Food Science Expert",
  
  // About section
  meetYourGlobalAdvisor: "Meet Your Global Advisor",
  advisorName: "Dr. Sarah Johnson",
  advisorTitle: "International Education & F&B Consultant",
  advisorDescription: "With over 10 years of experience connecting African students to Korean universities and helping food businesses expand globally.",
  readMoreAboutMe: "Read More About Me",
  educationExpert: "Education Expert",
  educationExpertDesc: "Specialized guidance for Korean university admissions",
  fbConsultant: "F&B Consultant",
  fbConsultingDesc: "Expert advice for food & beverage businesses",
  studentsHelped: "500+ Students Helped",
  studentsHelpedDesc: "Successfully guided students to Korean universities",
  countriesReached: "15+ Countries Reached",
  countriesReachedDesc: "Students from across Africa benefited",
  
  // Services section
  servicesTitle: "Our Services",
  servicesDescription: "Comprehensive support for your educational and business journey",
  studyInKorea: "Study in Korea",
  studyInKoreaDesc: "Complete guidance for Korean university admissions and scholarships",
  fbConsulting: "F&B Consulting",
  universityAdmissions: "University Admissions",
  universityAdmissionsDesc: "Expert assistance with university applications",
  marketAnalysis: "Market Analysis",
  marketAnalysisDesc: "In-depth market research and business analysis",
  scholarshipGuidance: "Scholarship Guidance",
  scholarshipDescription: "Comprehensive scholarship search and application assistance",
  scholarshipSearch: "Scholarship Search",
  applicationAssistance: "Application Assistance",
  documentPreparation: "Document Preparation",
  universityDescription: "Expert guidance for university admissions",
  universitySelection: "University Selection",
  applicationReview: "Application Review",
  interviewPreparation: "Interview Preparation",
  visaApplication: "Visa Application",
  visaDescription: "Complete visa application support",
  applicationFiling: "Application Filing",
  interviewCoaching: "Interview Coaching",
  koreanLanguageTraining: "Korean Language Training",
  languageDescription: "Professional Korean language instruction",
  topikPreparation: "TOPIK Preparation",
  conversationPractice: "Conversation Practice",
  culturalOrientation: "Cultural Orientation",
  businessConsultation: "Business Consultation",
  businessDescription: "Strategic F&B business consulting",
  marketResearch: "Market Research",
  businessPlanning: "Business Planning",
  productDevelopment: "Product Development",
  regulatoryCompliance: "Regulatory Compliance",
  fbMarketAnalysis: "F&B Market Analysis",
  visitsHelp: "Study Visits",
  
  // Testimonials
  successStories: "Success Stories",
  testimonialSubtitle: "Hear from our satisfied clients who achieved their dreams",
  
  // Contact
  contactTitle: "Get in Touch",
  contactSubtitle: "Ready to start your journey? Contact us today",
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
  bookConsultation: "Book Consultation",
  
  // Footer
  footerDescription: "Connecting African talent with Korean opportunities and global F&B success.",
  quickLinks: "Quick Links",
  legal: "Legal",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  sitemap: "Sitemap",
  followUs: "Follow Us",
  allRightsReserved: "All rights reserved.",
  contactInfo: "Contact Info",
  location: "Seoul, South Korea",
  
  // Blog/Resources
  resourcesBlog: "Resources & Articles",
  resourcesDescription: "Stay updated with scholarship opportunities, industry insights, and success tips",
  blogPost1Title: "Top 10 Korean Universities Offering Scholarships for African Students",
  blogPost1Excerpt: "Discover the best opportunities for funded education in South Korea...",
  blogPost2Title: "Breaking into the Korean F&B Market: A Complete Guide",
  blogPost2Excerpt: "Everything you need to know about food business regulations in Korea...",
  blogPost3Title: "KGSP 2024: Application Tips and Deadlines",
  blogPost3Excerpt: "Get insider tips for the Korean Government Scholarship Program...",
  education: "Education",
  business: "Business",
  scholarships: "Scholarships",
  readMore: "Read More",
  backToHome: "Back to Home",
  newsletterTitle: "Stay Updated with Global Opportunities",
  newsletterDescription: "Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.",
  enterEmailAddress: "Enter your email address",
  subscribe: "Subscribe",
  newsletterThankYou: "Thank you for subscribing!",
  
  // Partners
  ourTrustedPartners: "Our Trusted Partners",
  partnerDescription: "Working with leading institutions and organizations worldwide",
  
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
  
  // Terms of Service
  termsOfServiceTitle: "Terms of Service",
  termsOfServiceSubtitle: "Please read these terms carefully before using our services.",
  acceptanceOfTerms: "Acceptance of Terms",
  acceptanceDescription: "By accessing and using Kunda Pathways' services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
  serviceDescription: "Service Description",
  kundaPathwaysProvides: "Kunda Pathways provides:",
  educationalConsultingScholarshipGuidance: "Educational consulting and scholarship guidance",
  universityAdmissionAssistance: "University admission assistance",
  fbBusinessConsulting: "Food & beverage business consulting",
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
  
  // Sitemap
  sitemapTitle: "Site Map",
  sitemapSubtitle: "Complete navigation guide to all pages and sections of our website.",
  mainPages: "Main Pages",
  homepageDescription: "Homepage with company overview",
  aboutDescription: "Learn about our company and mission",
  contactDescription: "Get in touch with our team",
  blogResources: "Blog/Resources",
  blogDescription: "Latest articles and educational resources",
  successStoriesDescription: "Client testimonials and case studies",
  newsletter: "Newsletter",
  newsletterDescriptionSitemap: "Subscribe to our updates",
  privacyPolicyDescription: "How we handle your data",
  termsOfServiceDescription: "Terms and conditions of service",
  sitemapDescription: "Complete site navigation",
  studyInKoreaDescription: "Educational consulting and scholarship guidance",
  fbConsultingDescription: "Food & beverage business consulting",
  universityAdmissionsDescription: "Assistance with university applications",
  marketAnalysisDescription: "Business market research and analysis",
  needHelpFinding: "Need Help Finding Something?",
  cantFindWhatLooking: "Can't find what you're looking for? Our team is here to help you navigate our services.",
  contactSupport: "Contact Support",
  allPagesMobileResponsive: "All pages are mobile-responsive and accessibility-friendly",
  
  // Resources specific
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
};

// Define Korean translations
const koreanTranslations: Translations = {
  // Navigation and basic content
  home: "홈",
  about: "소개",
  aboutUs: "회사 소개",
  services: "서비스",
  contact: "연락처",
  resources: "자료",
  latest: "최신",
  viewAllResources: "모든 자료 보기",
  
  // Hero section
  heroTitle: "한국 대학교와 글로벌 F&B 성공으로의 관문",
  heroSubtitle: "한국에서 교육을 추구하는 아프리카 학생들과 글로벌로 확장하는 식품 기업가들을 위한 전문 지침",
  getStarted: "시작하기",
  learnMore: "더 알아보기",
  exploreStudyPrograms: "유학 프로그램 탐색",
  studentsAssisted: "지원된 학생 수",
  foodScienceExpert: "식품과학 전문가",
  
  // About section
  meetYourGlobalAdvisor: "글로벌 어드바이저 만나기",
  advisorName: "Dr. Sarah Johnson",
  advisorTitle: "국제 교육 및 F&B 컨설턴트",
  advisorDescription: "아프리카 학생들을 한국 대학교와 연결하고 식품 사업체가 글로벌로 확장하는 데 도움을 주는 10년 이상의 경험을 보유하고 있습니다.",
  readMoreAboutMe: "더 자세히 알아보기",
  educationExpert: "교육 전문가",
  educationExpertDesc: "한국 대학교 입학을 위한 전문적인 지침",
  fbConsultant: "F&B 컨설턴트",
  fbConsultingDesc: "식음료 비즈니스를 위한 전문적인 조언",
  studentsHelped: "500명 이상의 학생 도움",
  studentsHelpedDesc: "한국 대학교로 성공적으로 안내한 학생들",
  countriesReached: "15개국 이상 도달",
  countriesReachedDesc: "아프리카 전역의 학생들이 혜택을 받았습니다",
  
  // Services section  
  servicesTitle: "우리의 서비스",
  servicesDescription: "교육 및 비즈니스 여정을 위한 포괄적인 지원",
  studyInKorea: "한국 유학",
  studyInKoreaDesc: "한국 대학교 입학 및 장학금을 위한 완전한 지침",
  fbConsulting: "F&B 컨설팅",
  universityAdmissions: "대학교 입학",
  universityAdmissionsDesc: "대학교 지원을 위한 전문적인 도움",
  marketAnalysis: "시장 분석",
  marketAnalysisDesc: "심층적인 시장 조사 및 비즈니스 분석",
  scholarshipGuidance: "장학금 안내",
  scholarshipDescription: "포괄적인 장학금 검색 및 지원 도움",
  scholarshipSearch: "장학금 검색",
  applicationAssistance: "지원 도움",
  documentPreparation: "서류 준비",
  universityDescription: "대학교 입학을 위한 전문 지침",
  universitySelection: "대학교 선택",
  applicationReview: "지원서 검토",
  interviewPreparation: "면접 준비",
  visaApplication: "비자 신청",
  visaDescription: "완전한 비자 신청 지원",
  applicationFiling: "신청서 제출",
  interviewCoaching: "면접 코칭",
  koreanLanguageTraining: "한국어 교육",
  languageDescription: "전문 한국어 교육",
  topikPreparation: "TOPIK 준비",
  conversationPractice: "회화 연습",
  culturalOrientation: "문화 오리엔테이션",
  businessConsultation: "비즈니스 컨설팅",
  businessDescription: "전략적 F&B 비즈니스 컨설팅",
  marketResearch: "시장 조사",
  businessPlanning: "사업 계획",
  productDevelopment: "제품 개발",
  regulatoryCompliance: "규제 준수",
  fbMarketAnalysis: "F&B 시장 분석",
  visitsHelp: "학습 방문",
  
  // Testimonials
  successStories: "성공 스토리",
  testimonialSubtitle: "꿈을 이룬 만족한 고객들의 이야기를 들어보세요",
  
  // Contact
  contactTitle: "연락하기",
  contactSubtitle: "여정을 시작할 준비가 되셨나요? 오늘 연락하세요",
  letsStartYourJourney: "여정을 시작해보세요",
  readyToTakeNextStep: "다음 단계를 밟을 준비가 되셨나요? 무료 상담을 위해 연락하세요",
  sendUsMessage: "메시지 보내기",
  fillFormBelow: "아래 양식을 작성하시면 24시간 내에 답변드리겠습니다",
  yourName: "성함",
  yourEmail: "이메일",
  selectService: "서비스 선택",
  generalInquiry: "일반 문의",
  studyAbroadRelocation: "유학 및 이주",
  fbConsultingService: "F&B 컨설팅",
  bothServices: "모든 서비스",
  message: "메시지",
  tellUsAboutGoals: "목표와 도움이 필요한 사항을 알려주세요...",
  sendMessage: "메시지 보내기",
  quickContact: "빠른 연락",
  email: "이메일",
  phoneKorea: "전화 (한국)",
  whatsapp: "왓츠앱",
  bookAConsultation: "상담 예약",
  scheduleFreeConsultation: "목표를 논의하고 개인 맞춤 조언을 받기 위한 무료 15분 상담을 예약하세요.",
  scheduleConsultation: "무료 상담 예약",
  officeHours: "운영 시간",
  mondayFriday: "월요일 - 금요일:",
  saturday: "토요일:",
  sunday: "일요일:",
  closed: "휴무",
  bookConsultation: "상담 예약",
  
  // Footer
  footerDescription: "아프리카 인재를 한국 기회와 글로벌 F&B 성공으로 연결합니다.",
  quickLinks: "빠른 링크",
  legal: "법적 고지",
  privacyPolicy: "개인정보 보호정책",
  termsOfService: "서비스 약관",
  sitemap: "사이트맵",
  followUs: "팔로우하기",
  allRightsReserved: "모든 권리 보유.",
  contactInfo: "연락처 정보",
  location: "서울, 대한민국",
  
  // Blog/Resources
  resourcesBlog: "자료 및 기사",
  resourcesDescription: "장학금 기회, 업계 통찰력 및 성공 팁으로 최신 정보를 유지하세요",
  blogPost1Title: "아프리카 학생들에게 장학금을 제공하는 한국 대학교 상위 10곳",
  blogPost1Excerpt: "한국에서 자금 지원 교육을 위한 최고의 기회를 발견하세요...",
  blogPost2Title: "한국 F&B 시장 진출: 완벽한 가이드",
  blogPost2Excerpt: "한국의 식품 사업 규정에 대해 알아야 할 모든 것...",
  blogPost3Title: "KGSP 2024: 지원 팁 및 마감일",
  blogPost3Excerpt: "한국정부장학금 프로그램의 내부자 팁을 얻으세요...",
  education: "교육",
  business: "비즈니스",
  scholarships: "장학금",
  readMore: "더 읽기",
  backToHome: "홈으로 돌아가기",
  newsletterTitle: "글로벌 기회에 대한 최신 정보 받기",
  newsletterDescription: "최신 장학금 발표, 해외 유학 팁 및 F&B 업계 통찰력을 받은편지함으로 받아보세요.",
  enterEmailAddress: "이메일 주소를 입력하세요",
  subscribe: "구독하기",
  newsletterThankYou: "구독해 주셔서 감사합니다!",
  
  // Partners
  ourTrustedPartners: "신뢰할 수 있는 파트너",
  partnerDescription: "전 세계 주요 기관 및 조직과 협력",
  
  // Privacy Policy
  privacyPolicyTitle: "개인정보 보호정책",
  privacyPolicySubtitle: "귀하의 개인정보는 우리의 우선순위입니다. 귀하의 정보를 어떻게 보호하고 처리하는지 알아보세요.",
  informationWeCollect: "수집하는 정보",
  privacyCollectDescription: "다음과 같이 귀하가 직접 제공하는 정보를 수집합니다:",
  personalIdentificationInfo: "개인 식별 정보(이름, 이메일 주소, 전화번호)",
  educationalBackground: "교육 배경 및 학업 기록",
  professionalExperience: "전문적인 경험 및 비즈니스 관심사",
  communicationPreferences: "커뮤니케이션 선호도 및 피드백",
  howWeUseYourInfo: "정보 사용 방법",
  privacyUseDescription: "수집한 정보를 다음과 같이 사용합니다:",
  providePersonalizedServices: "개인화된 교육 및 비즈니스 컨설팅 서비스 제공",
  processScholarshipApplications: "장학금 신청 및 대학교 입학 처리",
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
  privacySharingDescription: "다음과 정보를 공유할 수 있습니다:",
  educationalInstitutions: "지원 처리를 위한 교육 기관",
  governmentAgencies: "비자 및 장학금 신청을 위한 정부 기관",
  trustedServiceProviders: "운영을 지원하는 신뢰할 수 있는 서비스 제공업체",
  legalAuthorities: "법적으로 요구되는 경우 법적 당국",
  neverSellPersonalInfo: "제3자에게 개인정보를 판매하지 않습니다.",
  yourRights: "귀하의 권리",
  yourRightsDescription: "다음과 같은 권리가 있습니다:",
  accessReviewPersonalInfo: "개인정보 액세스 및 검토",
  requestCorrections: "부정확한 데이터의 수정 요청",
  requestDeletion: "정보 삭제 요청",
  optOutMarketing: "마케팅 커뮤니케이션 거부",
  dataPortability: "데이터 이동성 및 전송",
  lastUpdatedMarch2024: "최종 업데이트: 2024년 3월",
  questionsContact: "문의사항이 있으시면 privacy@kundapathways.com으로 연락하세요",
  
  // Terms of Service
  termsOfServiceTitle: "서비스 약관",
  termsOfServiceSubtitle: "서비스를 사용하기 전에 이 약관을 주의 깊게 읽어주세요.",
  acceptanceOfTerms: "약관 동의",
  acceptanceDescription: "Kunda Pathways의 서비스에 액세스하고 사용함으로써 이 계약의 약관과 조항에 구속되는 것에 동의합니다. 위의 사항에 동의하지 않는다면 이 서비스를 사용하지 마십시오.",
  serviceDescription: "서비스 설명",
  kundaPathwaysProvides: "Kunda Pathways는 다음을 제공합니다:",
  educationalConsultingScholarshipGuidance: "교육 컨설팅 및 장학금 지침",
  universityAdmissionAssistance: "대학교 입학 지원",
  fbBusinessConsulting: "식음료 비즈니스 컨설팅",
  marketAnalysisBusinessDevelopment: "시장 분석 및 비즈니스 개발 지원",
  visaApplicationRelocation: "비자 신청 및 이주 지원",
  userResponsibilities: "사용자 책임",
  userResponsibilitiesDescription: "서비스 사용자로서 다음에 동의합니다:",
  provideAccurateInfo: "정확하고 완전한 정보 제공",
  maintainAccountConfidentiality: "계정의 기밀성 유지",
  useServicesLawfully: "합법적인 목적으로만 서비스 사용",
  respectIntellectualProperty: "지적 재산권 존중",
  followApplicableLaws: "모든 해당 법률 및 규정 준수",
  limitationsDisclaimers: "제한사항 및 면책조항",
  limitationsDescription: "정확한 정보와 양질의 서비스를 제공하기 위해 노력하지만 다음을 보장할 수 없습니다:",
  successfulAdmission: "교육 기관 입학 성공",
  approvalScholarshipVisa: "장학금 또는 비자 신청 승인",
  specificBusinessOutcomes: "특정 비즈니스 결과 또는 수익",
  availabilityPrograms: "프로그램 또는 기회의 가용성",
  servicesAdvisoryNature: "우리의 서비스는 자문 성격이며 성공은 다양한 외부 요인에 따라 달라집니다.",
  paymentRefundPolicy: "결제 및 환불 정책",
  paymentTermsInclude: "결제 조건에는 다음이 포함됩니다:",
  paymentRequiredBeforeService: "서비스 제공 전 결제 필요",
  refundsCaseByCase: "환불은 사례별로 고려됩니다",
  serviceFeesNonRefundable: "작업이 시작된 후 서비스 수수료는 환불되지 않습니다",
  cancellationsWithin48Hours: "예약 후 48시간 이내에 취소해야 합니다",
  governingLaw: "준거법",
  governingLawDescription: "이 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 이 약관에 따른 모든 분쟁은 대한민국 서울 법원의 전속 관할권에 속합니다.",
  questionsContactLegal: "문의사항이 있으시면 legal@kundapathways.com으로 연락하세요",
  
  // Sitemap
  sitemapTitle: "사이트맵",
  sitemapSubtitle: "웹사이트의 모든 페이지와 섹션에 대한 완전한 탐색 가이드입니다.",
  mainPages: "주요 페이지",
  homepageDescription: "회사 개요가 포함된 홈페이지",
  aboutDescription: "회사와 미션에 대해 알아보기",
  contactDescription: "팀과 연락하기",
  blogResources: "블로그/자료",
  blogDescription: "최신 기사 및 교육 자료",
  successStoriesDescription: "고객 추천사 및 사례 연구",
  newsletter: "뉴스레터",
  newsletterDescriptionSitemap: "업데이트 구독하기",
  privacyPolicyDescription: "데이터 처리 방법",
  termsOfServiceDescription: "서비스 이용약관",
  sitemapDescription: "완전한 사이트 탐색",
  studyInKoreaDescription: "교육 컨설팅 및 장학금 지침",
  fbConsultingDescription: "식음료 비즈니스 컨설팅",
  universityAdmissionsDescription: "대학교 지원 도움",
  marketAnalysisDescription: "비즈니스 시장 조사 및 분석",
  needHelpFinding: "찾는 것을 도와드릴까요?",
  cantFindWhatLooking: "찾고 있는 것을 찾을 수 없나요? 저희 팀이 서비스 탐색을 도와드리겠습니다.",
  contactSupport: "지원팀 연락하기",
  allPagesMobileResponsive: "모든 페이지는 모바일 반응형이며 접근성 친화적입니다",
  
  // Resources specific
  eightMinRead: "8분 읽기",
  march152024: "2024년 3월 15일",
  twelveMinRead: "12분 읽기",
  march102024: "2024년 3월 10일",
  sixMinRead: "6분 읽기",
  march52024: "2024년 3월 5일",
  visaApplicationProcess: "한국 대학교 비자 신청 절차",
  visaApplicationExcerpt: "한국 학생 비자를 성공적으로 취득하기 위한 단계별 가이드...",
  tenMinRead: "10분 읽기",
  february282024: "2024년 2월 28일",
  foodSafetyRegulations: "아시아 시장의 식품 안전 규정",
  foodSafetyExcerpt: "아시아로 확장하는 F&B 비즈니스의 규정 준수 요구사항 이해...",
  fifteenMinRead: "15분 읽기",
  february202024: "2024년 2월 20일",
  culturalAdaptationGuide: "국제 학생을 위한 문화 적응 가이드",
  culturalAdaptationExcerpt: "한국 문화와 학업 환경에 적응하기 위한 필수 팁...",
  sevenMinRead: "7분 읽기",
  february152024: "2024년 2월 15일",
  johnDoe: "홍길동",
};

// Language context
interface LanguageContextType {
  language: 'en' | 'ko';
  setLanguage: (lang: 'en' | 'ko') => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
