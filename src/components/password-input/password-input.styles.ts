import styled from "styled-components";

const PasswordInput = styled.input`
  padding: 12px;
  width: 100%;
  margin: 8px 0;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const PasswordButtonIcon = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 8px;
`;

export { PasswordButtonIcon, PasswordInputContainer, PasswordInput };
