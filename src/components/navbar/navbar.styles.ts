import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  padding: 12px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Logo = styled.img`
  width: 100px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: black;
  margin-left: 12px;
`;

const NavLinks = styled.ul`
  display: flex;
`;

const NavLink = styled.li`
  list-style: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;

  &:hover{
    color: grey;
  }
`;

const Button = styled.button`
  all: unset;
  border-radius: 4px;
  background-color: black;
  padding: 12px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  margin-left: 12px;

  &:hover {
    background-color: grey;
  }
`;

const ButtonLink = styled(Link)`
  all: unset;
  border-radius: 4px;
  background-color: black;
  padding: 12px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  margin-left: 12px;

  &:hover {
    background-color: grey;
  }
`;



const LinkToRoute = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  color: black;

  &:focus-within {
    text-decoration: underline;
  }
`;

export {
  Nav,
  Logo,
  Container,
  Button,
  NameContainer,
  ButtonLink,
  Text,
  NavLinks,
  NavLink,
  LinkToRoute,
};
