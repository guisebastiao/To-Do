import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

import { updateTask } from "@/hooks/useTask";

import { ButtonCheck } from "@/components/ButtonCheck";
import { ManegeTasks } from "@/components/ManageTasks";

interface TaskProps {
  id: string;
  description: string;
  complete: boolean;
}

export const Task = ({ id, description, complete }: TaskProps) => {
  const { mutate } = updateTask();

  const handleCompleteTask = () => {
    mutate({ taskId: id, description, complete: !complete });
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={twMerge(
        "w-full min-h-11 flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 gap-2 px-3 border",
        complete && "bg-zinc-200 text-zinc-500"
      )}
    >
      <ButtonCheck
        key={id}
        isComplete={complete}
        onClick={handleCompleteTask}
      />
      {complete ? (
        <p className="block w-full line-through text-[15px]">{description}</p>
      ) : (
        <p className="block w-full text-[15px]">{description}</p>
      )}
      <ManegeTasks
        taskId={id}
        description={description}
        complete={complete}
      />
    </motion.div>
  );
};
