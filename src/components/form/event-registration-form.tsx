"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getEvent } from "@/lib/event-api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// Define types for the event data
type Event = {
  id: string;
  name: string;
  isPaid: boolean;
  registrationFee?: number;
  registrationConfig?: string | RegistrationConfig;
};

type RegistrationConfig = {
  fields?: FormField[];
  upiIds?: { value: string }[];
  conclusionContent?: string;
  qrCodeImage?: string;
};

type FormField = {
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
};

type ApiResponse = {
  event: Event;
};

type RegistrationResponse = {
  success: boolean;
  message?: string;
};

type PaymentResponse = {
  success: boolean;
  message?: string;
};

// Define separate form types for registration and payment
type RegistrationFormValues = Record<string, string | FileList>;

type PaymentFormValues = {
  transactionId: string;
  senderName: string;
  paymentProof?: FileList;
};

const EventRegistrationForm = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [step, setStep] = useState<"form" | "payment" | "confirmation">("form");

  // Separate forms for registration and payment
  const registrationForm = useForm<RegistrationFormValues>();
  const paymentForm = useForm<PaymentFormValues>();

  const { data, isLoading, error } = useQuery<ApiResponse, Error>({
    queryKey: ["event", params.id],
    queryFn: async () => {
      const response = await getEvent(params.id);
      if (response === undefined || response === null) {
        throw new Error("Event not found");
      }
      return { event: response };
    },
  });

  const submitRegistration = useMutation<RegistrationResponse, Error, FormData>(
    {
      mutationFn: async (formData) => {
        const response = await fetch(`/api/events/${params.id}/register`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to register");
        }
        return response.json();
      },
      onSuccess: () => {
        if (data?.event?.isPaid) {
          setStep("payment");
        } else {
          setStep("confirmation");
        }
      },
    },
  );

  const submitPayment = useMutation<PaymentResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const response = await fetch(`/api/events/${params.id}/payment`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit payment");
      }
      return response.json();
    },
    onSuccess: () => {
      setStep("confirmation");
    },
  });

  const onRegistrationSubmit = (formValues: RegistrationFormValues) => {
    const formData = new FormData();

    // Add form field values
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof FileList && value.length > 0 && value[0]) {
          formData.append(key, value[0]);
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    });

    submitRegistration.mutate(formData);
  };

  const onPaymentSubmit = (formValues: PaymentFormValues) => {
    const formData = new FormData();

    formData.append("transactionId", formValues.transactionId);
    formData.append("senderName", formValues.senderName);

    if (formValues.paymentProof?.[0]) {
      formData.append("paymentProof", formValues.paymentProof[0]);
    }

    submitPayment.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !data?.event) {
    return (
      <Alert variant="destructive" className="mx-auto mt-8 max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load event information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const event = data.event;
  const registrationConfig =
    typeof event.registrationConfig === "string"
      ? (JSON.parse(event.registrationConfig) as RegistrationConfig)
      : event.registrationConfig;

  const formFields = registrationConfig?.fields || [];
  const isPaid = event.isPaid;
  const upiIds = registrationConfig?.upiIds || [];
  const conclusionContent =
    registrationConfig?.conclusionContent || "Thank you for registering!";

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">{event.name}</h1>

      {step === "form" && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)}
              className="space-y-4"
            >
              {formFields.map((field: FormField, index: number) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>

                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder || `Enter ${field.name}`}
                      {...registrationForm.register(field.name, {
                        required: field.required
                          ? `${field.name} is required`
                          : false,
                      })}
                    />
                  ) : field.type === "file" ? (
                    <Input
                      id={field.name}
                      type="file"
                      {...registrationForm.register(field.name, {
                        required: field.required
                          ? `${field.name} is required`
                          : false,
                      })}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder || `Enter ${field.name}`}
                      {...registrationForm.register(field.name, {
                        required: field.required
                          ? `${field.name} is required`
                          : false,
                      })}
                    />
                  )}

                  {registrationForm.formState.errors[field.name] && (
                    <p className="text-sm text-red-500">
                      {registrationForm.formState.errors[field.name]?.message ||
                        "This field is required"}
                    </p>
                  )}
                </div>
              ))}

              <Button
                type="submit"
                className="mt-6 w-full"
                disabled={submitRegistration.isPending}
              >
                {submitRegistration.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Registration</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "payment" && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTitle>Payment Required</AlertTitle>
              <AlertDescription>
                Please complete your payment of ₹{event.registrationFee} to
                confirm your registration.
              </AlertDescription>
            </Alert>

            {registrationConfig?.qrCodeImage && (
              <div className="flex justify-center">
                <div className="rounded-md border border-gray-200 p-2">
                  <Image
                    src={registrationConfig.qrCodeImage}
                    alt="Payment QR Code"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            )}

            {upiIds.length > 0 && (
              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-medium">
                  UPI IDs for Payment:
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {upiIds.map((upi, index: number) => (
                    <li key={index}>{upi.value}</li>
                  ))}
                </ul>
              </div>
            )}

            <form
              onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}
              className="mt-6 space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="transactionId">
                  Transaction ID / Reference Number *
                </Label>
                <Input
                  id="transactionId"
                  placeholder="Enter your payment transaction ID"
                  {...paymentForm.register("transactionId", {
                    required: "Transaction ID is required",
                  })}
                />
                {paymentForm.formState.errors.transactionId && (
                  <p className="text-sm text-red-500">
                    {paymentForm.formState.errors.transactionId.message ||
                      "Transaction ID is required"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderName">Sender Name *</Label>
                <Input
                  id="senderName"
                  placeholder="Name as per bank/UPI account"
                  {...paymentForm.register("senderName", {
                    required: "Sender name is required",
                  })}
                />
                {paymentForm.formState.errors.senderName && (
                  <p className="text-sm text-red-500">
                    {paymentForm.formState.errors.senderName.message ||
                      "Sender name is required"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentProof">
                  Payment Screenshot (Optional)
                </Label>
                <Input
                  id="paymentProof"
                  type="file"
                  accept="image/*"
                  {...paymentForm.register("paymentProof")}
                />
              </div>

              <Button
                type="submit"
                className="mt-6 w-full"
                disabled={submitPayment.isPending}
              >
                {submitPayment.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Payment...
                  </>
                ) : (
                  <>Submit Payment Details</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "confirmation" && (
        <Card className="shadow-md">
          <CardHeader className="border-b border-green-100 bg-green-50">
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="mr-2 h-5 w-5" />
              Registration Successful
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <div className="space-y-4 text-center">
              <p className="text-gray-700">{conclusionContent}</p>

              {isPaid && (
                <Alert className="border-yellow-200 bg-yellow-50 text-left">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Payment Verification</AlertTitle>
                  <AlertDescription>
                    Your payment is being verified. You will receive a
                    confirmation email once the payment is confirmed.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => router.push("/events")}>
              Back to Events
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EventRegistrationForm;
