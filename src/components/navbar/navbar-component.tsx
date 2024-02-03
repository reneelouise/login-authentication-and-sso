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
import { Logout } from "../../helpers";
import { useNavigate } from "react-router";

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavBarProps) => {
  
  const navigate = useNavigate()
  const handleLogout = () => {
    Logout();
    setIsLoggedIn(false);
    navigate('/login')
  };
  return (
    <Nav>
      <Logo src={logo} alt="rolk logo" />
      <NavLinks>
        {isLoggedIn && (
          <Container>
            <BsPersonCircle />
            <Text>Hi, Renée</Text>
          </Container>
        )}
        <NavLink>
          {isLoggedIn ? (
            <button onClick={() => handleLogout()}>Logout</button>
          ) : (
            <LinkToRoute to="/login"> Login</LinkToRoute>
          )}
        </NavLink>
      </NavLinks>
    </Nav>
  );
};
