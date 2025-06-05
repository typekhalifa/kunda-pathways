
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
  
  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  studyInKorea: string;
  studyInKoreaDesc: string;
  fbConsulting: string;
  fbConsultingDesc: string;
  universityAdmissions: string;
  universityAdmissionsDesc: string;
  visaAssistance: string;
  visaAssistanceDesc: string;
  
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
  
  // F&B Consulting
  fbConsultingTitle: string;
  businessStrategy: string;
  businessStrategyDesc: string;
  marketAnalysis: string;
  marketAnalysisDesc: string;
  productDevelopment: string;
  productDevelopmentDesc: string;
  regulatoryCompliance: string;
  regulatoryComplianceDesc: string;
  
  // F&B Features
  marketResearch: string;
  businessPlanning: string;
  marketSizing: string;
  competitorAnalysis: string;
  recipeDevelopment: string;
  productTesting: string;
  safetyStandards: string;
  certificationSupport: string;
  
  // Common
  startYourJourney: string;
  backToHome: string;
  bookConsultation: string;
  getQuote: string;
  scheduleConsultation: string;
  
  // About
  aboutTitle: string;
  aboutDescription: string;
  
  // Contact
  contactTitle: string;
  contactDescription: string;
  
  // Testimonials
  testimonialsTitle: string;
  
  // Blog
  blogTitle: string;
  blogDescription: string;
  readMore: string;
  
  // Newsletter
  newsletterTitle: string;
  newsletterDescription: string;
  subscribe: string;
  enterEmailAddress: string;
  
  // Footer
  quickLinks: string;
  followUs: string;
  
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
    
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive solutions for your educational and business goals",
    studyInKorea: "Study in Korea",
    studyInKoreaDesc: "Complete guidance for scholarships and university admissions",
    fbConsulting: "F&B Consulting",
    fbConsultingDesc: "Expert consulting for food & beverage businesses",
    universityAdmissions: "University Admissions",
    universityAdmissionsDesc: "End-to-end support for university applications",
    visaAssistance: "Visa Assistance", 
    visaAssistanceDesc: "Professional help with visa applications and documentation",
    
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
    
    // F&B Consulting
    fbConsultingTitle: "F&B Consulting",
    businessStrategy: "Business Strategy",
    businessStrategyDesc: "Strategic business planning and market entry",
    marketAnalysis: "Market Analysis", 
    marketAnalysisDesc: "In-depth market analysis and competitive intelligence",
    productDevelopment: "Product Development",
    productDevelopmentDesc: "Food product development and innovation",
    regulatoryCompliance: "Regulatory Compliance",
    regulatoryComplianceDesc: "Navigate food safety and regulatory requirements",
    
    // F&B Features
    marketResearch: "Market research",
    businessPlanning: "Business planning",
    marketSizing: "Market sizing",
    competitorAnalysis: "Competitor analysis", 
    recipeDevelopment: "Recipe development",
    productTesting: "Product testing",
    safetyStandards: "Safety standards",
    certificationSupport: "Certification support",
    
    // Common
    startYourJourney: "Start Your Journey",
    backToHome: "Back to Home",
    bookConsultation: "Book Consultation",
    getQuote: "Get Quote", 
    scheduleConsultation: "Schedule Consultation",
    
    // About
    aboutTitle: "About Us",
    aboutDescription: "Learn about our mission and expertise",
    
    // Contact
    contactTitle: "Contact Us",
    contactDescription: "Get in touch with our team",
    
    // Testimonials
    testimonialsTitle: "Success Stories",
    
    // Blog
    blogTitle: "Latest Resources",
    blogDescription: "Stay updated with the latest insights",
    readMore: "Read More",
    
    // Newsletter
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Get the latest updates and opportunities",
    subscribe: "Subscribe",
    enterEmailAddress: "Enter your email address",
    
    // Footer
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    
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
    
    // Services
    servicesTitle: "우리의 서비스",
    servicesSubtitle: "교육 및 사업 목표를 위한 종합 솔루션",
    studyInKorea: "한국 유학",
    studyInKoreaDesc: "장학금 및 대학 입학을 위한 완전한 안내",
    fbConsulting: "F&B 컨설팅", 
    fbConsultingDesc: "식음료 사업을 위한 전문 컨설팅",
    universityAdmissions: "대학교 입학",
    universityAdmissionsDesc: "대학 지원을 위한 전 과정 지원",
    visaAssistance: "비자 지원",
    visaAssistanceDesc: "비자 신청 및 서류 작성 전문 도움",
    
    // Study Programs
    studyProgramsTitle: "유학 프로그램 및 서비스",
    studyProgramsSubtitle: "한국 교육 여정을 위한 종합 지원",
    scholarshipGuidance: "장학금 안내",
    scholarshipGuidanceDesc: "장학금 찾기 및 지원에 대한 전문적인 도움",
    universityAdmissionSupport: "대학교 입학 지원",
    universityAdmissionSupportDesc: "대학교 입학 전 과정 지원",
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
    
    // F&B Consulting
    fbConsultingTitle: "F&B 컨설팅",
    businessStrategy: "비즈니스 전략",
    businessStrategyDesc: "전략적 사업 계획 및 시장 진입",
    marketAnalysis: "F&B 시장 분석",
    marketAnalysisDesc: "심층 시장 분석 및 경쟁 정보",
    productDevelopment: "제품 개발", 
    productDevelopmentDesc: "식품 제품 개발 및 혁신",
    regulatoryCompliance: "규제 준수",
    regulatoryComplianceDesc: "식품 안전 및 규제 요구사항 탐색",
    
    // F&B Features
    marketResearch: "시장 조사",
    businessPlanning: "사업 계획",
    marketSizing: "시장 규모 측정",
    competitorAnalysis: "경쟁사 분석",
    recipeDevelopment: "레시피 개발", 
    productTesting: "제품 테스트",
    safetyStandards: "안전 기준",
    certificationSupport: "인증 지원",
    
    // Common
    startYourJourney: "여행을 시작하세요",
    backToHome: "홈으로 돌아가기",
    bookConsultation: "상담 예약",
    getQuote: "견적 받기",
    scheduleConsultation: "상담 일정 잡기",
    
    // About
    aboutTitle: "회사 소개",
    aboutDescription: "우리의 사명과 전문성에 대해 알아보세요",
    
    // Contact
    contactTitle: "연락처",
    contactDescription: "우리 팀과 연락하세요",
    
    // Testimonials
    testimonialsTitle: "성공 사례",
    
    // Blog
    blogTitle: "최신 자료",
    blogDescription: "최신 인사이트로 업데이트하세요",
    readMore: "더 읽기",
    
    // Newsletter
    newsletterTitle: "업데이트 받기",
    newsletterDescription: "최신 업데이트와 기회를 받아보세요",
    subscribe: "구독하기",
    enterEmailAddress: "이메일 주소를 입력하세요",
    
    // Footer
    quickLinks: "빠른 링크",
    followUs: "팔로우하기",
    
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
    
    // Services
    servicesTitle: "Nos Services",
    servicesSubtitle: "Solutions complètes pour vos objectifs éducatifs et commerciaux",
    studyInKorea: "Étudier en Corée",
    studyInKoreaDesc: "Guidance complète pour les bourses et admissions universitaires",
    fbConsulting: "Conseil F&B",
    fbConsultingDesc: "Conseil expert pour les entreprises alimentaires et boissons",
    universityAdmissions: "Admissions Universitaires",
    universityAdmissionsDesc: "Support de bout en bout pour les candidatures universitaires",
    visaAssistance: "Assistance Visa",
    visaAssistanceDesc: "Aide professionnelle pour les demandes de visa et la documentation",
    
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
    
    // F&B Consulting
    fbConsultingTitle: "Conseil F&B",
    businessStrategy: "Stratégie d'entreprise",
    businessStrategyDesc: "Planification stratégique d'entreprise et entrée sur le marché",
    marketAnalysis: "Analyse de marché",
    marketAnalysisDesc: "Analyse de marché approfondie et intelligence concurrentielle",
    productDevelopment: "Développement de produits",
    productDevelopmentDesc: "Développement et innovation de produits alimentaires",
    regulatoryCompliance: "Conformité réglementaire",
    regulatoryComplianceDesc: "Naviguer dans la sécurité alimentaire et les exigences réglementaires",
    
    // F&B Features
    marketResearch: "Recherche de marché",
    businessPlanning: "Planification d'entreprise",
    marketSizing: "Dimensionnement du marché",
    competitorAnalysis: "Analyse des concurrents",
    recipeDevelopment: "Développement de recettes",
    productTesting: "Test de produits",
    safetyStandards: "Normes de sécurité",
    certificationSupport: "Support de certification",
    
    // Common
    startYourJourney: "Commencez votre voyage",
    backToHome: "Retour à l'accueil",
    bookConsultation: "Réserver une consultation",
    getQuote: "Obtenir un devis",
    scheduleConsultation: "Programmer une consultation",
    
    // About
    aboutTitle: "À propos de nous",
    aboutDescription: "Découvrez notre mission et notre expertise",
    
    // Contact
    contactTitle: "Contactez-nous",
    contactDescription: "Entrez en contact avec notre équipe",
    
    // Testimonials
    testimonialsTitle: "Histoires de succès",
    
    // Blog
    blogTitle: "Dernières ressources",
    blogDescription: "Restez à jour avec les dernières perspectives",
    readMore: "Lire la suite",
    
    // Newsletter
    newsletterTitle: "Restez informé",
    newsletterDescription: "Recevez les dernières mises à jour et opportunités",
    subscribe: "S'abonner",
    enterEmailAddress: "Entrez votre adresse e-mail",
    
    // Footer
    quickLinks: "Liens rapides",
    followUs: "Suivez-nous",
    
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
    
    // Services
    servicesTitle: "Serivisi zacu",
    servicesSubtitle: "Ibisubizo byuzuye ku ntego zawe z'uburezi n'ubucuruzi",
    studyInKorea: "Kwiga muri Koreya",
    studyInKoreaDesc: "Ubuyobozi buzuye ku mpano no kwinjira muri kaminuza",
    fbConsulting: "Inama za F&B",
    fbConsultingDesc: "Inama z'impuguke ku bucuruzi bw'ibiryo n'ibinyobwa",
    universityAdmissions: "Kwinjira muri kaminuza",
    universityAdmissionsDesc: "Ubufasha bwuzuye ku busaba bwa kaminuza",
    visaAssistance: "Ubufasha bwa viza",
    visaAssistanceDesc: "Ubufasha bw'umwuga ku busaba bwa viza n'inyandiko",
    
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
    
    // F&B Consulting
    fbConsultingTitle: "Inama za F&B",
    businessStrategy: "Ingamba z'ubucuruzi",
    businessStrategyDesc: "Gutegura ingamba z'ubucuruzi no kwinjira mu isoko",
    marketAnalysis: "Isesengura ry'isoko",
    marketAnalysisDesc: "Isesengura ry'imbere ry'isoko n'ubunyangamugayo bw'abanywanyi",
    productDevelopment: "Guteza imbere ibicuruzwa",
    productDevelopmentDesc: "Guteza imbere no guhanga ibicuruzwa by'ibiryo",
    regulatoryCompliance: "Kubahiriza amategeko",
    regulatoryComplianceDesc: "Kuyobora mu mutekano w'ibiryo n'ibisabwa n'amategeko",
    
    // F&B Features
    marketResearch: "Ubushakashatsi bw'isoko",
    businessPlanning: "Gutegura ubucuruzi",
    marketSizing: "Gupima isoko",
    competitorAnalysis: "Isesengura ry'abanywanyi",
    recipeDevelopment: "Guteza imbere uburyo bwo guteka",
    productTesting: "Gupima ibicuruzwa",
    safetyStandards: "Ibipimo by'umutekano",
    certificationSupport: "Ubufasha bw'icyemezo",
    
    // Common
    startYourJourney: "Tangira urugendo rwawe",
    backToHome: "Garuka ku ntangiriro",
    bookConsultation: "Andika inama",
    getQuote: "Saba igiciro",
    scheduleConsultation: "Tegura inama",
    
    // About
    aboutTitle: "Ibibazo byacu",
    aboutDescription: "Menya intego zacu n'ubuhanga bwacu",
    
    // Contact
    contactTitle: "Twandikire",
    contactDescription: "Mana n'itsinda ryacu",
    
    // Testimonials
    testimonialsTitle: "Inkuru z'intsinzi",
    
    // Blog
    blogTitle: "Ibikoresho biheruka",
    blogDescription: "Komeza wibwirizwa n'ibitekerezo bishya",
    readMore: "Soma byinshi",
    
    // Newsletter
    newsletterTitle: "Komeza wibwirizwa",
    newsletterDescription: "Bonera amakuru mashya n'amahirwe",
    subscribe: "Kwiyandikisha",
    enterEmailAddress: "Injiza aderesi ya imeri yawe",
    
    // Footer
    quickLinks: "Ihuza ryihuse",
    followUs: "Dukurikire",
    
    // Legal pages
    privacyPolicy: "Politiki y'ibanga",
    termsOfService: "Amabwiriza ya serivisi",
    sitemap: "Ikarita y'urubuga",
    
    // WhatsApp button
    scheduleFreeFifteenMinuteConsultation: "Tegura inama y'ubuntu iminota 15"
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
