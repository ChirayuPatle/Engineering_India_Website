
import { CalendarDays, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  spots: number;
  spotsFilled: number;
  price: number;
  isRegistered?: boolean;
  onRegister?: (id: string) => void;
}

export function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  category,
  spots,
  spotsFilled,
  price,
  isRegistered = false,
  onRegister,
}: EventCardProps) {
  const spotsRemaining = spots - spotsFilled;
  const spotsPercentage = (spotsFilled / spots) * 100;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
            <CardDescription className="mt-1 text-xs sm:text-sm">{location}</CardDescription>
          </div>
          <Badge variant={category === "Tech" ? "default" : "secondary"}>
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
            <span>
              {spotsRemaining} spots left
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-3 border-t mt-auto">
        <div className="text-sm sm:text-md font-semibold">
          {price === 0 ? "Free" : `$${price.toFixed(2)}`}
        </div>
        {isRegistered ? (
          <Button variant="outline" size="sm" disabled>
            Registered
          </Button>
        ) : (
          <Button size="sm" onClick={() => onRegister?.(id)}>Register</Button>
        )}
      </CardFooter>
    </Card>
  );
}
