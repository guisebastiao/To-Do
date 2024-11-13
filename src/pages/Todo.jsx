import { TriangleAlert } from "lucide-react";

import { Header } from "@/components/Header";
import { Task } from "@/components/Task";

import { useTaskContext } from "@/context/TaskContext";

export const Todo = () => {
  const { tasks } = useTaskContext();

  const pendingTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <main className="max-w-xl min-h-screen w-full">
      <Header />
      <section className="w-full h-task-content px-6 py-2 flex flex-col items-center justify-start overflow-y-scroll mt-[84px] gap-2">
        {tasks.length === 0 ? (
          <div className="flex items-center gap-2 text-zinc-300">
            <TriangleAlert className="w-5" />
            <span>Você não possui nenhuma tarefa.</span>
          </div>
        ) : (
          <>
            {pendingTasks.length > 0 && <h1 className="w-full font-medium text-zinc-200">Tarefas Pendentes</h1>}
            {pendingTasks.map(({ id, content, isCompleted }) => (
              <Task key={id} id={id} content={content} isCompleted={isCompleted} />
            ))}

            {completedTasks.length > 0 && <h1 className="w-full font-medium text-zinc-200">Tarefas Concluídas</h1>}
            {completedTasks.map(({ id, content, isCompleted }) => (
              <Task key={id} id={id} content={content} isCompleted={isCompleted} />
            ))}
          </>
        )}
      </section>
    </main>
  );
};
