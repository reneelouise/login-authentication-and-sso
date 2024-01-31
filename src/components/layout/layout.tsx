import { ReactNode } from "react";
import { Navbar as Header } from "../navbar";
// import { Footer } from "../footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div style={{ padding: "24px" }}>{children}</div>
      {/* <Footer /> */}
    </>
  );
};
