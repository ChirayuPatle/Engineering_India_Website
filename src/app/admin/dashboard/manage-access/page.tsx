"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const roles = ["USER", "VOLUNTEER", "ADMIN"];

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/admin/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

const updateUserRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) => {
  const res = await fetch("/api/admin/users", {
    method: "PATCH",
    body: JSON.stringify({ userId, role }),
  });
  if (!res.ok) throw new Error("Failed to update role");
  return res.json();
};

export default function ManageAccessPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { mutate } = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role updated successfully");
    },
    onError: () => toast.error("Failed to update role"),
  });

  const handleRoleChange = (userId: string, role: string) => {
    setSelectedRole((prev) => ({ ...prev, [userId]: role }));
    mutate({ userId, role });
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
          Manage User Access
        </h1>
      </div>

      {/* Search */}
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or email..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          : filteredUsers?.map((user) => (
              <Card
                key={user.id}
                className="bg-muted/40 shadow-none transition-opacity delay-700 hover:border-zinc-950/40"
              >
                <CardContent className="flex flex-col gap-3 p-4">
                  <div>
                    <p className="font-semibold text-black">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-black">Role:</p>
                    <Select
                      value={selectedRole[user.id] ?? user.role}
                      onValueChange={(value) =>
                        handleRoleChange(user.id, value)
                      }
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* No Users Found */}
      {!isLoading && filteredUsers?.length === 0 && (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center text-center">
            <h3 className="mt-2 text-xl font-semibold">No users found</h3>
            <p className="text-sm text-muted-foreground">
              Try changing your search criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
