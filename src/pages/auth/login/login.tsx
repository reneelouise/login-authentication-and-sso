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
import { IUser } from "../../../helpers";

interface LoginProps {
  isLoggedIn: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  id: string;
}

export const Login = ({
  isLoggedIn,
  setIsLoggedIn,
  id,
  setUser,
  email,
  setEmail,
}: LoginProps) => {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoginCodeSent, setIsLoginCodeSent] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      if (!email.trim() || !password.trim()) {
        toast.error("Please enter a valid email and password", {
          position: "bottom-center",
          theme: "colored",
        });

        return;
      }

      if (password.trim().length < 6) {
        toast.error("Password must be at least 6 characters", {
          position: "bottom-center",
          theme: "colored",
        });

        return;
      }

      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        userData
      );

      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setIsLoggedIn(true);
        setUser(response.data);
        localStorage.setItem("id", response.data._id);

      }
    } catch (error: any) {
      console.error("Login Error: ", error);
      const errorMessage = error?.response?.data.message
        ? error?.response?.data.message
        : "Login failed! Please try again.";

      if (error.response.status === 401) {
        await sendLoginCode();
      }

      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendLoginCode = async () => {
    try {
      const loginCodeResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/send-login-code/${email}`
      );

      if (loginCodeResponse.status === 200) {
        setIsLoginCodeSent(true);        const { message } = loginCodeResponse.data;
        toast.success(message, {
          position: "bottom-center",
          theme: "colored",
        });
      }
    } catch (error: any) {
      console.error("error with sending login code: ", error);
      const errorMessage = error.response.data.message
        ? error.response.data.message
        : "Error sending login code. Please try again.";
      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };


  useEffect(() => {
    if (isLoggedIn && isSuccess && id) {
      navigate(`/profile/${id}`);
    }
  }, [isLoggedIn, id, isSuccess]);

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
