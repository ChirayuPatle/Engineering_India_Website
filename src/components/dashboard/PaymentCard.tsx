import { Check, Clock, X, Image as ImageIcon } from "lucide-react";
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
import Image from "next/image";

export type PaymentStatus = "paid" | "pending" | "failed";

interface PaymentCardProps {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  paymentScreenshot?: string | null;
  onViewDetails?: (id: string) => void;
}

export function PaymentCard({
  id,
  eventName,
  date,
  amount,
  status,
  transactionId,
  paymentScreenshot,
  onViewDetails,
}: PaymentCardProps) {
  return (
    <Card className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="w-full border-b border-gray-200 pb-3 px-4 sm:px-6 pt-4 sm:pt-6 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-x-5">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-words">
              {eventName}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {date}
            </CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="py-3 sm:py-4 px-4 sm:px-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 text-sm sm:text-base">
          <span className="text-gray-600 dark:text-gray-400">
            Transaction ID:
          </span>
          <span className="font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-200 break-all">
            {transactionId}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 text-base sm:text-lg">
          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            ₹{amount}
          </span>
        </div>
        
        {paymentScreenshot && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Payment Screenshot:
              </span>
            </div>
            <div className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src={paymentScreenshot}
                alt="Payment screenshot"
                fill
                className="object-contain bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-200 pt-3 px-4 sm:px-6 pb-4 sm:pb-6 dark:border-gray-700">
        <Button
          size="lg"
          className="w-full text-sm sm:text-base transition duration-200 ease-in-out hover:opacity-80 active:opacity-40"
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
      icon = <Check className="h-3 w-3 sm:h-4 sm:w-4" />;
      statusClasses =
        "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400";
      break;
    case "pending":
      icon = <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
      statusClasses =
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400";
      break;
    case "failed":
      icon = <X className="h-3 w-3 sm:h-4 sm:w-4" />;
      statusClasses =
        "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400";
      break;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium flex-shrink-0",
        statusClasses,
      )}
    >
      {icon}
      <span className="capitalize whitespace-nowrap">{status}</span>
    </div>
  );
}
