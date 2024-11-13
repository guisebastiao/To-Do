import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TaskProvider } from "./context/TaskContext";

import { router } from "./routes";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </TaskProvider>
  </StrictMode>
);
