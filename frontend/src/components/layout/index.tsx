import { FC, PropsWithChildren } from "react";
import { Menu } from "../menu";
import './layout.css'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className="layout_wrapper">
        <Menu />
        <div className="layout_container">
          <div className="layout_content">
            {children}
          </div>
        </div>
      </div>
    );
  };