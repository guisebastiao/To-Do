import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { CreateTaskData, UpdateTaskData } from "@/schemas/taskSchema";
import { queryClient } from "@/utils/apiClient";

import {
  CreateTask,
  FindAll,
  UpdateTask,
  DeleteTask,
} from "@/services/taskService";

export const createTask = () => {
  return useMutation({
    mutationFn: (data: CreateTaskData) => {
      return CreateTask(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const findAll = () => {
  const [searchParams] = useSearchParams();

  const description = searchParams.get("description");
  const complete = searchParams.get("complete");

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return FindAll({ offset: pageParam, limit: 20, description, complete });
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.paging.next;
    },
    queryKey: ["tasks", description, complete],
    initialPageParam: 0,
  });
};

export const updateTask = () => {
  return useMutation({
    mutationFn: ({ taskId, ...data }: { taskId: string } & UpdateTaskData) => {
      return UpdateTask(taskId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const deleteTask = () => {
  return useMutation({
    mutationFn: (taskId: string) => {
      return DeleteTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
