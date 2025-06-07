
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
        src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face" 
        alt="Aria Assistant"
      />
      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
        AI
      </AvatarFallback>
    </Avatar>
  );
};

export default AriaAvatar;
