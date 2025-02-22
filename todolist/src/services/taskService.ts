import { axiosInstance } from "@/utils/axios";
import { Response } from "@/utils/apiClient";
import { toast } from "sonner";
import {
  TaskQueries,
  CreateTaskData,
  UpdateTaskData,
} from "@/schemas/taskSchema";

export interface TaskData {
  paging: {
    offset: number;
    prev: number | null;
    next: number | null;
    lastPage: number;
  };
  tasks: {
    id: string;
    description: string;
    complete: boolean;
    createdAt: string;
  }[];
}

export const CreateTask = async (
  data: CreateTaskData
): Promise<Response | undefined> => {
  try {
    const response = await axiosInstance.post("/tasks", data);
    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};

export const FindAll = async (queries: TaskQueries): Promise<TaskData> => {
  try {
    const response = await axiosInstance.get("/tasks", {
      params: {
        description: queries.description,
        complete: queries.complete,
        offset: queries.offset,
        limit: queries.limit,
      },
    });

    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};

export const UpdateTask = async (
  taskId: string,
  data: UpdateTaskData
): Promise<Response | undefined> => {
  try {
    const response = await axiosInstance.put("/tasks/" + taskId, data);
    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};

export const DeleteTask = async (
  taskId: string
): Promise<Response | undefined> => {
  try {
    const response = await axiosInstance.delete("/tasks/" + taskId);
    return response.data;
  } catch (err: any) {
    const error = err?.response?.data as Response;
    toast.error(error.message);
    throw error;
  }
};
