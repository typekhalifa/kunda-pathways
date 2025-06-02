
import { useLanguage } from "@/contexts/LanguageContext";

const Partners = () => {
  const { translations } = useLanguage();
  
  const partners = [
    { name: "Seoul National University", logo: "🏛️" },
    { name: "KAIST", logo: "🔬" },
    { name: "Yonsei University", logo: "🎓" },
    { name: "Korea University", logo: "📚" },
    { name: "POSTECH", logo: "⚗️" },
    { name: "Hanyang University", logo: "🏗️" },
    { name: "Korean Government", logo: "🇰🇷" },
    { name: "KOTRA", logo: "🌐" },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {translations.ourTrustedPartners.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{translations.ourTrustedPartners.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {translations.partnerDescription}
          </p>
        </div>
        
        <div className="relative">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 bg-gray-50 dark:bg-slate-800 rounded-lg p-6 min-w-[200px] text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-2">{partner.logo}</div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {partner.name}
                </div>
              </div>
            ))}
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
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `
      }} />
    </section>
  );
};

export default Partners;
