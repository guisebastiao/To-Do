import { TaskRepository } from "@/modules/Task/taskRepository";
import {
  CreateTaskData,
  UpdateTaskData,
  TaskFindQuery,
} from "@/modules/Task/taskSchema";
import { ServerError } from "@/utils/ServerErrorHandler";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(userId: string, data: CreateTaskData) {
    return await this.taskRepository.createTask(userId, data);
  }

  async findAll(userId: string, queries: TaskFindQuery) {
    const totalTasks = await this.taskRepository.countTasks(userId, queries);

    const tasks = await this.taskRepository.findAll(userId, queries);

    const lastPage = Math.ceil(totalTasks / queries.limit);

    const paging = {
      offset: queries.offset,
      prev: queries.offset > 1 ? queries.offset - 1 : null,
      next: queries.offset < lastPage ? queries.offset + 1 : null,
      lastPage,
    };

    return { paging, tasks };
  }

  async updateTask(userId: string, taskId: string, data: UpdateTaskData) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ServerError(400, "Essa tarefa não existe");
    }

    if (task.userId !== userId) {
      throw new ServerError(
        401,
        "Você não tem permissão de editar essa tarefa"
      );
    }

    return await this.taskRepository.updateTask(taskId, data);
  }

  async deleteTask(userId: string, taskId: string) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ServerError(
        400,
        "Essa tarefa não existe, talvez já esteja delatada"
      );
    }

    if (task.userId !== userId) {
      throw new ServerError(
        401,
        "Você não tem permissão de excluir essa tarefa"
      );
    }

    return await this.taskRepository.deleteTask(taskId);
  }
}
