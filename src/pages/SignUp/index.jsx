import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { ContentSignUp, Title, Separator, IconEmail, IconPassword, InputContent, Input, Button, Link } from "./styled";

import { Register } from "../../slices/authSlice";

import Loading from "../../components/Loading";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loadingAuth } = useSelector(state => state.auth);

  const handleSignUp = (event) => {
    event.preventDefault();

    const data = {
      email: emailValue,
      pass: passwordValue,
    }

    dispatch(Register(data));
    setEmailValue("");
    setPasswordValue("");
  }

  return (
    <ContentSignUp onSubmit={handleSignUp}>
      <Title>Cadastrar</Title>
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
          <span>Cadastrar</span>
        )}
      </Button>
      <Link onClick={() => navigate("/signin")}>Tenho uma conta, entre agora.</Link>
    </ContentSignUp>
  );
}

export default SignUp;
