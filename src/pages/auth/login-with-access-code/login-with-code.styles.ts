import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 24px;
  
`;

const Heading = styled.h1``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const PlainButton = styled.button`
  all: unset;
  cursor: pointer;
  font-weight: 600;
  float: left;
  &:hover {
    color: blue;
  }
`;

export { Container, Heading, Form, InputContainer, Input, Button, PlainButton };
