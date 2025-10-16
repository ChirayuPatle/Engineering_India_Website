import { db } from "@/database/db";
import { event, registration, formSubmission, user } from "@/database/schema";
import { count } from "drizzle-orm";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

async function getAnalytics() {
  try {
    const [totalEvents] = await db.select({ count: count() }).from(event);
    const [totalRegistrations] = await db.select({ count: count() }).from(registration);
    const [totalSubmissions] = await db.select({ count: count() }).from(formSubmission);
    const [totalUsers] = await db.select({ count: count() }).from(user);

    return {
      totalEvents: totalEvents?.count || 0,
      totalRegistrations: totalRegistrations?.count || 0,
      totalSubmissions: totalSubmissions?.count || 0,
      totalUsers: totalUsers?.count || 0,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalEvents: 0,
      totalRegistrations: 0,
      totalSubmissions: 0,
      totalUsers: 0,
    };
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  const stats = [
    {
      title: "Total Events",
      value: analytics.totalEvents,
      icon: Calendar,
      color: "bg-blue-500",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      color: "bg-green-500",
      change: "+23%",
      trend: "up",
    },
    {
      title: "Total Registrations",
      value: analytics.totalRegistrations,
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+18%",
      trend: "up",
    },
    {
      title: "Form Submissions",
      value: analytics.totalSubmissions,
      icon: BarChart3,
      color: "bg-orange-500",
      change: "+15%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Track your platform's performance and metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-2 flex items-center text-sm">
                  <span className="text-green-600 font-medium">{stat.change}</span>
                  <span className="ml-2 text-gray-500">vs last month</span>
                </p>
              </div>
              <div className={`rounded-lg ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Event Registrations Over Time
          </h2>
          <div className="flex h-64 items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            User Growth
          </h2>
          <div className="flex h-64 items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Activity {i}
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
