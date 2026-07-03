import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

const fetchUserSession = async () => {
  const { data } = authClient.useSession();
  if (!data?.session) {
    // Return a default structure for unauthenticated users
    return { user: null, status: "unauthenticated" };
  }
  return { user: data.session, status: "authenticated" };
};

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userSession"],
    queryFn: fetchUserSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Handle loading, error, and unauthenticated states
  if (isLoading) return { user: null, status: "loading" };
  if (isError) return { user: null, status: "unauthenticated" }; // Treat error as unauthenticated
  if (!data?.user) return { user: null, status: "unauthenticated" };

  return { user: data.user, status: data.status };
}
