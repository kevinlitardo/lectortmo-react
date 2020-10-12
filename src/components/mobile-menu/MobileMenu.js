import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../../hooks/userContext";
import "./MobileMenu.css";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CloseIcon from "@material-ui/icons/Close";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GroupIcon from "@material-ui/icons/Group";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";

const mobileMenuContainer = document.getElementById("mobileMenu");

const MobileMenu = ({ hideMenu }) => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [logged, setLogged] = useState(true);
  let history = useHistory();

  const showUserMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleClick = () => {
    if (!user.username) setLogged(false);
    if (user.username) {
      setLogged(true);
      history.push("/upload");
      hideMenu();
    }
  };

  return createPortal(
    <div className="mobileMenu">
      <div className="mobileMenu__header">
        {user.username && (
          <div className="mobileMenu__userBtn">
            <Avatar alt={`${user.usernama} avatar`} variant="rounded" />{" "}
            <span>{user.username}</span>
            <button onClick={showUserMenu}>
              <PlayArrowIcon />
            </button>
          </div>
        )}
        {!user.username && (
          <div className="mobileMenu__signBtnsContainer">
            <Link
              to="/login"
              className="mobileMenu__signBtn"
              onClick={hideMenu}
            >
              Ingresar
            </Link>
            <Link
              to="/register"
              className="mobileMenu__signBtn"
              onClick={hideMenu}
            >
              Registarse
            </Link>
          </div>
        )}

        <button onClick={hideMenu}>
          <CloseIcon />
        </button>
      </div>
      <div className="mobileMenu__body">
        {showMenu && (
          <div className="mobileMenu__userMenu">
            <Link to={`/${user.username}`} onClick={hideMenu}>
              <AccountBoxIcon /> Mi perfil
            </Link>
            <Link to="/">
              <FormatListBulletedIcon /> Mis listas
            </Link>
            <Link to="/">
              <GroupIcon /> Mis grupos
            </Link>
            <Link to="/">
              <ExitToAppIcon /> Desconectar
            </Link>
          </div>
        )}

        <form>
          <input type="text" placeholder="Buscar..." />
        </form>

        <Button
          variant="contained"
          className="mobileMenu__uploadBtn"
          startIcon={<CloudUploadIcon />}
          onClick={handleClick}
        >
          Upload
        </Button>
        {!logged && (
          <small>
            Necesitas haber ingresado primero antes de poder subir archivos
          </small>
        )}

        <div className="mobileMenu__sections">
          <Link to="/">Biblioteca</Link>
          <Link to="/">Grupos</Link>
          <Link to="/">Listas</Link>
          <Link to="/">Foro</Link>
        </div>
      </div>
    </div>,
    mobileMenuContainer
  );
};

export default MobileMenu;
