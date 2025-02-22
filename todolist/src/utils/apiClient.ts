import { QueryClient } from "@tanstack/react-query";

export interface FieldError {
  error: string;
  field: string;
}

export interface FieldErrors {
  fieldErrors: FieldError[];
}

export interface Response {
  status: number;
  message: string;
  fieldErrors?: FieldError[];
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});
