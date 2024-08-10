import React from "react";

import { IconCircle, IconCheck } from "./styled";

const IconCompleted = ({ completed }) => {
  return (
    <>
      <IconCheck className={completed ? "active" : "disable"} />
      <IconCircle className={!completed ? "active" : "disable"} />
    </>
  );
}

export default IconCompleted;
