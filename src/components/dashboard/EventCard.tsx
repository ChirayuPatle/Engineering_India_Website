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
  start_date: string;
  end_date?: string;
  venue: string;
  category: string;
  spots: number;
  spotsFilled: number;
  price: number;
  isRegistered?: boolean;
  onRegister?: (id: string) => void;
  image?: string;
}

export function EventCard({
  id,
  title,
  description,
  start_date,
  end_date,
  venue,
  category,
  spots,
  spotsFilled,
  price,
  isRegistered = false,
  onRegister,
  image,
}: EventCardProps) {
  const spotsRemaining = spots - spotsFilled;
  const timeDisplay = end_date ? `${start_date} - ${end_date}` : start_date;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
            <CardDescription className="mt-1 text-xs sm:text-sm">
              {venue}
            </CardDescription>
          </div>
          <Badge variant={category === "Tech" ? "default" : "secondary"}>
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <p className="mb-4 line-clamp-3 text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs sm:gap-4 sm:text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 opacity-70 sm:h-4 sm:w-4" />
            <span>{start_date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between border-t pt-3">
        <div className="sm:text-md text-sm font-semibold">
          {price === 0 ? "Free" : `₹${price}`}
        </div>
        {isRegistered ? (
          <Button variant="outline" size="sm" disabled>
            Registered
          </Button>
        ) : (
          <Button size="sm" onClick={() => onRegister?.(id)}>
            Register
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
