import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import {
  Container,
  Heading,
  Form,
  TextContainer,
  Text,
  InputContainer,
  Input,
  Button,
  PlainButton,
  LinkToRoute as Link,
} from "./login-styles";
import { PasswordInputComponent } from "../../../components/password-input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginCodeSent, setIsLoginCodeSent] = useState<boolean>(false);

  const navigate = useNavigate();

  const sendLoginCode = async () => {
    try {
      const loginCodeResponse = await axios.post(
        `http://localhost:5000/api/send-login-code/${email}`
      );

      if (loginCodeResponse.status === 200) {
        setIsLoginCodeSent(true);
        const { message } = loginCodeResponse.data;
        toast.success(message, {
          position: "bottom-center",
          theme: "colored",
          style: { width: "fit-content" },
        });
      }
    } catch (error) {
      console.error("error with sending login code: ", error);
      toast.error("Error sending login code. Please try again.", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userData
      );

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setIsLoading(false);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error("Login Error: ", error);

      if (error.response.status === 401) {
        await sendLoginCode();
        return;
      }

      const errorMessage = error.response.data.message
        ? error.response.data.message
        : "Login failed! Please try again.";
      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && isLoginCodeSent) {
      navigate(`/login-with-code/${email}`);
    }
  }, [isLoginCodeSent, isLoggedIn]);

  return (
    <>
      <Container>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => loginUser(e)}>
          <BiLogIn size={35} />
          <Heading>Login</Heading>
          <Button>Login with Google</Button>
          <Text>or</Text>

          <InputContainer>
            <Input
              type="email"
              placeholder="Email address or username"
              name="email"
              required
              value={email}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
            />
            <PasswordInputComponent
              password={password}
              setPassword={setPassword}
            />
            <Button>Login</Button>
          </InputContainer>
          <PlainButton>
            <Link to="/forgot">Forgot password</Link>
          </PlainButton>
          <TextContainer>
            <Text>Don't have an account? </Text>{" "}
            <PlainButton>
              <Link to="/register">Register</Link>
            </PlainButton>
          </TextContainer>
        </Form>
      </Container>
    </>
  );
};
