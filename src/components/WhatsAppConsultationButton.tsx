
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppConsultationButtonProps {
  className?: string;
}

const WhatsAppConsultationButton = ({ className = "" }: WhatsAppConsultationButtonProps) => {
  const { translations } = useLanguage();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = "+821012345678";
    const message = encodeURIComponent(`Hello! I would like to schedule a free 15-minute consultation about your services.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
    >
      <MessageCircle size={20} />
      {translations.scheduleFreeFifteenMinuteConsultation}
    </Button>
  );
};

export default WhatsAppConsultationButton;
