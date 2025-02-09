"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegistrationData } from "./types";

const candidateTypes = [
  "School Student",
  "Fresher",
  "Professional",
  "Differently Abled",
  "Others",
];

export function EventStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<RegistrationData>();
  const isTeam = watch("isTeam");
  const teamMembers = watch("teamMembers") || [];

  const addTeamMember = () => {
    setValue("teamMembers", [
      ...teamMembers,
      { name: "", email: "", college: "", phone: "" },
    ]);
  };

  const removeTeamMember = (index: number) => {
    setValue(
      "teamMembers",
      teamMembers.filter((_, i) => i !== index)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label>Candidate Type</Label>
        <Select
          // Instead of using register("candidateType").onChange, we update the value using setValue.
          onValueChange={(value: string) => setValue("candidateType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select candidate type" />
          </SelectTrigger>
          <SelectContent>
            {candidateTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Participation Type</Label>
        <RadioGroup
          defaultValue="single"
          onValueChange={(value) => setValue("isTeam", value === "team")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single">Individual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="team" id="team" />
            <Label htmlFor="team">Team</Label>
          </div>
        </RadioGroup>
      </div>

      {isTeam && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              {...register("teamName")}
              placeholder="Enter team name"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Team Members</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTeamMember}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>

            {teamMembers.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4 p-4 border rounded-lg relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeTeamMember(index)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      {...register(`teamMembers.${index}.name`)}
                      placeholder="Member name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      {...register(`teamMembers.${index}.email`)}
                      placeholder="Member email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>College</Label>
                    <Input
                      {...register(`teamMembers.${index}.college`)}
                      placeholder="Member college"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      {...register(`teamMembers.${index}.phone`)}
                      placeholder="Member phone"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
