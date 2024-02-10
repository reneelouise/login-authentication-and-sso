import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  padding: 12px;
  justify-content: center;
`;

const NavLinks = styled.ul`
  display: flex;
  border-radius: 4px;
  padding: unset;
`;

const NavLink = styled.li`
  list-style: none;
  cursor: pointer;
  margin: 8px;

  &:focus-within {
    text-decoration: underline;
  }
`;

const LinkToRoute = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  color: black;

  &:hover {
    color: grey;
  }


`;

export { Nav, NavLinks, NavLink, LinkToRoute };
