import React, { useState, useEffect } from "react";
import { MdPassword } from "react-icons/md";
import { Container, Heading, Form, Button } from "./reset-password.styles";
import { PasswordInputComponent } from "../../../components/password-input";
import { PasswordStrength } from "../../../components/password-strength";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isReset, setIsReset] = useState<boolean>(false);

  const navigate = useNavigate();

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/change-password",
        {
          oldPassword: oldPassword,
          password: password,
        }
      );

      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message, {
          position: "bottom-center",
          theme: "colored",
        });

        setPassword("");
        setConfirmPassword("");
        setIsReset(true);
      }
    } catch (error: any) {
      console.error("Error resetting password: ", error);
      const errorMessage = error.response.data.message
        ? error.response.data.message
        : "Error resetting password. Please try again.";

      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (isReset) {
      navigate("/login");
    }
  }, [isReset]);

  console.log("password:", confirmPassword);
  return (
    <>
      <Container>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => resetPassword(e)}
        >
          <MdPassword size={35} />
          <Heading>Reset Password</Heading>
          <PasswordInputComponent
            password={oldPassword}
            setPassword={setOldPassword}
            placeholder="Old password"
          />

          <PasswordInputComponent
            password={password}
            setPassword={setPassword}
            placeholder="New password"
          />
          <PasswordInputComponent
            password={confirmPassword}
            setPassword={setConfirmPassword}
            placeholder="Confirm new password"
          />
          {password.length > 0 && <PasswordStrength password={password} />}
          <Button>Reset Password</Button>
        </Form>
      </Container>
    </>
  );
};
