
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
    
    // Contact Section
    letsStartYourJourney: "Let's Start Your Journey",
    readyToTakeNextStep: 'Ready to take the next step? Get in touch for a free consultation',
    sendUsMessage: 'Send us a Message',
    fillFormBelow: 'Fill out the form below and we\'ll respond within 24 hours',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    selectService: 'Select Service',
    generalInquiry: 'General Inquiry',
    studyAbroadRelocation: 'Study Abroad & Relocation',
    fbConsultingService: 'F&B Consulting',
    bothServices: 'Both Services',
    message: 'Message',
    tellUsAboutGoals: 'Tell us about your goals and how we can help...',
    sendMessage: 'Send Message',
    quickContact: 'Quick Contact',
    email: 'Email',
    phone: 'Phone',
    phoneKorea: 'Phone (Korea)',
    whatsapp: 'WhatsApp',
    bookAConsultation: 'Book a Consultation',
    scheduleFreeConsultation: 'Schedule a free 15-minute consultation to discuss your goals and get personalized advice.',
    scheduleConsultation: 'Schedule Free Consultation',
    officeHours: 'Office Hours',
    mondayFriday: 'Monday - Friday:',
    saturday: 'Saturday:',
    sunday: 'Sunday:',
    closed: 'Closed',
    
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
    contactCallToAction: 'Let\'s discuss how I can help you achieve your goals in Korea and Asia.',
    advisorFullDescription: 'A passionate advocate for global education and cross-cultural business development',
  },
  
  RW: {
    // Navigation
    home: 'Inzu',
    services: 'Serivisi',
    about: 'Abo',
    contact: 'Twandikire',
    resources: 'Amakuru',
    bookConsultation: 'Tekereza Inama',
    
    // Hero Section
    heroTitle: 'Inzira yawe yo kwinjira mu mahirwe mpuzamahanga',
    heroSubtitle: 'Ubuyobozi bw\'impuguke mu kwiga muri Koreya no kubaka ubucuruzi bw\'ibiryo n\'ibinyobwa muri Aziya. Kuva mu gusaba ubufasha bw\'amasomo kugeza mu gutanga inama z\'ubucuruzi mpuzamahanga.',
    exploreStudyPrograms: 'Shakisha Gahunda z\'Amasomo',
    fbConsulting: 'Inama z\'Ibiryo n\'Ibinyobwa',
    studentsAssisted: 'Abanyeshuri Bafashijwe',
    countriesReached: 'Ibihugu Bigerwemo',
    foodScienceExpert: 'Inzobere mu Bumenyi bw\'Ibiryo',
    startYourJourney: 'Tangira Urugendo Rwawe',
    
    // Services
    servicesTitle: 'Serivisi Zacu',
    servicesSubtitle: 'Ibisubizo byuzuye ku ntego zawe z\'uburezi n\'ubucuruzi',
    studyAbroadTitle: 'Kwiga mu Mahanga n\'Ukwimuka',
    studyAbroadSubtitle: 'Inzira yawe y\'uburezi bw\'isi',
    fbConsultingTitle: 'Inama z\'Ibiryo n\'Ibinyobwa',
    fbConsultingSubtitle: 'Ubuyobozi bw\'impuguke kuva mu bumenyi bw\'ibiryo',
    
    // Service Items
    scholarshipGuidance: 'Ubuyobozi bw\'Ubufasha bw\'Amasomo',
    scholarshipGuidanceDesc: 'Ubufasha bwuzuye bwo gusaba ubufasha bw\'amasomo',
    universityAdmissions: 'Kwemererwa muri Kaminuza',
    universityAdmissionsDesc: 'Ubufasha mu kaminuza zigenga n\'iza leta',
    visaApplication: 'Gusaba Viza',
    visaApplicationDesc: 'Ubufasha bwuzuye bwo gutunganya viza',
    koreanLanguageTraining: 'Amahugurwa y\'Ikinyakoreya',
    koreanLanguageTrainingDesc: 'Amasomo y\'ikinyakoreya ku rubuga',
    visitsHelp: 'Ubufasha bw\'Urugendo n\'Ukwimukira',
    visitsHelpDesc: 'Ubufasha bwuzuye bwo kwimukira no kwitegura',
    
    businessConsultation: 'Inama z\'Ubucuruzi',
    businessConsultationDesc: 'Inama z\'impuguke z\'ubucuruzi bw\'ibiryo',
    fbMarketAnalysis: 'Isesengura ry\'Isoko ry\'Ibiryo',
    fbMarketAnalysisDesc: 'Ubushakashatsi n\'amakuru y\'isoko rya Aziya',
    productDevelopment: 'Iterambere ry\'Ibicuruzwa',
    productDevelopmentDesc: 'Ubuyobozi bw\'ubumenyi bw\'ibiryo n\'ikoranabuhanga',
    regulatoryCompliance: 'Kubahiriza Amategeko',
    regulatoryComplianceDesc: 'Umutekano w\'ibiryo n\'amategeko',
    
    // Service Features
    personalizedGuidance: 'Ubuyobozi bwihariye kuva ku inzobere mu burezi bwa Koreya',
    endToEndSupport: 'Ubufasha bwuzuye kuva mu gusaba kugeza ku kugera',
    culturalOrientation: 'Ubuyobozi bw\'umuco no kwitegura',
    mscFoodScienceExpertise: 'Ubuhanga bwa MSc mu Bumenyi bw\'Ibiryo n\'Ikoranabuhanga',
    asianMarketSpecialization: 'Ubuhanga bw\'isoko rya Aziya',
    internationalBusinessDev: 'Iterambere ry\'ubucuruzi mpuzamahanga',
    getExpertConsultation: 'Saba Inama z\'Impuguke',
    packageDealsAvailable: 'Amasezerano y\'Ipaketi Arahari!',
    saveUpTo20Percent: 'Kugabanya kugeza 20% mukoresheje serivisi nyinshi',
    viewAllPackages: 'Reba Amapaki Yose n\'Ibiciro',
    
    // About Section
    aboutTitle: 'Abo',
    aboutSubtitle: 'Umunyangakenerwa wawe wizewe mu burezi bw\'isi n\'ubwiyongere bw\'ubucuruzi',
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
    
    // Partners Section
    ourTrustedPartners: 'Abo Dukorana Nabo Twizeye',
    partnerDescription: 'Dukorana n\'ibigo n\'imiryango ikomeye',
    
    // Newsletter Section
    newsletterTitle: 'Komeza ugire Amakuru y\'Amahirwe y\'Isi',
    newsletterDescription: 'Habona amakuru mashya y\'amahirwe y\'amasomo, ubushakashatsi bw\'inganda, n\'amabwiriza y\'intsinzi.',
    enterEmailAddress: 'Andika aderesi yawe ya imeyili',
    subscribe: 'Iyandikishe',
    newsletterThankYou: 'Urakoze kwiyandikisha! Reba imeyili yawe kugirango wemeze.',
    
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
    
    // Contact Section
    letsStartYourJourney: 'Reka Dutangire Urugendo Rwawe',
    readyToTakeNextStep: 'Witeguye gufata icyiciro gikurikira? Hamagara kugirango ubone inama zubusa',
    sendUsMessage: 'Twoherereze Ubutumwa',
    fillFormBelow: 'Uzuza ifishi iri hepfo tuzasubiza mu masaha 24',
    yourName: 'Izina Ryawe',
    yourEmail: 'Imeyili Yawe',
    selectService: 'Hitamo Serivisi',
    generalInquiry: 'Ibibazo Rusange',
    studyAbroadRelocation: 'Kwiga mu Mahanga n\'Ukwimuka',
    fbConsultingService: 'Inama z\'Ibiryo n\'Ibinyobwa',
    bothServices: 'Serivisi Zombi',
    message: 'Ubutumwa',
    tellUsAboutGoals: 'Tubwire ku ntego zawe n\'uburyo dushobora kugufasha...',
    sendMessage: 'Kohereza Ubutumwa',
    quickContact: 'Itumanaho Ryihuse',
    email: 'Imeyili',
    phone: 'Telefoni',
    phoneKorea: 'Telefoni (Koreya)',
    whatsapp: 'WhatsApp',
    bookAConsultation: 'Tekereza Inama',
    scheduleFreeConsultation: 'Tekereza inama y\'iminota 15 yubusa kugirango muganire ku ntego zanyu mukabona inama zigenga.',
    scheduleConsultation: 'Tekereza Inama Yubusa',
    officeHours: 'Amasaha y\'Akazi',
    mondayFriday: 'Kuwa mbere - Kuwa gatanu:',
    saturday: 'Kuwa gatandatu:',
    sunday: 'Ku cyumweru:',
    closed: 'Bafunze',
    
    // Footer
    footerDescription: 'Umunyangakenerwa wawe mu burezi n\'ubucuruzi muri Koreya na Aziya.',
    quickLinks: 'Ihuza Ryihuse',
    aboutUs: 'Abo',
    studyInKorea: 'Wige muri Koreya',
    resourcesBlog: 'Amakuru/Blog',
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
    
    // About Advisor Page
    backToHome: 'Subira ku Rupapuro rw\'Itangiriro',
    biography: 'Amateka y\'Ubuzima',
    biographyP1: 'Yavukiye akaba akurira mu Rwanda, John Doe yari afite urukundo rukomeye rw\'uburezi n\'iterambere ry\'amahanga.',
    biographyP2: 'Mu gihe yari muri Koreya, John ntabwo yagize inyungu gusa mu masomo ariko yabyimye kandi no gusobanukirwa cyane umuco n\'uburezi bwa Koreya.',
    biographyP3: 'Nyuma yo kurangiza amasomo, John yahisemo kwiyegurira umwuga we wo gufasha abandi banyeshuri b\'Abanyafurika.',
    educationQualifications: 'Uburezi n\'Impamyabumenyi',
    mscFoodScience: 'MSc mu Bumenyi bw\'Ibiryo n\'Ikoranabuhanga',
    seoulNationalUniversity: 'Kaminuza y\'Isi ya Seoul, Koreya',
    graduationYear: '2019 - 2021',
    bscNutrition: 'BSc mu Bumenyi bw\'Intungamubiri',
    universityOfRwanda: 'Kaminuza y\'u Rwanda',
    undergraduateYear: '2014 - 2018',
    professionalExperience: 'Ubunyangamugayo bw\'Umwuga',
    consultantTitle: 'Umujyanama Mukuru w\'Ibiryo',
    consultantCompany: 'Inama y\'Ubucuruzi ya Koreya-Afurika',
    consultantPeriod: '2021 - Ubu',
    consultantDescription: 'Uyobora isesengura ry\'isoko n\'ibikorwa by\'iterambere ry\'ubucuruzi.',
    educationSpecialistTitle: 'Umujyanama w\'Uburezi',
    freelanceWork: 'Akazi gakomeye',
    specialistPeriod: '2020 - Ubu',
    specialistDescription: 'Gutanga ubuyobozi bwuzuye ku banyeshuri b\'Abanyafurika.',
    readyToStart: 'Witeguye Gutangira Urugendo Rwawe?',
    contactCallToAction: 'Reka tuganire ku buryo nshobora kugufasha kugera ku ntego zawe muri Koreya na Aziya.',
    advisorFullDescription: 'Umushakashatsi ukunda uburezi bw\'isi n\'iterambere ry\'ubucuruzi',
  },
  
  FR: {
    // Navigation
    home: 'Accueil',
    services: 'Services',
    about: 'À propos',
    contact: 'Contact',
    resources: 'Ressources',
    bookConsultation: 'Réserver une Consultation',
    
    // Hero Section
    heroTitle: 'Votre Passerelle vers les Opportunités Mondiales',
    heroSubtitle: 'Conseils d\'experts pour étudier en Corée et développer des entreprises de nourriture et boissons en Asie.',
    exploreStudyPrograms: 'Explorer les Programmes d\'Études',
    fbConsulting: 'Conseil F&B',
    studentsAssisted: 'Étudiants Assistés',
    countriesReached: 'Pays Atteints',
    foodScienceExpert: 'Expert en Science Alimentaire',
    startYourJourney: 'Commencez Votre Voyage',
    
    // Services
    servicesTitle: 'Nos Services',
    servicesSubtitle: 'Solutions complètes pour vos objectifs éducatifs et commerciaux',
    studyAbroadTitle: 'Études à l\'Étranger et Relocation',
    studyAbroadSubtitle: 'Votre chemin vers l\'éducation mondiale',
    fbConsultingTitle: 'Conseil en Nourriture et Boissons',
    fbConsultingSubtitle: 'Conseils d\'experts en science alimentaire MSc',
    
    // Service Items
    scholarshipGuidance: 'Orientation des Bourses',
    scholarshipGuidanceDesc: 'Support complet pour les demandes de bourses',
    universityAdmissions: 'Admissions Universitaires',
    universityAdmissionsDesc: 'Assistance pour universités privées et publiques',
    visaApplication: 'Demande de Visa',
    visaApplicationDesc: 'Support complet pour le traitement des visas',
    koreanLanguageTraining: 'Formation en Langue Coréenne',
    koreanLanguageTrainingDesc: 'Cours de coréen en ligne',
    visitsHelp: 'Aide aux Visites et Relocalisations',
    visitsHelpDesc: 'Assistance complète pour la relocalisation et l\'installation',
    
    businessConsultation: 'Consultation d\'Affaires',
    businessConsultationDesc: 'Conseils d\'experts en affaires F&B',
    fbMarketAnalysis: 'Analyse du Marché F&B',
    fbMarketAnalysisDesc: 'Recherche de marché et insights asiatiques',
    productDevelopment: 'Développement de Produits',
    productDevelopmentDesc: 'Conseils en science alimentaire et technologie',
    regulatoryCompliance: 'Conformité Réglementaire',
    regulatoryComplianceDesc: 'Sécurité alimentaire et réglementations',
    
    // Service Features
    personalizedGuidance: 'Conseils personnalisés d\'un expert en éducation coréenne',
    endToEndSupport: 'Support de bout en bout de la candidature à l\'arrivée',
    culturalOrientation: 'Orientation culturelle et assistance à l\'installation',
    mscFoodScienceExpertise: 'Expertise MSc en Science et Technologie Alimentaire',
    asianMarketSpecialization: 'Spécialisation du marché asiatique',
    internationalBusinessDev: 'Développement des affaires internationales',
    getExpertConsultation: 'Obtenir une Consultation d\'Expert',
    packageDealsAvailable: 'Offres de Packages Disponibles!',
    saveUpTo20Percent: 'Économisez jusqu\'à 20% en combinant les services',
    viewAllPackages: 'Voir Tous les Packages et Tarifs',
    
    // About Section
    aboutTitle: 'À Propos de Nous',
    aboutSubtitle: 'Votre partenaire de confiance dans l\'éducation mondiale et l\'expansion commerciale',
    meetYourGlobalAdvisor: 'Rencontrez Votre Conseiller Mondial',
    advisorName: 'John Doe, MSc',
    advisorTitle: 'Science Alimentaire & Technologie | Expert en Éducation Coréenne',
    advisorDescription: 'Votre partenaire pour l\'éducation et les affaires en Corée et en Asie.',
    readMoreAboutMe: 'En Savoir Plus Sur Moi',
    educationExpert: 'Expert en Éducation',
    educationExpertDesc: 'Spécialisé dans les admissions universitaires coréennes et l\'orientation des bourses',
    fbConsultant: 'Consultant F&B',
    fbConsultantDesc: 'MSc en Science Alimentaire avec une vaste expérience d\'analyse de marché',
    studentsHelped: '500+ Étudiants',
    studentsHelpedDesc: 'J\'ai guidé avec succès des étudiants d\'Afrique vers les meilleures universités coréennes',
    countriesReachedDesc: 'Portée internationale à travers l\'Afrique, l\'Asie et au-delà',
    
    // Partners Section
    ourTrustedPartners: 'Nos Partenaires de Confiance',
    partnerDescription: 'Nous travaillons avec des institutions et organisations de premier plan',
    
    // Newsletter Section
    newsletterTitle: 'Restez Informé des Opportunités Mondiales',
    newsletterDescription: 'Recevez les dernières annonces de bourses, conseils d\'études à l\'étranger et aperçus de l\'industrie F&B.',
    enterEmailAddress: 'Entrez votre adresse e-mail',
    subscribe: 'S\'abonner',
    newsletterThankYou: 'Merci de vous être abonné! Vérifiez votre e-mail pour confirmation.',
    
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
    
    // Contact Section
    letsStartYourJourney: 'Commençons Votre Voyage',
    readyToTakeNextStep: 'Prêt à franchir l\'étape suivante? Contactez-nous pour une consultation gratuite',
    sendUsMessage: 'Envoyez-nous un Message',
    fillFormBelow: 'Remplissez le formulaire ci-dessous et nous répondrons dans les 24 heures',
    yourName: 'Votre Nom',
    yourEmail: 'Votre E-mail',
    selectService: 'Sélectionner le Service',
    generalInquiry: 'Demande Générale',
    studyAbroadRelocation: 'Études à l\'Étranger et Relocation',
    fbConsultingService: 'Conseil F&B',
    bothServices: 'Les Deux Services',
    message: 'Message',
    tellUsAboutGoals: 'Parlez-nous de vos objectifs et comment nous pouvons vous aider...',
    sendMessage: 'Envoyer le Message',
    quickContact: 'Contact Rapide',
    email: 'E-mail',
    phone: 'Téléphone',
    phoneKorea: 'Téléphone (Corée)',
    whatsapp: 'WhatsApp',
    bookAConsultation: 'Réserver une Consultation',
    scheduleFreeConsultation: 'Planifiez une consultation gratuite de 15 minutes pour discuter de vos objectifs et obtenir des conseils personnalisés.',
    scheduleConsultation: 'Planifier une Consultation Gratuite',
    officeHours: 'Heures de Bureau',
    mondayFriday: 'Lundi - Vendredi:',
    saturday: 'Samedi:',
    sunday: 'Dimanche:',
    closed: 'Fermé',
    
    // Footer
    footerDescription: 'Votre partenaire pour l\'éducation et les affaires en Corée et en Asie.',
    quickLinks: 'Liens Rapides',
    aboutUs: 'À Propos de Nous',
    studyInKorea: 'Étudier en Corée',
    resourcesBlog: 'Ressources/Blog',
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
    
    // About Advisor Page
    backToHome: 'Retour à l\'Accueil',
    biography: 'Biographie',
    biographyP1: 'Né et élevé au Rwanda, John Doe a toujours eu une passion pour l\'éducation et le développement international.',
    biographyP2: 'Pendant son séjour en Corée, John a non seulement excellé académiquement mais a aussi développé une compréhension profonde de la culture coréenne.',
    biographyP3: 'Après l\'obtention de son diplôme, John a décidé de consacrer sa carrière à aider d\'autres étudiants africains.',
    educationQualifications: 'Éducation et Qualifications',
    mscFoodScience: 'MSc en Science et Technologie Alimentaire',
    seoulNationalUniversity: 'Université Nationale de Séoul, Corée',
    graduationYear: '2019 - 2021',
    bscNutrition: 'BSc en Science de la Nutrition',
    universityOfRwanda: 'Université du Rwanda',
    undergraduateYear: '2014 - 2018',
    professionalExperience: 'Expérience Professionnelle',
    consultantTitle: 'Consultant Senior F&B',
    consultantCompany: 'Conseil Commercial Corée-Afrique',
    consultantPeriod: '2021 - Présent',
    consultantDescription: 'Dirigeant l\'analyse de marché et les initiatives de développement commercial.',
    educationSpecialistTitle: 'Consultant en Éducation',
    freelanceWork: 'Freelance',
    specialistPeriod: '2020 - Présent',
    specialistDescription: 'Fournir des conseils complets aux étudiants africains.',
    readyToStart: 'Prêt à Commencer Votre Voyage?',
    contactCallToAction: 'Discutons de la façon dont je peux vous aider à atteindre vos objectifs en Corée et en Asie.',
    advisorFullDescription: 'Un défenseur passionné de l\'éducation mondiale et du développement commercial',
  },
  
  KO: {
    // Navigation
    home: '홈',
    services: '서비스',
    about: '소개',
    contact: '연락처',
    resources: '자료',
    bookConsultation: '상담 예약',
    
    // Hero Section
    heroTitle: '글로벌 기회로의 관문',
    heroSubtitle: '한국 유학과 아시아 전역의 식음료 사업 구축을 위한 전문 가이드.',
    exploreStudyPrograms: '학습 프로그램 탐색',
    fbConsulting: 'F&B 컨설팅',
    studentsAssisted: '지원한 학생 수',
    countriesReached: '도달 국가 수',
    foodScienceExpert: '식품과학 전문가',
    startYourJourney: '여행을 시작하세요',
    
    // Services
    servicesTitle: '우리의 서비스',
    servicesSubtitle: '교육 및 비즈니스 목표를 위한 종합 솔루션',
    studyAbroadTitle: '해외 유학 및 이주',
    studyAbroadSubtitle: '글로벌 교육으로의 길',
    fbConsultingTitle: '식음료 컨설팅',
    fbConsultingSubtitle: '식품과학 석사의 전문 가이드',
    
    // Service Items
    scholarshipGuidance: '장학금 안내',
    scholarshipGuidanceDesc: '완전한 장학금 신청 지원',
    universityAdmissions: '대학교 입학',
    universityAdmissionsDesc: '사립 및 공립 대학교 지원',
    visaApplication: '비자 신청',
    visaApplicationDesc: '완전한 비자 처리 지원',
    koreanLanguageTraining: '한국어 교육',
    koreanLanguageTrainingDesc: '온라인 한국어 과정',
    visitsHelp: '방문 도움 및 이주',
    visitsHelpDesc: '완전한 이주 및 정착 지원',
    
    businessConsultation: '비즈니스 상담',
    businessConsultationDesc: '전문 F&B 비즈니스 조언',
    fbMarketAnalysis: 'F&B 시장 분석',
    fbMarketAnalysisDesc: '아시아 시장 연구 및 인사이트',
    productDevelopment: '제품 개발',
    productDevelopmentDesc: '식품과학 및 기술 가이드',
    regulatoryCompliance: '규제 준수',
    regulatoryComplianceDesc: '식품 안전 및 규정',
    
    // Service Features
    personalizedGuidance: '한국 교육 전문가의 개인화된 가이드',
    endToEndSupport: '신청부터 도착까지 완전한 지원',
    culturalOrientation: '문화적 오리엔테이션 및 정착 지원',
    mscFoodScienceExpertise: '식품과학기술 석사 전문성',
    asianMarketSpecialization: '아시아 시장 전문화',
    internationalBusinessDev: '국제 비즈니스 개발',
    getExpertConsultation: '전문가 상담 받기',
    packageDealsAvailable: '패키지 딜 이용 가능!',
    saveUpTo20Percent: '서비스를 결합하여 최대 20% 절약',
    viewAllPackages: '모든 패키지 및 가격 보기',
    
    // About Section
    aboutTitle: '회사 소개',
    aboutSubtitle: '글로벌 교육 및 비즈니스 확장의 신뢰할 수 있는 파트너',
    meetYourGlobalAdvisor: '글로벌 어드바이저를 만나보세요',
    advisorName: 'John Doe, MSc',
    advisorTitle: '식품과학기술 | 한국 교육 전문가',
    advisorDescription: '한국과 아시아의 교육 및 비즈니스 파트너.',
    readMoreAboutMe: '더 자세히 알아보기',
    educationExpert: '교육 전문가',
    educationExpertDesc: '한국 대학교 입학 및 장학금 안내 전문',
    fbConsultant: 'F&B 컨설턴트',
    fbConsultantDesc: '식품과학 석사 및 광범위한 시장 분석 경험',
    studentsHelped: '500명 이상의 학생',
    studentsHelpedDesc: '아프리카 학생들을 한국 최고 대학교로 성공적으로 안내',
    countriesReachedDesc: '아프리카, 아시아 및 그 너머의 국제적 도달',
    
    // Partners Section
    ourTrustedPartners: '신뢰할 수 있는 파트너',
    partnerDescription: '선도적인 기관 및 조직과 협력합니다',
    
    // Newsletter Section
    newsletterTitle: '글로벌 기회 업데이트 받기',
    newsletterDescription: '최신 장학금 공지, 해외 유학 팁, F&B 업계 인사이트를 받아보세요.',
    enterEmailAddress: '이메일 주소를 입력하세요',
    subscribe: '구독하기',
    newsletterThankYou: '구독해 주셔서 감사합니다! 확인을 위해 이메일을 확인해 주세요.',
    
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
    
    // Contact Section
    letsStartYourJourney: '여행을 시작해 봅시다',
    readyToTakeNextStep: '다음 단계를 밟을 준비가 되셨나요? 무료 상담을 위해 연락하세요',
    sendUsMessage: '메시지 보내기',
    fillFormBelow: '아래 양식을 작성하시면 24시간 내에 응답드리겠습니다',
    yourName: '이름',
    yourEmail: '이메일',
    selectService: '서비스 선택',
    generalInquiry: '일반 문의',
    studyAbroadRelocation: '해외 유학 및 이주',
    fbConsultingService: 'F&B 컨설팅',
    bothServices: '두 서비스 모두',
    message: '메시지',
    tellUsAboutGoals: '목표와 저희가 어떻게 도울 수 있는지 알려주세요...',
    sendMessage: '메시지 보내기',
    quickContact: '빠른 연락',
    email: '이메일',
    phone: '전화',
    phoneKorea: '전화 (한국)',
    whatsapp: 'WhatsApp',
    bookAConsultation: '상담 예약',
    scheduleFreeConsultation: '목표를 논의하고 개인화된 조언을 받기 위해 15분 무료 상담을 예약하세요.',
    scheduleConsultation: '무료 상담 예약',
    officeHours: '운영 시간',
    mondayFriday: '월요일 - 금요일:',
    saturday: '토요일:',
    sunday: '일요일:',
    closed: '휴무',
    
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
    
    // About Advisor Page
    backToHome: '홈으로 돌아가기',
    biography: '경력',
    biographyP1: '르완다에서 태어나고 자란 John Doe는 항상 교육과 국제 개발에 대한 열정을 가지고 있었습니다.',
    biographyP2: '한국에서의 시간 동안 John은 학문적으로 뛰어난 성과를 거두었을 뿐만 아니라 한국 문화에 대한 깊은 이해를 발전시켰습니다.',
    biographyP3: '졸업 후 John은 다른 아프리카 학생들을 도우는 데 자신의 경력을 바치기로 결정했습니다.',
    educationQualifications: '교육 및 자격',
    mscFoodScience: '식품과학기술 석사',
    seoulNationalUniversity: '서울대학교, 한국',
    graduationYear: '2019 - 2021',
    bscNutrition: '영양과학 학사',
    universityOfRwanda: '르완다 대학교',
    undergraduateYear: '2014 - 2018',
    professionalExperience: '전문 경험',
    consultantTitle: '수석 F&B 컨설턴트',
    consultantCompany: '한국-아프리카 무역위원회',
    consultantPeriod: '2021 - 현재',
    consultantDescription: '시장 분석 및 사업 개발 이니셔티브를 주도하고 있습니다.',
    educationSpecialistTitle: '교육 컨설턴트',
    freelanceWork: '프리랜서',
    specialistPeriod: '2020 - 현재',
    specialistDescription: '아프리카 학생들에게 종합적인 지도를 제공하고 있습니다.',
    readyToStart: '여행을 시작할 준비가 되셨나요?',
    contactCallToAction: '한국과 아시아에서 목표를 달성하는 데 제가 어떻게 도움을 드릴 수 있는지 논의해 보겠습니다.',
    advisorFullDescription: '글로벌 교육과 비즈니스 개발에 대한 열정적인 옹호자',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['EN', 'RW', 'FR', 'KO'].includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }

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
