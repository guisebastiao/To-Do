import { useState, useEffect } from "react";
import { CircleCheck, Circle } from "lucide-react";

import { useTaskContext } from "@/context/TaskContext";

export const ButtonCheck = ({ value, id }) => {
  const [check, setCheck] = useState(value);
  const { completeTask } = useTaskContext();

  const handleComplete = () => {
    setCheck((state) => !state);
    completeTask({ taskId: id });
  };

  return (
    <button onClick={handleComplete} className="relative w-9 h-9 flex items-center justify-center rounded-lg">
      <Circle className={`absolute transition-opacity duration-300 ease-in-out ${check ? "opacity-0" : "opacity-100"}`} />
      <CircleCheck className={`absolute transition-opacity duration-300 ease-in-out text-emerald-500 ${check ? "opacity-100" : "opacity-0"}`} />
    </button>
  );
};
