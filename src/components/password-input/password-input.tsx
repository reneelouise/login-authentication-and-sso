import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  PasswordInput,
  PasswordInputContainer,
  PasswordButtonIcon,
} from "./password-input.styles";

interface PasswordInputProps {
  password: string;
  setPassword: (newPassword: string) => void;
  placeholder?: string;
  onPaste?: (e: React.FormEvent<HTMLInputElement>) => boolean;
}

export const PasswordInputComponent = ({
  password,
  setPassword,
  placeholder,
  onPaste
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <PasswordInputContainer>
      <PasswordInput
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        name="Password"
        value={password}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        onPaste={onPaste}
      />
      {showPassword ? (
        <PasswordButtonIcon
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            togglePasswordVisibility(e)
          }
        >
          <AiOutlineEye />
        </PasswordButtonIcon>
      ) : (
        <PasswordButtonIcon
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            togglePasswordVisibility(e)
          }
        >
          <AiOutlineEyeInvisible />
        </PasswordButtonIcon>
      )}
    </PasswordInputContainer>
  );
};
