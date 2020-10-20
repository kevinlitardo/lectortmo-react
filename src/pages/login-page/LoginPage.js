import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../hooks/userContext";
import { InputLabel, Input, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import "./LoginPage.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInput-root": {
      background: "rgba(241, 241, 241, 0.1)",
      color: "#f1f1f1",
      fontSize: "medium",
      padding: "10px",
      borderRadius: "2px",
      outline: "none",
      border: "none",
      margin: "5px 0 10px 0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#929a9e",
    },
    "& .MuiSvgIcon-root": {
      color: "#929a9e",
    },
    "& p": {
      color: "#929a9e",
      fontSize: "small",
      display: "inline-block",
      width: "auto",
      height: "auto",
      margin: "3px 0",
    },
    "& p > a": {
      color: "#2957ba",
    },
  },
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [values, setValues] = useState({
    showPassword: false,
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        // "https://lectortmo-api.herokuapp.com/user/login",
        "http://localhost:4000/user/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      console.log(res.data);
      setUser({
        username: res.data.username,
        id: res.data.id,
        userIMG: res.data.userIMG,
        lists: res.data.lists
      });

      setUserData({
        email: "",
        password: "",
      });
      setValues({
        showPassword: false,
        password: "",
      });

      props.history.push("/");
    } catch (err) {
      setError(true);
      setUserData({
        email: "",
        password: "",
      });
      setValues({
        showPassword: false,
        password: "",
      });
      console.log(err);
    }
  };

  return (
    <div className="loginPage">
      <h1>Inicia Sesión</h1>
      {error && (
        <div className="loginPage__errorMessage">
          <h3>¡Algún dato es incorrecto! Vuelve a intentarlo</h3>
          <CloseIcon onClick={() => setError(false)} />
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off" className={classes.root}>
        <InputLabel htmlFor="email">Inserta tu correo</InputLabel>
        <Input
          id="email"
          variant="filled"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <InputLabel htmlFor="password">Inserta tu contraseña</InputLabel>
        <Input
          id="password"
          variant="filled"
          name="password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <p>
          ¿ No estas registrado aún ? <Link to="/register">Registrate</Link>
        </p>

        <Button
          variant="contained"
          className="loginPage__loginBtn"
          type="submit"
        >
          Ingresar
        </Button>
      </form>
    </div>
  );
}
