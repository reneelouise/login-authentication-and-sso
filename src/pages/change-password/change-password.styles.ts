import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding: 12px 0;
  font-weight: 400;
`;

const Heading = styled.h1``

const TextArea = styled.textarea`
  all: unset;
  border: 1px solid black;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
`;


export {
  Container,
  Heading,
  Label,
  TextArea,
  Button,
};
