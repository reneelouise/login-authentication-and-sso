import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import {
  Container,
  Heading,
  Form,
  InputContainer,
  Input,
  Button,
} from "./forgot-password.styles";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { validateEmail } from "../../../helpers";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isResetEmailSent, setIsResetEmailSent] = useState<boolean>(false);

  const navigate = useNavigate();

  const getResetPasswordEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email.trim())) {
      return toast.error("Please enter a valid email address", {
        position: "bottom-center",
        draggable: true,
        theme: "colored",
      });
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`,
        { email }
      );

      if (response.status === 200) {
        setIsResetEmailSent(true);
        toast.success(`Password reset email sent to ${email}`, {
          position: "bottom-center",
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error:any) {
      console.error("Error sending password reset email: ", error);
      const errorMessage = error?.response?.data.message
        ? error?.response?.data.message
        : "Error sending password reset email. Please try again.";
      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (isResetEmailSent) {
      navigate("/login");
    }
  }, [isResetEmailSent]);
  return (
    <>
      <Container>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            getResetPasswordEmail(e)
          }
        >
          <AiOutlineMail size={35} />
          <Heading>Forgot Password</Heading>

          <InputContainer>
            <Input
              type="text"
              placeholder="Email address or username"
              name="email"
              value={email}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
            />
            <Button>Get Reset Email</Button>
          </InputContainer>
        </Form>
      </Container>
    </>
  );
};
