import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex w-full flex-row items-center justify-between px-4 pb-2 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="truncate pr-2 text-xs font-medium sm:text-sm">
          {title}
        </CardTitle>
        <div className="flex-shrink-0">{icon}</div>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="text-xl font-bold sm:text-2xl lg:text-3xl">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
