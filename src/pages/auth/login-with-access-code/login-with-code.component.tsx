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
import { IUser } from "../../../helpers";

interface LoginWithAccessCodeProps {
  isLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  email: string;
  id: string;
}

export const LoginWithAccessCode = ({
  isLoggedIn,
  setIsUserLoggedIn,
  setUser,
  email,
  id
}: LoginWithAccessCodeProps) => {
  const [loginCode, setLoginCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const sendLoginCode = async () => {
    try {
      const loginCodeResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/send-login-code/${email}`
      );

      if (loginCodeResponse.status === 200) {
        toast.success(`Login code re-sent to ${email}`, {
          position: "bottom-center",
          theme: "colored",
          style: { width: "fit-content" },
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

  const loginWithCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login-with-code/${email}`,
        { loginCode }
      );

      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setUser(response.data);
        localStorage.setItem("id", response.data._id);
        toast.success("Successfully authenticated. Logging in", {
          position: "bottom-center",
          theme: "colored",
        });
      }
    } catch (error: any) {
      console.error("There was a problem logging in: ", error);

      const errorMessage = error.response.data.message
        ? error.response.data.message
        : "There was a problem logging in";
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
      navigate(`/profile/${id}`);
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
