import React, { useState } from "react";
import {
  Nav,
  Logo,
  Container,
  Text,
  NavLinks,
  NavLink,
  LinkToRoute,
} from "./navbar.styles";
import { logo } from "../../assets";
import { BsPersonCircle } from "react-icons/bs";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Nav>
      <Logo src={logo} alt="rolk logo" />
      <NavLinks>
        {isLoggedIn ? (
          <Container>
            <BsPersonCircle />
            <Text>Hi, Renée</Text>
          </Container>
        ) : (
          <NavLink>
            <LinkToRoute to="/login">Login</LinkToRoute>
          </NavLink>
        )}
      </NavLinks>
    </Nav>
  );
};
