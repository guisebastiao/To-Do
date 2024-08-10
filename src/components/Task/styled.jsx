import styled from "styled-components";
import * as colors from "../../utils/colors";

import { MdDelete } from "react-icons/md";

export const ContentTask = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.darkPrimaryNormal};
  border-radius: 5px;
  padding: 15px 15px;
  gap: 10px;
`;

export const Content = styled.textarea`
  width: 100%;
  color: ${colors.whitePrimaryNormal};
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  resize: none;

  &.completed {
    color: ${colors.grayNormal};
    text-decoration: line-through;
    cursor: default;
  }
`;

export const ButtonCompleted = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ButtonDelete = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const IconDelete = styled(MdDelete)`
  position: absolute;
  font-size: 22px;
  color: ${colors.colorErrorNormal};
`;
