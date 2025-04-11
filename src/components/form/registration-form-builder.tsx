"use client";
import { useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

interface RegistrationFormBuilderProps {
  form: any;
  isPaid: boolean;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function RegistrationFormBuilder({
  form,
  isPaid,
  onSubmit,
  onBack,
  isSubmitting,
}: RegistrationFormBuilderProps) {
  const { control, register, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const {
    fields: upiFields,
    append: appendUpi,
    remove: removeUpi,
  } = useFieldArray({
    control,
    name: "upiIds",
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Registration Form Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Information to Collect</h3>
          <p className="text-sm text-gray-500">
            We'll automatically collect name and email. Add any additional
            information you need.
          </p>

          {fields.map((field: any, index: number) => (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Field #{index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={index < 2}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="space-y-2">
                <Input
                  {...register(`fields.${index}.name`, {
                    required: "Field name is required",
                  })}
                  placeholder="e.g., Phone Number, Company Name"
                />
              </div>

              <div className="space-y-2">
                <Label>Field Type</Label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  {...register(`fields.${index}.type`, {
                    required: "Field type is required",
                  })}
                >
                  <option value="text">Short Text</option>
                  <option value="textarea">Long Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="file">File Upload</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`fields.${index}.required`}
                  className="rounded border-gray-300"
                  {...register(`fields.${index}.required`)}
                />
                <Label htmlFor={`fields.${index}.required`}>
                  Required Field
                </Label>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "", type: "text", required: false })}
            className="mt-2"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Field
          </Button>
        </div>

        {isPaid && (
          <div className="space-y-4 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium">Payment Setup</h3>

            <div className="space-y-2">
              <Label>Payment Methods</Label>
              <div className="space-y-2">
                {upiFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      {...register(`upiIds.${index}.value`, {
                        required: "UPI ID is required",
                      })}
                      placeholder="yourname@upi"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUpi(index)}
                      disabled={upiFields.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendUpi({ value: "" })}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add UPI ID
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment QR Code (Optional)</Label>
              <Input
                type="file"
                accept="image/*"
                {...register("qrCodeImage")}
              />
            </div>
          </div>
        )}

        <div className="space-y-2 border-t border-gray-200 pt-4">
          <Label htmlFor="conclusionContent">Confirmation Message</Label>
          <Textarea
            id="conclusionContent"
            {...register("conclusionContent")}
            placeholder="Thank you for registering! We'll see you at the event."
            rows={3}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
