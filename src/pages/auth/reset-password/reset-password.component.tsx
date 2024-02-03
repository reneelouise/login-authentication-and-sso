import React, { useState, useEffect } from "react";
import { MdPassword } from "react-icons/md";
import { Container, Heading, Form, Button } from "./reset-password.styles";
import { PasswordInputComponent } from "../../../components/password-input";
import { PasswordStrength } from "../../../components/password-strength";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isReset, setIsReset] = useState<boolean>(false);

  const navigate = useNavigate();

  const resetToken = useParams()

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!oldPassword.trim() || !password.trim() || !confirmPassword.trim()){
      return toast.error("Please complete the password reset by filling out all fields", {
        position: "bottom-center",
        theme: "colored",
      });
    }

    if(password !== confirmPassword){
      return toast.error("Passwords do not match. Please check and try again", {
        position: "bottom-center",
        theme: "colored",
      });
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/reset-password/${resetToken}`,
        {
          oldPassword: oldPassword.trim(),
          password: password.trim(),
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
            placeholder="Current password"
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
