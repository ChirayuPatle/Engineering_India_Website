"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

interface Phase {
  id?: string;
  name: string;
  description: string;
  phaseNumber: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  requiresPreviousPhaseCompletion: boolean;
  instructions: string;
}

export default function EventPhasesManager({ eventId }: { eventId: string }) {
  const [phases, setPhases] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [formData, setFormData] = useState<Phase>({
    name: "",
    description: "",
    phaseNumber: 1,
    startDate: "",
    endDate: "",
    isActive: false,
    requiresPreviousPhaseCompletion: true,
    instructions: "",
  });

  useEffect(() => {
    fetchPhases();
  }, [eventId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPhase
        ? `/api/events/${eventId}/phases/${editingPhase.id}`
        : `/api/events/${eventId}/phases`;

      const response = await fetch(url, {
        method: editingPhase ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save phase");

      toast.success(editingPhase ? "Phase updated!" : "Phase created!");
      setShowDialog(false);
      resetForm();
      fetchPhases();
    } catch (error) {
      toast.error("Failed to save phase");
    }
  };

  const handleDelete = async (phaseId: string) => {
    if (!confirm("Delete this phase?")) return;

    try {
      const response = await fetch(`/api/events/${eventId}/phases/${phaseId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Phase deleted!");
      fetchPhases();
    } catch (error) {
      toast.error("Failed to delete phase");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      phaseNumber: phases.length + 1,
      startDate: "",
      endDate: "",
      isActive: false,
      requiresPreviousPhaseCompletion: true,
      instructions: "",
    });
    setEditingPhase(null);
  };

  const openEditDialog = (phase: any) => {
    setEditingPhase(phase);
    setFormData({
      name: phase.name,
      description: phase.description || "",
      phaseNumber: phase.phaseNumber,
      startDate: phase.startDate ? new Date(phase.startDate).toISOString().slice(0, 16) : "",
      endDate: phase.endDate ? new Date(phase.endDate).toISOString().slice(0, 16) : "",
      isActive: phase.isActive || false,
      requiresPreviousPhaseCompletion: phase.requiresPreviousPhaseCompletion ?? true,
      instructions: phase.instructions || "",
    });
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Event Phases/Rounds</h2>
          <p className="text-gray-600">Manage multi-round event structure</p>
        </div>
        <Dialog open={showDialog} onOpenChange={(open) => {
          setShowDialog(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Phase
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPhase ? "Edit Phase" : "Add New Phase"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Phase Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Round 1: PPT Submission"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phaseNumber">Phase Number *</Label>
                  <Input
                    id="phaseNumber"
                    type="number"
                    min="1"
                    value={formData.phaseNumber}
                    onChange={(e) => setFormData({ ...formData, phaseNumber: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions for Participants</Label>
                <Textarea
                  id="instructions"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="What do participants need to do in this phase?"
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Active Now</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.requiresPreviousPhaseCompletion}
                    onChange={(e) => setFormData({ ...formData, requiresPreviousPhaseCompletion: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Require Previous Phase Completion</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPhase ? "Update Phase" : "Create Phase"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Phases List */}
      {phases.length > 0 ? (
        <div className="grid gap-4">
          {phases.map((phase) => (
            <Card key={phase.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-blue-600">
                      Phase {phase.phaseNumber}
                    </span>
                    {phase.isActive && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{phase.name}</h3>
                  {phase.description && (
                    <p className="text-gray-600 mb-4">{phase.description}</p>
                  )}
                  {phase.instructions && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-blue-900">{phase.instructions}</p>
                    </div>
                  )}
                  <div className="flex gap-4 text-sm text-gray-500">
                    {phase.startDate && (
                      <span>
                        Start: {new Date(phase.startDate).toLocaleDateString('en-GB')}
                      </span>
                    )}
                    {phase.endDate && (
                      <span>
                        End: {new Date(phase.endDate).toLocaleDateString('en-GB')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(phase)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(phase.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No phases added yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Add phases to create multi-round events like hackathons
          </p>
        </Card>
      )}
    </div>
  );
}
