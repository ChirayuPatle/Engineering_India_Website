
import { ArrowDownUp, Check, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PaymentStatus = "paid" | "pending" | "failed";

interface PaymentCardProps {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  onViewDetails?: (id: string) => void;
}

export function PaymentCard({
  id,
  eventName,
  date,
  amount,
  status,
  transactionId,
  onViewDetails,
}: PaymentCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-base">{eventName}</CardTitle>
            <CardDescription className="text-xs">{date}</CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Transaction ID:</span>
          <span className="font-mono">{transactionId}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-semibold">${amount.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => onViewDetails?.(id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  let icon;
  let statusClasses;

  switch (status) {
    case "paid":
      icon = <Check className="h-3.5 w-3.5" />;
      statusClasses = "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400";
      break;
    case "pending":
      icon = <Clock className="h-3.5 w-3.5" />;
      statusClasses = "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400";
      break;
    case "failed":
      icon = <X className="h-3.5 w-3.5" />;
      statusClasses = "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400";
      break;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        statusClasses
      )}
    >
      {icon}
      <span className="capitalize">{status}</span>
    </div>
  );
}
