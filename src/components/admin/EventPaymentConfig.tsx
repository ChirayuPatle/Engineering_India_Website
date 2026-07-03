"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { QrCode, Loader2, X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface PaymentConfig {
  paymentRequired: boolean;
  amount: string;
  currency: string;
  upiIds: string[];
  qrCodeUrl: string | null;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  } | null;
  paymentInstructions: string;
  paymentDeadline: string;
}

export default function EventPaymentConfig({ eventId }: { eventId: string }) {
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<PaymentConfig>({
    paymentRequired: false,
    amount: "",
    currency: "INR",
    upiIds: [],
    qrCodeUrl: null,
    bankDetails: null,
    paymentInstructions: "",
    paymentDeadline: "",
  });

  const fetchConfig = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/payment-config`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setConfig({
            paymentRequired: data.paymentRequired || false,
            amount: data.amount || "",
            currency: data.currency || "",
            upiIds: data.upiIds || [],
            qrCodeUrl: data.qrCodeUrl || null,
            bankDetails: null,
            paymentInstructions: "",
            paymentDeadline: "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching payment config:", error);
    } finally {
      setUploading(false);
    }
  };

  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [newUpiId, setNewUpiId] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setQrFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addUpiId = () => {
    if (!newUpiId.trim()) {
      toast.error("Please enter a UPI ID");
      return;
    }
    if (config.upiIds.includes(newUpiId.trim())) {
      toast.error("UPI ID already exists");
      return;
    }
    setConfig({
      ...config,
      upiIds: [...config.upiIds, newUpiId.trim()],
    });
    setNewUpiId("");
  };

  const removeUpiId = (index: number) => {
    setConfig({
      ...config,
      upiIds: config.upiIds.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let qrCodeUrl = config.qrCodeUrl;

      // Upload QR code if new file selected
      if (qrFile) {
        const formData = new FormData();
        formData.append("file", qrFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload QR code");
        }

        const uploadData = await uploadResponse.json();
        qrCodeUrl = uploadData.url;
      }

      // Save config
      const response = await fetch(`/api/events/${eventId}/payment-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...config,
          qrCodeUrl,
          paymentDeadline: config.paymentDeadline
            ? new Date(config.paymentDeadline).toISOString()
            : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save payment config");
      }

      toast.success("Payment configuration saved!");
      fetchConfig();
    } catch (error) {
      console.error("Error saving payment config:", error);
      toast.error("Failed to save payment configuration");
    } finally {
      setSaving(false);
    }
  };

  if (uploading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payment Configuration</h2>
          <p className="text-gray-600">
            Configure payment details for this event
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Configuration"
          )}
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Enable Payment */}
          <div className="flex items-center justify-between border-b pb-6">
            <div>
              <h3 className="text-lg font-semibold">Require Payment</h3>
              <p className="text-sm text-gray-600">
                Enable payment collection for this event
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={config.paymentRequired}
                onChange={(e) =>
                  setConfig({ ...config, paymentRequired: e.target.checked })
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
            </label>
          </div>

          {config.paymentRequired && (
            <>
              {/* Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Registration Fee *</Label>
                  <Input
                    id="amount"
                    value={config.amount}
                    onChange={(e) =>
                      setConfig({ ...config, amount: e.target.value })
                    }
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Payment Deadline</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={config.paymentDeadline}
                    onChange={(e) =>
                      setConfig({ ...config, paymentDeadline: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* QR Code Upload */}
              <div>
                <Label>Payment QR Code</Label>
                {qrPreview ? (
                  <div className="relative mt-2 w-64">
                    <Image
                      src={qrPreview}
                      alt="Payment QR Code"
                      width={256}
                      height={256}
                      className="w-full rounded-lg border-2 border-gray-200"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => {
                        setQrFile(null);
                        setQrPreview(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-500"
                    onClick={() =>
                      document.getElementById("qr-upload")?.click()
                    }
                  >
                    <QrCode className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload QR code
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
                <input
                  id="qr-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleQrUpload}
                  className="hidden"
                />
              </div>

              {/* UPI IDs */}
              <div>
                <Label>UPI IDs</Label>
                <div className="mt-2 space-y-3">
                  {config.upiIds.map((upi, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <span className="font-mono text-sm text-gray-900">
                        {upi}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUpiId(index)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Input
                    value={newUpiId}
                    onChange={(e) => setNewUpiId(e.target.value)}
                    placeholder="username@upi"
                    onKeyPress={(e) => e.key === "Enter" && addUpiId()}
                  />
                  <Button onClick={addUpiId} type="button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Payment Instructions */}
              <div>
                <Label htmlFor="instructions">Payment Instructions</Label>
                <Textarea
                  id="instructions"
                  value={config.paymentInstructions}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      paymentInstructions: e.target.value,
                    })
                  }
                  placeholder="Enter payment instructions for participants..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Bank Details (Optional) */}
              <div>
                <Label>Bank Account Details (Optional)</Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Account Holder Name"
                    value={config.bankDetails?.accountName || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        bankDetails: {
                          ...config.bankDetails,
                          accountName: e.target.value,
                          accountNumber:
                            config.bankDetails?.accountNumber || "",
                          ifscCode: config.bankDetails?.ifscCode || "",
                          bankName: config.bankDetails?.bankName || "",
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="Account Number"
                    value={config.bankDetails?.accountNumber || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        bankDetails: {
                          ...config.bankDetails,
                          accountNumber: e.target.value,
                          accountName: config.bankDetails?.accountName || "",
                          ifscCode: config.bankDetails?.ifscCode || "",
                          bankName: config.bankDetails?.bankName || "",
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="IFSC Code"
                    value={config.bankDetails?.ifscCode || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        bankDetails: {
                          ...config.bankDetails,
                          ifscCode: e.target.value.toUpperCase(),
                          accountName: config.bankDetails?.accountName || "",
                          accountNumber:
                            config.bankDetails?.accountNumber || "",
                          bankName: config.bankDetails?.bankName || "",
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="Bank Name"
                    value={config.bankDetails?.bankName || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        bankDetails: {
                          ...config.bankDetails,
                          bankName: e.target.value,
                          accountName: config.bankDetails?.accountName || "",
                          accountNumber:
                            config.bankDetails?.accountNumber || "",
                          ifscCode: config.bankDetails?.ifscCode || "",
                        },
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
