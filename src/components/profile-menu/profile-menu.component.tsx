import { Nav, NavLinks, NavLink, LinkToRoute } from "./profile-menu.styles";


interface ProfileMenuProps{
  isLoggedIn: boolean;
  id: string;
}

export const ProfileMenu = ({isLoggedIn, id}: ProfileMenuProps ) => {

  return (
    <Nav>
      <NavLinks>
        <NavLink>
          <LinkToRoute to={`/profile/${id}`}>Profile</LinkToRoute>
        </NavLink>
        <NavLink>
          <LinkToRoute to={`/change-password/${id}`}>Change Password</LinkToRoute>
        </NavLink>
        {isLoggedIn && (
          <NavLink>
            (<LinkToRoute to={`/users/${id}`}>Users</LinkToRoute>)
          </NavLink>
        )}
      </NavLinks>
    </Nav>
  );
};
