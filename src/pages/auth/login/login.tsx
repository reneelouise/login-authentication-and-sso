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

interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
export const Login = ({ isLoggedIn, setIsLoggedIn, id }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        "http://localhost:5000/api/login",
        userData
      );

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setIsLoading(false);
        setIsLoggedIn(true);

        // Storing user ID in local storage
        const { _id, role } = response.data;
        const userObject = {
          id: _id,
          role: role,
        };

        if (_id && role) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(userObject));
        } else {
          toast.error("Error fetching user details, please refresh", {
            position: "bottom-center",
            theme: "colored",
          });
        }
      }
    } catch (error: any) {
      console.error("Login Error: ", error);
      const errorMessage = error.response.data.message
        ? error.response.data.message
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
        `http://localhost:5000/api/send-login-code/${email}`
      );

      if (loginCodeResponse.status === 200) {
        setIsLoginCodeSent(true);
        const { message } = loginCodeResponse.data;
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
    if (isLoggedIn) {
      navigate(`/profile/${id}`);
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
