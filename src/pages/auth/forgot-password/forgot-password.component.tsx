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

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isResetEmailSent, setIsResetEmailSent] = useState<boolean>(false);

  const navigate = useNavigate();

  const getResetPasswordEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );

      console.log("response: ", response)

      if (response.status === 200) {
        setIsResetEmailSent(true);
        toast.success(`Password reset email sent to ${email}`, {
          position: "bottom-center",
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      toast.error("Error sending password reset email. Please try again.", {
        position: "bottom-center",
        draggable: true,
        theme: "colored",
      });
    }
    setEmail("");
  };

  useEffect(() => {
    if (isResetEmailSent) {
      navigate("/");
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
              type="email"
              placeholder="Email address or username"
              name="email"
              required
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
