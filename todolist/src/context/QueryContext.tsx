import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/apiClient";
import { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
