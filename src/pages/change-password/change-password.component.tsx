import { SetStateAction, useEffect, useState } from "react";
import { Container, Heading, Label, Button } from "./change-password.styles";
import { PasswordInputComponent } from "../../components/password-input";
import { PasswordStrength } from "../../components/password-strength";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Logout } from "../../helpers";

interface ChangePasswordProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}

export const ChangePassword = ({
  isLoggedIn,
  setIsLoggedIn,
  id,
}: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const navigate = useNavigate();

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/change-password/${id}`,
        {
          oldPassword: currentPassword,
          password: newPassword,
        }
      );

      if (newPassword !== confirmNewPassword) {
        return toast.error("Passwords do not match", {
          position: "bottom-center",
          theme: "colored",
        });
      }

      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message, {
          position: "bottom-center",
          theme: "colored",
        });
        setIsLoggedIn(false);
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
    if (!isLoggedIn) {
      Logout();
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <Heading>Change Password</Heading>
      <form onSubmit={(e) => changePassword(e)}>
        <Label>Current Password:</Label>
        <PasswordInputComponent
          password={currentPassword}
          setPassword={setCurrentPassword}
          placeholder="Current Password"
        />
        <Label>New Password:</Label>

        <PasswordInputComponent
          password={newPassword}
          setPassword={setNewPassword}
          placeholder="New password"
        />
        {newPassword.length > 0 && <PasswordStrength password={newPassword} />}
        <Label>Confirm New Password:</Label>
        <PasswordInputComponent
          password={confirmNewPassword}
          setPassword={setConfirmNewPassword}
          placeholder="Confirm New Password"
        />

        <Button>Change Password</Button>
      </form>
    </Container>
  );
};
