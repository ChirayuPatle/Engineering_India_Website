"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, FileText, Download, Trash2 } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileName: string;
  accessLevel: string;
  phaseId: string;
  downloadCount?: number;
}

interface Phase {
  id: string;
  name: string;
  description: string;
}

export default function EventResourcesManager({ eventId }: { eventId: string }) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Resource>>({
    title: "",
    description: "",
    type: "template",
    fileUrl: "",
    fileName: "",
    accessLevel: "public",
    phaseId: "",
  });

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

  useEffect(() => {
    fetchResources();
    fetchPhases();
  }, [eventId, fetchResources, fetchPhases]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileUrl) return;
    setUploading(true);

    try {
      const response = await fetch(`/api/events/${eventId}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create resource");

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        fileUrl: data.url,
        fileName: data.filename,
      }));
      toast.success("File uploaded!");
    } catch (_error) {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
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
    } catch (_error) {
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

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "public":
        return "bg-green-100 text-green-800";
      case "registered":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "template":
        return <FileText className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Resources</h1>
          <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
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
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Resource title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Resource description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fileUrl">File URL</Label>
                  <Input
                    id="fileUrl"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="External file URL"
                  />
                </div>
                <div>
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <Select value={formData.accessLevel} onValueChange={(value) => setFormData({ ...formData, accessLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="registered">Registered Users</SelectItem>
                      <SelectItem value="paid">Paid Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phaseId">Phase (Optional)</Label>
                  <Select value={formData.phaseId} onValueChange={(value) => setFormData({ ...formData, phaseId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phases.map((phase) => (
                        <SelectItem key={phase.id} value={phase.id}>
                          {phase.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading || !formData.fileUrl}>
                    Add Resource
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Resources List */}
      <div>
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
