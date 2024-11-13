import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CirclePlus } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useTaskContext } from "@/context/TaskContext";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const { createTask } = useTaskContext();

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }

    const task = {
      id: uuidv4(),
      content: inputValue,
      isCompleted: false,
    };

    createTask(task);
    setInputValue("");
  };

  return (
    <header className="fixed top-0 max-w-xl w-full p-6 bg-zinc-950 z-50">
      <form onSubmit={handleCreateTask} className="flex items-center justify-center gap-5">
        <label htmlFor="task" className="w-full">
          <Input
            type="text"
            id="task"
            placeholder="Adicionar tarefa..."
            autoComplete="off"
            maxLength={255}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </label>
        <Button type="submit" className="w-9 h-9">
          <CirclePlus />
        </Button>
      </form>
    </header>
  );
};
