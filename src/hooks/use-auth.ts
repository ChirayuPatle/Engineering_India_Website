// "use client";

// import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";

// export function useAuth() {
//   const { data: session, status } = useSession();

//   return {
//     user: session?.user,
//     isAuthenticated: status === "authenticated",
//     isLoading: status === "loading",
//   };
// }

// export function useUserData() {
//   const { user, isAuthenticated } = useAuth();

//   return useQuery({
//     queryKey: ["user", user?.id],
//     queryFn: async () => {
//       if (!user?.id) return null;
//       const response = await fetch(`/api/user/${user.id}`);
//       if (!response.ok) throw new Error("Failed to fetch user data");
//       return response.json();
//     },
//     enabled: !!user?.id && isAuthenticated,
//   });
// }
