import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { ContentTask, Content, ButtonCompleted, ButtonDelete, IconDelete } from "./styled";

import IconCompleted from "../IconCompleted";

import { showAlertBox } from "../../utils/showAlertBox";

import { UpdateTask, DeleteTask } from "../../slices/taskSlice";

const Task = ({ id_task, content, completed }) => {
  const [data, setData] = useState({ id_task, content, completed });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contentValue, setContentValue] = useState(data.content);
  const dispatch = useDispatch();
  const textArea = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    textArea.current.style.height = "auto";
    const currentHeight = textArea.current.scrollHeight;
    textArea.current.style.height = currentHeight + "px";
  }, [contentValue, windowWidth]);

  const handleCompleted = () => {
    const newData = { ...data, completed: !data.completed }
    setData(newData);
    dispatch(UpdateTask(newData));
  }

  const handleEdit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      const newData = { ...data, content: contentValue }
      setData(newData);

      dispatch(UpdateTask(newData));
    }
  }

  const handleDelete = () => {
    const body = { id_task: data.id_task }

    showAlertBox({
      title: "Deletar Tarefa",
      message: "Você tem certeza que deseja excluir essa tarefa?",
      onConfim: {
        msg: "Excluir",
        action: () => dispatch(DeleteTask(body))
      },
      onCancel: {
        msg: "Não"
      }
    });
  }

  return (
    <ContentTask>
      <ButtonCompleted onClick={handleCompleted}>
        <IconCompleted completed={data.completed} />
      </ButtonCompleted>
      <Content
        ref={textArea}
        disabled={data.completed}
        value={contentValue}
        className={data.completed && "completed"}
        onChange={e => setContentValue(e.target.value)}
        onKeyDown={handleEdit}
        rows="1"
      />
      <ButtonDelete>
        <IconDelete onClick={handleDelete} />
      </ButtonDelete>
    </ContentTask>
  );
}

export default Task;
