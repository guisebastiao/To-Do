import { useState } from "react";
import { useDispatch } from "react-redux";

import { ContentInput, Input, IconSearch, IconClear } from "./styled";

import { SelectTask } from "../../slices/taskSlice"

const InputSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchValue.trim() === "") {
      return;
    }

    dispatch(SelectTask(searchValue));
    setSearched(true);
  }

  const handleClear = () => {
    setSearched(false);
    setSearchValue("");
    dispatch(SelectTask(""));
  }

  return (
    <ContentInput onSubmit={handleSearch}>
      <IconSearch />
      <Input
        type="text"
        placeholder="Pesquisar Tarefa"
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {searched && <IconClear onClick={handleClear} />}
    </ContentInput>
  );
}

export default InputSearch;
