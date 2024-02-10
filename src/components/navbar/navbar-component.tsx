import React from "react";
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
export const Navbar = ({ isLoggedIn, setIsLoggedIn, name, id }: NavBarProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Nav>
      <Logo src={logo} alt="rolk logo" />
      <NavLinks>
        <ShowOnLogin isLoggedIn={isLoggedIn}>
          <Container>
            <BsPersonCircle />
            <Text>Hi, {name}</Text>
            <NavLink>
              <LinkToRoute to={`/profile/${id}`}>Profile</LinkToRoute>
            </NavLink>
            <button style={{ color: "white" }} onClick={handleLogout}>
              Logout
            </button>
          </Container>
        </ShowOnLogin>
        <ShowOnLogout isLoggedIn={isLoggedIn}>
          <NavLink>
            <LinkToRoute to="/login"> Login</LinkToRoute>
          </NavLink>
        </ShowOnLogout>
      </NavLinks>
    </Nav>
  );
};
