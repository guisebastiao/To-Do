import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const tasksStorage = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(tasksStorage ? JSON.parse(tasksStorage) : []);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const createTask = (task) => {
    setTasks((state) => [...state, task]);
  };

  const removeTask = ({ taskId }) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const completeTask = ({ taskId }) => {
    setTasks((state) => state.map((task) => (task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return <TaskContext.Provider value={{ tasks, createTask, removeTask, completeTask }}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);
