import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "@/modules/Task/taskService";
import { ServerError, FieldErrors } from "@/utils/ServerErrorHandler";
import { ZodError } from "zod";
import {
  CreateTaskData,
  createTaskSchema,
  UpdateTaskData,
  updateTaskSchema,
  TaskFindQuery,
  taskFindSchema,
} from "@/modules/Task/taskSchema";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(
    request: FastifyRequest<{ Body: CreateTaskData }>,
    reply: FastifyReply
  ) {
    try {
      const parsed = createTaskSchema.safeParse(request.body);
      const { id } = request.user;

      if (!parsed.success) {
        const errors: ZodError = parsed.error;

        const error: FieldErrors = {
          fieldErrors: errors.errors.map((err) => ({
            field: err.path.join("."),
            error: err.message,
          })),
        };

        throw new ServerError(422, "Erro de validação", error.fieldErrors);
      }

      await this.taskService.createTask(id, request.body);

      return reply
        .status(201)
        .send({ status: 201, message: "Tarefa criada com sucesso" });
    } catch (error) {
      if (error instanceof ServerError) {
        return reply.status(error.status).send(error.getResponse());
      }

      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }

  async findAll(
    request: FastifyRequest<{ Querystring: TaskFindQuery }>,
    reply: FastifyReply
  ) {
    try {
      const query = taskFindSchema.parse(request.query);
      const { id } = request.user;

      const tasks = await this.taskService.findAll(id, query);

      reply.status(200).send(tasks);
    } catch (error) {
      if (error instanceof ServerError) {
        return reply.status(error.status).send(error.getResponse());
      }

      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }

  async updateTask(
    request: FastifyRequest<{
      Body: UpdateTaskData;
      Params: { taskId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const parsed = updateTaskSchema.safeParse(request.body);
      const { taskId } = request.params;
      const { id } = request.user;

      if (!parsed.success) {
        const errors: ZodError = parsed.error;

        const error: FieldErrors = {
          fieldErrors: errors.errors.map((err) => ({
            field: err.path.join("."),
            error: err.message,
          })),
        };

        throw new ServerError(422, "Erro de validação", error.fieldErrors);
      }

      await this.taskService.updateTask(id, taskId, request.body);

      return reply.status(200).send({
        status: 201,
        message: "Sua tarefa foi atualizada com sucesso",
      });
    } catch (error) {
      if (error instanceof ServerError) {
        return reply.status(error.status).send(error.getResponse());
      }

      console.log(error);

      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }

  async deleteTask(
    request: FastifyRequest<{ Params: { taskId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { taskId } = request.params;
      const { id } = request.user;

      await this.taskService.deleteTask(id, taskId);

      return reply.status(200).send({
        status: 200,
        message: "Sua tarefa foi deletada com sucesso",
      });
    } catch (error) {
      if (error instanceof ServerError) {
        return reply.status(error.status).send(error.getResponse());
      }

      return reply.status(500).send({
        status: 500,
        message: "Algo deu errado, tente novamente mais tarde",
      });
    }
  }
}
