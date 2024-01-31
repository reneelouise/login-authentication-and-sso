import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //   height: 100vh; // causes space under footer ?
`;

const Heading = styled.h1``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 24px;
  width: 70%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  background-color: orange;
  margin: 12px 0;
`;

export { Container, Heading, Form, InputContainer, Input, Button };
