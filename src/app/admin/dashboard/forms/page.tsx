import { db } from "@/database/db";
import { eventForm, event as eventTable } from "@/database/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { FileText, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getForms() {
  try {
    const forms = await db
      .select({
        id: eventForm.id,
        eventId: eventForm.eventId,
        title: eventForm.title,
        description: eventForm.description,
        createdAt: eventForm.createdAt,
        eventName: eventTable.name,
      })
      .from(eventForm)
      .leftJoin(eventTable, eq(eventForm.eventId, eventTable.id))
      .orderBy(desc(eventForm.createdAt));

    return forms;
  } catch (error) {
    console.error("Error fetching forms:", error);
    return [];
  }
}

export default async function FormsPage() {
  const forms = await getForms();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forms Management</h1>
          <p className="mt-2 text-gray-600">
            Create and manage custom registration forms
          </p>
        </div>
        <Link href="/admin/dashboard/forms/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Form
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search forms..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Forms Grid */}
      {forms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div
              key={form.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {form.title || "Untitled Form"}
              </h3>

              <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                {form.description || "No description"}
              </p>

              <div className="mb-4 text-xs text-gray-500">
                <span className="font-medium">Event:</span>{" "}
                {form.eventName || "Unknown"}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/dashboard/forms/${form.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Link
                  href={`/admin/dashboard/forms/${form.id}/submissions`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Submissions
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No forms yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first custom form.
          </p>
          <div className="mt-6">
            <Link href="/admin/dashboard/forms/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Form
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
