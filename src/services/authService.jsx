import { api, requestConfig } from "../hooks/useFetch";
import { toast } from "react-toastify";

const Register = async (body) => {
  const config = requestConfig("POST", body);

  try {
    const response = await fetch(api + "user", config);

    if (response.status === 440) {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.reload();
      return;
    }

    const data = await response.json();

    if (data.errors) {
      toast.error(data.errors[0]);
    }

    if (response.ok) {
      toast.success("Usuário criado com sucesso, faça seu login.");
    }

    return data;
  } catch (err) {
    toast.error("Algo deu errado, tente novamente mais tarde.");
  }
}

const Login = async (body) => {
  const config = requestConfig("POST", body);

  try {
    const response = await fetch(api + "login", config);

    if (response.status === 440) {
      localStorage.setItem("user", JSON.stringify(null));
      window.location.reload();
      return;
    }

    const data = await response.json();

    if (data.errors) {
      toast.error(data.errors[0]);
    }

    if (response.ok) {
      toast.success("Login bem sucedido");
    }

    return data;
  } catch (err) {
    toast.error("Algo deu errado, tente novamente mais tarde.");
  }
}

const authService = {
  Register,
  Login,
}

export default authService;
