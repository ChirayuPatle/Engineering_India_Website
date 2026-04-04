"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Download,
  FileText,
  DollarSign,
  CheckCircle,
  AlertCircle,
  PhoneCall,
  Mail,
  MessageSquare,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface EventDetailsProps {
  eventId: string;
  isRegistered?: boolean;
  registrationId?: string;
}

export default function EnhancedEventPage({
  eventId,
  isRegistered = false,
  registrationId,
}: EventDetailsProps) {
  const [event, setEvent] = useState<any>(null);
  const [phases, setPhases] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [paymentConfig, setPaymentConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showPhaseDialog, setShowPhaseDialog] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);

  const fetchEventData = async () => {
    try {
      const [eventRes, phasesRes, resourcesRes, paymentRes] = await Promise.all(
        [
          fetch(`/api/events/${eventId}`),
          fetch(`/api/events/${eventId}/phases`),
          fetch(`/api/events/${eventId}/resources`),
          fetch(`/api/events/${eventId}/payment-config`),
        ],
      );

      if (eventRes.ok && phasesRes.ok && resourcesRes.ok) {
        const [eventData, phasesData, resourcesData] = await Promise.all([
          eventRes.json(),
          phasesRes.json(),
          resourcesRes.json(),
        ]);

        setEvent(eventData);
        setPhases(phasesData);
        setResources(resourcesData);

        if (paymentRes.ok) {
          const paymentData = await paymentRes.json();
          setPaymentConfig(paymentData);
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      toast.error("Failed to load event data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId, fetchEventData]);

  const handleDownloadResource = async (resourceId: string) => {
    try {
      const response = await fetch(
        `/api/events/${eventId}/resources/${resourceId}/download`,
      );
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resource";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download resource");
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getTimeRemaining = () => {
    if (!event?.startDate) return null;
    const now = new Date();
    const start = new Date(event.startDate);
    const diff = start.getTime() - now.getTime();

    if (diff < 0) return "Event started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h remaining`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold">Event not found</h2>
        </div>
      </div>
    );
  }

  const publicResources = resources.filter((r) => r.accessLevel === "public");
  const registeredOnlyResources = resources.filter(
    (r) => r.accessLevel === "registered",
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        {event.bannerImage && (
          <Image
            src={event.bannerImage}
            alt={event.name}
            fill
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-12">
          <div className="mb-4 flex items-center gap-2">
            <Badge className="bg-white/20 text-white backdrop-blur-sm">
              {event.category || "Event"}
            </Badge>
            {isRegistered && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Registered
              </Badge>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {event.name}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{getTimeRemaining()}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Quick Actions */}
            <Card className="p-6">
              <div className="flex flex-wrap gap-4">
                {!isRegistered && (
                  <Button
                    size="lg"
                    onClick={() => setShowRegisterDialog(true)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Register Now
                  </Button>
                )}
                {event.discordLink && (
                  <Button variant="outline" size="lg" asChild>
                    <a
                      href={event.discordLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join Discord
                    </a>
                  </Button>
                )}
                {event.whatsappLink && (
                  <Button variant="outline" size="lg" asChild>
                    <a
                      href={event.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PhoneCall className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="phases">Rounds</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">About This Event</h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: event.description || "",
                    }}
                  />
                </Card>

                {event.rules && (
                  <Card className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">
                      Rules & Guidelines
                    </h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.rules }}
                    />
                  </Card>
                )}

                {event.prizes && (
                  <Card className="p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                      Prizes
                    </h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.prizes }}
                    />
                  </Card>
                )}
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline">
                <Card className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Event Timeline</h2>
                  {event.timeline ? (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.timeline }}
                    />
                  ) : (
                    <p className="text-gray-500">
                      Timeline will be announced soon.
                    </p>
                  )}
                </Card>
              </TabsContent>

              {/* Phases Tab */}
              <TabsContent value="phases" className="space-y-4">
                {phases.length > 0 ? (
                  phases.map((phase, index) => (
                    <Card key={phase.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <Badge variant="outline" className="text-lg">
                              Round {phase.phaseNumber}
                            </Badge>
                            {phase.isActive && (
                              <Badge className="bg-green-500">Active</Badge>
                            )}
                          </div>
                          <h3 className="mb-2 text-xl font-bold">
                            {phase.name}
                          </h3>
                          <p className="mb-4 text-gray-600">
                            {phase.description}
                          </p>

                          <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(phase.startDate)} -{" "}
                              {formatDate(phase.endDate)}
                            </div>
                          </div>

                          {phase.instructions && (
                            <div className="mb-4 rounded-lg bg-blue-50 p-4">
                              <p className="text-sm text-blue-900">
                                {phase.instructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {isRegistered && phase.isActive && (
                        <Button
                          onClick={() => {
                            setSelectedPhase(phase);
                            setShowPhaseDialog(true);
                          }}
                          className="mt-4 w-full"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Submit for {phase.name}
                        </Button>
                      )}
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-gray-500">
                      No rounds/phases announced yet.
                    </p>
                  </Card>
                )}
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-6">
                {publicResources.length > 0 && (
                  <Card className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      Public Resources
                    </h3>
                    <div className="space-y-3">
                      {publicResources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                        >
                          <div className="flex flex-1 items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              {resource.description && (
                                <p className="text-sm text-gray-500">
                                  {resource.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadResource(resource.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {isRegistered && registeredOnlyResources.length > 0 && (
                  <Card className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Registered Participants Only
                    </h3>
                    <div className="space-y-3">
                      {registeredOnlyResources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100"
                        >
                          <div className="flex flex-1 items-center gap-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              {resource.description && (
                                <p className="text-sm text-gray-500">
                                  {resource.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadResource(resource.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {publicResources.length === 0 &&
                  (!isRegistered || registeredOnlyResources.length === 0) && (
                    <Card className="p-12 text-center">
                      <Download className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-500">
                        No resources available yet.
                      </p>
                    </Card>
                  )}
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <Card className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">
                    Frequently Asked Questions
                  </h2>
                  {event.faqs && event.faqs.length > 0 ? (
                    <div className="space-y-4">
                      {event.faqs.map((faq: any, index: number) => (
                        <div
                          key={index}
                          className="border-b pb-4 last:border-0 last:pb-0"
                        >
                          <h4 className="mb-2 text-lg font-semibold">
                            {faq.question}
                          </h4>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-8 text-center text-gray-500">
                      No FAQs available yet.
                    </p>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Payment Info */}
            {paymentConfig?.paymentRequired && (
              <Card className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Payment Details
                </h3>

                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">
                      ₹{paymentConfig.amount}
                    </p>
                    <p className="text-sm text-gray-600">Registration Fee</p>
                  </div>

                  {paymentConfig.qrCodeUrl && (
                    <div className="rounded-lg border-2 border-gray-200 p-2">
                      <Image
                        src={paymentConfig.qrCodeUrl}
                        alt="Payment QR Code"
                        width={200}
                        height={200}
                        className="w-full rounded"
                      />
                    </div>
                  )}

                  {paymentConfig.upiIds && paymentConfig.upiIds.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium">UPI IDs:</p>
                      {paymentConfig.upiIds.map(
                        (upi: string, index: number) => (
                          <div
                            key={index}
                            className="mb-2 flex items-center gap-2 rounded bg-gray-50 p-2 font-mono text-sm"
                          >
                            <span className="flex-1">{upi}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                navigator.clipboard.writeText(upi);
                                toast.success("UPI ID copied!");
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {paymentConfig.paymentInstructions && (
                    <div className="rounded bg-blue-50 p-3 text-sm text-gray-600">
                      {paymentConfig.paymentInstructions}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Contact Information
              </h3>
              <div className="space-y-3">
                {event.organizerContact && (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Organizer</p>
                      <p className="text-sm text-gray-600">
                        {event.organizerContact}
                      </p>
                    </div>
                  </div>
                )}
                {event.coOrganizerContact && (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Co-Organizer</p>
                      <p className="text-sm text-gray-600">
                        {event.coOrganizerContact}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Event Stats */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Event Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <Badge>{event.category || "General"}</Badge>
                </div>
                {event.maxRegistrations && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Participants</span>
                    <span className="font-semibold">
                      {event.maxRegistrations}
                    </span>
                  </div>
                )}
                {phases.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Rounds</span>
                    <span className="font-semibold">{phases.length}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Register for {event.name}</DialogTitle>
          </DialogHeader>
          {/* Registration form will be rendered here */}
          <div className="py-8 text-center">
            <p>Registration form component will be integrated here</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phase Submission Dialog */}
      <Dialog open={showPhaseDialog} onOpenChange={setShowPhaseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit for {selectedPhase?.name}</DialogTitle>
          </DialogHeader>
          {/* Phase submission form will be rendered here */}
          <div className="py-8 text-center">
            <p>Phase submission form will be integrated here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
