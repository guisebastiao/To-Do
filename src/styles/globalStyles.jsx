import styled, { createGlobalStyle } from "styled-components";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import * as colors from "../utils/colors";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-family: "Inter", sans-serif;
  }

  body {
    height: 100dvh;
    background: ${colors.themePrimaryNormal};
  }

  #root {
    width: 100%;
    height: 100%;
  }

  .App {
    min-width: 200px;
    width: 100%;
    height: 100%;
  }

  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  button {
    cursor: pointer;
    background: transparent;
  }

  input {
    background: transparent;
  }

  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .react-confirm-alert-body {
    background: ${colors.themePrimaryNormal} !important;
    color: ${colors.whitePrimaryNormal} !important;
    font-size: 14px;
  }

  .react-confirm-alert-body h1 {
    margin: 0 0 10px 0;
  }

  .react-confirm-alert-body button {
    font-size: 15px !important;
  }

  .react-confirm-alert-body button:nth-child(1) {
    background: ${colors.colorErrorNormal};
  }
`;

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
