import React, { useState, useEffect } from "react";
import axios from "axios";

import { InputLabel, Input, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import "./RegisterPage.css";

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
    "& small": {
      color: "#bd362f",
    },
  },
}));

export default function RegisterPage(props) {
  const classes = useStyles();
  const [error, setError] = useState({
    status: false,
    error: "",
    username: false,
    email: false,
    password: false,
    pass_validation: false,
  });
  const [userData, setUserData] = useState({
    showPassword: false,
    showPassValidation: false,
    username: "",
    email: "",
    password: "",
    pass_validation: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (error.status) {
      setTimeout(() => {
        setError({ status: false });
      }, 5000);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (userData.username.length < 4) {
    //   return setError({ username: true });
    // }
    // if (userData.email) {
    //   return setError({ email: true });
    // }
    // if (userData.password.length < 8) {
    //   return setError({ password: true });
    // }
    // if (userData.pass_validation !== userData.password) {
    //   return setError({ pass_validation: true });
    // }

    try {
      await axios.post(
        "https://lectortmo-api.herokuapp.com/user/register",
        // "http://localhost:4000/user/register",
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }
      );

      setUserData({
        showPassword: false,
        showPassValidation: false,
        username: "",
        email: "",
        password: "",
        pass_validation: "",
      });

      props.history.push("/login");
    } catch (err) {
      window.scroll({ top: 0, behavior: "smooth" });
      setError({
        status: true,
        error: err.response.data,
      });
      setUserData({
        showPassword: false,
        showPassValidation: false,
      });
    }
  };

  return (
    <div className="loginPage">
      <h1>Registrate</h1>
      {error.status && (
        <div className="loginPage__errorMessage">
          <h3>{error.error}</h3>
          <CloseIcon onClick={() => setError(false)} />
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className={classes.root}>
        <InputLabel htmlFor="username">Inserta un nombre de usuario</InputLabel>
        <Input
          id="username"
          variant="filled"
          name="username"
          type="text"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          required
        />
        {error.username && (
          <small>
            El nombre de usuario debe tener un mínimo de 4 caracteres y no debe
            contener signos especiales como @, #, $, |, ¡, !, etc...
          </small>
        )}

        <InputLabel htmlFor="email">Inserta un correo</InputLabel>
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
        {error.email && (
          <small>El correo debe de tener un mínimo de 10 caracteres</small>
        )}

        <InputLabel htmlFor="password">Inserta una contraseña</InputLabel>
        <Input
          id="password"
          variant="filled"
          name="password"
          type={userData.showPassword ? "text" : "password"}
          value={userData.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {userData.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {error.password && (
          <small>La contraseña debe de tener un mínimo de 8 caracteres </small>
        )}

        <InputLabel htmlFor="pass_validation">Repite tu contraseña</InputLabel>
        <Input
          id="pass_validation"
          variant="filled"
          name="pass_validation"
          type={userData.showPassValidation ? "text" : "password"}
          value={userData.pass_validation}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setUserData({
                    ...userData,
                    showPassValidation: !userData.showPassValidation,
                  })
                }
                onMouseDown={handleMouseDownPassword}
              >
                {userData.showPassValidation ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        {error.pass_validation && (
          <small>Las contraseñas deben coincidir</small>
        )}

        <Button
          variant="contained"
          className="loginPage__loginBtn"
          type="submit"
        >
          Registrarse
        </Button>
      </form>
    </div>
  );
}
