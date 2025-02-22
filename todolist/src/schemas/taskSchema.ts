import { z } from "zod";

export const createTaskSchema = z.object({
  description: z
    .string()
    .min(1, "A descrição da tarefa é necessária")
    .max(300, "A descrição tem que possuir menos caracteres, no máximo 300"),
});

export const updateTaskSchema = z.object({
  description: z
    .string()
    .max(300, "A descrição tem que possuir menos caracteres, no máximo 300"),
  complete: z.boolean().optional(),
});

export type CreateTaskData = z.infer<typeof createTaskSchema>;
export type UpdateTaskData = z.infer<typeof updateTaskSchema>;

export interface TaskQueries {
  description?: string | null;
  complete?: string | null;
  offset: number;
  limit: number;
}
