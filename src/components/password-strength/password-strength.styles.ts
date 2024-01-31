import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid black;
`;

const Condition = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-left: 12px;
`;

export { Container, Condition, Text };
