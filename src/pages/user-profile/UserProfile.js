import React, { useContext, useEffect } from "react";

import { UserContext } from "../../hooks/userContext";
import ItemsSectionsContainer from "../../components/sections-container/ItemsSectionsContainer";

import "./UserProfile.css";
import "./EditForm.css";
import defaultUser from "../../user.png";
import EditIcon from "@material-ui/icons/Edit";
import { InputLabel, Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const [editModal, setEditModal] = useState(false)

  const closeModal = ()=>{
    setEditModal(false)
  }

  return (
    <div className="userprofile__container">
      <div className="userProfile__data">
        <span className="data--badget">Usuario</span>
        <img
          // src={user.userIMG ? user.userIMG : "./public/default-user.png"}
          src={user.userIMG ? user.userIMG : defaultUser}
          // alt={user.username}
          alt="username"
          />
        {/* <h2>{user.username}</h2> */}
        <h2>username</h2>
      </div>

      <ItemsSectionsContainer />
      {editModal && <UserProfileEditForm closeModal={closeModal}/>}
      <Button variant="contained" startIcon={<EditIcon />} onClick={()=>setEditModal(true)} className='edit_button'>
        Editar Perfil
      </Button>
    </div>
  );
}

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
    }
  },
}));

function validation(value) {
  let errors = {};

  if (/[\w\d-]/gi.test(value.username)) {
    errors = {};
  } else {
    errors = { username: true };
  }

  if (/([\w\d.-]+@[\w\d.-]+\.[\w]+)/gi.test(value.email)) {
    errors = {};
  } else {
    errors = { email: true };
  }

  if (/[\w\d\s.-?¿¡!$#@%&/+*=]/gi.test(value.password)) {
    errors = {};
  } else {
    errors = { password: true };
  }

  return errors;
}
export function UserProfileEditForm({closeModal}) {
  const classes = useStyles();
  const [error, setError] = useState({
    status: false,
    error: '',
    username: "",
    email: "",
    new_password: "",
    password: "",
  })
  const [editForm, setEditForm] = useState({
    showNewPassword: false,
    showPassword: false,
    username: '',
    email: '',
    new_password: '',
    password: "",
  })

  useEffect(() => {
    if (error.status) {
      setTimeout(() => {
        setError({ status: false });
      }, 5000);
    }
  }, [error]);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setEditForm({ ...editForm, showPassword: !editForm.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preentDefault();

    setError(validation(editForm));
    let errors = validation(editForm);
    if (Object.keys(errors).length > 0) return;

    // try {
      

    //   setEditForm({
    //     showPassword: false,
    //     username: '',
    //     email: '',
    //     newPassword: '',
    //     password: "",
    //   });
    // } catch (err) {
    //   setError({
    //     status: true,
    //     error: err.response.data,
    //   });
    //   setEditForm({
    //     showPassword: false,
    //   });
    // }
  };

  return (
    <div className="userProfile__edit" >
      <div className="userProfile__edit__header">
        <h1>Editar pefil</h1> 
        <IconButton
          aria-label="close-edit-modal"
          onClick={closeModal}
          className="editModal__closeButton"
          >
          <CloseIcon style={{ fontSize: "x-large" }} />
        </IconButton>
      </div>

      {error.status && (
        <div className="loginPage__errorMessage">
          <h3>{error.error}</h3>
          <CloseIcon onClick={() => setError(false)} />
        </div>
      )}
        <form className={classes.root} onSubmit={handleSubmit}>
          <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
          <Input
            id="username"
            variant="filled"
            name="username"
            type="text"
            // value={userData.email}
            // onChange={handleChange}
            fullWidth
          />
          {error.username && (
          <small>
            El nombre de usuario debe de tener un rango de 8 a 32 caracteres
            alfanuméricos y/o guiones.
          </small>
          )}

          <InputLabel htmlFor="email">Direccion de correo</InputLabel>
          <Input
            id="email"
            variant="filled"
            name="email"
            type="email"
            // value={userData.email}
            // onChange={handleChange}
            fullWidth
          />
          {error.email && (
          <small>
            Debes ingresar un correo válido.
          </small>
          )}

          <InputLabel htmlFor="image">Foto de perfil</InputLabel>
          <input accept="image/*" id="image" name="image" type="file" />

          <InputLabel htmlFor="new_password">Nueva Contraseña (No requerido)</InputLabel>
          <Input
            id="new_password"
            variant="filled"
            name="new_password"
            type={editForm.showNewPassword ? "text" : "password"}
            value={editForm.new_password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>{setEditForm({ ...editForm, showNewPassword: !editForm.showNewPassword })}}
                  onMouseDown={handleMouseDownPassword}
                >
                  {editForm.showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error.new_password && (
          <small>
            La contraseña debe de tener un rango de 8 a 32 caracteres, puedes
            incluir signos especiales y espacios.
          </small>
          )}

          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <Input
            id="password"
            variant="filled"
            name="password"
            type={editForm.showPassword ? "text" : "password"}
            value={editForm.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {editForm.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Button variant="contained"
          type='submit'>
            Actualizar
          </Button>
        </form>
      </div>
  )
}

