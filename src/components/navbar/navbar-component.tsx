import React from "react";
import {
  Nav,
  Logo,
  Container,
  Text,
  NavLinks,
  NavLink,
  LinkToRoute,
  Button,
  NameContainer,
  ButtonLink,
} from "./navbar.styles";
import { logo } from "../../assets";
import { BsPersonCircle } from "react-icons/bs";
import { Logout } from "../../helpers";
import { useNavigate } from "react-router";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../components/protected/protected";

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  id: string;
}
export const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  name,
  id,
}: NavBarProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Nav>
      <LinkToRoute to="/">
        <Logo src={logo} alt="rolk logo" />
      </LinkToRoute>
      <ShowOnLogin isLoggedIn={isLoggedIn}>
        <NameContainer>
          <BsPersonCircle />
          <Text>Hello, {name}</Text>
        </NameContainer>
      </ShowOnLogin>
      <NavLinks>
        <ShowOnLogin isLoggedIn={isLoggedIn}>
          <Container>
            <NavLink>
              <LinkToRoute to={`/`}>Home</LinkToRoute>
            </NavLink>
             <NavLink>
              <LinkToRoute to={`/profile/${id}`}>Profile</LinkToRoute>
            </NavLink>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </ShowOnLogin>
        <ShowOnLogout isLoggedIn={isLoggedIn}>
          <NavLink>
            <ButtonLink to="/login"> Login</ButtonLink>
          </NavLink>
        </ShowOnLogout>
      </NavLinks>
    </Nav>
  );
};
