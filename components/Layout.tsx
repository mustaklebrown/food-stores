import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTotalQTY, setGetTotals } from "../features/cartSlice";
// import Header from "./Header";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setGetTotals)
  }, [])
  return (
    <div>
      <Header />
      <div className="w-full h-full">{props.children}</div>
    </div>

  )
}

export default Layout;



