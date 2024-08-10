import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ContentTodo, ContentTasks } from "./styled";

import { SelectTask } from "../../slices/taskSlice";

import InputSearch from "../../components/InputSearch";
import InputAddTask from "../../components/InputAddTask";
import Task from "../../components/Task";
import Loading from "../../components/Loading"

const Todo = () => {
  const { tasks, loadingTask } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SelectTask(""));
  }, [dispatch]);

  return (
    <ContentTodo>
      <InputSearch />
      <ContentTasks style={loadingTask ? { justifyContent: "center" } : { justifyContent: "flex-start" }}>
        {loadingTask && <Loading size={60} />}
        {!loadingTask && tasks !== null && (
          tasks.map(task => (
            <Task key={task.id_task} id_task={task.id_task} content={task.content} completed={task.completed} />
          ))
        )}
      </ContentTasks>
      <InputAddTask />
    </ContentTodo>
  );
}

export default Todo;
