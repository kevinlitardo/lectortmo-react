import React, {useState, useContext} from "react";
import { Link, useHistory } from "react-router-dom";

import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { UserContext } from "../../hooks/userContext";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GroupIcon from "@material-ui/icons/Group";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";

export default function Header({ showMenu }) {
  const { user, setUser } = useContext(UserContext);
  const [userMenu, setUserMenu] = useState(false);
  const [logged, setLogged] = useState(true);
  let history = useHistory();

  const showUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const handleClick = () => {
    if (!user.username) setLogged(false);
    if (user.username) {
      setLogged(true);
      history.push("/upload");
    }
  };

  const handleLogout = async () => {
    setUser({
      username: null,
      id: null,
      userIMG: null,
      lists: null,
      token: null
    })
    window.localStorage.clear()
    setUserMenu(false)
    history.push('/')
  };

  return (
    <div className="header">
      <div className="header__title">
        <Link to="/">
          <span>TU</span>
          <strong>MANGA</strong>
          <span>ONLINE</span>
        </Link>
      </div>

      <form>
        <input type="text" placeholder="Buscar..." />
      </form>
      <Button
          variant="contained"
          className="header__uploadBtn"
          startIcon={<CloudUploadIcon />}
          onClick={handleClick}
        >
          Upload
      </Button>

      <div className="header__nav">
        {user.username && (
          <div className="header__userBtn">
            <Avatar alt={`${user.usernama} avatar`} src={user.userIMG} variant="circle" />
            <button onClick={showUserMenu}>
              <span>{user.username}</span>
              <PlayArrowIcon/>
            </button>
          </div>
        )}
        {!user.username && (
          <div className="header__signBtnsContainer">
            <Link
              to="/login"
              className="header__signBtn"
            >
              Ingresar
            </Link>
            <Link
              to="/register"
              className="header__signBtn"
            >
              Registarse
            </Link>
          </div>
        )}
        {userMenu && (
          <div className="header__userMenu">
            <Link to={`/user/${user.username}`} onClick={()=>{setUserMenu(false)}}>
              <AccountBoxIcon /> Mi perfil
            </Link>
            <Link to="/" onClick={()=>{setUserMenu(false)}}>
              <FormatListBulletedIcon /> Mis listas
            </Link>
            <Link to="/" onClick={()=>{setUserMenu(false)}}>
              <GroupIcon /> Mis grupos
            </Link>
            <span onClick={handleLogout}>
              <ExitToAppIcon /> Desconectar
            </span>
          </div>
        )}
      </div>
      <MenuIcon onClick={showMenu} />
    </div>
  );
}
