import { CircleX } from "lucide-react";

import { ButtonCheck } from "./ButtonCheck";

import { useTaskContext } from "@/context/TaskContext";

export const Task = ({ id, content, isCompleted }) => {
  const { removeTask } = useTaskContext();

  const handleDelete = () => {
    removeTask({ taskId: id });
  };

  return (
    <div className="w-full min-h-14 flex items-center rounded-lg bg-zinc-900 border border-zinc-800 px-2 gap-1">
      <ButtonCheck value={isCompleted} id={id} />
      {isCompleted ? <p className="w-full text-sm line-through text-zinc-500">{content}</p> : <p className="w-full text-sm text-zinc-300">{content}</p>}
      <button className="p-1">
        <CircleX className="text-zinc-300" onClick={handleDelete} />
      </button>
    </div>
  );
};
