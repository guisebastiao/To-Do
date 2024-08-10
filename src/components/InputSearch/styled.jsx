import styled from "styled-components";
import * as colors from "../../utils/colors";

import { IoSearch } from "react-icons/io5";
import { FaRegTimesCircle } from "react-icons/fa";

export const ContentInput = styled.form`
  max-width: 800px;
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${colors.darkThirdNormal};
  padding: 0 8px;
  gap: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  color: ${colors.whitePrimaryNormal};
  font-weight: 400;
  font-size: 15px;

  &::placeholder {
    color: ${colors.grayNormal};
  }
`;

export const IconSearch = styled(IoSearch)`
  font-size: 20px;
  color: ${colors.grayNormal};
`;

export const IconClear = styled(FaRegTimesCircle)`
  font-size: 20px;
  color: ${colors.whitePrimaryNormal};
  cursor: pointer;
`;
