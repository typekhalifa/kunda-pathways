
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AriaAvatar = ({ size = "default", className = "" }: { size?: "sm" | "default" | "lg", className?: string }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage 
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" 
        alt="Aria Assistant"
      />
      <AvatarFallback className="bg-blue-400 text-white font-semibold">
        AR
      </AvatarFallback>
    </Avatar>
  );
};

export default AriaAvatar;
