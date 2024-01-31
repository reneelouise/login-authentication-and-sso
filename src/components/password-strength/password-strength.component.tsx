import { useEffect, useState } from "react";
import { Container, Condition, Text } from "./password-strength.styles";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";

interface PasswordStrengthProps {
  password: string;
}
export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const [passwordConditionsMet, setPasswordConditionsMet] = useState<boolean[]>(
    [false, false, false, false]
  );

  const checkPasswordStrength = () => {
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%&*]/;

    const conditionsMet = [
      letterRegex.test(password),
      numberRegex.test(password),
      specialCharRegex.test(password),
      password.length >= 6,
    ];

    setPasswordConditionsMet(conditionsMet);
  };

  const passwordConditions = [
    "Lowercase & Uppercase",
    "Number (between 0-9)",
    "Special character (!@#$%&*)",
    "At least 6 characters",
  ];

  useEffect(() => {
    checkPasswordStrength();
  }, [password]);

  return (
    <Container>
      {passwordConditions.map((condition, key) => (
        <Condition key={key}>
          {passwordConditionsMet[key] ? (
            <BsCheckLg color="green" />
          ) : (
            <IoCloseSharp color="red" />
          )}
          <Text>{condition}</Text>
        </Condition>
      ))}
    </Container>
  );
};
