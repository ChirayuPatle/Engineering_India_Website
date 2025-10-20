import { Check, Clock, X, Image as ImageIcon, Trophy } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export type PaymentStatus = "paid" | "pending" | "failed";

interface PaymentCardProps {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  paymentScreenshot?: string | null;
  isHackathon?: boolean;
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
  isHackathon = false,
  onViewDetails,
}: PaymentCardProps) {
  return (
    <Card className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="w-full border-b border-gray-200 px-4 pb-3 pt-4 dark:border-gray-700 sm:px-6 sm:pt-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-x-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="break-words text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
                {eventName}
              </CardTitle>
              {isHackathon && (
                <Badge className="bg-black text-white hover:bg-gray-900">
                  <Trophy className="mr-1 h-3 w-3" />
                  Hackathon
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {date}
            </CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between sm:gap-2 sm:text-base">
          <span className="text-gray-600 dark:text-gray-400">
            Transaction ID:
          </span>
          <span className="break-all font-mono text-xs text-gray-800 dark:text-gray-200 sm:text-sm">
            {transactionId}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-base sm:flex-row sm:justify-between sm:gap-2 sm:text-lg">
          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            ₹{amount}
          </span>
        </div>

        {paymentScreenshot && (
          <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
            <div className="mb-2 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Payment Screenshot:
              </span>
            </div>
            <div className="relative h-32 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 sm:h-40">
              <Image
                src={paymentScreenshot}
                alt="Payment screenshot"
                fill
                className="bg-gray-50 object-contain dark:bg-gray-800"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-200 px-4 pb-4 pt-3 dark:border-gray-700 sm:px-6 sm:pb-6">
        <Button
          size="lg"
          className="w-full text-sm transition duration-200 ease-in-out hover:opacity-80 active:opacity-40 sm:text-base"
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
        "flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1",
        statusClasses,
      )}
    >
      {icon}
      <span className="whitespace-nowrap capitalize">{status}</span>
    </div>
  );
}
