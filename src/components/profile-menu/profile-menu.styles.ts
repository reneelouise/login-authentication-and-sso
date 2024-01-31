import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  padding: 12px;
  justify-content: center;
`;

const NavLinks = styled.ul`
  display: flex;
  background-color: black;
  border-radius: 4px;
`;

const NavLink = styled.li`
  list-style: none;
  background-color: black;
  cursor: pointer;
  margin: 8px;
`;

const LinkToRoute = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

export { Nav, NavLinks, NavLink, LinkToRoute };
