import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import GlobalStyles, { Container } from "./styles/globalStyles";

import { useAuth } from "./hooks/useAuth";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

function App() {
  const { auth } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={!auth ? <SignIn /> : <Todo />} />
            <Route path="/signin" element={auth ? <Todo /> : <SignIn />} />
            <Route path="/signup" element={auth ? <Todo /> : <SignUp />} />
          </Routes>
        </Container>
        <GlobalStyles />
      </BrowserRouter>
      <ToastContainer theme="dark" autoClose={3000} closeOnClick={true} />
    </div>
  );
}

export default App;
