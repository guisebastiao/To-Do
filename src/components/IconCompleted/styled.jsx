import styled from "styled-components";
import * as colors from "../../utils/colors";

import { FaRegCircle, FaCheckCircle } from "react-icons/fa";

export const IconCircle = styled(FaRegCircle)`
  position: absolute;
  font-size: 20px;
  color: ${colors.whitePrimaryNormal};
  transition: all 500ms;

  &.active {
    opacity: 1;
  }

  &.disable {
    opacity: 0;
  }
`;

export const IconCheck = styled(FaCheckCircle)`
  position: absolute;
  font-size: 20px;
  color: ${colors.colorPrimaryNormal};
  transition: all 500ms;

  &.active {
    opacity: 1;
  }

  &.disable {
    opacity: 0;
  }
`;
