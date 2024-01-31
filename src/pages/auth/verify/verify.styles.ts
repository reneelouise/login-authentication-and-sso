import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Heading = styled.h1``;
const Text = styled.p`
  font-size: 18px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 12px;
  cursor: pointer;
`;

export { Container, Heading, Text, Button };
