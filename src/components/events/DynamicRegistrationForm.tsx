"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import * as z from "zod";
import type { FormField, ValidationRule } from "@/database/schema/form-builder-schema";
import Image from "next/image";

interface DynamicRegistrationFormProps {
  eventId: string;
  eventName: string;
  onSuccess?: () => void;
}

interface EventFormData {
  id: string;
  eventId: string;
  formSchema: FormField[];
  title: string;
  description: string;
  successMessage: string;
  formImage?: string;
}

// Helper function to create Zod schema from form fields
function createZodSchema(fields: FormField[]) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        fieldSchema = z.string().email("Invalid email address");
        break;
      case "tel":
        fieldSchema = z.string().min(10, "Phone number must be at least 10 digits");
        break;
      case "number":
        fieldSchema = z.coerce.number();
        break;
      case "url":
        fieldSchema = z.string().url("Invalid URL");
        break;
      case "checkbox":
        fieldSchema = z.boolean();
        break;
      case "date":
        fieldSchema = z.string();
        break;
      case "time":
        fieldSchema = z.string();
        break;
      case "file":
        fieldSchema = z.any(); // File handling
        break;
      default:
        fieldSchema = z.string();
    }

    // Apply validation rules
    if (field.validation) {
      field.validation.forEach((rule: ValidationRule) => {
        switch (rule.type) {
          case "required":
            if (field.type === "checkbox") {
              fieldSchema = z.boolean().refine((val) => val === true, {
                message: rule.message || "This field is required",
              });
            }
            break;
          case "minLength":
            if (fieldSchema instanceof z.ZodString) {
              fieldSchema = fieldSchema.min(
                Number(rule.value),
                rule.message || `Minimum ${rule.value} characters required`
              );
            }
            break;
          case "maxLength":
            if (fieldSchema instanceof z.ZodString) {
              fieldSchema = fieldSchema.max(
                Number(rule.value),
                rule.message || `Maximum ${rule.value} characters allowed`
              );
            }
            break;
          case "min":
            if (fieldSchema instanceof z.ZodNumber) {
              fieldSchema = fieldSchema.min(
                Number(rule.value),
                rule.message || `Minimum value is ${rule.value}`
              );
            }
            break;
          case "max":
            if (fieldSchema instanceof z.ZodNumber) {
              fieldSchema = fieldSchema.max(
                Number(rule.value),
                rule.message || `Maximum value is ${rule.value}`
              );
            }
            break;
          case "pattern":
            if (fieldSchema instanceof z.ZodString && rule.value) {
              fieldSchema = fieldSchema.regex(
                new RegExp(String(rule.value)),
                rule.message || "Invalid format"
              );
            }
            break;
        }
      });
    }

    // Make optional if not required
    if (!field.required && field.type !== "checkbox") {
      fieldSchema = fieldSchema.optional();
    }

    schemaFields[field.name] = fieldSchema;
  });

  return z.object(schemaFields);
}

// Helper function to get default values
function getDefaultValues(fields: FormField[]) {
  const defaults: Record<string, any> = {};
  fields.forEach((field) => {
    switch (field.type) {
      case "checkbox":
        defaults[field.name] = false;
        break;
      case "number":
        defaults[field.name] = "";
        break;
      case "select":
      case "radio":
        defaults[field.name] = "";
        break;
      case "file":
        defaults[field.name] = null;
        break;
      default:
        defaults[field.name] = "";
    }
  });
  return defaults;
}

export function DynamicRegistrationForm({
  eventId,
  eventName,
  onSuccess,
}: DynamicRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<EventFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the custom form for this event
  useEffect(() => {
    async function fetchForm() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/admin/events/${eventId}/form`);
        
        if (response.status === 404) {
          setError("No registration form has been created for this event yet.");
          return;
        }
        
        if (!response.ok) {
          throw new Error("Failed to load registration form");
        }

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching form:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load registration form"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchForm();
  }, [eventId]);

  // Create form schema and default values dynamically
  const formSchema = formData ? createZodSchema(formData.formSchema) : z.object({ _dummy: z.string().optional() });
  const defaultValues = formData ? getDefaultValues(formData.formSchema) : { _dummy: "" };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Reset form when formData changes
  useEffect(() => {
    if (formData) {
      const newDefaultValues = getDefaultValues(formData.formSchema);
      form.reset(newDefaultValues);
    }
  }, [formData, form]);

  async function onSubmit(values: any) {
    setIsSubmitting(true);
    try {
      console.log("🚀 Submitting registration...");
      console.log("Event ID:", eventId);
      console.log("Form values:", values);
      console.log("Form values type:", typeof values);
      console.log("Form values keys:", Object.keys(values));
      
      const payload = {
        eventId,
        formData: values,
      };
      
      console.log("Request payload:", JSON.stringify(payload, null, 2));
      
      const response = await fetch("/api/event/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to register for event");
      }

      toast.success(formData?.successMessage || "Registration submitted successfully!");
      form.reset();

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          router.push("/dashboard/registrations");
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to register for event"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Render field based on type
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "url":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "number":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "date":
      case "time":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <FormControl>
                  <Input type={field.type} {...formField} />
                </FormControl>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    className="resize-none"
                    rows={4}
                    {...formField}
                  />
                </FormControl>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || "Select an option"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "radio":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                    className="flex flex-col space-y-1"
                  >
                    {field.options?.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </FormLabel>
                  {field.helpText && (
                    <FormDescription>{field.helpText}</FormDescription>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "file":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      formField.onChange(file);
                    }}
                  />
                </FormControl>
                {field.helpText && (
                  <FormDescription>{field.helpText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading registration form...</span>
      </div>
    );
  }

  // Error state
  if (error || !formData) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Unable to Load Form</h3>
            <p className="mt-1 text-sm text-red-700">
              {error || "No registration form available for this event."}
            </p>
            <p className="mt-2 text-sm text-red-600">
              Please contact the event organizers for assistance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sort fields by order
  const sortedFields = [...formData.formSchema].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {formData.title || `Register for ${eventName}`}
        </h2>
        {formData.description && (
          <p className="mt-2 text-sm text-gray-600">{formData.description}</p>
        )}
      </div>

      {/* Display form image if available */}
      {formData.formImage && (
        <div className="mb-6 rounded-lg overflow-hidden border">
          <Image
            src={formData.formImage}
            alt="Event QR Code or Banner"
            width={600}
            height={300}
            className="w-full h-auto"
          />
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {sortedFields.length === 0 ? (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900">No Form Fields</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    The registration form for this event hasn't been configured yet.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {sortedFields.map((field) => renderField(field))}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Register Now"
                )}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
