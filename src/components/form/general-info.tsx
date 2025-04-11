"use client";
import { type useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { GeneralFormData } from "@/types/event";

interface GeneralInfoFormProps {
  form: ReturnType<typeof useForm<GeneralFormData>>;
  isPaid: boolean;
  setIsPaid: (value: boolean) => void;
  onSubmit: () => void;
  onBack?: () => void;
  isSubmitting: boolean;
}

export function GeneralInfoForm({
  form,
  isPaid,
  setIsPaid,
  onSubmit,
  onBack,
  isSubmitting,
}: GeneralInfoFormProps) {
  const { register, formState } = form;
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Basic Event Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Event Name *</Label>
          <Input
            id="name"
            {...register("name", { required: "Event name is required" })}
            placeholder="Tech Conference 2023"
          />
          {formState.errors.name && (
            <p className="text-sm text-red-500">
              {formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Tell people what your event is about..."
            rows={4}
          />
          {formState.errors.description && (
            <p className="text-sm text-red-500">
              {formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="venue">Location *</Label>
            <Input
              id="venue"
              {...register("venue", { required: "Location is required" })}
              placeholder="Conference Center, City"
            />
            {formState.errors.venue && (
              <p className="text-sm text-red-500">
                {formState.errors.venue.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">Event Type *</Label>
            <select
              id="mode"
              className="w-full rounded-md border border-gray-300 p-2"
              {...register("mode", { required: "Event type is required" })}
            >
              <option value="Offline">In-Person</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              {...register("startDate", { required: "Start date is required" })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              type="date"
              {...register("endDate", { required: "End date is required" })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="regStartDate">Registration Opens *</Label>
            <Input
              id="regStartDate"
              type="date"
              {...register("regStartDate", {
                required: "Registration start date is required",
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regEndDate">Registration Closes *</Label>
            <Input
              id="regEndDate"
              type="date"
              {...register("regEndDate", {
                required: "Registration end date is required",
              })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxCapacity">Maximum Attendees *</Label>
          <Input
            id="maxCapacity"
            type="number"
            {...register("maxCapacity", {
              required: "Max capacity is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bannerImage">Event Banner *</Label>
          <Input
            id="bannerImage"
            type="file"
            accept="image/*"
            {...register("bannerImage", {
              required: "Banner image is required",
            })}
          />
          <p className="text-sm text-gray-500">
            Recommended size: 1200x600 pixels
          </p>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch id="isPaid" checked={isPaid} onCheckedChange={setIsPaid} />
          <Label htmlFor="isPaid">This is a paid event</Label>
        </div>

        {isPaid && (
          <div className="space-y-2">
            <Label htmlFor="registrationFee">Ticket Price (₹) *</Label>
            <Input
              id="registrationFee"
              type="number"
              {...register("registrationFee", {
                required: "Ticket price is required",
                min: { value: 1, message: "Must be at least ₹1" },
              })}
              placeholder="500"
            />
          </div>
        )}

        <div className="flex justify-between pt-4">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={onSubmit} disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
