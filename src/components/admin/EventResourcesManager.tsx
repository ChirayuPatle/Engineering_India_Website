"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  FileText,
  Trash2,
  Download,
  Upload as UploadIcon,
} from "lucide-react";
import { toast } from "sonner";

interface Resource {
  id?: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileName: string;
  accessLevel: string;
  phaseId?: string;
}

export default function EventResourcesManager({
  eventId,
}: {
  eventId: string;
}) {
  const [resources, setResources] = useState<any[]>([]);
  const [phases, setPhases] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Resource>({
    title: "",
    description: "",
    type: "template",
    fileUrl: "",
    fileName: "",
    accessLevel: "public",
    phaseId: "",
  });

  useEffect(() => {
    fetchResources();
    fetchPhases();
  }, [eventId]);

  const fetchResources = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/resources`);
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const fetchPhases = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/phases`);
      if (response.ok) {
        const data = await response.json();
        setPhases(data);
      }
    } catch (error) {
      console.error("Error fetching phases:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        fileUrl: data.url,
        fileName: data.filename,
      }));
      toast.success("File uploaded!");
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fileUrl) {
      toast.error("Please upload a file");
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create resource");

      toast.success("Resource added!");
      setShowDialog(false);
      resetForm();
      fetchResources();
    } catch (error) {
      toast.error("Failed to add resource");
    }
  };

  const handleDelete = async (resourceId: string) => {
    if (!confirm("Delete this resource?")) return;

    try {
      const response = await fetch(
        `/api/events/${eventId}/resources/${resourceId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Resource deleted!");
      fetchResources();
    } catch (error) {
      toast.error("Failed to delete resource");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "template",
      fileUrl: "",
      fileName: "",
      accessLevel: "public",
      phaseId: "",
    });
  };

  const getResourceIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  const getAccessLevelBadge = (level: string) => {
    const colors = {
      public: "bg-green-100 text-green-700",
      registered: "bg-blue-100 text-blue-700",
      approved: "bg-purple-100 text-purple-700",
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Event Resources</h2>
          <p className="text-gray-600">
            Manage downloadable files and templates
          </p>
        </div>
        <Dialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., PPT Template"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the resource"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Resource Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="guideline">Guideline</SelectItem>
                      <SelectItem value="reference">Reference</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <Select
                    value={formData.accessLevel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, accessLevel: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="registered">
                        Registered Only
                      </SelectItem>
                      <SelectItem value="approved">Approved Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {phases.length > 0 && (
                <div>
                  <Label htmlFor="phaseId">Link to Phase (Optional)</Label>
                  <Select
                    value={formData.phaseId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, phaseId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific phase</SelectItem>
                      {phases.map((phase) => (
                        <SelectItem key={phase.id} value={phase.id}>
                          {phase.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="file">Upload File *</Label>
                <div className="mt-2">
                  {formData.fileUrl ? (
                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span className="flex-1 text-sm">
                        {formData.fileName}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            fileUrl: "",
                            fileName: "",
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <label htmlFor="file" className="cursor-pointer">
                        <UploadIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {uploading ? "Uploading..." : "Click to upload file"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Max 10MB</p>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading || !formData.fileUrl}>
                  Add Resource
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resources List */}
      {resources.length > 0 ? (
        <div className="grid gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-1 gap-4">
                  {getResourceIcon(resource.type)}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-lg font-semibold">
                        {resource.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${getAccessLevelBadge(resource.accessLevel)}`}
                      >
                        {resource.accessLevel}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        {resource.type}
                      </span>
                    </div>
                    {resource.description && (
                      <p className="mb-2 text-sm text-gray-600">
                        {resource.description}
                      </p>
                    )}
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>File: {resource.fileName}</span>
                      {resource.downloadCount && (
                        <span>Downloads: {resource.downloadCount}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={resource.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(resource.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-500">No resources added yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Add templates, guidelines, or other materials for participants
          </p>
        </Card>
      )}
    </div>
  );
}
