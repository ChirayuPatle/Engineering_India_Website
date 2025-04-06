// import { authClient } from "@/lib/auth-client";
// import { useQuery } from "@tanstack/react-query";

// const fetchUserSession = async () => {
//   const { data } = authClient.useSession();
//   if (!data?.session) {
//     throw new Error("User not authenticated");
//   }
//   return data.session;
// };

// export function useAuth() {
//   return useQuery({
//     queryKey: ["userSession"],
//     queryFn: fetchUserSession,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// }
