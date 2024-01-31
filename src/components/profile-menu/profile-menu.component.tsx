import {
  Nav,
  NavLinks,
  NavLink,
  LinkToRoute,
} from "./profile-menu.styles";

export const ProfileMenu = () => {
  return (
    <Nav>
      <NavLinks>
        <NavLink>
          <LinkToRoute to="/profile">Profile</LinkToRoute>
        </NavLink>
        <NavLink>
          <LinkToRoute to="/change-password">Change Password</LinkToRoute>
        </NavLink>
        <NavLink>
          <LinkToRoute to="/users">Users</LinkToRoute>
        </NavLink>
      </NavLinks>
    </Nav>
  );
};
