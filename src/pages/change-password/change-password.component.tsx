import { useState } from "react";
import { Container, Heading, Label, Button } from "./change-password.styles";
import { ProfileMenu } from "../../components/profile-menu";
import { PasswordInputComponent } from "../../components/password-input";
import { PasswordStrength } from "../../components/password-strength";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  return (
    <Container>
      <ProfileMenu />
      <Heading>Change Password</Heading>
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
    </Container>
  );
};
