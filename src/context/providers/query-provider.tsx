"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
