import { Nav, NavLinks, NavLink, LinkToRoute } from "./profile-menu.styles";
import {AdminAuthorLink} from '../protected/protected'



interface ProfileMenuProps{
  isLoggedIn: boolean;
  id: string;
  role: string;
}

export const ProfileMenu = ({isLoggedIn, id, role}: ProfileMenuProps ) => {

  return (
    <Nav>
      <NavLinks>
        <NavLink>
          <LinkToRoute to={`/profile/${id}`}>Profile</LinkToRoute>
        </NavLink>
        <NavLink>
          <LinkToRoute to={`/change-password/${id}`}>
            Change Password
          </LinkToRoute>
        </NavLink>
        <AdminAuthorLink isLoggedIn={isLoggedIn} role={role}>
          <NavLink>
            (<LinkToRoute to={`/users/${id}`}>Users</LinkToRoute>)
          </NavLink>
        </AdminAuthorLink>
      </NavLinks>
    </Nav>
  );
};
