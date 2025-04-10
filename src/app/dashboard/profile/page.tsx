"use client";

import { useCurrentUser } from "@/hooks/use-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileFormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 p-6">
      <div className="flex items-center justify-center gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>

      <div className="grid gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export default function ProfileForm() {
  const router = useRouter();
  const { data: user, isLoading, error } = useCurrentUser();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    collegeName: "",
    year: "",
    branch: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        collegeName: user.collegeName || "",
        year: user.year || "",
        branch: user.branch || "",
      });
    }
  }, [user]);

  const isChanged = useMemo(() => {
    if (!user) return false;
    return (
      formData.name !== (user.name || "") ||
      formData.phone !== (user.phone || "") ||
      formData.collegeName !== (user.collegeName || "") ||
      formData.year !== (user.year || "") ||
      formData.branch !== (user.branch || "")
    );
  }, [formData, user]);

  const updateUser = async () => {
    const res = await fetch("/api/auth/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to update user");
    return res.text();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (err) => {
      console.error("Mutation error:", err);
    },
  });

  const handleChange = (field: string, value: string) => {
    if (field === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(mutateAsync(), {
        loading: "Saving profile...",
        success: "Profile updated successfully!",
        error: "Failed to update profile.",
      });
    } catch (e) {
      console.error("Toast error", e);
    }
  };

  if (isLoading)
    return (
      <>
        <div className="mb-5 flex items-center">
          <Skeleton className="mr-2 h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <ProfileFormSkeleton />
      </>
    );

  if (error || !user) return <p>Failed to load profile.</p>;

  return (
    <>
      <div className="mb-5 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </div>
      <div className="backdrop-blur-xs shadow-xs mx-auto w-full max-w-2xl space-y-8 rounded-xl border border-zinc-200/80 bg-white/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-950/50">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || ""} className="object-cover" />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email (non-editable)</Label>
            <Input id="email" type="email" value={user.email} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center gap-2">
              <span className="rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground">
                +91
              </span>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                type="tel"
                maxLength={10}
                placeholder="10-digit number"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="college">College</Label>
            <Input
              id="college"
              value={formData.collegeName}
              onChange={(e) => handleChange("collegeName", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select
              value={formData.year}
              onValueChange={(value) => handleChange("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              value={formData.branch}
              onChange={(e) => handleChange("branch", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button
            className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            onClick={handleSubmit}
            disabled={isPending || !isChanged}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
}
