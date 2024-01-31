import { ReactNode } from "react";
import { Container, TextContainer, Text, Value } from "./stats.styles";

interface CardProps {
  icon: ReactNode;
  heading: string;
  users: number;
  bgColor: string;
}

export const Card = ({ icon, heading, users, bgColor }: CardProps) => {
  return (
    <Container bgColor={bgColor}>
      {icon}
      <TextContainer>
        <Text>{heading}</Text>
        <Value>{users}</Value>
      </TextContainer>
    </Container>
  );
};
