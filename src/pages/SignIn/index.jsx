import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { ContentSignIn, Title, Separator, IconEmail, IconPassword, InputContent, Input, Button, Link } from "./styled";

import { Login } from "../../slices/authSlice";

import Loading from "../../components/Loading";

const SignIn = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loadingAuth } = useSelector(state => state.auth);

  const handleSignIn = (event) => {
    event.preventDefault();

    const data = {
      email: emailValue,
      pass: passwordValue,
    }

    dispatch(Login(data));
    setEmailValue("");
    setPasswordValue("");
  }

  return (
    <ContentSignIn onSubmit={handleSignIn}>
      <Title>Entrar</Title>
      <Separator>
        <InputContent>
          <IconEmail />
          <Input
            type="email"
            placeholder="E-mail"
            autoComplete="off"
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
          />
        </InputContent>
        <InputContent>
          <IconPassword />
          <Input
            type="password"
            autoComplete="off"
            placeholder="Senha"
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
          />
        </InputContent>
      </Separator>
      <Button type="submit">
        {loadingAuth ? (
          <Loading size={30} />
        ) : (
          <span>Entrar</span>
        )}
      </Button>
      <Link onClick={() => navigate("/signup")}>Não tenho uma conta, crie uma agora.</Link>
    </ContentSignIn>
  );
}

export default SignIn;
