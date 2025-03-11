import { Check, Clock, X } from "lucide-react";
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
    <Card className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="w-full border-b border-gray-200 pb-3 dark:border-gray-700">
        <div className="flex items-center justify-between gap-x-5">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {eventName}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {date}
            </CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex justify-between text-base">
          <span className="text-gray-600 dark:text-gray-400">
            Transaction ID:
          </span>
          <span className="font-mono text-gray-800 dark:text-gray-200">
            {transactionId}
          </span>
        </div>
        <div className="mt-3 flex justify-between text-lg">
          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            ₹{amount}
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 pt-3 dark:border-gray-700">
        <Button
          size="lg"
          className="w-full transition duration-200 ease-in-out hover:opacity-80 active:opacity-40"
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
      icon = <Check className="h-4 w-4" />;
      statusClasses =
        "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400";
      break;
    case "pending":
      icon = <Clock className="h-4 w-4" />;
      statusClasses =
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400";
      break;
    case "failed":
      icon = <X className="h-4 w-4" />;
      statusClasses =
        "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400";
      break;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        statusClasses,
      )}
    >
      {icon}
      <span className="capitalize">{status}</span>
    </div>
  );
}
