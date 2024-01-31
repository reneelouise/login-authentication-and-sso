import styled from "styled-components";

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

const Button = styled.button`
  padding: 12px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  background-color: orange;
  margin: 12px 0;
`;

export { Container, Heading, Form, Button };
