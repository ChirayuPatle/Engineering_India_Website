"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useFieldArray, type useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import type { EventDetailsFormData } from "@/types/event";

interface EventDetailsFormProps {
  form: ReturnType<typeof useForm<EventDetailsFormData>>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function EventDetailsForm({
  form,
  onSubmit,
  onBack,
  isSubmitting,
}: EventDetailsFormProps) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const {
    fields: prizeFields,
    append: appendPrize,
    remove: removePrize,
  } = useFieldArray({
    control,
    name: "prizes",
  });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
  } = useFieldArray({
    control,
    name: "timeline",
  });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: "faqs",
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prizes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Prizes</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendPrize({ name: "", value: "" })}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Prize
            </Button>
          </div>

          {prizeFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div className="grid grid-cols-2 items-end gap-4">
                <div>
                  <Label>Prize Name</Label>
                  <Input
                    {...register(`prizes.${index}.name`, {
                      required: "Prize name is required",
                    })}
                    placeholder="1st Prize"
                  />
                  {errors?.prizes?.[index]?.name && (
                    <p className="text-sm text-red-500">
                      {errors.prizes[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Prize Value</Label>
                  <Input
                    {...register(`prizes.${index}.value`, {
                      required: "Prize value is required",
                    })}
                    placeholder="₹10,000"
                  />
                  {errors?.prizes?.[index]?.value && (
                    <p className="text-sm text-red-500">
                      {errors.prizes[index]?.value?.message}
                    </p>
                  )}
                </div>
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => removePrize(index)}
                >
                  <X className="mr-1 h-4 w-4" /> Remove Prize
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Event Timeline</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTimeline({ time: "", activity: "" })}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Activity
            </Button>
          </div>

          {timelineFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div className="grid grid-cols-2 items-end gap-4">
                <div>
                  <Label>Time</Label>
                  <Input
                    {...register(`timeline.${index}.time`, {
                      required: "Time is required",
                    })}
                    placeholder="10:00 AM"
                  />
                  {errors?.timeline?.[index]?.time && (
                    <p className="text-sm text-red-500">
                      {errors.timeline[index]?.time?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Activity</Label>
                  <Input
                    {...register(`timeline.${index}.activity`, {
                      required: "Activity is required",
                    })}
                    placeholder="Registration Opens"
                  />
                  {errors?.timeline?.[index]?.activity && (
                    <p className="text-sm text-red-500">
                      {errors.timeline[index]?.activity?.message}
                    </p>
                  )}
                </div>
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => removeTimeline(index)}
                >
                  <X className="mr-1 h-4 w-4" /> Remove Activity
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Rules Section */}
        <div className="space-y-2 pt-4">
          <Label htmlFor="rules">Rules & Guidelines</Label>
          <Textarea
            id="rules"
            {...register("rules")}
            placeholder="List the rules for participants..."
            rows={4}
          />
          {errors.rules && (
            <p className="text-sm text-red-500">{errors.rules.message}</p>
          )}
        </div>

        {/* FAQs Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">FAQs</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendFaq({ question: "", answer: "" })}
            >
              <Plus className="mr-1 h-4 w-4" /> Add FAQ
            </Button>
          </div>

          {faqFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Question</Label>
                  <Input
                    {...register(`faqs.${index}.question`)}
                    placeholder="What should I bring?"
                  />
                </div>
                <div>
                  <Label>Answer</Label>
                  <Input
                    {...register(`faqs.${index}.answer`)}
                    placeholder="Bring your laptop and ID proof"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500"
                onClick={() => removeFaq(index)}
              >
                <X className="mr-1 h-4 w-4" /> Remove FAQ
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="ml-0">
            Back
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="ml-auto"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
