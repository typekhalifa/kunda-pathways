
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppConsultationButtonProps {
  userName?: string;
  className?: string;
}

const WhatsAppConsultationButton = ({ userName = "", className = "" }: WhatsAppConsultationButtonProps) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+821012345678";
    const name = userName || "someone interested";
    const message = `Hello, I'm ${name}, I'm interested in your services. When can you be available for this free 15 min consultation?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ${className}`}
    >
      <MessageCircle size={20} className="mr-2" />
      Schedule Free 15min Consultation
    </Button>
  );
};

export default WhatsAppConsultationButton;
