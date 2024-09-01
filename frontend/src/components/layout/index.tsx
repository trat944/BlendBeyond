import { FC, PropsWithChildren } from "react";
import { Menu } from "../menu";
import './layout.css'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className="layout_container">
        <img className="layout_logo" src="/logo.webp" alt="" />
        {children}
        <Menu />
      </div>
    
    );
  };