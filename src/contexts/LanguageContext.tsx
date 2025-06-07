import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Translations {
  // Navigation & Header
  home: string;
  about: string;
  services: string;
  contact: string;
  studyInKorea: string;
  fbConsulting: string;
  businessConsultation: string;
  koreanLanguageTraining: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  exploreStudyPrograms: string;
  
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
  studentsHelped: string;
  studentsHelpedDesc: string;
  countriesReached: string;
  countriesReachedDesc: string;
  
  // Services
  ourServices: string;
  scholarshipGuidance: string;
  scholarshipGuidanceDesc: string;
  scholarshipDescription: string;
  universityAdmissions: string;
  universityAdmissionsDesc: string;
  universityAdmissionSupport: string;
  universityAdmissionSupportDesc: string;
  universityDescription: string;
  visaDescription: string;
  marketAnalysis: string;
  marketAnalysisDescription: string;
  fbMarketAnalysis: string;
  productDevelopment: string;
  productDescription: string;
  regulatoryCompliance: string;
  complianceDescription: string;
  strategyDevelopment: string;
  marketSizing: string;
  competitorAnalysis: string;
  trendIdentification: string;
  recipeDevelopment: string;
  productTesting: string;
  safetyStandards: string;
  certificationSupport: string;
  complianceAudits: string;
  startYourJourney: string;
  letsStartYourJourney: string;
  getExpertConsultation: string;
  journeyDescription: string;
  getFullConsultation: string;
  viewAllPackagesPricing: string;
  languageDescription: string;
  culturalOrientation: string;
  businessDescription: string;
  marketResearch: string;
  
  // Study Programs
  studyProgramsTitle: string;
  studyProgramsSubtitle: string;
  visaApplicationAssistance: string;
  visaApplicationAssistanceDesc: string;
  languagePreparation: string;
  languagePreparationDesc: string;
  applicationAssistance: string;
  documentPreparation: string;
  scholarshipSearch: string;
  universitySelection: string;
  applicationReview: string;
  interviewPreparation: string;
  visaDocumentPrep: string;
  applicationFiling: string;
  interviewCoaching: string;
  topikPreparation: string;
  conversationPractice: string;
  culturalOrientationAndAccommodation: string;
  bookConsultation: string;
  
  // Contact Section
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
  phoneKorea: string;
  whatsapp: string;
  bookAConsultation: string;
  scheduleFreeConsultation: string;
  scheduleConsultation: string;
  saturday: string;
  sunday: string;
  
  // About Advisor Page
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
  studentsAssisted: string;
  scholarshipSuccessRate: string;
  getInTouch: string;
  officeHours: string;
  mondayToFriday: string;
  mondayFriday: string;
  saturdaySunday: string;
  closed: string;
  koreanTime: string;
  myMission: string;
  missionStatement: string;
  
  // Testimonials
  successStories: string;
  testimonialSubtitle: string;
  
  // Newsletter
  newsletterTitle: string;
  newsletterDescription: string;
  enterEmailAddress: string;
  subscribe: string;
  newsletterThankYou: string;
  newsletter: string;
  
  // Footer
  footerDescription: string;
  quickLinks: string;
  aboutUs: string;
  resourcesBlog: string;
  blogResources: string;
  legal: string;
  privacyPolicy: string;
  termsOfService: string;
  sitemap: string;
  contactInfo: string;
  location: string;
  allRightsReserved: string;
  visitsHelp: string;
  
  // Resources/Blog
  latest: string;
  resources: string;
  resourcesDescription: string;
  education: string;
  business: string;
  scholarships: string;
  blogPost1Title: string;
  blogPost1Excerpt: string;
  blogPost2Title: string;
  blogPost2Excerpt: string;
  blogPost3Title: string;
  blogPost3Excerpt: string;
  readMore: string;
  viewAllResources: string;
  eightMinRead: string;
  twelveMinRead: string;
  sixMinRead: string;
  march152024: string;
  march102024: string;
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
  
  // Common
  backToHome: string;
  phone: string;
  email: string;
  scheduleFreeFifteenMinuteConsultation: string;
  foodScienceExpert: string;
  
  // Privacy Policy
  privacyPolicyTitle: string;
  privacyPolicySubtitle: string;
  privacyPolicyDescription: string;
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
  termsOfServiceDescription: string;
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
  servicesDescription: string;
  contactDescription: string;
  blogDescription: string;
  successStoriesDescription: string;
  studyInKoreaDescription: string;
  fbConsultingDescription: string;
  universityAdmissionsDescription: string;
  sitemapDescription: string;
  needHelpFinding: string;
  cantFindWhatLooking: string;
  contactSupport: string;
  allPagesMobileResponsive: string;
  
  // Booking
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
  preferredDate: string;
  preferredTime: string;
  reviewConsultationRequest: string;
  
  // Partners
  ourTrustedPartners: string;
  partnerDescription: string;
  
  // Business Planning
  businessPlanning: string;
  
  // Visa
  visaApplication: string;
  
  // Additional keys for better translation support
  selectSubject: string;
  messageSent: string;
  bookAConsultation: string;
  businessHours: string;
  mondayFriday: string;
  closed: string;
  aboutDescription: string;
  ourMission: string;
  missionDescription: string;
  personalizedGuidance: string;
  expertConsultation: string;
  endToEndSupport: string;
  meetYourGlobalAdvisor: string;
  internationalEducationExpert: string;
  successfulStudents: string;
  businessesHelped: string;
  scholarshipSuccessRate: string;
  yearsExperience: string;
  marketEntryStrategy: string;
  productDevelopmentService: string;
  supplyChainOptimization: string;
  brandLocalization: string;
  partnershipDistribution: string;
  completeMarketEntry: string;
  whyChooseUs: string;
  mscFoodScienceExpert: string;
  experienceDescription: string;
  successfulProjectsDescription: string;
  specialPackageDeals: string;
  mostPopular: string;
  studyAbroadComplete: string;
  fbMarketEntryComplete: string;
  studentFbCombo: string;
  additionalServicesTitle: string;
  hotelBookingAssistance: string;
  phoneConsultationService: string;
  airportPickupService: string;
  culturalOrientationService: string;
  needCustomSolution: string;
  getCustomQuote: string;
}

