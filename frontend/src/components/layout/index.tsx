import { FC, PropsWithChildren } from "react";
import { Menu } from "../menu";
import './layout.css'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
      <>
        <img className="layout_logo" src="src/assets/logo.webp" alt="" />
        {children}
        <Menu />
      </>
    );
  };