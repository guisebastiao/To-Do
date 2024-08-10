import { api, requestConfig } from "../hooks/useFetch";
import { toast } from "react-toastify";

const Insert = async (body) => {
  const config = requestConfig("POST", body);

  try {
    const response = await fetch(api + "task", config);

    if (response.status === 440) {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.reload();
      return;
    }

    const data = await response.json();

    if (data.errors) {
      toast.error(data.errors[0]);
    }

    return data;
  } catch (err) {
    toast.error("Algo deu errado, tente novamente mais tarde.");
  }
}

const Select = async (body) => {
  const config = requestConfig("GET");

  try {
    const response = await fetch(api + `task/?search=${body}`, config);

    if (response.status === 440) {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.reload();
      return;
    }

    const data = await response.json();

    if (data.errors) {
      toast.error(data.errors[0]);
    }

    return data;
  } catch (err) {
    toast.error("Algo deu errado, tente novamente mais tarde.");
  }
}

const Update = async (body) => {
  const config = requestConfig("PUT", body);

  try {
    const response = await fetch(api + "task", config);

    if (response.status === 440) {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.reload();
      return;
    }

    const data = await response.json();

    if (data.errors) {
      toast.error(data.errors[0]);
    }

    return data;
  } catch (err) {
    toast.error("Algo deu errado, tente novamente mais tarde.");
  }
}

const Delete = async (body) => {
  const config = requestConfig("DELETE", body);

  try {
    const response = await fetch(api + "task", config);

    if (response.status === 440) {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.reload();
      return;
    }

    const data = await response.json();

    if (data.errors) {
      toast.error(data.errors[0]);
    }

    return data;
  } catch (err) {
    toast.error("Algo deu errado, tente novamente mais tarde.");
  }
}

const taskService = {
  Insert,
  Select,
  Update,
  Delete
}

export default taskService;
