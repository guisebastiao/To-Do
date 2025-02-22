import { FastifyInstance } from "fastify";
import { TaskController } from "@/modules/Task/taskController";

export const taskRoutes = (app: FastifyInstance) => {
  const taskController = new TaskController();

  app.post(
    "/tasks",
    {
      preHandler: [app.authenticate],
    },
    taskController.createTask.bind(taskController)
  );

  app.get(
    "/tasks",
    {
      preHandler: [app.authenticate],
    },
    taskController.findAll.bind(taskController)
  );

  app.put(
    "/tasks/:taskId",
    {
      preHandler: [app.authenticate],
    },
    taskController.updateTask.bind(taskController)
  );

  app.delete(
    "/tasks/:taskId",
    {
      preHandler: [app.authenticate],
    },
    taskController.deleteTask.bind(taskController)
  );
};
