import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { useLocation } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider(props) {
  const [loading, setLoading] = useState(true)
  const checkUser = async ( token ) => {
    try {
      const res = await axios({
        url: "https://lectortmo-api.herokuapp.com/user/whoiam",
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': token
        }
      });
      setUser({
        username: res.data.username,
        id: res.data.id,
        userIMG: res.data.userIMG,
        lists: res.data.lists,
        token: token
      });
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    const token = window.localStorage.getItem('auth_token')
    if (token) {
      checkUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  const [user, setUser] = useState({
    username: null,
    id: null,
    userIMG: null,
    lists: null,
  });

  return (
    <UserContext.Provider value={{ setUser, user, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}
