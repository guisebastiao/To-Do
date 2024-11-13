import { createBrowserRouter } from "react-router-dom";

import { Todo } from "./pages/Todo";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Todo />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
