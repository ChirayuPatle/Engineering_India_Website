"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RegistrationActionsProps {
  registrationId: string;
  status: string;
}

export function RegistrationActions({
  registrationId,
  status,
}: RegistrationActionsProps) {
  const router = useRouter();
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const handleApprove = async () => {
    setApproving(true);
    try {
      const response = await fetch(
        `/api/admin/registrations/${registrationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "verified" }),
        },
      );

      if (!response.ok) throw new Error("Failed to approve registration");

      toast.success("Registration approved successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error approving registration:", error);
      toast.error("Failed to approve registration");
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("Are you sure you want to reject this registration?")) {
      return;
    }

    setRejecting(true);
    try {
      const response = await fetch(
        `/api/admin/registrations/${registrationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "rejected" }),
        },
      );

      if (!response.ok) throw new Error("Failed to reject registration");

      toast.success("Registration rejected!");
      router.refresh();
    } catch (error) {
      console.error("Error rejecting registration:", error);
      toast.error("Failed to reject registration");
    } finally {
      setRejecting(false);
    }
  };

  if (status !== "pending") {
    return (
      <Button size="sm" variant="ghost">
        View Details
      </Button>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        className="text-green-600 hover:bg-green-50"
        onClick={handleApprove}
        disabled={approving || rejecting}
      >
        {approving ? (
          <>
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Approving...
          </>
        ) : (
          "Approve"
        )}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 hover:bg-red-50"
        onClick={handleReject}
        disabled={approving || rejecting}
      >
        {rejecting ? (
          <>
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Rejecting...
          </>
        ) : (
          "Reject"
        )}
      </Button>
    </div>
  );
}
