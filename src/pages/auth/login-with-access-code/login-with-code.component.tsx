import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsFillUnlockFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Heading,
  Form,
  InputContainer,
  Input,
  Button,
  PlainButton,
} from "./login-with-code.styles";
import { toast } from "react-toastify";

export const LoginWithAccessCode = () => {
  const [loginCode, setLoginCode] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { email } = useParams();

  const sendLoginCode = async () => {
    try {
      const loginCodeResponse = await axios.post(
        `http://localhost:5000/api/send-login-code/${email}`
      );

      if (loginCodeResponse.status === 200) {
        toast.success("Login code resent successfully", {
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

  const loginWithCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/login-with-code/${email}`,
        { loginCode }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        setLoginCode("");
        setIsLoading(false);
        toast.success("Successfully logged in", {
          position: "bottom-center",
          theme: "colored",
        });
      }
    } catch (error: any) {
      console.error("Error logging in: ", error);
      toast.error("Uh oh! Please check login code and try again.", {
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log("logged in: ", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Container>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => loginWithCode(e)}
        >
          <BsFillUnlockFill size={35} />
          <Heading>Enter Login Code</Heading>

          <InputContainer>
            <Input
              type="text"
              placeholder="Access Code"
              name="access code"
              value={loginCode}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setLoginCode(e.currentTarget.value)
              }
            />
            <Button>Proceed To Login</Button>
          </InputContainer>
        </Form>
        <PlainButton onClick={() => sendLoginCode()}>Resend Code</PlainButton>
      </Container>
    </>
  );
};
