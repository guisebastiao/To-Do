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

export const taskFindSchema = z.object({
  description: z.string().optional().default(""),
  complete: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) {
        return undefined;
      }

      return val.toLowerCase() === "true" ? true : false;
    }),
  offset: z
    .string()
    .optional()
    .transform((val) => {
      const parsed = Number(val);
      const value = isNaN(parsed) ? 1 : parsed;

      if (value === 0) {
        return 1;
      }

      return value;
    })
    .default("1"),
  limit: z
    .string()
    .optional()
    .transform((val) => {
      const parsed = Number(val);
      return isNaN(parsed) ? 20 : parsed;
    })
    .default("20"),
});

export type CreateTaskData = z.infer<typeof createTaskSchema>;
export type UpdateTaskData = z.infer<typeof updateTaskSchema>;
export type TaskFindQuery = z.infer<typeof taskFindSchema>;
