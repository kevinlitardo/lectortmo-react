import React, { useContext } from "react";

import { UserContext } from "../../hooks/userContext";
import ItemsSectionsContainer from "../../components/sections-container/ItemsSectionsContainer";

import "./UserProfile.css";
import defaultUser from "../../user.png";
import EditIcon from "@material-ui/icons/Edit";
import { InputLabel, Input, Button } from "@material-ui/core";

export default function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="userprofile__container">
      <div className="userProfile__data">
        <span className="data--badget">Usuario</span>
        <img
          // src={user.userIMG ? user.userIMG : "./public/default-user.png"}
          src={defaultUser}
          // alt={user.username}
          alt="username"
        />
        {/* <h2>{user.username}</h2> */}
        <h2>username</h2>
      </div>

      <ItemsSectionsContainer />
      <Button variant="contained" startIcon={<EditIcon />}>
        Editar Perfil
      </Button>

      <div className="userProfile__edit">
        <form>
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
          <InputLabel htmlFor="image">Foto de perfil</InputLabel>
          <input accept="image/*" id="image" name="image" type="file" />
        </form>
      </div>
    </div>
  );
}
