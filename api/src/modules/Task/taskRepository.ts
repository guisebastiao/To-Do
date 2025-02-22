import { CreateTaskData, UpdateTaskData } from "@/modules/Task/taskSchema";
import { TaskFindQuery } from "@/modules/Task/taskSchema";
import { prisma } from "@/utils/prisma";

export class TaskRepository {
  async createTask(userId: string, data: CreateTaskData) {
    return prisma.task.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async findById(taskId: string) {
    return prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        id: true,
        userId: true,
        description: true,
        complete: true,
        createdAt: true,
      },
    });
  }

  async findAll(userId: string, queries: TaskFindQuery) {
    return prisma.task.findMany({
      where: {
        userId,
        description: {
          contains: queries.description || undefined,
        },
        complete: queries.complete || undefined,
      },
      select: {
        id: true,
        description: true,
        complete: true,
        createdAt: true,
      },
      orderBy: [
        {
          complete: "asc",
        },
        {
          createdAt: "desc",
        },
        {
          id: "asc",
        },
      ],
      skip: (queries.offset - 1) * queries.limit,
      take: queries.limit,
    });
  }

  async updateTask(taskId: string, data: UpdateTaskData) {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
  }

  async deleteTask(taskId: string) {
    return prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async countTasks(userId: string, queries: TaskFindQuery) {
    return prisma.task.count({
      where: {
        userId,
        description: {
          contains: queries.description || undefined,
        },
        complete: queries.complete,
      },
    });
  }
}
