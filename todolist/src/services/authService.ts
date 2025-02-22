import { axiosInstance } from "@/utils/axios";
import { LoginData, RegisterData } from "@/schemas/authSchema";
import { Response } from "@/utils/apiClient";
import { toast } from "sonner";

export const Login = async (data: LoginData): Promise<Response | undefined> => {
  try {
    const response = await axiosInstance.post<Response>("/login", data);
    toast(response.data.message);
    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};

export const Register = async (
  data: RegisterData
): Promise<Response | undefined> => {
  try {
    const response = await axiosInstance.post<Response>("/register", data);
    toast(response.data.message);
    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};

export const Logout = async (): Promise<Response | undefined> => {
  try {
    const response = await axiosInstance.post<Response>("/logout");
    toast(response.data.message);
    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};
