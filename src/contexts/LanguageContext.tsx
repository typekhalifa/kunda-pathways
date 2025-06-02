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
    resources: 'Resources',
    bookConsultation: 'Book Consultation',
    
    // Hero Section
    heroTitle: 'Your Gateway to Global Opportunities',
    heroSubtitle: 'Expert guidance for studying in Korea and building food & beverage businesses across Asia. From scholarship applications to international business consulting.',
    exploreStudyPrograms: 'Explore Study Programs',
    fbConsulting: 'F&B Consulting',
    studentsAssisted: 'Students Assisted',
    countriesReached: 'Countries Reached',
    foodScienceExpert: 'Food Science Expert',
    startYourJourney: 'Start Your Journey',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Professional guidance for your global journey and business success',
    studyAbroadTitle: 'Study Abroad & Relocation',
    studyAbroadSubtitle: 'Your pathway to global education',
    fbConsultingTitle: 'Food & Beverage Consulting',
    fbConsultingSubtitle: 'Expert guidance from MSc Food Science',
    
    // Service Items
    scholarshipGuidance: 'Scholarship Guidance',
    scholarshipGuidanceDesc: 'Complete scholarship application support',
    universityAdmissions: 'University Enrollment',
    universityAdmissionsDesc: 'Private & public university assistance',
    visaApplication: 'Visa Application',
    visaApplicationDesc: 'Full visa processing support',
    koreanLanguageTraining: 'Korean Language Training',
    koreanLanguageTrainingDesc: 'Online Korean language courses',
    visitsHelp: 'Visits Help & Relocations',
    visitsHelpDesc: 'Complete relocation and settlement assistance',
    
    businessConsultation: 'Business Consultation',
    businessConsultationDesc: 'Expert F&B business advice',
    fbMarketAnalysis: 'Market Analysis',
    fbMarketAnalysisDesc: 'Asian market research & insights',
    productDevelopment: 'Product Development',
    productDevelopmentDesc: 'Food science & technology guidance',
    regulatoryCompliance: 'Regulatory Compliance',
    regulatoryComplianceDesc: 'Food safety & regulations',
    
    // Service Features
    personalizedGuidance: 'Personalized guidance from Korean education expert',
    endToEndSupport: 'End-to-end support from application to arrival',
    culturalOrientation: 'Cultural orientation and settlement assistance',
    mscFoodScienceExpertise: 'MSc Food Science & Technology expertise',
    asianMarketSpecialization: 'Asian market specialization',
    internationalBusinessDev: 'International business development',
    getExpertConsultation: 'Get Expert Consultation',
    packageDealsAvailable: 'Package Deals Available!',
    saveUpTo20Percent: 'Save up to 20% when combining services',
    viewAllPackages: 'View All Packages & Pricing',
    
    // About Section
    aboutTitle: 'About Us',
    aboutSubtitle: 'Your trusted partner in global education and business expansion',
    meetYourGlobalAdvisor: 'Meet Your Global Advisor',
    advisorName: 'John Doe, MSc',
    advisorTitle: 'Food Science & Technology | Korean Education Expert',
    advisorDescription: 'Your partner for education and business in Korea & Asia. With years of experience in both academic guidance and F&B consulting, I help students and entrepreneurs achieve their global dreams.',
    readMoreAboutMe: 'Read More About Me',
    educationExpert: 'Education Expert',
    educationExpertDesc: 'Specializing in Korean university admissions and scholarship guidance',
    fbConsultant: 'F&B Consultant',
    fbConsultantDesc: 'MSc in Food Science with extensive market analysis experience',
    studentsHelped: '500+ Students',
    studentsHelpedDesc: 'Successfully guided students from Africa to top Korean universities',
    countriesReachedDesc: 'International reach across Africa, Asia, and beyond',
    
    // Partners Section
    ourTrustedPartners: 'Our Trusted Partners',
    partnerDescription: 'We work with leading institutions and organizations',
    
    // Newsletter Section
    newsletterTitle: 'Stay Updated with Global Opportunities',
    newsletterDescription: 'Get the latest scholarship announcements, study abroad tips, and F&B industry insights delivered to your inbox.',
    enterEmailAddress: 'Enter your email address',
    subscribe: 'Subscribe',
    newsletterThankYou: 'Thank you for subscribing! Check your email for confirmation.',
    
    // Testimonials
    successStories: 'Success Stories',
    testimonialSubtitle: 'Real stories from clients who achieved their global dreams',
    
    // Blog/Resources
    latest: 'Latest',
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
    contactInfo: 'Contact Info',
    location: 'Seoul, South Korea',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    sitemap: 'Sitemap',
    allRightsReserved: 'All rights reserved.',
    
    // Legal Pages
    privacyPolicyTitle: 'Privacy Policy',
    termsOfServiceTitle: 'Terms of Service',
    sitemapTitle: 'Sitemap',
    
    // About Advisor Page
    backToHome: 'Back to Home',
    biography: 'Biography',
    biographyP1: 'Born and raised in Rwanda, John Doe always had a passion for education and international development. After completing his undergraduate studies in Nutrition at the University of Rwanda, he was selected for the prestigious Korean Government Scholarship Program (KGSP).',
    biographyP2: 'During his time in Korea, John not only excelled academically but also developed a deep understanding of Korean culture and educational systems. He completed his Master of Science in Food Science and Technology at Seoul National University, one of Korea\'s most prestigious institutions.',
    biographyP3: 'After graduation, John decided to dedicate his career to helping other African students achieve their educational dreams in Korea while also building bridges between African and Korean food industries through his consulting work.',
    educationQualifications: 'Education & Qualifications',
    mscFoodScience: 'MSc in Food Science & Technology',
    seoulNationalUniversity: 'Seoul National University, Korea',
    graduationYear: '2019 - 2021',
    bscNutrition: 'BSc in Nutrition Science',
    universityOfRwanda: 'University of Rwanda',
    undergraduateYear: '2014 - 2018',
    kgspScholar: 'KGSP Scholarship Recipient',
    koreanGovernment: 'Korean Government',
    businessCertification: 'International Business Certification',
    koreanChamberCommerce: 'Korean Chamber of Commerce',
    professionalExperience: 'Professional Experience',
    consultantTitle: 'Senior F&B Consultant',
    consultantCompany: 'Korea-Africa Trade Council',
    consultantPeriod: '2021 - Present',
    consultantDescription: 'Leading market analysis and business development initiatives for African food companies entering Korean and Asian markets.',
    educationSpecialistTitle: 'Education Consultant',
    freelanceWork: 'Freelance',
    specialistPeriod: '2020 - Present',
    specialistDescription: 'Providing comprehensive guidance to African students for Korean university admissions and scholarship applications.',
    readyToStart: 'Ready to Start Your Journey?',
    contactCallToAction: 'Let\'s discuss how I can help you achieve your educational or business goals in Korea and Asia.',
    advisorFullDescription: 'A passionate advocate for global education and cross-cultural business development, dedicated to creating pathways for success between Africa and Asia.',
  },
  
  RW: {
    // Navigation
    home: 'Inzu',
    services: 'Serivisi',
    about: 'Abo',
    contact: 'Twandikire',
    resources: 'Amakuru',
    bookConsultation: 'Tekereza Inama',
    heroTitle: 'Inzira yawe yo kwinjira mu mahirwe mpuzamahanga',
    heroSubtitle: 'Ubuyobozi bw\'impuguke mu kwiga muri Koreya no kubaka ubucuruzi bw\'ibiryo n\'ibinyobwa muri Aziya. Kuva mu gusaba ubufasha bw\'amasomo kugeza mu gutanga inama z\'ubucuruzi mpuzamahanga.',
    exploreStudyPrograms: 'Shakisha Gahunda z\'Amasomo',
    fbConsulting: 'Inama z\'Ibiryo n\'Ibinyobwa',
    studentsAssisted: 'Abanyeshuri Bafashijwe',
    countriesReached: 'Ibihugu Bigerwemo',
    foodScienceExpert: 'Inzobere mu Bumenyi bw\'Ibiryo',
    startYourJourney: 'Tangira Urugendo Rwawe',
    servicesTitle: 'Serivisi Zacu',
    servicesSubtitle: 'Ibisubizo byuzuye ku ntego zawe z\'uburezi n\'ubucuruzi',
    ourTrustedPartners: 'Abo Dukorana Nabo Twizeye',
    partnerDescription: 'Dukorana n\'ibigo n\'imiryango ikomeye',
    newsletterTitle: 'Komeza ugire Amakuru y\'Amahirwe y\'Isi',
    newsletterDescription: 'Habona amakuru mashya y\'amahirwe y\'amasomo, ubushakashatsi bw\'inganda, n\'amabwiriza y\'intsinzi.',
    enterEmailAddress: 'Andika aderesi yawe ya imeyili',
    subscribe: 'Iyandikishe',
    newsletterThankYou: 'Urakoze kwiyandikisha! Reba imeyili yawe kugirango wemeze.',
    successStories: 'Inkuru z\'Intsinzi',
    testimonialSubtitle: 'Inkuru z\'ukuri z\'abakiriya bagezeho ku nzozi zabo z\'isi',
    aboutTitle: 'Abo',
    aboutSubtitle: 'Umunyangakenerwa wawe wizewe mu burezi bw\'isi n\'ubucuruzi',
    meetYourGlobalAdvisor: 'Hura n\'Umujyanama wawe w\'Isi',
    advisorName: 'John Doe, MSc',
    advisorTitle: 'Ikoranabuhanga ry\'Ibiryo | Inzobere mu Burezi bwa Koreya',
    advisorDescription: 'Umunyangakenerwa wawe mu burezi n\'ubucuruzi muri Koreya na Aziya. Mfite ubunyangamugayo bw\'imyaka myinshi mu buyobozi bw\'amasomo n\'ubucuruzi bw\'ibiryo.',
    readMoreAboutMe: 'Soma Byinshi Kanjye',
    educationExpert: 'Inzobere mu Burezi',
    educationExpertDesc: 'Byihariye mu kwemererwa muri kaminuza za Koreya n\'ubuyobozi bw\'ubufasha bw\'amasomo',
    fbConsultant: 'Umujyanama w\'Ibiryo',
    fbConsultantDesc: 'MSc mu Bumenyi bw\'Ibiryo n\'ubunyangamugayo bunini bw\'isesengura ry\'isoko',
    studentsHelped: '500+ Abanyeshuri',
    studentsHelpedDesc: 'Nayoboye neza abanyeshuri bo muri Afurika kugera muri kaminuza zo hejuru za Koreya',
    countriesReachedDesc: 'Ukugera mpuzamahanga muri Afurika, Aziya no hanze',
    
    // About Advisor Page
    backToHome: 'Subira ku Rupapuro rw\'Itangiriro',
    biography: 'Amateka y\'Ubuzima',
    biographyP1: 'Yavukiye akaba akurira mu Rwanda, John Doe yari afite urukundo rukomeye rw\'uburezi n\'iterambere ry\'amahanga. Nyuma yo kurangiza amasomo ye y\'icyiciro cya mbere mu Ntungamubiri muri Kaminuza y\'u Rwanda, yatoranijwe muri gahunda y\'ubufasha bw\'amasomo ya Leta ya Koreya (KGSP).',
    biographyP2: 'Mu gihe yari muri Koreya, John ntabwo yagize inyungu gusa mu masomo ariko yabyimye kandi no gusobanukirwa cyane umuco n\'uburezi bwa Koreya. Yarangije impamyabumenyi ye y\'icyiciro cya kabiri mu Bumenyi bw\'Ibiryo n\'Ikoranabuhanga muri Kaminuza y\'Isi ya Seoul, imwe mu nzego zo hejuru za kaminuza za Koreya.',
    biographyP3: 'Nyuma yo kurangiza amasomo, John yahisemo kwiyegurira umwuga we wo gufasha abandi banyeshuri b\'Abanyafurika kugera ku nzozi zabo z\'uburezi muri Koreya mu gihe akaba n\'ubaka amahuriro hagati y\'inganda z\'ibiryo za Afurika na Koreya binyuze mu bikorwa bye byo gutanga inama.',
    educationQualifications: 'Uburezi n\'Impamyabumenyi',
    mscFoodScience: 'MSc in Food Science & Technology',
    seoulNationalUniversity: 'Kaminuza y\'Isi ya Seoul, Koreya',
    graduationYear: '2019 - 2021',
    bscNutrition: 'BSc in Nutrition Science',
    universityOfRwanda: 'Kaminuza y\'u Rwanda',
    undergraduateYear: '2014 - 2018',
    kgspScholar: 'Uwabonye Ubufasha bwa KGSP',
    koreanGovernment: 'Leta ya Koreya',
    businessCertification: 'Impamyabumenyi y\'Ubucuruzi Mpuzamahanga',
    koreanChamberCommerce: 'Urugaga rw\'Ubucuruzi rwa Koreya',
    professionalExperience: 'Ubunyangamugayo bw\'Umwuga',
    consultantTitle: 'Umujyanama Mukuru w\'Ibiryo',
    consultantCompany: 'Inama y\'Ubucuruzi ya Koreya-Afurika',
    consultantPeriod: '2021 - Ubu',
    consultantDescription: 'Uyobora isesengura ry\'isoko n\'ibikorwa by\'iterambere ry\'ubucuruzi ku masosiyete y\'ibiryo yo muri Afurika yinjira mu masoko ya Koreya na Aziya.',
    educationSpecialistTitle: 'Umujyanama w\'Uburezi',
    freelanceWork: 'Akazi gakomeye',
    specialistPeriod: '2020 - Ubu',
    specialistDescription: 'Gutanga ubuyobozi bwuzuye ku banyeshuri b\'Abanyafurika ku kwemererwa muri kaminuza za Koreya no gusaba ubufasha bw\'amasomo.',
    readyToStart: 'Witeguye Gutangira Urugendo Rwawe?',
    contactCallToAction: 'Reka tuganire ku buryo nshobora kugufasha kugera ku ntego zawe z\'uburezi cyangwa ubucuruzi muri Koreya na Aziya.',
    advisorFullDescription: 'Umushakashatsi ukunda uburezi bw\'isi n\'iterambere ry\'ubucuruzi bw\'imico itandukanye, yiyeguriye gushyiraho inzira z\'intsinzi hagati ya Afurika na Aziya.',
    
    // Testimonials
    successStories: 'Inkuru z\'Intsinzi',
    testimonialSubtitle: 'Inkuru z\'ukuri z\'abakiriya bagezeho ku nzozi zabo z\'isi',
    
    // Blog/Resources
    latest: 'Amakuru',
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
    legal: 'Amategeko',
    privacyPolicy: 'Politiki y\'Ubwoba',
    termsOfService: 'Amategeko y\'Serivisi',
    sitemap: 'Ikarita y\'Urubuga',
    allRightsReserved: 'Uburenganzira bwose burarinzwe.',
    
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
    resources: 'Ressources',
    bookConsultation: 'Réserver une Consultation',
    heroTitle: 'Votre Passerelle vers les Opportunités Mondiales',
    heroSubtitle: 'Conseils d\'experts pour étudier en Corée et développer des entreprises de nourriture et boissons en Asie. Des candidatures de bourses au conseil commercial international.',
    exploreStudyPrograms: 'Explorer les Programmes d\'Études',
    fbConsulting: 'Conseil F&B',
    studentsAssisted: 'Étudiants Assistés',
    countriesReached: 'Pays Atteints',
    foodScienceExpert: 'Expert en Science Alimentaire',
    startYourJourney: 'Commencez Votre Voyage',
    servicesTitle: 'Nos Services',
    servicesSubtitle: 'Solutions complètes pour vos objectifs éducatifs et commerciaux',
    ourTrustedPartners: 'Nos Partenaires de Confiance',
    partnerDescription: 'Nous travaillons avec des institutions et organisations de premier plan',
    newsletterTitle: 'Restez Informé des Opportunités Mondiales',
    newsletterDescription: 'Recevez les dernières annonces de bourses, conseils d\'études à l\'étranger et aperçus de l\'industrie F&B.',
    enterEmailAddress: 'Entrez votre adresse e-mail',
    subscribe: 'S\'abonner',
    newsletterThankYou: 'Merci de vous être abonné! Vérifiez votre e-mail pour confirmation.',
    successStories: 'Histoires de Succès',
    testimonialSubtitle: 'Vraies histoires de clients qui ont réalisé leurs rêves mondiaux',
    aboutTitle: 'À Propos de Nous',
    aboutSubtitle: 'Votre partenaire de confiance dans l\'éducation mondiale et l\'expansion commerciale',
    meetYourGlobalAdvisor: 'Rencontrez Votre Conseiller Mondial',
    advisorName: 'John Doe, MSc',
    advisorTitle: 'Science Alimentaire & Technologie | Expert en Éducation Coréenne',
    advisorDescription: 'Votre partenaire pour l\'éducation et les affaires en Corée et en Asie. Avec des années d\'expérience dans l\'orientation académique et le conseil F&B, j\'aide les étudiants et entrepreneurs à réaliser leurs rêves mondiaux.',
    readMoreAboutMe: 'En Savoir Plus Sur Moi',
    educationExpert: 'Expert en Éducation',
    educationExpertDesc: 'Spécialisé dans les admissions universitaires coréennes et l\'orientation des bourses',
    fbConsultant: 'Consultant F&B',
    fbConsultantDesc: 'MSc en Science Alimentaire avec une vaste expérience d\'analyse de marché',
    studentsHelped: '500+ Étudiants',
    studentsHelpedDesc: 'J\'ai guidé avec succès des étudiants d\'Afrique vers les meilleures universités coréennes',
    countriesReachedDesc: 'Portée internationale à travers l\'Afrique, l\'Asie et au-delà',
    
    // About Advisor Page
    backToHome: 'Retour à l\'Accueil',
    biography: 'Biographie',
    biographyP1: 'Né et élevé au Rwanda, John Doe a toujours eu une passion pour l\'éducation et le développement international. Après avoir terminé ses études de premier cycle en Nutrition à l\'Université du Rwanda, il a été sélectionné pour le prestigieux Programme de Bourses du Gouvernement Coréen (KGSP).',
    biographyP2: 'Pendant son séjour en Corée, John a non seulement excellé académiquement mais a aussi développé une compréhension profonde de la culture et des systèmes éducatifs coréens. Il a obtenu son Master en Science et Technologie Alimentaire à l\'Université Nationale de Séoul, l\'une des institutions les plus prestigieuses de Corée.',
    biographyP3: 'Après l\'obtention de son diplôme, John a décidé de consacrer sa carrière à aider d\'autres étudiants africains à réaliser leurs rêves éducatifs en Corée tout en construisant des ponts entre les industries alimentaires africaines et coréennes grâce à son travail de conseil.',
    educationQualifications: 'Éducation et Qualifications',
    mscFoodScience: 'MSc en Science et Technologie Alimentaire',
    seoulNationalUniversity: 'Université Nationale de Séoul, Corée',
    graduationYear: '2019 - 2021',
    bscNutrition: 'BSc en Science de la Nutrition',
    universityOfRwanda: 'Université du Rwanda',
    undergraduateYear: '2014 - 2018',
    kgspScholar: 'Bénéficiaire de Bourse KGSP',
    koreanGovernment: 'Gouvernement Coréen',
    businessCertification: 'Certification en Commerce International',
    koreanChamberCommerce: 'Chambre de Commerce Coréenne',
    professionalExperience: 'Expérience Professionnelle',
    consultantTitle: 'Consultant Senior F&B',
    consultantCompany: 'Conseil Commercial Corée-Afrique',
    consultantPeriod: '2021 - Présent',
    consultantDescription: 'Dirigeant l\'analyse de marché et les initiatives de développement commercial pour les entreprises alimentaires africaines entrant sur les marchés coréens et asiatiques.',
    educationSpecialistTitle: 'Consultant en Éducation',
    freelanceWork: 'Freelance',
    specialistPeriod: '2020 - Présent',
    specialistDescription: 'Gutanga ubuyobozi bwuzuye ku banyeshuri b\'Abanyafurika ku kwemererwa muri kaminuza za Koreya no gusaba ubufasha bw\'amasomo.',
    readyToStart: 'Prêt à Commencer Votre Voyage?',
    contactCallToAction: 'Discutons de la façon dont je peux vous aider à atteindre vos objectifs éducatifs ou commerciaux en Corée et en Asie.',
    advisorFullDescription: 'Un défenseur passionné de l\'éducation mondiale et du développement commercial interculturel, dédié à créer des voies de succès entre l\'Afrique et l\'Asie.',
    
    // Testimonials
    successStories: 'Histoires de Succès',
    testimonialSubtitle: 'Vraies histoires de clients qui ont réalisé leurs rêves mondiaux',
    
    // Blog/Resources
    latest: 'Dernières',
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
    legal: 'Légal',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions de Service',
    sitemap: 'Plan du Site',
    allRightsReserved: 'Tous droits réservés.',
    
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
    resources: '자료',
    bookConsultation: '상담 예약',
    heroTitle: '글로벌 기회로의 관문',
    heroSubtitle: '한국 유학과 아시아 전역의 식음료 사업 구축을 위한 전문 가이드. 장학금 신청부터 국제 비즈니스 컨설팅까지.',
    exploreStudyPrograms: '학습 프로그램 탐색',
    fbConsulting: 'F&B 컨설팅',
    studentsAssisted: '지원한 학생 수',
    countriesReached: '도달 국가 수',
    foodScienceExpert: '식품과학 전문가',
    startYourJourney: '여행을 시작하세요',
    servicesTitle: '우리의 서비스',
    servicesSubtitle: '교육 및 비즈니스 목표를 위한 종합 솔루션',
    ourTrustedPartners: '신뢰할 수 있는 파트너',
    partnerDescription: '선도적인 기관 및 조직과 협력합니다',
    newsletterTitle: '글로벌 기회 업데이트 받기',
    newsletterDescription: '최신 장학금 공지, 해외 유학 팁, F&B 업계 인사이트를 받아보세요.',
    enterEmailAddress: '이메일 주소를 입력하세요',
    subscribe: '구독하기',
    newsletterThankYou: '구독해 주셔서 감사합니다! 확인을 위해 이메일을 확인해 주세요.',
    successStories: '성공 사례',
    testimonialSubtitle: '글로벌 꿈을 이룬 고객들의 실제 이야기',
    aboutTitle: '회사 소개',
    aboutSubtitle: '글로벌 교육 및 비즈니스 확장의 신뢰할 수 있는 파트너',
    meetYourGlobalAdvisor: '글로벌 어드바이저를 만나보세요',
    advisorName: 'John Doe, MSc',
    advisorTitle: '식품과학기술 | 한국 교육 전문가',
    advisorDescription: '한국과 아시아의 교육 및 비즈니스 파트너. 학문적 지도와 F&B 컨설팅에서 수년간의 경험을 바탕으로 학생과 기업가들이 글로벌 꿈을 실현할 수 있도록 도움을 드립니다.',
    readMoreAboutMe: '더 자세히 알아보기',
    educationExpert: '교육 전문가',
    educationExpertDesc: '한국 대학교 입학 및 장학금 안내 전문',
    fbConsultant: 'F&B 컨설턴트',
    fbConsultantDesc: '식품과학 석사 및 광범위한 시장 분석 경험',
    studentsHelped: '500명 이상의 학생',
    studentsHelpedDesc: '아프리카 학생들을 한국 최고 대학교로 성공적으로 안내',
    countriesReachedDesc: '아프리카, 아시아 및 그 너머의 국제적 도달',
    
    // About Advisor Page
    backToHome: '홈으로 돌아가기',
    biography: '경력',
    biographyP1: '르완다에서 태어나고 자란 John Doe는 항상 교육과 국제 개발에 대한 열정을 가지고 있었습니다. �르완다 대학교에서 영양학 학사 과정을 마친 후, 명망 있는 한국 정부 장학금 프로그램(KGSP)에 선발되었습니다.',
    biographyP2: '한국에서의 시간 동안 John은 학문적으로 뛰어난 성과를 거두었을 뿐만 아니라 한국 문화와 교육 시스템에 대한 깊은 이해를 발전시켰습니다. 한국의 가장 권위 있는 기관 중 하나인 서울대학교에서 식품과학기술 석사 학위를 완료했습니다.',
    biographyP3: '졸업 후 John은 다른 아프리카 학생들이 한국에서 교육적 꿈을 실현할 수 있도록 도우면서 컨설팅 업무를 통해 아프리카와 한국 식품 산업 간의 다리를 구축하는 데 자신의 경력을 바치기로 결정했습니다.',
    educationQualifications: '교육 및 자격',
    mscFoodScience: '식품과학기술 석사',
    seoulNationalUniversity: '서울대학교, 한국',
    graduationYear: '2019 - 2021',
    bscNutrition: '영양과학 학사',
    universityOfRwanda: '르완다 대학교',
    undergraduateYear: '2014 - 2018',
    kgspScholar: 'KGSP 장학금 수혜자',
    koreanGovernment: '한국 정부',
    businessCertification: '국제비즈니스 자격증',
    koreanChamberCommerce: '한국상공회의소',
    professionalExperience: '전문 경험',
    consultantTitle: '수석 F&B 컨설턴트',
    consultantCompany: '한국-아프리카 무역위원회',
    consultantPeriod: '2021 - 현재',
    consultantDescription: '한국 및 아시아 시장에 진출하는 아프리카 식품 회사들을 위한 시장 분석 및 사업 개발 이니셔티브를 주도하고 있습니다.',
    educationSpecialistTitle: '교육 컨설턴트',
    freelanceWork: '프리랜서',
    specialistPeriod: '2020 - 현재',
    specialistDescription: '한국 대학교 입학 및 장학금 신청에 대한 아프리카 학생들에게 종합적인 지도를 제공하고 있습니다.',
    readyToStart: '여행을 시작할 준비가 되셨나요?',
    contactCallToAction: '한국과 아시아에서 교육 또는 비즈니스 목표를 달성하는 데 제가 어떻게 도움을 드릴 수 있는지 논의해 보겠습니다.',
    advisorFullDescription: '글로벌 교육과 문화 간 비즈니스 개발에 대한 열정적인 옹호자로서, 아프리카와 아시아 간의 성공 경로를 만드는 데 헌신하고 있습니다.',
    
    // Testimonials
    successStories: '성공 사례',
    testimonialSubtitle: '글로벌 꿈을 이룬 고객들의 실제 이야기',
    
    // Blog/Resources
    latest: '최신',
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
    contactInfo: '연락처 정보',
    location: '서울, 대한민국',
    legal: '법적 정보',
    privacyPolicy: '개인정보처리방침',
    termsOfService: '서비스 약관',
    sitemap: '사이트맵',
    allRightsReserved: '모든 권리 보유.',
    
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
