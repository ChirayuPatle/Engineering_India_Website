"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RoleEditorProps {
  userId: string;
  currentRole: string;
}

export function RoleEditor({ userId, currentRole }: RoleEditorProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [updating, setUpdating] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    if (newRole === currentRole) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update role");
      }

      toast.success("User role updated successfully!");
      setSelectedRole(newRole);
      router.refresh();
    } catch (error: any) {
      console.error("Error updating role:", error);
      toast.error(error.message || "Failed to update role");
      setSelectedRole(currentRole); // Revert on error
    } finally {
      setUpdating(false);
    }
  };

  const roleColors = {
    ADMIN: "bg-red-100 text-red-800 border-red-200",
    MODERATOR: "bg-blue-100 text-blue-800 border-blue-200",
    USER: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedRole}
        onChange={(e) => handleRoleChange(e.target.value)}
        disabled={updating}
        className={`rounded-full border px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          roleColors[selectedRole as keyof typeof roleColors]
        } ${updating ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <option value="USER">USER</option>
        <option value="MODERATOR">MODERATOR</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      {updating && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
    </div>
  );
}
