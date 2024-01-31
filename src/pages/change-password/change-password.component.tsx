import { useEffect, useState } from "react";
import { Container, Heading, Label, Button } from "./change-password.styles";
import { ProfileMenu } from "../../components/profile-menu";
import { PasswordInputComponent } from "../../components/password-input";
import { PasswordStrength } from "../../components/password-strength";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Logout } from "../../helpers";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isReset, setIsReset] = useState<boolean>(false);

  const navigate = useNavigate();

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/change-password",
        {
          oldPassword: currentPassword,
          password: newPassword,
        }
      );

      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message, {
          position: "bottom-center",
          theme: "colored",
        });

        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsReset(true);
        Logout();
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
    <Container>
      <ProfileMenu />
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
