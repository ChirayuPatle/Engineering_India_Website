// app/dashboard/page.tsx

export default async function DashboardPage() {
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* <p className="mt-4">Welcome, {session.user.name}!</p>
      <pre className="mt-4 rounded bg-gray-100 p-4">
        {JSON.stringify(session, null, 2)}
      </pre> */}
    </div>
  );
}
