import { ReactNode } from "react";

interface ShowLinksProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

interface ShowAdminLinkProps extends ShowLinksProps {
  role: string;
}

export const ShowOnLogin = ({ children, isLoggedIn }: ShowLinksProps) => {
  if (isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};
export const ShowOnLogout = ({ children, isLoggedIn }: ShowLinksProps) => {
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

export const AdminAuthorLink = ({
  children,
  isLoggedIn,
  role,
}: ShowAdminLinkProps) => {
  // TODO: find a way to not use stringify
  if (
    isLoggedIn &&
    (role === JSON.stringify("admin") || role === "author")
  ) {
    return <>{children}</>;
  }
  return null;
};
