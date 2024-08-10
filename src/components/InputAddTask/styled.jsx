import styled from "styled-components";
import * as colors from "../../utils/colors";

import { FaPlus } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

export const ContentInput = styled.form`
  max-width: 800px;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${colors.darkThirdNormal};
  border-radius: 5px;
  padding: 0 10px;
  gap: 5px;
`;

export const Icon = styled(FaPlus)`
  font-size: 20px;
  color: ${colors.colorPrimaryNormal};
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 15px;
  color: ${colors.whitePrimaryNormal};
  font-weight: 400;

  &::placeholder {
    color: ${colors.grayNormal};
  }
`;

export const ContentIconLogout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconLogout = styled(BiLogOut)`
  font-size: 28px;
  color: ${colors.colorErrorNormal};
  cursor: pointer;
`;
