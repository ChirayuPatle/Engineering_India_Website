import Link from "next/link";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Events Management
          </h1>

          <p className="mt-2 text-gray-600">
            Create and manage Engineering India events
          </p>
        </div>

        <Link href="/admin/dashboard/events/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />

        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Add a New Event
        </h3>

        <p className="mt-2 text-gray-500">
          Create an event with its details and Google Form registration link.
        </p>

        <div className="mt-6">
          <Link href="/admin/dashboard/events/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}