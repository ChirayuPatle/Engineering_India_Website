import { db } from "@/database/db";
import { event, registration, user } from "@/database/schema";
import { eq, desc } from "drizzle-orm";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegistrationActions } from "@/components/admin/RegistrationActions";

async function getEventWithRegistrations(eventId: string) {
  try {
    const eventData = await db
      .select()
      .from(event)
      .where(eq(event.id, eventId));

    if (eventData.length === 0) return null;

    const registrations = await db
      .select({
        id: registration.id,
        status: registration.status,
        registrationDate: registration.createdAt,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        userCollegeName: user.collegeName,
        userBranch: user.branch,
      })
      .from(registration)
      .leftJoin(user, eq(registration.userId, user.id))
      .where(eq(registration.eventId, eventId))
      .orderBy(desc(registration.createdAt));

    const stats = {
      total: registrations.length,
      approved: registrations.filter((r) => r.status === "APPROVED").length,
      pending: registrations.filter((r) => r.status === "PENDING").length,
      rejected: registrations.filter((r) => r.status === "REJECTED").length,
    };

    return {
      event: eventData[0],
      registrations,
      stats,
    };
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return null;
  }
}

export default async function EventRegistrationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getEventWithRegistrations(id);

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Event not found</h3>
          <p className="mt-2 text-gray-600">
            The event you're looking for doesn't exist.
          </p>
          <Link href="/admin/dashboard/events">
            <Button className="mt-4">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { event: eventData, registrations, stats } = data;

  const statusColors = {
    APPROVED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    APPROVED: CheckCircle,
    PENDING: Clock,
    REJECTED: XCircle,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/dashboard/events/${id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Event Registrations
            </h1>
            <p className="mt-2 text-gray-600">
              {eventData?.name || "Unknown Event"}
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Registrations
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.total}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {stats.approved}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {stats.rejected}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search registrations..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Registrations Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {registrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    College
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((reg) => {
                  const StatusIcon =
                    statusIcons[reg.status as keyof typeof statusIcons] ||
                    Clock;
                  return (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {reg.userImage ? (
                              <img
                                src={reg.userImage}
                                alt={reg.userName || "User"}
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                                {reg.userName?.charAt(0).toUpperCase() || "U"}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {reg.userName || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {reg.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {reg.userCollegeName || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {reg.userBranch || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(reg.registrationDate).toLocaleDateString(
                            "en-GB",
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                            statusColors[
                              reg.status as keyof typeof statusColors
                            ] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <RegistrationActions
                          registrationId={reg.id}
                          status={reg.status}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No registrations yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Registrations for this event will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
