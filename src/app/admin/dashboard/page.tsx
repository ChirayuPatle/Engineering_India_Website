import { db } from "@/database/db";
import { event, registration, formSubmission, user } from "@/database/schema";
import { sql } from "drizzle-orm";
import { Calendar, Users, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
  try {
    // Get total events
    const totalEvents = await db
      .select({ count: sql<number>`count(*)` })
      .from(event);

    // Get total registrations
    const totalRegistrations = await db
      .select({ count: sql<number>`count(*)` })
      .from(registration);

    // Get total form submissions
    const totalSubmissions = await db
      .select({ count: sql<number>`count(*)` })
      .from(formSubmission);

    // Get total users
    const totalUsers = await db
      .select({ count: sql<number>`count(*)` })
      .from(user);

    return {
      totalEvents: totalEvents[0]?.count ?? 0,
      totalRegistrations: totalRegistrations[0]?.count ?? 0,
      totalSubmissions: totalSubmissions[0]?.count ?? 0,
      totalUsers: totalUsers[0]?.count ?? 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalEvents: 0,
      totalRegistrations: 0,
      totalSubmissions: 0,
      totalUsers: 0,
    };
  }
}

async function getRecentEvents() {
  try {
    return await db
      .select()
      .from(event)
      .orderBy(sql`${event.createdAt} DESC`)
      .limit(5);
  } catch (error) {
    console.error("Error fetching recent events:", error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const recentEvents = await getRecentEvents();

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "bg-blue-500",
      href: "/admin/dashboard/events",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/dashboard/users",
    },
    {
      title: "Registrations",
      value: stats.totalRegistrations,
      icon: FileText,
      color: "bg-purple-500",
      href: "/admin/dashboard/registrations",
    },
    {
      title: "Form Submissions",
      value: stats.totalSubmissions,
      icon: TrendingUp,
      color: "bg-orange-500",
      href: "/admin/dashboard/forms",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600 group-hover:text-blue-600">
              View all
              <svg
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Events */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Events
            </h2>
            <Link
              href="/admin/dashboard/events"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentEvents.length > 0 ? (
            recentEvents.map((evt) => (
              <div
                key={evt.id}
                className="px-6 py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{evt.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {evt.startDate
                        ? new Date(evt.startDate).toLocaleDateString("en-GB")
                        : "N/A"}{" "}
                      -{" "}
                      {evt.endDate
                        ? new Date(evt.endDate).toLocaleDateString("en-GB")
                        : "N/A"}
                    </p>
                  </div>
                  <Link
                    href={`/admin/dashboard/events/${evt.id}`}
                    className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No events yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first event.
              </p>
              <div className="mt-6">
                <Link
                  href="/admin/dashboard/events/new"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create Event
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/dashboard/events/new"
          className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50"
        >
          <Calendar className="mx-auto h-8 w-8 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Create New Event
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start organizing a new event
          </p>
        </Link>

        <Link
          href="/admin/dashboard/forms/new"
          className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-green-500 hover:bg-green-50"
        >
          <FileText className="mx-auto h-8 w-8 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Create New Form
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Build a custom registration form
          </p>
        </Link>

        <Link
          href="/admin/dashboard/analytics"
          className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-purple-500 hover:bg-purple-50"
        >
          <TrendingUp className="mx-auto h-8 w-8 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            View Analytics
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check your platform statistics
          </p>
        </Link>
      </div>
    </div>
  );
}
