import { db } from "@/database/db";
import { event, registration } from "@/database/schema";
import { eq, count } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react";

async function getEvent(id: string) {
  try {
    const events = await db.select().from(event).where(eq(event.id, id));
    return events[0] || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

async function getRegistrationCount(eventId: string) {
  try {
    const result = await db
      .select({ count: count() })
      .from(registration)
      .where(eq(registration.eventId, eventId));
    return result[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching registration count:", error);
    return 0;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const evt = await getEvent(id);
  
  if (!evt) {
    notFound();
  }

  const registrationCount = await getRegistrationCount(id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/events">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{evt.name}</h1>
            <p className="mt-2 text-gray-600">Event Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/dashboard/events/${id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Banner Image */}
      {evt.bannerImage && (
        <div className="overflow-hidden rounded-lg">
          <img
            src={evt.bannerImage}
            alt={evt.name}
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {evt.description || "No description provided."}
            </p>
          </div>

          {/* Event Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Event Information
            </h2>
            <dl className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Start Date
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {evt.startDate
                      ? new Date(evt.startDate).toLocaleString()
                      : "Not set"}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    End Date
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {evt.endDate
                      ? new Date(evt.endDate).toLocaleString()
                      : "Not set"}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Location
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {evt.location || "Not specified"}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Registrations</div>
                <div className="text-2xl font-bold text-gray-900">
                  {registrationCount}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Category</div>
                <div className="text-lg font-medium text-gray-900 capitalize">
                  {evt.category || "General"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href={`/admin/dashboard/events/${id}/registrations`}
                className="block"
              >
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Registrations
                </Button>
              </Link>
              <Link
                href={`/admin/dashboard/events/${id}/form`}
                className="block"
              >
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Form
                </Button>
              </Link>
              <Link href={`/events/${evt.id}`} className="block" target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  View Public Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
