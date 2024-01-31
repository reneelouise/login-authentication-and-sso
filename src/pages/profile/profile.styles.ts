import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1``;

const Text = styled.p`
  font-weight: 600;
  font-size: 18px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: orange;
  width: fit-content;
  padding: 12px;
`;

const Form = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding: 12px 0;
  font-weight: 400;
`;

const Input = styled.input`
  padding: 12px;
`;

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
  Text,
  ImageContainer,
  Form,
  Label,
  Input,
  TextArea,
  Button,
};
