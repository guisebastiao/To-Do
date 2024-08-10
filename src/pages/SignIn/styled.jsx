import styled from "styled-components";
import * as colors from "../../utils/colors";

import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

export const ContentSignIn = styled.form`
  max-width: 420px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${colors.darkSecondaryNormal};
  border-radius: 5px;
  padding: 80px 40px;
  gap: 60px;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 32px;
  font-weight: 1000;
  color: ${colors.whitePrimaryNormal};
  text-transform: capitalize;
  text-align: left;
`;

export const Separator = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;

export const IconEmail = styled(MdOutlineMail)`
  font-size: 20px;
  color: ${colors.grayNormal};
`;

export const IconPassword = styled(FiLock)`
  font-size: 20px;
  color: ${colors.grayNormal};
`;

export const InputContent = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${colors.grayNormal};
  padding: 0 10px;
  gap: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 15px;
  color: ${colors.whitePrimaryNormal};

  &::placeholder {
    color: ${colors.grayNormal};
  }
`;

export const Button = styled.button`
  max-width: 150px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${colors.whitePrimaryNormal};
  background: ${colors.colorButtonNormal};
  transition: all 300ms;
  border-radius: 5px;

  &:hover {
    background: ${colors.colorButtonHover};
  }
`;

export const Link = styled.span`
 font-size: 15px;
  color: ${colors.grayNormal};
  transition: all 300ms;
  user-select: none;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: ${colors.whitePrimaryNormal};
    text-decoration: underline;
  }
`;
