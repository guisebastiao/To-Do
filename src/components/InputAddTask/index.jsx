import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { ContentInput, Icon, Input, IconLogout, ContentIconLogout } from "./styled";

import { InsertTask } from "../../slices/taskSlice"
import Loading from "../Loading";

import { showAlertBox } from "../../utils/showAlertBox";

const InputAddTask = () => {
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();

  const { loadingTask } = useSelector(state => state.tasks)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { content: valueInput }
    dispatch(InsertTask(data));
    setValueInput("");
  }

  const handleLogout = () => {
    showAlertBox({
      title: "Sair",
      message: "Você tem certeza que deseja sair?",
      onConfim: {
        msg: "Sair",
        action: () => {
          localStorage.setItem("user", JSON.stringify(null))
          window.location.reload();
        }
      },
      onCancel: {
        msg: "Não"
      }
    });
  }

  return (
    <ContentInput onSubmit={handleSubmit}>
      <Icon />
      {loadingTask ? (
        <ContentIconLogout>
          <Loading size={30} />
        </ContentIconLogout>
      ) : (
        <Input
          type="text"
          placeholder="Adicionar Tarefa"
          onChange={e => setValueInput(e.target.value)}
          value={valueInput}
        />
      )}
      <IconLogout onClick={handleLogout} />
    </ContentInput>
  );
}

export default InputAddTask;
