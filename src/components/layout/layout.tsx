
import { ReactNode, memo } from "react";
import { Navbar as Header } from "../navbar";

interface LayoutProps {
  children: ReactNode;
}


// Memoize the Layout component
export const Layout = memo(({ children}: LayoutProps) => {
  return (
    <>      <div style={{ padding: "24px" }}>{children}</div>
      {/* <Footer /> */}
    </>
  );
});


