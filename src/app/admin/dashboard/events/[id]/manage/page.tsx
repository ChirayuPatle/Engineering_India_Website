import { Suspense } from "react";
import { db } from "@/database/db";
import { event } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth-helpers";
import EventPhasesManager from "@/components/admin/EventPhasesManager";
import EventResourcesManager from "@/components/admin/EventResourcesManager";
import EventPaymentConfig from "@/components/admin/EventPaymentConfig";

async function getEvent(id: string) {
  const events = await db
    .select()
    .from(event)
    .where(eq(event.id, id))
    .limit(1);

  return events[0] || null;
}

export default async function EventManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const eventData = await getEvent(id);

  if (!eventData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{eventData.name}</h1>
        <p className="mt-2 text-gray-600">Manage event details, phases, resources, and payment</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Basic Details</TabsTrigger>
          <TabsTrigger value="phases">Phases/Rounds</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Event Name</label>
                <p className="mt-1 text-gray-900">{eventData.name}</p>
              </div>
              {eventData.description && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <div
                    className="mt-1 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: eventData.description }}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {eventData.startDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(eventData.startDate).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                )}
                {eventData.endDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(eventData.endDate).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="mt-6">
          <Suspense fallback={<LoadingSpinner />}>
            <EventPhasesManager eventId={id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Suspense fallback={<LoadingSpinner />}>
            <EventResourcesManager eventId={id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="payment" className="mt-6">
          <Suspense fallback={<LoadingSpinner />}>
            <EventPaymentConfig eventId={id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );
}
