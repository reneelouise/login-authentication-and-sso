import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  padding: 12px;
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
  background-color: black;
  padding: 12px;
  cursor: pointer;
`;

const LinkToRoute = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

export { Nav, Logo, Container, Text, NavLinks, NavLink, LinkToRoute };
