"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, GripVertical, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface FormField {
  id: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export default function CreateFormPage() {
  const router = useRouter();
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [eventId, setEventId] = useState("");
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "1",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      id: "2",
      type: "email",
      label: "Email",
      placeholder: "your@email.com",
      required: true,
    },
  ]);
  const [saving, setSaving] = useState(false);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: "text",
      label: "New Field",
      placeholder: "",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  const handleSave = async () => {
    if (!formName.trim()) {
      toast.error("Please enter a form name");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          description: formDescription,
          eventId: eventId || null,
          fields,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create form");
      }

      await response.json();
      toast.success("Form created successfully!");
      router.push(`/admin/dashboard/forms`);
    } catch (error) {
      console.error("Error creating form:", error);
      toast.error("Failed to create form");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/forms">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Form
            </h1>
            <p className="mt-2 text-gray-600">
              Build a custom registration form for events
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Form"
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Settings */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Form Settings
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="formName">Form Name *</Label>
                <Input
                  id="formName"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Event Registration"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="formDescription">Description</Label>
                <Textarea
                  id="formDescription"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Form description..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="eventId">Link to Event (Optional)</Label>
                <Input
                  id="eventId"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  placeholder="Event ID"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty for a standalone form
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Available Field Types
            </h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Text input</li>
              <li>• Email</li>
              <li>• Phone number</li>
              <li>• Number</li>
              <li>• Long text (Textarea)</li>
              <li>• Dropdown (Select)</li>
              <li>• Checkbox</li>
              <li>• Radio buttons</li>
            </ul>
          </Card>
        </div>

        {/* Form Builder */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Form Fields
              </h2>
              <Button onClick={addField} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field) => (
                <Card key={field.id} className="border-2 p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-2 cursor-move">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Field Type</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value) =>
                              updateField(field.id, {
                                type: value as FormField["type"],
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="tel">Phone</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="textarea">
                                Long Text
                              </SelectItem>
                              <SelectItem value="select">Dropdown</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-end">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) =>
                                updateField(field.id, {
                                  required: e.target.checked,
                                })
                              }
                              className="rounded"
                            />
                            <span className="text-sm">Required</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">Field Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) =>
                            updateField(field.id, { label: e.target.value })
                          }
                          placeholder="Enter field label"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label className="text-xs">
                          Placeholder (Optional)
                        </Label>
                        <Input
                          value={field.placeholder || ""}
                          onChange={(e) =>
                            updateField(field.id, {
                              placeholder: e.target.value,
                            })
                          }
                          placeholder="Enter placeholder text"
                          className="mt-1"
                        />
                      </div>

                      {(field.type === "select" || field.type === "radio") && (
                        <div>
                          <Label className="text-xs">
                            Options (comma-separated)
                          </Label>
                          <Input
                            value={field.options?.join(", ") || ""}
                            onChange={(e) =>
                              updateField(field.id, {
                                options: e.target.value
                                  .split(",")
                                  .map((opt) => opt.trim())
                                  .filter((opt) => opt),
                              })
                            }
                            placeholder="Option 1, Option 2, Option 3"
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}

              {fields.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <p>No fields added yet. Click "Add Field" to get started.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Form Preview */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Form Preview
            </h2>
            <div className="space-y-4 rounded-lg border bg-gray-50 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {formName || "Form Name"}
                </h3>
                {formDescription && (
                  <p className="mt-1 text-sm text-gray-600">
                    {formDescription}
                  </p>
                )}
              </div>

              {fields.map((field) => (
                <div key={field.id}>
                  <Label>
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      disabled
                      className="mt-1 bg-white"
                    />
                  ) : field.type === "select" ? (
                    <Select disabled>
                      <SelectTrigger className="mt-1 bg-white">
                        <SelectValue
                          placeholder={field.placeholder || "Select an option"}
                        />
                      </SelectTrigger>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input type="checkbox" disabled className="rounded" />
                      <span className="text-sm">{field.placeholder}</span>
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled
                      className="mt-1 bg-white"
                    />
                  )}
                </div>
              ))}

              {fields.length > 0 && (
                <Button disabled className="mt-6 w-full">
                  Submit
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
