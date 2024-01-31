import styled from "styled-components"


const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  background-color: black;
`;

const Text = styled.p`
font-weight: 400;
font-size: 16px;
color: #fff;
`

export {FooterContainer, Text}