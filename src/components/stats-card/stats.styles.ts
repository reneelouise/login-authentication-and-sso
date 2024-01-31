import styled, {css} from "styled-components";

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
  `
);


const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 14px;
`;
const Value = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin:0;
`;

export { Container, TextContainer, Text, Value };
