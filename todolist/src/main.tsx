import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";

import "@/global.css";

import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/context/QueryContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AxiosInterceptor } from "./utils/axios";
import { router } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <AxiosInterceptor>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </AxiosInterceptor>
    </QueryProvider>
  </AuthProvider>
);
