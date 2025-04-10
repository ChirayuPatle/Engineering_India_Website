import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name?: string;
  email?: string;
}

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await fetch("/api/user/current");
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();
      return data as User;
    },
  });
};
