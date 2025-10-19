"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Users } from "lucide-react";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  gender: string;
  branch: string;
  year: string;
}

interface EditTeamFormData {
  teamName: string;
  teamLeaderName: string;
  teamLeaderPhone: string;
  teamLeaderGender: string;
  institute: string;
  branch: string;
  year: string;
  teamMembers: TeamMember[];
}

interface EditTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  currentTeamName: string;
  currentLeaderDetails: {
    name: string;
    phone: string;
    gender: string;
    institute: string;
    branch: string;
    year: string;
  };
  currentMembers: TeamMember[];
  onSuccess: () => void;
}

export function EditTeamModal({
  open,
  onOpenChange,
  registrationId,
  currentTeamName,
  currentLeaderDetails,
  currentMembers,
  onSuccess,
}: EditTeamModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<EditTeamFormData>({
    defaultValues: {
      teamName: currentTeamName,
      teamLeaderName: currentLeaderDetails.name,
      teamLeaderPhone: currentLeaderDetails.phone,
      teamLeaderGender: currentLeaderDetails.gender,
      institute: currentLeaderDetails.institute,
      branch: currentLeaderDetails.branch,
      year: currentLeaderDetails.year,
      teamMembers: currentMembers.length > 0 ? currentMembers : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const addMember = () => {
    // Check team size (max 3 members + 1 leader = 4 total)
    if (fields.length >= 3) {
      toast.error("Maximum team size is 4 members (including leader)");
      return;
    }

    append({
      name: "",
      email: "",
      phone: "",
      gender: "",
      branch: "",
      year: "",
    });
  };

  const removeMember = (index: number) => {
    // Must have at least 1 member (+ leader = 2 total minimum)
    if (fields.length <= 1) {
      toast.error("Team must have at least 2 members (including leader)");
      return;
    }

    remove(index);
  };

  const onSubmit = async (data: EditTeamFormData) => {
    // Validation
    const {
      teamName,
      teamLeaderName,
      teamLeaderPhone,
      teamLeaderGender,
      institute,
      branch,
      year,
      teamMembers,
    } = data;

    // Validate team name
    if (!teamName || teamName.trim().length === 0) {
      toast.error("Team name cannot be empty");
      return;
    }

    // Validate leader details
    if (!teamLeaderName || teamLeaderName.trim().length === 0) {
      toast.error("Team leader name cannot be empty");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(teamLeaderPhone)) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (!teamLeaderGender) {
      toast.error("Please select team leader gender");
      return;
    }

    if (!institute || institute.trim().length === 0) {
      toast.error("Institute name cannot be empty");
      return;
    }

    if (!branch || branch.trim().length === 0) {
      toast.error("Branch cannot be empty");
      return;
    }

    if (!year) {
      toast.error("Please select year");
      return;
    }

    // Check team size (2-4 including leader)
    const totalSize = teamMembers.length + 1;
    if (totalSize < 2 || totalSize > 4) {
      toast.error(
        "Team size must be between 2 and 4 members (including leader)",
      );
      return;
    }

    // Check for duplicate emails
    const emails = teamMembers.map((m) => m.email.toLowerCase());
    const uniqueEmails = new Set(emails);
    if (uniqueEmails.size !== emails.length) {
      toast.error("Duplicate emails found within team members");
      return;
    }

    // Validate all fields are filled
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      if (!member) {
        toast.error(`Member ${i + 1} data is missing`);
        return;
      }

      if (
        !member.name ||
        !member.email ||
        !member.phone ||
        !member.gender ||
        !member.branch ||
        !member.year
      ) {
        toast.error(`Please fill all fields for Member ${i + 1}`);
        return;
      }

      // Validate email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(member.email)) {
        toast.error(`Invalid email format for Member ${i + 1}`);
        return;
      }

      // Validate phone format (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(member.phone)) {
        toast.error(`Phone number must be 10 digits for Member ${i + 1}`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/hackathon/${registrationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName,
          teamLeaderName,
          teamLeaderPhone,
          teamLeaderGender,
          institute,
          branch,
          year,
          teamMembers: JSON.stringify(teamMembers),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update team");
      }

      toast.success("Team updated successfully!");
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update team",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Edit Team Members
          </DialogTitle>
          <DialogDescription>
            Add, remove, or edit your team members. Team must have 2-4 members
            (including leader).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Team Name Section */}
          <div className="space-y-3 rounded-lg border bg-blue-50/50 p-4">
            <h3 className="text-sm font-semibold text-blue-900">
              Team Information
            </h3>
            <div className="space-y-1">
              <Label htmlFor="teamName">
                Team Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("teamName", { required: true })}
                placeholder="Enter team name"
              />
            </div>
          </div>

          {/* Team Leader Details Section */}
          <div className="space-y-3 rounded-lg border bg-green-50/50 p-4">
            <h3 className="text-sm font-semibold text-green-900">
              Team Leader Details
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="teamLeaderName">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("teamLeaderName", { required: true })}
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="teamLeaderPhone">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("teamLeaderPhone", { required: true })}
                  placeholder="10 digit phone"
                  maxLength={10}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="teamLeaderGender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watch("teamLeaderGender")}
                  onValueChange={(value) => setValue("teamLeaderGender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="institute">
                  Institute <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("institute", { required: true })}
                  placeholder="College/Institute Name"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="branch">
                  Branch <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("branch", { required: true })}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="year">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watch("year")}
                  onValueChange={(value) => setValue("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                Team Members ({fields.length}/3)
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMember}
                disabled={fields.length >= 3}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </div>

            {fields.length === 0 && (
              <div className="rounded-lg border-2 border-dashed p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No team members yet. Click "Add Member" to add one.
                </p>
              </div>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative space-y-3 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Member {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(index)}
                    disabled={fields.length <= 1}
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor={`teamMembers.${index}.name`}>
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register(`teamMembers.${index}.name`, {
                        required: true,
                      })}
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`teamMembers.${index}.email`}>
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register(`teamMembers.${index}.email`, {
                        required: true,
                      })}
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`teamMembers.${index}.phone`}>
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register(`teamMembers.${index}.phone`, {
                        required: true,
                      })}
                      placeholder="10 digit phone"
                      maxLength={10}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`teamMembers.${index}.gender`}>
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={watch(`teamMembers.${index}.gender`)}
                      onValueChange={(value) =>
                        setValue(`teamMembers.${index}.gender`, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`teamMembers.${index}.branch`}>
                      Branch <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register(`teamMembers.${index}.branch`, {
                        required: true,
                      })}
                      placeholder="e.g., Computer Science"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`teamMembers.${index}.year`}>
                      Year <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={watch(`teamMembers.${index}.year`)}
                      onValueChange={(value) =>
                        setValue(`teamMembers.${index}.year`, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
