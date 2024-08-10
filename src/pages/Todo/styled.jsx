import styled from "styled-components";

export const ContentTodo = styled.div`
  max-width: 1080px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  gap: 10px;

  @media screen and (max-width: 480px) {
    padding: 15px;
  }
`;

export const ContentTasks = styled.div`
  max-width: 800px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px 25px;
  gap: 5px;
`;
