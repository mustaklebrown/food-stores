import React, { ReactNode } from "react";
// import Header from "./Header";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="w-full h-full">{props.children}</div>
  </div>
);

export default Layout;
