import { useEffect, useState } from "react";
import { loginStatus } from "../../permissions";
import { Nav, NavLinks, NavLink, LinkToRoute } from "./profile-menu.styles";

export const ProfileMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await loginStatus();
      setIsLoggedIn(!!result); // Update state based on the result
    };

    checkLoginStatus();
    console.log("testinggg")
  }, []);

  return (
    <Nav>
      <NavLinks>
        <NavLink>
          <LinkToRoute to="/profile">Profile</LinkToRoute>
        </NavLink>
        <NavLink>
          <LinkToRoute to="/change-password">Change Password</LinkToRoute>
        </NavLink>
        {isLoggedIn && (
          <NavLink>
            (<LinkToRoute to="/users">Users</LinkToRoute>)
          </NavLink>
        )}
      </NavLinks>
    </Nav>
  );
};
