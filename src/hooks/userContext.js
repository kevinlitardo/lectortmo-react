import React, { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    username: null,
    id: null,
    userIMG: null,
  });

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {props.children}
    </UserContext.Provider>
  );
}
