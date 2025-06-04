
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppConsultationButtonProps {
  className?: string;
}

const WhatsAppConsultationButton = ({ className = "" }: WhatsAppConsultationButtonProps) => {
  const { translations } = useLanguage();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = "821012345678"; // Replace with actual WhatsApp business number
    const message = `Hello, I'm interested in your services. When can you be available for this free 15 min consultation?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 ${className}`}
    >
      <MessageCircle className="mr-1 sm:mr-2 flex-shrink-0" size={14} />
      <span className="text-center leading-tight text-xs sm:text-sm lg:text-base">
        {translations.scheduleFreeConsultation || "Schedule Free Consultation"}
      </span>
    </Button>
  );
};

export default WhatsAppConsultationButton;
