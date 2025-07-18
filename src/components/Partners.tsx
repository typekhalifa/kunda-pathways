
import { useLanguage } from "@/contexts/LanguageContext";

const Partners = () => {
  const { translations } = useLanguage();
  
  const partners = [
    { name: "Seoul National University", logo: "🏛️", alt: "SNU Logo" },
    { name: "KAIST", logo: "🔬", alt: "KAIST Logo" },
    { name: "Yonsei University", logo: "🎓", alt: "Yonsei Logo" },
    { name: "Korea University", logo: "📚", alt: "Korea University Logo" },
    { name: "POSTECH", logo: "⚗️", alt: "POSTECH Logo" },
    { name: "Hanyang University", logo: "🏗️", alt: "Hanyang Logo" },
    { name: "Korean Government", logo: "🇰🇷", alt: "Korean Government Logo" },
    { name: "KOTRA", logo: "🌐", alt: "KOTRA Logo" },
  ];

  // Safe function to split text and style the last word
  const renderStyledTitle = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 1) return text;
    
    const mainText = words.slice(0, -1).join(' ');
    const lastWord = words.slice(-1)[0];
    
    return (
      <>
        {mainText} <span className="text-blue-600">{lastWord}</span>
      </>
    );
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {renderStyledTitle(translations.ourTrustedPartners || 'Our Trusted Partners')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {translations.partnerDescription || 'We work with leading institutions and organizations'}
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop: Single line */}
          <div className="hidden md:flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 bg-gray-50 dark:bg-slate-800 rounded-lg p-6 min-w-[200px] text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-slate-600">
                  <span className="text-2xl" role="img" aria-label={partner.alt}>
                    {partner.logo}
                  </span>
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Two lines */}
          <div className="md:hidden">
            <div className="flex animate-scroll-mobile-1 mb-4">
              {[...partners.slice(0, 4), ...partners.slice(0, 4)].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 bg-gray-50 dark:bg-slate-800 rounded-lg p-4 min-w-[150px] text-center shadow-sm"
                >
                  <div className="w-12 h-12 mx-auto mb-2 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-slate-600">
                    <span className="text-lg" role="img" aria-label={partner.alt}>
                      {partner.logo}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex animate-scroll-mobile-2">
              {[...partners.slice(4), ...partners.slice(4)].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 bg-gray-50 dark:bg-slate-800 rounded-lg p-4 min-w-[150px] text-center shadow-sm"
                >
                  <div className="w-12 h-12 mx-auto mb-2 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-slate-600">
                    <span className="text-lg" role="img" aria-label={partner.alt}>
                      {partner.logo}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scroll-mobile-1 {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scroll-mobile-2 {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .animate-scroll-mobile-1 {
            animation: scroll-mobile-1 25s linear infinite;
          }
          
          .animate-scroll-mobile-2 {
            animation: scroll-mobile-2 25s linear infinite;
          }
        `
      }} />
    </section>
  );
};

export default Partners;
