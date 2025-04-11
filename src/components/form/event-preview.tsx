"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface EventPreviewProps {
  eventData: any;
  isPaid: boolean;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function EventPreview({
  eventData,
  isPaid,
  onSubmit,
  onBack,
  isSubmitting,
}: EventPreviewProps) {
  console.log("Final form Data", eventData);

  // Filter out the default fields (Full Name and Email) from the custom fields
  const customFields = eventData.fields?.filter(
    (field: any) => !["Full Name", "Email"].includes(field.name),
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Review Your Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{eventData.name}</h3>
            <p className="text-gray-600">{eventData.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Event Details</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {eventData.venue}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {eventData.mode}
                </p>
                <p>
                  <span className="font-medium">Max Attendees:</span>{" "}
                  {eventData.maxCapacity}
                </p>
                {isPaid && (
                  <p>
                    <span className="font-medium">Ticket Price:</span> ₹
                    {eventData.registrationFee}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Dates</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Event:</span>{" "}
                  {eventData.startDate} to {eventData.endDate}
                </p>
                <p>
                  <span className="font-medium">Registration:</span>{" "}
                  {eventData.regStartDate} to {eventData.regEndDate}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-4">
            <h4 className="font-medium">Registration Form Preview</h4>
            <div className="space-y-4 rounded-md bg-gray-50 p-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input placeholder="Enter your full name" disabled />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input placeholder="Enter your email" disabled />
              </div>

              {customFields?.map((field: any, index: number) => (
                <div key={index} className="space-y-2">
                  <Label>
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea placeholder={`Enter ${field.name}`} disabled />
                  ) : field.type === "file" ? (
                    <Input type="file" disabled />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={`Enter ${field.name}`}
                      disabled
                    />
                  )}
                </div>
              ))}

              {isPaid && (
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <Label>Payment Information</Label>
                  <p className="text-sm text-gray-600">
                    Ticket price: ₹{eventData.registrationFee}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>
    </div>
  );
}
