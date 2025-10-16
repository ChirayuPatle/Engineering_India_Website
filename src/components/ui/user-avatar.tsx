"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({ 
  name, 
  image, 
  className,
  fallbackClassName 
}: UserAvatarProps) {
  // Get initials from name
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    
    const parts = name.trim().split(" ").filter(p => p.length > 0);
    
    if (parts.length === 0) return "U";
    if (parts.length === 1) {
      return parts[0]!.charAt(0).toUpperCase();
    }
    
    return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage 
        src={image || undefined} 
        alt={name || "User avatar"} 
      />
      <AvatarFallback className={cn(
        "bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold",
        fallbackClassName
      )}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
