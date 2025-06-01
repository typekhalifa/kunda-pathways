
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'RW' | 'FR' | 'KO';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  EN: {
    // Navigation
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Your Gateway to Global Opportunities',
    heroSubtitle: 'Expert guidance for studying in Korea and building food & beverage businesses across Asia. From scholarship applications to international business consulting.',
    exploreStudyPrograms: 'Explore Study Programs',
    fbConsulting: 'F&B Consulting',
    studentsAssisted: 'Students Assisted',
    countriesReached: 'Countries Reached',
    foodScienceExpert: 'Food Science Expert',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive solutions for your educational and business goals',
    
    // About
    aboutTitle: 'About Us',
    aboutSubtitle: 'Your trusted partner in global education and business expansion',
    
    // Testimonials
    successStories: 'Success Stories',
    testimonialSubtitle: 'Real stories from clients who achieved their global dreams',
    
    // Blog/Resources
    latest: 'Latest',
    resources: 'Resources',
    resourcesDescription: 'Stay updated with scholarship opportunities, industry insights, and success tips',
    blogPost1Title: 'Top 10 Korean Universities Offering Scholarships for African Students',
    blogPost1Excerpt: 'Discover the best opportunities for funded education in South Korea...',
    blogPost2Title: 'Breaking into the Korean F&B Market: A Complete Guide',
    blogPost2Excerpt: 'Everything you need to know about food business regulations in Korea...',
    blogPost3Title: 'KGSP 2024: Application Tips and Deadlines',
    blogPost3Excerpt: 'Get insider tips for the Korean Government Scholarship Program...',
    education: 'Education',
    business: 'Business',
    scholarships: 'Scholarships',
    readMore: 'Read More',
    viewAllResources: 'View All Resources',
    
    // Footer
    footerDescription: 'Your partner for education and business in Korea & Asia.',
    quickLinks: 'Quick Links',
    aboutUs: 'About Us',
    studyInKorea: 'Study in Korea',
    resourcesBlog: 'Resources/Blog',
    scholarshipGuidance: 'Scholarship Guidance',
    universityAdmissions: 'University Admissions',
    fbMarketAnalysis: 'F&B Market Analysis',
    visitsHelp: 'Visits Help & Relocations',
    contactInfo: 'Contact Info',
    location: 'Seoul, South Korea',
    copyright: '© 2024 GlobalConnect. All rights reserved.',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    sitemap: 'Sitemap',
    
    // Legal Pages
    privacyPolicyTitle: 'Privacy Policy',
    termsOfServiceTitle: 'Terms of Service',
    sitemapTitle: 'Sitemap',
  },
  
  RW: {
    // Navigation
    home: 'Inzu',
    services: 'Serivisi',
    about: 'Abo',
    contact: 'Twandikire',
    
    // Hero Section
    heroTitle: 'Inzira yawe yo kwinjira mu mahirwe mpuzamahanga',
    heroSubtitle: 'Ubuyobozi bw\'impuguke mu kwiga muri Koreya no kubaka ubucuruzi bw\'ibiryo n\'ibinyobwa muri Aziya. Kuva mu gusaba ubufasha bw\'amasomo kugeza mu gutanga inama z\'ubucuruzi mpuzamahanga.',
    exploreStudyPrograms: 'Shakisha Gahunda z\'Amasomo',
    fbConsulting: 'Inama z\'Ibiryo n\'Ibinyobwa',
    studentsAssisted: 'Abanyeshuri Bafashijwe',
    countriesReached: 'Ibihugu Bigerwemo',
    foodScienceExpert: 'Inzobere mu Bumenyi bw\'Ibiryo',
    
    // Services
    servicesTitle: 'Serivisi Zacu',
    servicesSubtitle: 'Ibisubizo byuzuye ku ntego zawe z\'uburezi n\'ubucuruzi',
    
    // About
    aboutTitle: 'Abo',
    aboutSubtitle: 'Umunyangakenerwa wawe wizewe mu burezi bw\'isi n\'ubucuruzi',
    
    // Testimonials
    successStories: 'Inkuru z\'Intsinzi',
    testimonialSubtitle: 'Inkuru z\'ukuri z\'abakiriya bagezeho ku nzozi zabo z\'isi',
    
    // Blog/Resources
    latest: 'Amakuru',
    resources: 'Mashya',
    resourcesDescription: 'Komeza ugire amakuru y\'amahirwe y\'amasomo, ubumenyi bw\'inganda, n\'amabwiriza y\'intsinzi',
    blogPost1Title: 'Kaminuza 10 zo hejuru zo muri Koreya zitanga ubufasha bw\'amasomo ku banyeshuri b\'Afurika',
    blogPost1Excerpt: 'Menya amahirwe meza yo kwiga muri Koreya y\'Amajyepfo...',
    blogPost2Title: 'Kwinjira mu isoko ry\'ibiryo muri Koreya: Ubuyobozi bwuzuye',
    blogPost2Excerpt: 'Byose ukeneye kumenya ku mategeko y\'ubucuruzi bw\'ibiryo muri Koreya...',
    blogPost3Title: 'KGSP 2024: Amabwiriza yo gusaba n\'igihe ntarengwa',
    blogPost3Excerpt: 'Gira amabwiriza y\'imbere ku gahunda y\'ubufasha bw\'amasomo ya guverinoma ya Koreya...',
    education: 'Uburezi',
    business: 'Ubucuruzi',
    scholarships: 'Ubufasha bw\'Amasomo',
    readMore: 'Soma Byinshi',
    viewAllResources: 'Reba Amakuru Yose',
    
    // Footer
    footerDescription: 'Umunyangakenerwa wawe mu burezi n\'ubucuruzi muri Koreya na Aziya.',
    quickLinks: 'Ihuza Ryihuse',
    aboutUs: 'Abo',
    studyInKorea: 'Wige muri Koreya',
    resourcesBlog: 'Amakuru/Blog',
    scholarshipGuidance: 'Ubuyobozi bw\'Ubufasha bw\'Amasomo',
    universityAdmissions: 'Kwemererwa muri Kaminuza',
    fbMarketAnalysis: 'Isesengura ry\'Isoko ry\'Ibiryo',
    visitsHelp: 'Ubufasha bw\'Urugendo n\'Ukwimukira',
    contactInfo: 'Amakuru y\'Itumanaho',
    location: 'Seoul, Koreya y\'Amajyepfo',
    copyright: '© 2024 GlobalConnect. Uburenganzira bwose burarinzwe.',
    legal: 'Amategeko',
    privacyPolicy: 'Politiki y\'Ubwoba',
    termsOfService: 'Amategeko y\'Serivisi',
    sitemap: 'Ikarita y\'Urubuga',
    
    // Legal Pages
    privacyPolicyTitle: 'Politiki y\'Ubwoba',
    termsOfServiceTitle: 'Amategeko y\'Serivisi',
    sitemapTitle: 'Ikarita y\'Urubuga',
  },
  
  FR: {
    // Navigation
    home: 'Accueil',
    services: 'Services',
    about: 'À propos',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Votre Passerelle vers les Opportunités Mondiales',
    heroSubtitle: 'Conseils d\'experts pour étudier en Corée et développer des entreprises de nourriture et boissons en Asie. Des candidatures de bourses au conseil commercial international.',
    exploreStudyPrograms: 'Explorer les Programmes d\'Études',
    fbConsulting: 'Conseil F&B',
    studentsAssisted: 'Étudiants Assistés',
    countriesReached: 'Pays Atteints',
    foodScienceExpert: 'Expert en Science Alimentaire',
    
    // Services
    servicesTitle: 'Nos Services',
    servicesSubtitle: 'Solutions complètes pour vos objectifs éducatifs et commerciaux',
    
    // About
    aboutTitle: 'À Propos de Nous',
    aboutSubtitle: 'Votre partenaire de confiance dans l\'éducation mondiale et l\'expansion commerciale',
    
    // Testimonials
    successStories: 'Histoires de Succès',
    testimonialSubtitle: 'Vraies histoires de clients qui ont réalisé leurs rêves mondiaux',
    
    // Blog/Resources
    latest: 'Dernières',
    resources: 'Ressources',
    resourcesDescription: 'Restez informé des opportunités de bourses, des aperçus de l\'industrie et des conseils de succès',
    blogPost1Title: 'Top 10 des Universités Coréennes Offrant des Bourses aux Étudiants Africains',
    blogPost1Excerpt: 'Découvrez les meilleures opportunités d\'éducation financée en Corée du Sud...',
    blogPost2Title: 'Percer dans le Marché F&B Coréen: Un Guide Complet',
    blogPost2Excerpt: 'Tout ce que vous devez savoir sur les réglementations commerciales alimentaires en Corée...',
    blogPost3Title: 'KGSP 2024: Conseils de Candidature et Dates Limites',
    blogPost3Excerpt: 'Obtenez des conseils d\'initiés pour le Programme de Bourses du Gouvernement Coréen...',
    education: 'Éducation',
    business: 'Affaires',
    scholarships: 'Bourses',
    readMore: 'Lire Plus',
    viewAllResources: 'Voir Toutes les Ressources',
    
    // Footer
    footerDescription: 'Votre partenaire pour l\'éducation et les affaires en Corée et en Asie.',
    quickLinks: 'Liens Rapides',
    aboutUs: 'À Propos de Nous',
    studyInKorea: 'Étudier en Corée',
    resourcesBlog: 'Ressources/Blog',
    scholarshipGuidance: 'Orientation des Bourses',
    universityAdmissions: 'Admissions Universitaires',
    fbMarketAnalysis: 'Analyse du Marché F&B',
    visitsHelp: 'Aide aux Visites et Relocalisations',
    contactInfo: 'Informations de Contact',
    location: 'Séoul, Corée du Sud',
    copyright: '© 2024 GlobalConnect. Tous droits réservés.',
    legal: 'Légal',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions de Service',
    sitemap: 'Plan du Site',
    
    // Legal Pages
    privacyPolicyTitle: 'Politique de Confidentialité',
    termsOfServiceTitle: 'Conditions de Service',
    sitemapTitle: 'Plan du Site',
  },
  
  KO: {
    // Navigation
    home: '홈',
    services: '서비스',
    about: '소개',
    contact: '연락처',
    
    // Hero Section
    heroTitle: '글로벌 기회로의 관문',
    heroSubtitle: '한국 유학과 아시아 전역의 식음료 사업 구축을 위한 전문 가이드. 장학금 신청부터 국제 비즈니스 컨설팅까지.',
    exploreStudyPrograms: '학습 프로그램 탐색',
    fbConsulting: 'F&B 컨설팅',
    studentsAssisted: '지원한 학생 수',
    countriesReached: '도달 국가 수',
    foodScienceExpert: '식품과학 전문가',
    
    // Services
    servicesTitle: '우리의 서비스',
    servicesSubtitle: '교육 및 비즈니스 목표를 위한 종합 솔루션',
    
    // About
    aboutTitle: '회사 소개',
    aboutSubtitle: '글로벌 교육 및 비즈니스 확장의 신뢰할 수 있는 파트너',
    
    // Testimonials
    successStories: '성공 사례',
    testimonialSubtitle: '글로벌 꿈을 이룬 고객들의 실제 이야기',
    
    // Blog/Resources
    latest: '최신',
    resources: '자료',
    resourcesDescription: '장학금 기회, 업계 인사이트, 성공 팁으로 최신 정보를 유지하세요',
    blogPost1Title: '아프리카 학생들에게 장학금을 제공하는 한국 대학교 상위 10곳',
    blogPost1Excerpt: '한국에서 지원받는 교육의 최고 기회를 발견하세요...',
    blogPost2Title: '한국 F&B 시장 진출: 완전 가이드',
    blogPost2Excerpt: '한국의 식품 사업 규정에 대해 알아야 할 모든 것...',
    blogPost3Title: 'KGSP 2024: 지원 팁과 마감일',
    blogPost3Excerpt: '한국 정부 장학금 프로그램의 내부자 팁을 얻으세요...',
    education: '교육',
    business: '비즈니스',
    scholarships: '장학금',
    readMore: '더 읽기',
    viewAllResources: '모든 자료 보기',
    
    // Footer
    footerDescription: '한국과 아시아의 교육 및 비즈니스 파트너.',
    quickLinks: '빠른 링크',
    aboutUs: '회사 소개',
    studyInKorea: '한국 유학',
    resourcesBlog: '자료/블로그',
    scholarshipGuidance: '장학금 안내',
    universityAdmissions: '대학 입학',
    fbMarketAnalysis: 'F&B 시장 분석',
    visitsHelp: '방문 도움 및 이주',
    contactInfo: '연락처 정보',
    location: '서울, 대한민국',
    copyright: '© 2024 GlobalConnect. 모든 권리 보유.',
    legal: '법적 정보',
    privacyPolicy: '개인정보처리방침',
    termsOfService: '서비스 약관',
    sitemap: '사이트맵',
    
    // Legal Pages
    privacyPolicyTitle: '개인정보처리방침',
    termsOfServiceTitle: '서비스 약관',
    sitemapTitle: '사이트맵',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['EN', 'RW', 'FR', 'KO'].includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }

    // Listen for language changes from LanguageSwitcher
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    currentLanguage,
    setLanguage,
    translations: translations[currentLanguage],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