const translations: Record<string, Translations> = {
  EN: {
    // Navigation & Header
    home: "Home",
    about: "About",
    services: "Services", 
    contact: "Contact",
    studyInKorea: "Study in Korea",
    fbConsulting: "F&B Consulting",
    businessConsultation: "Business Consultation",
    koreanLanguageTraining: "Korean Language Training",
    
    // Hero Section
    heroTitle: "Your Gateway to Korean Education and Global Business Success",
    heroSubtitle: "Expert guidance for African students seeking Korean education and entrepreneurs expanding into Asian F&B markets",
    exploreStudyPrograms: "Explore Study Programs",
    
    // About Section
    meetYourGlobalAdvisor: "Meet Your Global Advisor",
    advisorName: "Mr. Jean HAGABA",
    advisorTitle: "Global Education & F&B Consultant", 
    advisorDescription: "With over 5 years of experience in international education consulting and F&B business development, I specialize in helping students achieve their academic dreams in Korea while also supporting entrepreneurs in navigating the Asian F&B market.",
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
    ourServices: "Our Services",
    scholarshipGuidance: "Scholarship Guidance",
    scholarshipGuidanceDesc: "Complete assistance with scholarship applications and funding opportunities",
    scholarshipDescription: "Complete assistance with scholarship applications and funding opportunities",
    universityAdmissions: "University Admissions",
    universityAdmissionsDesc: "Expert guidance through the university application process",
    universityAdmissionSupport: "University Admission Support",
    universityAdmissionSupportDesc: "Comprehensive support for university applications and admissions",
    universityDescription: "Expert guidance through the university application process",
    visaDescription: "Complete support for visa application and documentation",
    marketAnalysis: "Market Analysis",
    marketAnalysisDescription: "In-depth market research and analysis for business expansion",
    fbMarketAnalysis: "F&B Market Analysis",
    productDevelopment: "Product Development",
    productDescription: "Innovation and development of food products for market success",
    regulatoryCompliance: "Regulatory Compliance",
    complianceDescription: "Ensuring compliance with local regulations and standards",
    strategyDevelopment: "Strategy Development",
    marketSizing: "Market Sizing",
    competitorAnalysis: "Competitor Analysis", 
    trendIdentification: "Trend Identification",
    recipeDevelopment: "Recipe Development",
    productTesting: "Product Testing",
    safetyStandards: "Safety Standards",
    certificationSupport: "Certification Support",
    complianceAudits: "Compliance Audits",
    startYourJourney: "Start Your Journey",
    letsStartYourJourney: "Let's Start Your Journey",
    getExpertConsultation: "Get Expert Consultation",
    journeyDescription: "Begin your path to success with our expert guidance",
    getFullConsultation: "Get Full Consultation",
    viewAllPackagesPricing: "View All Packages & Pricing",
    languageDescription: "Korean language training and cultural preparation",
    culturalOrientation: "Cultural Orientation",
    businessDescription: "Expert advice for food & beverage businesses",
    marketResearch: "Market Research",
    
    // Study Programs
    studyProgramsTitle: "Study Programs & Services",
    studyProgramsSubtitle: "Comprehensive support for your Korean education journey",
    visaApplicationAssistance: "Visa Application Assistance",
    visaApplicationAssistanceDesc: "Complete support for visa application and documentation",
    languagePreparation: "Language Preparation",
    languagePreparationDesc: "Korean language training and cultural preparation",
    applicationAssistance: "Application Assistance",
    documentPreparation: "Document Preparation",
    scholarshipSearch: "Scholarship Search",
    universitySelection: "University Selection",
    applicationReview: "Application Review",
    interviewPreparation: "Interview Preparation",
    visaDocumentPrep: "Visa Document Preparation",
    applicationFiling: "Application Filing",
    interviewCoaching: "Interview Coaching",
    topikPreparation: "TOPIK Preparation",
    conversationPractice: "Conversation Practice",
    culturalOrientationAndAccommodation: "Cultural Orientation & Accommodation",
    bookConsultation: "Book Consultation",
    
    // Contact Section
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
    phoneKorea: "Phone (Korea)",
    whatsapp: "WhatsApp",
    bookAConsultation: "Book a Consultation",
    scheduleFreeConsultation: "Schedule a free 15-minute consultation to discuss your goals and get personalized advice.",
    scheduleConsultation: "Schedule Free Consultation",
    saturday: "Saturday",
    sunday: "Sunday",
    
    // About Advisor Page
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
    studentsAssisted: "Students Assisted",
    scholarshipSuccessRate: "Scholarship Success Rate",
    getInTouch: "Get in Touch",
    officeHours: "Office Hours",
    mondayToFriday: "Monday to Friday",
    mondayFriday: "Monday - Friday",
    saturdaySunday: "Saturday & Sunday",
    closed: "Closed",
    koreanTime: "Korean Standard Time",
    myMission: "My Mission",
    missionStatement: "To bridge cultures and create opportunities by guiding students towards world-class education in Korea and helping entrepreneurs build successful food businesses that connect global markets.",
    
    // Testimonials
    successStories: "Success Stories",
    testimonialSubtitle: "Hear from our satisfied clients who achieved their dreams",
    
    // Newsletter
    newsletterTitle: "Stay Updated with Global Opportunities",
    newsletterDescription: "Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.",
    enterEmailAddress: "Enter your email address",
    subscribe: "Subscribe",
    newsletterThankYou: "Thank you for subscribing! Check your email for updates.",
    newsletter: "Newsletter",
    
    // Footer
    footerDescription: "Your trusted partner for Korean education and global F&B business success.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    resourcesBlog: "Resources & Blog",
    blogResources: "Blog & Resources",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    sitemap: "Sitemap",
    contactInfo: "Contact Info",
    location: "Seoul, South Korea",
    allRightsReserved: "All rights reserved.",
    visitsHelp: "Visa & Relocation Help",
    
    // Resources/Blog
    latest: "Latest",
    resources: "Resources",
    resourcesDescription: "Stay updated with scholarship opportunities, industry insights, and success tips",
    education: "Education",
    business: "Business",
    scholarships: "Scholarships",
    blogPost1Title: "Top 10 Korean Universities Offering Scholarships for African Students",
    blogPost1Excerpt: "Discover the best opportunities for funded education in South Korea...",
    blogPost2Title: "Breaking into the Korean F&B Market: A Complete Guide",
    blogPost2Excerpt: "Everything you need to know about food business regulations in Korea...",
    blogPost3Title: "KGSP 2024: Application Tips and Deadlines",
    blogPost3Excerpt: "Get insider tips for the Korean Government Scholarship Program...",
    readMore: "Read More",
    viewAllResources: "View All Resources",
    eightMinRead: "8 min read",
    twelveMinRead: "12 min read", 
    sixMinRead: "6 min read",
    march152024: "March 15, 2024",
    march102024: "March 10, 2024",
    march52024: "March 5, 2024",
    visaApplicationProcess: "Visa Application Process for Korean Universities",
    visaApplicationExcerpt: "Step-by-step guide to successfully obtaining your student visa for Korea...",
    tenMinRead: "10 min read",
    february282024: "February 28, 2024",
    foodSafetyRegulations: "Food Safety Regulations in Asian Markets",
    foodSafetyExcerpt: "Understanding compliance requirements for F&B businesses expanding into Asia...",
    fifteenMinRead: "15 min read",
    february202024: "February 20, 2020",
    culturalAdaptationGuide: "Cultural Adaptation Guide for International Students",
    culturalAdaptationExcerpt: "Essential tips for adapting to Korean culture and academic environment...",
    sevenMinRead: "7 min read",
    february152024: "February 15, 2024",
    johnDoe: "Jean HAGABA",
    
    // Common
    backToHome: "Back to Home",
    phone: "Phone",
    email: "Email",
    scheduleFreeFifteenMinuteConsultation: "Schedule Free 15-min Consultation",
    foodScienceExpert: "Food Science Expert",
    
    // Privacy Policy
    privacyPolicyTitle: "Privacy Policy",
    privacyPolicySubtitle: "Your privacy is our priority. Learn how we protect and handle your information.",
    privacyPolicyDescription: "How we handle your data",
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
    termsOfServiceDescription: "Terms and conditions of service",
    acceptanceOfTerms: "Acceptance of Terms",
    acceptanceDescription: "By accessing and using Kunda Pathways' services, you accept and agree to be bound by the terms and provision of this agreement.",
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
    governingLawDescription: "These terms shall be governed by and construed in accordance with the laws of South Korea.",
    questionsContactLegal: "Questions? Contact us at legal@kundapathways.com",
    
    // Sitemap
    sitemapTitle: "Site Map",
    sitemapSubtitle: "Complete navigation guide to all pages and sections of our website.",
    mainPages: "Main Pages",
    homepageDescription: "Homepage with company overview",
    aboutDescription: "Learn about our company and mission",
    servicesDescription: "Our educational and business services",
    contactDescription: "Get in touch with our team",
    blogDescription: "Latest articles and educational resources",
    successStoriesDescription: "Client testimonials and case studies",
    studyInKoreaDescription: "Educational consulting and scholarship guidance",
    fbConsultingDescription: "Food & beverage business consulting",
    universityAdmissionsDescription: "Assistance with university applications",
    sitemapDescription: "Complete site navigation",
    needHelpFinding: "Need Help Finding Something?",
    cantFindWhatLooking: "Can't find what you're looking for? Our team is here to help you navigate our services.",
    contactSupport: "Contact Support",
    allPagesMobileResponsive: "All pages are mobile-responsive and accessibility-friendly",
    
    // Booking
    hotelBooking: "Hotel Booking",
    phoneConsultation: "Phone Consultation",
    reviewConsultation: "Review Consultation",
    consultationDetails: "Consultation Details",
    fullName: "Full Name",
    selectedService: "Selected Service",
    totalPrice: "Total Price",
    paymentMethods: "Payment Methods",
    payWithCard: "Pay with Card",
    payWithMobile: "Pay with Mobile",
    payWithBank: "Pay with Bank",
    backToEdit: "Back to Edit",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time",
    reviewConsultationRequest: "Review Consultation Request",
    
    // Partners
    ourTrustedPartners: "Our Trusted Partners",
    partnerDescription: "We work with leading institutions and organizations",
    
    // Business Planning
    businessPlanning: "Business Planning",
    
    // Visa
    visaApplication: "Visa Application",
    
    // Additional translations
    selectSubject: "Select a subject",
    messageSent: "Message sent successfully!",
    bookAConsultation: "Book a Consultation",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday",
    closed: "Closed",
    aboutDescription: "Empowering dreams through education and business excellence. We bridge cultures and create opportunities for global success.",
    ourMission: "Our Mission",
    missionDescription: "To provide comprehensive, personalized guidance that transforms educational aspirations and business ventures into successful realities. We believe in the power of quality education and strategic business planning to change lives.",
    personalizedGuidance: "Personalized guidance tailored to your unique goals",
    expertConsultation: "Expert consultation with proven track record",
    endToEndSupport: "End-to-end support throughout your journey",
    meetYourGlobalAdvisor: "Meet Your Global Advisor",
    internationalEducationExpert: "International Education & F&B Expert",
    successfulStudents: "Successful Students",
    businessesHelped: "Businesses Helped",
    scholarshipSuccessRate: "Scholarship Success Rate",
    yearsExperience: "Years Experience",
    marketEntryStrategy: "Market Entry Strategy",
    productDevelopmentService: "Product Development",
    supplyChainOptimization: "Supply Chain Optimization", 
    brandLocalization: "Brand Localization",
    partnershipDistribution: "Partnership & Distribution",
    completeMarketEntry: "Complete Market Entry Package",
    whyChooseUs: "Why Choose Us",
    mscFoodScienceExpert: "MSc Food Science Expert",
    experienceDescription: "8+ Years Experience",
    successfulProjectsDescription: "50+ Successful Projects",
    specialPackageDeals: "Special Package Deals",
    mostPopular: "MOST POPULAR",
    studyAbroadComplete: "Study Abroad Complete Package",
    fbMarketEntryComplete: "F&B Market Entry Complete",
    studentFbCombo: "Student + F&B Combo",
    additionalServicesTitle: "Additional Services",
    hotelBookingAssistance: "Hotel Booking Assistance",
    phoneConsultationService: "Phone Consultation",
    airportPickupService: "Airport Pickup Service",
    culturalOrientationService: "Cultural Orientation",
    needCustomSolution: "Need a Custom Solution?",
    getCustomQuote: "Get Custom Quote",
  },
  FR: {
    // Navigation & Header
    home: "Accueil",
    about: "À propos",
    services: "Services", 
    contact: "Contact",
    studyInKorea: "Étudier en Corée",
    fbConsulting: "Conseil F&B",
    businessConsultation: "Consultation d'affaires",
    koreanLanguageTraining: "Formation en langue coréenne",
    
    // Hero Section
    heroTitle: "Votre passerelle vers l'éducation coréenne et le succès commercial mondial",
    heroSubtitle: "Conseils d'experts pour les étudiants africains cherchant une éducation coréenne et les entrepreneurs se développant sur les marchés F&B asiatiques",
    exploreStudyPrograms: "Explorer les programmes d'études",
    
    // About Section
    meetYourGlobalAdvisor: "Rencontrez votre conseiller mondial",
    advisorName: "M. Jean HAGABA",
    advisorTitle: "Consultant mondial en éducation et F&B", 
    advisorDescription: "Avec plus de 5 ans d'expérience dans le conseil en éducation internationale et le développement d'entreprises F&B, je me spécialise dans l'aide aux étudiants pour réaliser leurs rêves académiques en Corée tout en soutenant les entrepreneurs dans la navigation du marché F&B asiatique.",
    readMoreAboutMe: "En savoir plus sur moi",
    educationExpert: "Expert en éducation",
    educationExpertDesc: "Conseils spécialisés pour les admissions universitaires coréennes",
    fbConsultant: "Consultant F&B", 
    fbConsultantDesc: "Conseils d'experts pour les entreprises alimentaires et de boissons",
    studentsHelped: "500+ étudiants aidés",
    studentsHelpedDesc: "Étudiants guidés avec succès vers les universités coréennes",
    countriesReached: "15+ pays atteints",
    countriesReachedDesc: "Des étudiants de toute l'Afrique en ont bénéficié",
    
    // Services
    ourServices: "Nos Services",
    scholarshipGuidance: "Conseil en bourses",
    scholarshipGuidanceDesc: "Assistance complète pour les demandes de bourses et les opportunités de financement",
    scholarshipDescription: "Assistance complète pour les demandes de bourses et les opportunités de financement",
    universityAdmissions: "Admissions universitaires",
    universityAdmissionsDesc: "Conseils d'experts tout au long du processus de candidature universitaire",
    universityAdmissionSupport: "Support d'admission universitaire",
    universityAdmissionSupportDesc: "Support complet pour les candidatures et admissions universitaires",
    universityDescription: "Conseils d'experts tout au long du processus de candidature universitaire",
    visaDescription: "Support complet pour la demande de visa et la documentation",
    marketAnalysis: "Analyse de marché",
    marketAnalysisDescription: "Recherche et analyse de marché approfondies pour l'expansion commerciale",
    fbMarketAnalysis: "Analyse du marché F&B",
    productDevelopment: "Développement de produits",
    productDescription: "Innovation et développement de produits alimentaires pour le succès du marché",
    regulatoryCompliance: "Conformité réglementaire",
    complianceDescription: "Assurer la conformité aux réglementations et normes locales",
    strategyDevelopment: "Développement de stratégie",
    marketSizing: "Dimensionnement du marché",
    competitorAnalysis: "Analyse de la concurrence", 
    trendIdentification: "Identification des tendances",
    recipeDevelopment: "Développement de recettes",
    productTesting: "Test de produits",
    safetyStandards: "Normes de sécurité",
    certificationSupport: "Support de certification",
    complianceAudits: "Audits de conformité",
    startYourJourney: "Commencez votre voyage",
    letsStartYourJourney: "Commençons votre voyage",
    getExpertConsultation: "Obtenir une consultation d'expert",
    journeyDescription: "Commencez votre chemin vers le succès avec nos conseils d'experts",
    getFullConsultation: "Obtenir une consultation complète",
    viewAllPackagesPricing: "Voir tous les forfaits et prix",
    languageDescription: "Formation en langue coréenne et préparation culturelle",
    culturalOrientation: "Orientation culturelle",
    businessDescription: "Conseils d'experts pour les entreprises alimentaires et de boissons",
    marketResearch: "Étude de marché",
    
    // Study Programs
    studyProgramsTitle: "Programmes d'études et services",
    studyProgramsSubtitle: "Support complet pour votre parcours éducatif coréen",
    visaApplicationAssistance: "Assistance pour demande de visa",
    visaApplicationAssistanceDesc: "Support complet pour la demande de visa et la documentation",
    languagePreparation: "Préparation linguistique",
    languagePreparationDesc: "Formation en langue coréenne et préparation culturelle",
    applicationAssistance: "Assistance à la candidature",
    documentPreparation: "Préparation des documents",
    scholarshipSearch: "Recherche de bourses",
    universitySelection: "Sélection d'université",
    applicationReview: "Révision de candidature",
    interviewPreparation: "Préparation à l'entretien",
    visaDocumentPrep: "Préparation des documents de visa",
    applicationFiling: "Dépôt de candidature",
    interviewCoaching: "Coaching d'entretien",
    topikPreparation: "Préparation TOPIK",
    conversationPractice: "Pratique de conversation",
    culturalOrientationAndAccommodation: "Orientation culturelle et hébergement",
    bookConsultation: "Réserver une consultation",
    
    // Contact Section
    readyToTakeNextStep: "Prêt à passer à l'étape suivante ? Contactez-nous pour une consultation gratuite",
    sendUsMessage: "Envoyez-nous un message",
    fillFormBelow: "Remplissez le formulaire ci-dessous et nous répondrons dans les 24 heures",
    yourName: "Votre nom",
    yourEmail: "Votre email",
    selectService: "Sélectionner le service",
    generalInquiry: "Demande générale",
    studyAbroadRelocation: "Études à l'étranger et relocalisation",
    fbConsultingService: "Conseil F&B",
    bothServices: "Les deux services",
    message: "Message",
    tellUsAboutGoals: "Parlez-nous de vos objectifs et comment nous pouvons vous aider...",
    sendMessage: "Envoyer le message",
    quickContact: "Contact rapide",
    phoneKorea: "Téléphone (Corée)",
    whatsapp: "WhatsApp",
    bookAConsultation: "Réserver une consultation",
    scheduleFreeConsultation: "Planifiez une consultation gratuite de 15 minutes pour discuter de vos objectifs et obtenir des conseils personnalisés.",
    scheduleConsultation: "Planifier une consultation gratuite",
    saturday: "Samedi",
    sunday: "Dimanche",
    
    // About Advisor Page
    professionalSummary: "Résumé professionnel",
    educationExpertise: "Expertise en éducation",
    koreanGovernmentScholarshipProgram: "Programme de bourses du gouvernement coréen (KGSP)",
    universityAdmissionStrategies: "Stratégies d'admission universitaire",
    visaApplicationGuidance: "Conseils pour demande de visa",
    koreanLanguagePreparation: "Préparation en langue coréenne",
    culturalAdaptationSupport: "Support d'adaptation culturelle",
    fbExpertise: "Expertise F&B",
    marketAnalysisEntryStrategies: "Analyse de marché et stratégies d'entrée",
    productDevelopmentInnovation: "Développement de produits et innovation",
    supplyChainOptimization: "Optimisation de la chaîne d'approvisionnement",
    businessPlanningFunding: "Planification d'affaires et financement",
    keyAchievements: "Réalisations clés",
    studentsAssisted: "Étudiants assistés",
    scholarshipSuccessRate: "Taux de succès des bourses",
    getInTouch: "Prendre contact",
    officeHours: "Heures de bureau",
    mondayToFriday: "Lundi au vendredi",
    mondayFriday: "Lundi - Vendredi",
    saturdaySunday: "Samedi et dimanche",
    closed: "Fermé",
    koreanTime: "Heure standard de Corée",
    myMission: "Ma mission",
    missionStatement: "Créer des ponts entre les cultures et créer des opportunités en guidant les étudiants vers une éducation de classe mondiale en Corée et en aidant les entrepreneurs à construire des entreprises alimentaires prospères qui connectent les marchés mondiaux.",
    
    // Testimonials
    successStories: "Histoires de succès",
    testimonialSubtitle: "Écoutez nos clients satisfaits qui ont réalisé leurs rêves",
    
    // Newsletter
    newsletterTitle: "Restez informé des opportunités mondiales",
    newsletterDescription: "Recevez les dernières annonces de bourses, conseils d'études à l'étranger et insights de l'industrie F&B dans votre boîte mail.",
    enterEmailAddress: "Entrez votre adresse email",
    subscribe: "S'abonner",
    newsletterThankYou: "Merci de vous être abonné ! Vérifiez votre email pour les mises à jour.",
    newsletter: "Newsletter",
    
    // Footer
    footerDescription: "Votre partenaire de confiance pour l'éducation coréenne et le succès commercial F&B mondial.",
    quickLinks: "Liens rapides",
    aboutUs: "À propos de nous",
    resourcesBlog: "Ressources et blog",
    blogResources: "Blog et ressources",
    legal: "Légal",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions de service",
    sitemap: "Plan du site",
    contactInfo: "Informations de contact",
    location: "Séoul, Corée du Sud",
    allRightsReserved: "Tous droits réservés.",
    visitsHelp: "Aide visa et relocalisation",
    
    // Resources/Blog
    latest: "Dernières",
    resources: "Ressources",
    resourcesDescription: "Restez informé des opportunités de bourses, insights de l'industrie et conseils de succès",
    education: "Éducation",
    business: "Affaires",
    scholarships: "Bourses",
    blogPost1Title: "Top 10 des universités coréennes offrant des bourses aux étudiants africains",
    blogPost1Excerpt: "Découvrez les meilleures opportunités d'éducation financée en Corée du Sud...",
    blogPost2Title: "Percer le marché F&B coréen : Un guide complet",
    blogPost2Excerpt: "Tout ce que vous devez savoir sur les réglementations alimentaires en Corée...",
    blogPost3Title: "KGSP 2024 : Conseils de candidature et dates limites",
    blogPost3Excerpt: "Obtenez des conseils d'initiés pour le programme de bourses du gouvernement coréen...",
    readMore: "Lire plus",
    viewAllResources: "Voir toutes les ressources",
    eightMinRead: "8 min de lecture",
    twelveMinRead: "12 min de lecture", 
    sixMinRead: "6 min de lecture",
    march152024: "15 mars 2024",
    march102024: "10 mars 2024",
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
    johnDoe: "Jean HAGABA",
    
    // Common
    backToHome: "Retour à l'accueil",
    phone: "Téléphone",
    email: "Email",
    scheduleFreeFifteenMinuteConsultation: "Planifier une consultation gratuite de 15 min",
    foodScienceExpert: "Expert en sciences alimentaires",
    
    // Privacy Policy
    privacyPolicyTitle: "Politique de confidentialité",
    privacyPolicySubtitle: "Votre confidentialité est notre priorité. Apprenez comment nous protégeons et gérons vos informations.",
    privacyPolicyDescription: "Comment nous gérons vos données",
    informationWeCollect: "Informations que nous collectons",
    privacyCollectDescription: "Nous collectons les informations que vous nous fournissez directement, telles que :",
    personalIdentificationInfo: "Informations d'identification personnelle (nom, adresse email, numéro de téléphone)",
    educationalBackground: "Antécédents éducatifs et dossiers académiques",
    professionalExperience: "Expérience professionnelle et intérêts commerciaux",
    communicationPreferences: "Préférences de communication et commentaires",
    howWeUseYourInfo: "Comment nous utilisons vos informations",
    privacyUseDescription: "Nous utilisons les informations que nous collectons pour :",
    providePersonalizedServices: "Fournir des services de conseil éducatif et commercial personnalisés",
    processScholarshipApplications: "Traiter les demandes de bourses et admissions universitaires",
    sendRelevantUpdates: "Vous envoyer des mises à jour pertinentes sur les programmes et opportunités",
    improveServices: "Améliorer nos services et l'expérience utilisateur",
    complyLegalObligations: "Respecter les obligations légales et protéger nos droits",
    dataSecurity: "Sécurité des données",
    dataSecurityDescription: "Nous mettons en œuvre des mesures de sécurité standard de l'industrie pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Cela inclut :",
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
    dataPortability: "Portabilité et transfert des données",
    lastUpdatedMarch2024: "Dernière mise à jour : Mars 2024",
    questionsContact: "Questions ? Contactez-nous à privacy@kundapathways.com",
    
    // Terms of Service
    termsOfServiceTitle: "Conditions de service",
    termsOfServiceSubtitle: "Veuillez lire attentivement ces conditions avant d'utiliser nos services.",
    termsOfServiceDescription: "Conditions d'utilisation du service",
    acceptanceOfTerms: "Acceptation des conditions",
    acceptanceDescription: "En accédant et en utilisant les services de Kunda Pathways, vous acceptez et convenez d'être lié par les termes et dispositions de cet accord.",
    serviceDescription: "Description du service",
    kundaPathwaysProvides: "Kunda Pathways fournit :",
    educationalConsultingScholarshipGuidance: "Conseil éducatif et orientation en bourses",
    universityAdmissionAssistance: "Assistance pour admission universitaire",
    fbBusinessConsulting: "Conseil d'entreprise alimentaire et de boissons",
    marketAnalysisBusinessDevelopment: "Analyse de marché et support de développement d'entreprise",
    visaApplicationRelocation: "Demande de visa et assistance à la relocalisation",
    userResponsibilities: "Responsabilités de l'utilisateur",
    userResponsibilitiesDescription: "En tant qu'utilisateur de nos services, vous acceptez de :",
    provideAccurateInfo: "Fournir des informations précises et complètes",
    maintainAccountConfidentiality: "Maintenir la confidentialité de votre compte",
    useServicesLawfully: "Utiliser nos services uniquement à des fins légales",
    respectIntellectualProperty: "Respecter les droits de propriété intellectuelle",
    followApplicableLaws: "Suivre toutes les lois et réglementations applicables",
    limitationsDisclaimers: "Limitations et avertissements",
    limitationsDescription: "Bien que nous nous efforcions de fournir des informations précises et des services de qualité, nous ne pouvons garantir :",
    successfulAdmission: "Admission réussie aux institutions éducatives",
    approvalScholarshipVisa: "Approbation des demandes de bourses ou de visa",
    specificBusinessOutcomes: "Résultats commerciaux ou profits spécifiques",
    availabilityPrograms: "Disponibilité des programmes ou opportunités",
    servicesAdvisoryNature: "Nos services sont de nature consultative et le succès dépend de divers facteurs externes.",
    paymentRefundPolicy: "Politique de paiement et de remboursement",
    paymentTermsInclude: "Nos conditions de paiement incluent :",
    paymentRequiredBeforeService: "Le paiement est requis avant la livraison du service",
    refundsCaseByCase: "Les remboursements sont considérés au cas par cas",
    serviceFeesNonRefundable: "Les frais de service ne sont pas remboursables une fois le travail commencé",
    cancellationsWithin48Hours: "Les annulations doivent être faites dans les 48 heures de la réservation",
    governingLaw: "Loi applicable",
    governingLawDescription: "Ces conditions seront régies et interprétées conformément aux lois de la Corée du Sud.",
    questionsContactLegal: "Questions ? Contactez-nous à legal@kundapathways.com",
    
    // Sitemap
    sitemapTitle: "Plan du site",
    sitemapSubtitle: "Guide de navigation complet vers toutes les pages et sections de notre site web.",
    mainPages: "Pages principales",
    homepageDescription: "Page d'accueil avec aperçu de l'entreprise",
    aboutDescription: "En savoir plus sur notre entreprise et notre mission",
    servicesDescription: "Nos services éducatifs et commerciaux",
    contactDescription: "Entrer en contact avec notre équipe",
    blogDescription: "Derniers articles et ressources éducatives",
    successStoriesDescription: "Témoignages clients et études de cas",
    studyInKoreaDescription: "Conseil éducatif et orientation en bourses",
    fbConsultingDescription: "Conseil d'entreprise alimentaire et de boissons",
    universityAdmissionsDescription: "Assistance pour candidatures universitaires",
    sitemapDescription: "Navigation complète du site",
    needHelpFinding: "Besoin d'aide pour trouver quelque chose ?",
    cantFindWhatLooking: "Vous ne trouvez pas ce que vous cherchez ? Notre équipe est là pour vous aider à naviguer dans nos services.",
    contactSupport: "Contacter le support",
    allPagesMobileResponsive: "Toutes les pages sont responsives mobile et conviviales pour l'accessibilité",
    
    // Booking
    hotelBooking: "Réservation d'hôtel",
    phoneConsultation: "Consultation téléphonique",
    reviewConsultation: "Révision de consultation",
    consultationDetails: "Détails de consultation",
    fullName: "Nom complet",
    selectedService: "Service sélectionné",
    totalPrice: "Prix total",
    paymentMethods: "Méthodes de paiement",
    payWithCard: "Payer par carte",
    payWithMobile: "Payer par mobile",
    payWithBank: "Payer par banque",
    backToEdit: "Retour à l'édition",
    preferredDate: "Date préférée",
    preferredTime: "Heure préférée",
    reviewConsultationRequest: "Réviser la demande de consultation",
    
    // Partners
    ourTrustedPartners: "Nos partenaires de confiance",
    partnerDescription: "Nous travaillons avec des institutions et organisations de premier plan",
    
    // Business Planning
    businessPlanning: "Planification d'affaires",
    
    // Visa
    visaApplication: "Demande de visa",
    
    // Additional French translations
    selectSubject: "Sélectionnez un sujet",
    messageSent: "Message envoyé avec succès !",
    bookAConsultation: "Réserver une Consultation",
    businessHours: "Heures d'Ouverture",
    mondayFriday: "Lundi - Vendredi",
    closed: "Fermé",
    aboutDescription: "Donner du pouvoir aux rêves grâce à l'excellence éducative et commerciale. Nous créons des ponts entre les cultures et créons des opportunités pour le succès mondial.",
    ourMission: "Notre Mission",
    missionDescription: "Fournir des conseils complets et personnalisés qui transforment les aspirations éducatives et les entreprises en réalités réussies. Nous croyons au pouvoir de l'éducation de qualité et de la planification commerciale stratégique pour changer des vies.",
    personalizedGuidance: "Conseils personnalisés adaptés à vos objectifs uniques",
    expertConsultation: "Consultation d'expert avec un historique prouvé",
    endToEndSupport: "Support de bout en bout tout au long de votre parcours",
    meetYourGlobalAdvisor: "Rencontrez Votre Conseiller Global",
    internationalEducationExpert: "Expert en Éducation Internationale et F&B",
    successfulStudents: "Étudiants Réussis",
    businessesHelped: "Entreprises Aidées",
    scholarshipSuccessRate: "Taux de Réussite des Bourses",
    yearsExperience: "Années d'Expérience",
    marketEntryStrategy: "Stratégie d'Entrée sur le Marché",
    productDevelopmentService: "Développement de Produits",
    supplyChainOptimization: "Optimisation de la Chaîne d'Approvisionnement",
    brandLocalization: "Localisation de Marque",
    partnershipDistribution: "Partenariat et Distribution",
    completeMarketEntry: "Package Complet d'Entrée sur le Marché",
    whyChooseUs: "Pourquoi Nous Choisir",
    mscFoodScienceExpert: "Expert MSc en Sciences Alimentaires",
    experienceDescription: "8+ Années d'Expérience",
    successfulProjectsDescription: "50+ Projets Réussis",
    specialPackageDeals: "Offres Spéciales de Packages",
    mostPopular: "LE PLUS POPULAIRE",
    studyAbroadComplete: "Package Complet d'Études à l'Étranger",
    fbMarketEntryComplete: "Package Complet d'Entrée F&B",
    studentFbCombo: "Combo Étudiant + F&B",
    additionalServicesTitle: "Services Supplémentaires",
    hotelBookingAssistance: "Assistance Réservation d'Hôtel",
    phoneConsultationService: "Consultation Téléphonique",
    airportPickupService: "Service de Prise en Charge à l'Aéroport",
    culturalOrientationService: "Orientation Culturelle",
    needCustomSolution: "Besoin d'une Solution Personnalisée ?",
    getCustomQuote: "Obtenir un Devis Personnalisé",
  },
  KO: {
    // Navigation & Header
    home: "홈",
    about: "소개",
    services: "서비스",
    contact: "연락처",
    studyInKorea: "한국 유학",
    fbConsulting: "식음료 컨설팅",
    businessConsultation: "사업 컨설팅",
    koreanLanguageTraining: "한국어 교육",
    
    // Hero Section
    heroTitle: "한국 교육과 글로벌 비즈니스 성공의 관문",
    heroSubtitle: "한국 교육을 원하는 아프리카 학생들과 아시아 식음료 시장 진출 기업가들을 위한 전문 가이드",
    exploreStudyPrograms: "유학 프로그램 살펴보기",
    
    // About Section
    meetYourGlobalAdvisor: "글로벌 어드바이저를 만나보세요",
    advisorName: "장 하가바 선생님",
    advisorTitle: "글로벌 교육 및 식음료 컨설턴트",
    advisorDescription: "국제 교육 컨설팅과 식음료 사업 개발 분야에서 5년 이상의 경험을 가진 전문가로, 한국에서의 학업 꿈을 이루고자 하는 학생들과 아시아 식음료 시장 진출을 원하는 기업가들을 지원합니다.",
    readMoreAboutMe: "더 자세히 알아보기",
    educationExpert: "교육 전문가",
    educationExpertDesc: "한국 대학 입학을 위한 전문 가이드",
    fbConsultant: "식음료 컨설턴트",
    fbConsultantDesc: "식음료 사업을 위한 전문 조언",
    studentsHelped: "500명 이상의 학생 지원",
    studentsHelpedDesc: "한국 대학 진학을 성공적으로 도움",
    countriesReached: "15개국 이상 도달",
    countriesReachedDesc: "아프리카 전역의 학생들이 혜택을 받음",
    
    // Services
    ourServices: "우리의 서비스",
    scholarshipGuidance: "장학금 안내",
    scholarshipGuidanceDesc: "장학금 신청과 재정 지원 기회에 대한 완전한 지원",
    scholarshipDescription: "장학금 신청과 재정 지원 기회에 대한 완전한 지원",
    universityAdmissions: "대학 입학",
    universityAdmissionsDesc: "대학 지원 과정에 대한 전문 가이드",
    universityAdmissionSupport: "대학 입학 지원",
    universityAdmissionSupportDesc: "대학 지원 및 입학을 위한 종합적인 지원",
    universityDescription: "대학 지원 과정에 대한 전문 가이드",
    visaDescription: "비자 신청 및 서류 작성에 대한 완전한 지원",
    marketAnalysis: "시장 분석",
    marketAnalysisDescription: "사업 확장을 위한 심도 있는 시장 조사 및 분석",
    fbMarketAnalysis: "식음료 시장 분석",
    productDevelopment: "제품 개발",
    productDescription: "시장 성공을 위한 식품 제품의 혁신 및 개발",
    regulatoryCompliance: "규제 준수",
    complianceDescription: "현지 규정 및 표준 준수 보장",
    strategyDevelopment: "전략 개발",
    marketSizing: "시장 규모 분석",
    competitorAnalysis: "경쟁사 분석",
    trendIdentification: "트렌드 파악",
    recipeDevelopment: "레시피 개발",
    productTesting: "제품 테스트",
    safetyStandards: "안전 기준",
    certificationSupport: "인증 지원",
    complianceAudits: "규정 준수 감사",
    startYourJourney: "여정을 시작하세요",
    letsStartYourJourney: "여정을 시작해보겠습니다",
    getExpertConsultation: "전문 컨설팅 받기",
    journeyDescription: "전문 가이드와 함께 성공으로의 길을 시작하세요",
    getFullConsultation: "전체 컨설팅 받기",
    viewAllPackagesPricing: "모든 패키지 및 가격 보기",
    languageDescription: "한국어 교육 및 문화 준비",
    culturalOrientation: "문화 오리엔테이션",
    businessDescription: "식음료 사업을 위한 전문 조언",
    marketResearch: "시장 조사",
    
    // Study Programs
    studyProgramsTitle: "유학 프로그램 및 서비스",
    studyProgramsSubtitle: "한국 교육 여정을 위한 종합적인 지원",
    visaApplicationAssistance: "비자 신청 지원",
    visaApplicationAssistanceDesc: "비자 신청 및 서류 작성에 대한 완전한 지원",
    languagePreparation: "언어 준비",
    languagePreparationDesc: "한국어 교육 및 문화 준비",
    applicationAssistance: "지원 지원",
    documentPreparation: "서류 준비",
    scholarshipSearch: "장학금 검색",
    universitySelection: "대학 선택",
    applicationReview: "지원서 검토",
    interviewPreparation: "면접 준비",
    visaDocumentPrep: "비자 서류 준비",
    applicationFiling: "지원서 제출",
    interviewCoaching: "면접 코칭",
    topikPreparation: "토픽 준비",
    conversationPractice: "회화 연습",
    culturalOrientationAndAccommodation: "문화 오리엔테이션 및 숙소",
    bookConsultation: "상담 예약",
    
    // Contact Section
    readyToTakeNextStep: "다음 단계로 나아갈 준비가 되셨나요? 무료 상담을 위해 연락주세요",
    sendUsMessage: "메시지 보내기",
    fillFormBelow: "아래 양식을 작성해주시면 24시간 내에 답변드리겠습니다",
    yourName: "성명",
    yourEmail: "이메일",
    selectService: "서비스 선택",
    generalInquiry: "일반 문의",
    studyAbroadRelocation: "유학 및 이주",
    fbConsultingService: "식음료 컨설팅",
    bothServices: "두 서비스 모두",
    message: "메시지",
    tellUsAboutGoals: "목표와 저희가 어떻게 도울 수 있는지 말씀해주세요...",
    sendMessage: "메시지 보내기",
    quickContact: "빠른 연락",
    phoneKorea: "전화 (한국)",
    whatsapp: "WhatsApp",
    bookAConsultation: "상담 예약",
    scheduleFreeConsultation: "목표를 논의하고 개인화된 조언을 받기 위한 무료 15분 상담을 예약하세요.",
    scheduleConsultation: "무료 상담 예약",
    saturday: "토요일",
    sunday: "일요일",
    
    // About Advisor Page
    professionalSummary: "전문 요약",
    educationExpertise: "교육 전문성",
    koreanGovernmentScholarshipProgram: "한국정부장학금 프로그램 (KGSP)",
    universityAdmissionStrategies: "대학 입학 전략",
    visaApplicationGuidance: "비자 신청 가이드",
    koreanLanguagePreparation: "한국어 준비",
    culturalAdaptationSupport: "문화 적응 지원",
    fbExpertise: "식음료 전문성",
    marketAnalysisEntryStrategies: "시장 분석 및 진입 전략",
    productDevelopmentInnovation: "제품 개발 및 혁신",
    supplyChainOptimization: "공급망 최적화",
    businessPlanningFunding: "사업 계획 및 자금 조달",
    keyAchievements: "주요 성과",
    studentsAssisted: "지원한 학생 수",
    scholarshipSuccessRate: "장학금 성공률",
    getInTouch: "연락하기",
    officeHours: "근무 시간",
    mondayToFriday: "월요일부터 금요일까지",
    mondayFriday: "월요일 - 금요일",
    saturdaySunday: "토요일 및 일요일",
    closed: "휴무",
    koreanTime: "한국 표준시",
    myMission: "나의 사명",
    missionStatement: "문화를 연결하고 기회를 창출하여 학생들을 한국의 세계적 수준의 교육으로 안내하고 기업가들이 글로벌 시장을 연결하는 성공적인 식품 사업을 구축할 수 있도록 돕는 것입니다.",
    
    // Testimonials
    successStories: "성공 사례",
    testimonialSubtitle: "꿈을 이룬 만족한 고객들의 이야기를 들어보세요",
    
    // Newsletter
    newsletterTitle: "글로벌 기회 최신 소식 받기",
    newsletterDescription: "최신 장학금 공지, 유학 팁, 식음료 업계 인사이트를 이메일로 받아보세요.",
    enterEmailAddress: "이메일 주소를 입력하세요",
    subscribe: "구독하기",
    newsletterThankYou: "구독해주셔서 감사합니다! 업데이트를 위해 이메일을 확인해주세요.",
    newsletter: "뉴스레터",
    
    // Footer
    footerDescription: "한국 교육과 글로벌 식음료 사업 성공을 위한 신뢰할 수 있는 파트너입니다.",
    quickLinks: "빠른 링크",
    aboutUs: "회사 소개",
    resourcesBlog: "자료 및 블로그",
    blogResources: "블로그 및 자료",
    legal: "법적 고지",
    privacyPolicy: "개인정보 보호정책",
    termsOfService: "서비스 약관",
    sitemap: "사이트맵",
    contactInfo: "연락처 정보",
    location: "대한민국 서울",
    allRightsReserved: "모든 권리 보유.",
    visitsHelp: "비자 및 이주 도움",
    
    // Resources/Blog
    latest: "최신",
    resources: "자료",
    resourcesDescription: "장학금 기회, 업계 인사이트 및 성공 팁으로 최신 정보를 받아보세요",
    education: "교육",
    business: "비즈니스",
    scholarships: "장학금",
    blogPost1Title: "아프리카 학생들을 위한 장학금을 제공하는 한국 상위 10개 대학",
    blogPost1Excerpt: "한국에서 재정 지원을 받는 교육의 최고 기회를 발견하세요...",
    blogPost2Title: "한국 식음료 시장 진출: 완전 가이드",
    blogPost2Excerpt: "한국의 식품 사업 규정에 대해 알아야 할 모든 것...",
    blogPost3Title: "KGSP 2024: 지원 팁과 마감일",
    blogPost3Excerpt: "한국정부장학금 프로그램에 대한 내부자 팁을 얻으세요...",
    readMore: "더 읽기",
    viewAllResources: "모든 자료 보기",
    eightMinRead: "8분 읽기",
    twelveMinRead: "12분 읽기",
    sixMinRead: "6분 읽기",
    march152024: "2024년 3월 15일",
    march102024: "2024년 3월 10일",
    march52024: "2024년 3월 5일",
    visaApplicationProcess: "한국 대학을 위한 비자 신청 과정",
    visaApplicationExcerpt: "한국 학생 비자를 성공적으로 받기 위한 단계별 가이드...",
    tenMinRead: "10분 읽기",
    february282024: "2024년 2월 28일",
    foodSafetyRegulations: "아시아 시장의 식품 안전 규정",
    foodSafetyExcerpt: "아시아로 확장하는 식음료 사업의 규정 준수 요구 사항 이해...",
    fifteenMinRead: "15분 읽기",
    february202024: "2024년 2월 20일",
    culturalAdaptationGuide: "국제 학생을 위한 문화 적응 가이드",
    culturalAdaptationExcerpt: "한국 문화와 학습 환경에 적응하기 위한 필수 팁...",
    sevenMinRead: "7분 읽기",
    february152024: "2024년 2월 15일",
    johnDoe: "장 하가바",
    
    // Common
    backToHome: "홈으로 돌아가기",
    phone: "전화",
    email: "이메일",
    scheduleFreeFifteenMinuteConsultation: "무료 15분 상담 예약",
    foodScienceExpert: "식품 과학 전문가",
    
    // Privacy Policy
    privacyPolicyTitle: "개인정보 보호정책",
    privacyPolicySubtitle: "귀하의 개인정보 보호가 우리의 우선순위입니다. 우리가 어떻게 귀하의 정보를 보호하고 처리하는지 알아보세요.",
    privacyPolicyDescription: "우리가 귀하의 데이터를 처리하는 방법",
    informationWeCollect: "수집하는 정보",
    privacyCollectDescription: "귀하가 직접 제공하는 정보를 수집합니다:",
    personalIdentificationInfo: "개인 식별 정보 (이름, 이메일 주소, 전화번호)",
    educationalBackground: "교육 배경 및 학업 기록",
    professionalExperience: "전문 경험 및 사업 관심사",
    communicationPreferences: "커뮤니케이션 선호도 및 피드백",
    howWeUseYourInfo: "정보 사용 방법",
    privacyUseDescription: "수집한 정보를 다음과 같이 사용합니다:",
    providePersonalizedServices: "개인화된 교육 및 사업 컨설팅 서비스 제공",
    processScholarshipApplications: "장학금 신청 및 대학 입학 처리",
    sendRelevantUpdates: "프로그램 및 기회에 대한 관련 업데이트 발송",
    improveServices: "서비스 및 사용자 경험 개선",
    complyLegalObligations: "법적 의무 준수 및 권리 보호",
    dataSecurity: "데이터 보안",
    dataSecurityDescription: "무단 접근, 변경, 공개 또는 파괴로부터 개인정보를 보호하기 위해 업계 표준 보안 조치를 시행합니다:",
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
    yourRights: "귀하의 권리",
    yourRightsDescription: "귀하는 다음과 같은 권리가 있습니다:",
    accessReviewPersonalInfo: "개인정보 접근 및 검토",
    requestCorrections: "부정확한 데이터 수정 요청",
    requestDeletion: "정보 삭제 요청",
    optOutMarketing: "마케팅 커뮤니케이션 거부",
    dataPortability: "데이터 이동성 및 전송",
    lastUpdatedMarch2024: "최종 업데이트: 2024년 3월",
    questionsContact: "질문이 있으시면 privacy@kundapathways.com으로 연락주세요",
    
    // Terms of Service
    termsOfServiceTitle: "서비스 약관",
    termsOfServiceSubtitle: "서비스를 이용하기 전에 이 약관을 주의 깊게 읽어주세요.",
    termsOfServiceDescription: "서비스 이용 약관",
    acceptanceOfTerms: "약관 동의",
    acceptanceDescription: "Kunda Pathways의 서비스에 접근하고 사용함으로써 이 계약의 약관과 조항에 동의하고 구속받는 것에 동의합니다.",
    serviceDescription: "서비스 설명",
    kundaPathwaysProvides: "Kunda Pathways는 다음을 제공합니다:",
    educationalConsultingScholarshipGuidance: "교육 컨설팅 및 장학금 안내",
    universityAdmissionAssistance: "대학 입학 지원",
    fbBusinessConsulting: "식음료 사업 컨설팅",
    marketAnalysisBusinessDevelopment: "시장 분석 및 사업 개발 지원",
    visaApplicationRelocation: "비자 신청 및 이주 지원",
    userResponsibilities: "사용자 책임",
    userResponsibilitiesDescription: "서비스 사용자로서 다음에 동의합니다:",
    provideAccurateInfo: "정확하고 완전한 정보 제공",
    maintainAccountConfidentiality: "계정의 기밀성 유지",
    useServicesLawfully: "합법적인 목적으로만 서비스 사용",
    respectIntellectualProperty: "지적 재산권 존중",
    followApplicableLaws: "모든 적용 가능한 법률 및 규정 준수",
    limitationsDisclaimers: "제한 사항 및 면책 조항",
    limitationsDescription: "정확한 정보와 양질의 서비스 제공을 위해 노력하지만 다음을 보장할 수 없습니다:",
    successfulAdmission: "교육 기관 입학 성공",
    approvalScholarshipVisa: "장학금 또는 비자 신청 승인",
    specificBusinessOutcomes: "특정 사업 결과 또는 이익",
    availabilityPrograms: "프로그램 또는 기회의 가용성",
    servicesAdvisoryNature: "우리의 서비스는 자문적 성격이며 성공은 다양한 외부 요인에 따라 달라집니다.",
    paymentRefundPolicy: "결제 및 환불 정책",
    paymentTermsInclude: "결제 조건은 다음과 같습니다:",
    paymentRequiredBeforeService: "서비스 제공 전 결제 필요",
    refundsCaseByCase: "환불은 사례별로 고려됩니다",
    serviceFeesNonRefundable: "작업 시작 후 서비스 수수료는 환불되지 않습니다",
    cancellationsWithin48Hours: "예약 후 48시간 이내에 취소해야 합니다",
    governingLaw: "준거법",
    governingLawDescription: "이 약관은 대한민국 법률에 따라 규율되고 해석됩니다.",
    questionsContactLegal: "질문이 있으시면 legal@kundapathways.com으로 연락주세요",
    
    // Sitemap
    sitemapTitle: "사이트 맵",
    sitemapSubtitle: "웹사이트의 모든 페이지와 섹션에 대한 완전한 탐색 가이드입니다.",
    mainPages: "주요 페이지",
    homepageDescription: "회사 개요가 포함된 홈페이지",
    aboutDescription: "회사와 사명에 대해 알아보기",
    servicesDescription: "교육 및 사업 서비스",
    contactDescription: "팀과 연락하기",
    blogDescription: "최신 기사 및 교육 자료",
    successStoriesDescription: "고객 추천사 및 사례 연구",
    studyInKoreaDescription: "교육 컨설팅 및 장학금 안내",
    fbConsultingDescription: "식음료 사업 컨설팅",
    universityAdmissionsDescription: "대학 지원 지원",
    sitemapDescription: "완전한 사이트 탐색",
    needHelpFinding: "찾는 것을 도움이 필요하신가요?",
    cantFindWhatLooking: "찾고 있는 것을 찾을 수 없나요? 우리 팀이 서비스 탐색을 도와드립니다.",
    contactSupport: "지원팀 연락",
    allPagesMobileResponsive: "모든 페이지는 모바일 반응형이며 접근성 친화적입니다",
    
    // Booking
    hotelBooking: "호텔 예약",
    phoneConsultation: "전화 상담",
    reviewConsultation: "상담 검토",
    consultationDetails: "상담 세부사항",
    fullName: "성명",
    selectedService: "선택된 서비스",
    totalPrice: "총 가격",
    paymentMethods: "결제 방법",
    payWithCard: "카드로 결제",
    payWithMobile: "모바일로 결제",
    payWithBank: "은행으로 결제",
    backToEdit: "편집으로 돌아가기",
    preferredDate: "선호 날짜",
    preferredTime: "선호 시간",
    reviewConsultationRequest: "상담 요청 검토",
    
    // Partners
    ourTrustedPartners: "신뢰할 수 있는 파트너",
    partnerDescription: "선도적인 기관 및 조직과 협력합니다",
    
    // Business Planning
    businessPlanning: "사업 계획",
    
    // Visa
    visaApplication: "비자 신청",
    
    // Additional Korean translations
    selectSubject: "주제를 선택하세요",
    messageSent: "메시지가 성공적으로 전송되었습니다!",
    bookAConsultation: "상담 예약",
    businessHours: "운영 시간",
    mondayFriday: "월요일 - 금요일",
    closed: "휴무",
    aboutDescription: "교육과 비즈니스 우수성을 통해 꿈에 힘을 실어줍니다. 문화를 연결하고 글로벌 성공의 기회를 창출합니다.",
    ourMission: "우리의 사명",
    missionDescription: "교육적 열망과 비즈니스 벤처를 성공적인 현실로 변환하는 포괄적이고 개인화된 가이던스를 제공합니다. 우리는 양질의 교육과 전략적 비즈니스 계획이 인생을 바꿀 수 있는 힘을 믿습니다.",
    personalizedGuidance: "귀하의 고유한 목표에 맞춤화된 개인 지도",
    expertConsultation: "입증된 실적을 가진 전문가 상담",
    endToEndSupport: "여정 전반에 걸친 종단간 지원",
    meetYourGlobalAdvisor: "글로벌 어드바이저를 만나보세요",
    internationalEducationExpert: "국제 교육 및 F&B 전문가",
    successfulStudents: "성공한 학생들",
    businessesHelped: "도움을 받은 비즈니스",
    scholarshipSuccessRate: "장학금 성공률",
    yearsExperience: "년간 경험",
    marketEntryStrategy: "시장 진입 전략",
    productDevelopmentService: "제품 개발",
    supplyChainOptimization: "공급망 최적화",
    brandLocalization: "브랜드 현지화",
    partnershipDistribution: "파트너십 및 유통",
    completeMarketEntry: "완전한 시장 진입 패키지",
    whyChooseUs: "왜 우리를 선택해야 하나요",
    mscFoodScienceExpert: "MSc 식품과학 전문가",
    experienceDescription: "8년 이상의 경험",
    successfulProjectsDescription: "50개 이상의 성공 프로젝트",
    specialPackageDeals: "특별 패키지 딜",
    mostPopular: "가장 인기있는",
    studyAbroadComplete: "해외 유학 완전 패키지",
    fbMarketEntryComplete: "F&B 시장 진입 완전 패키지",
    studentFbCombo: "학생 + F&B 콤보",
    additionalServicesTitle: "추가 서비스",
    hotelBookingAssistance: "호텔 예약 지원",
    phoneConsultationService: "전화 상담",
    airportPickupService: "공항 픽업 서비스",
    culturalOrientationService: "문화적 오리엔테이션",
    needCustomSolution: "맞춤 솔루션이 필요하신가요?",
    getCustomQuote: "맞춤 견적 받기",
  }
};

interface LanguageContextType {
  currentLanguage: string;
  translations: Translations;
  changeLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('EN');

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

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    translations: translations[currentLanguage] || translations.EN,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
