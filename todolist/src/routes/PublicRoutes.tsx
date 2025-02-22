import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";

export const PublicRoutes = () => {
  const { isAuthenticated } = useContextAuth();

  return !isAuthenticated ? (
    <main className="w-screen h-screen bg-zinc-50 dark:bg-zinc-950 flex justify-center items-center px-4">
      <Outlet />
    </main>
  ) : (
    <Navigate to="/" />
  );
};
