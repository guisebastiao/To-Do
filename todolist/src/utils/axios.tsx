import { useEffect, ReactNode } from "react";
import { useContextAuth } from "@/context/AuthContext";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true,
});

interface AxiosInterceptorProps {
  children: ReactNode;
}

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const { checkAuthStatus } = useContextAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        checkAuthStatus();
        return response;
      },
      (error) => {
        checkAuthStatus();
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [checkAuthStatus]);

  return <>{children}</>;
};
