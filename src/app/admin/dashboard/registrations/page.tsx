import { db } from "@/database/db";
import { registration, event as eventTable, user } from "@/database/schema";
import { eq, desc } from "drizzle-orm";
import { Users, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistrationActions } from "@/components/admin/RegistrationActions";

async function getRegistrations() {
  try {
    const registrations = await db
      .select({
        id: registration.id,
        eventId: registration.eventId,
        userId: registration.userId,
        status: registration.status,
        createdAt: registration.createdAt,
        eventName: eventTable.name,
        userName: user.name,
        userEmail: user.email,
      })
      .from(registration)
      .leftJoin(eventTable, eq(registration.eventId, eventTable.id))
      .leftJoin(user, eq(registration.userId, user.id))
      .orderBy(desc(registration.createdAt));

    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

export default async function RegistrationsPage() {
  const registrations = await getRegistrations();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Registrations Management
          </h1>
          <p className="mt-2 text-gray-600">
            View and manage all event registrations
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {registrations.length}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {
                  registrations.filter((r) => r.status === "pending").length
                }
              </p>
            </div>
            <Users className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {
                  registrations.filter((r) => r.status === "approved")
                    .length
                }
              </p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
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
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
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
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {reg.userName || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reg.userEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {reg.eventName || "Unknown Event"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {reg.createdAt
                          ? new Date(reg.createdAt).toLocaleDateString('en-GB')
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                          statusColors[
                            reg.status as keyof typeof statusColors
                          ] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <RegistrationActions 
                        registrationId={reg.id} 
                        status={reg.status} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No registrations yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Registrations will appear here once users start signing up.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
