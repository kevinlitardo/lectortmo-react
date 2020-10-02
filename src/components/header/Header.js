import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";

export default function Header({ showMenu }) {
  return (
    <div className="header">
      <div className="header__title">
        <Link to="/">
          <span>TU</span>
          <strong>MANGA</strong>
          <span>ONLINE</span>
        </Link>
      </div>
      <div className="header__hamburguer" onClick={showMenu}>
        <MenuIcon />
      </div>
    </div>
  );
}
