import styled, { css } from "styled-components";

interface StyleProps {
  bgColor: string;
}

const Container = styled.div<StyleProps>(
  ({ bgColor }: StyleProps) => css`
    display: flex;
    flex-direction: row;
    background-color: ${bgColor};
    width: 100%;
    padding 12px;
    margin:4px;
    border-radius: 4px;
  `
);

export const IconContainer = styled.div`
padding: 8px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 16px;
`;
const Value = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export { Container, TextContainer, Text, Value };
