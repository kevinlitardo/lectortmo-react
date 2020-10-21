import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { UserContext } from "../../hooks/userContext";

import './FileAddItem.css'
import Button from '@material-ui/core/Button';

export default function FileAddItem({Icon, list, title, color, fileId, prevList}) {
  const {user, setUser} = useContext(UserContext)
  const [actualList, setActualList] = useState(null)
  const StyleNoActive = {
    background: "transparent",
    color: "#bfbfbf",
    display: "inline-block",
    fontSize: "9px",
    width: "auto",
    fontWeight: "normal",
    boxShadow: 'none',
    position: 'relative'
  };
  const StyleActive = {
    background: 'rgba(0, 0, 0, 0.5)',
    color: "#bfbfbf",
    display: "inline-block",
    fontSize: "9px",
    width: "auto",
    fontWeight: "normal",
    boxShadow: 'none',
    position: 'relative'
  };
  const [buttonStyle, setBtnStyle] = useState(StyleNoActive) 
  
  const textStyle = {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center'
  }

  useEffect(() => {
    if(user.username){
      if(prevList !== list) {setBtnStyle(StyleNoActive)}
      if(!actualList && prevList){
        setActualList(prevList)
        actualList === list ? setBtnStyle(StyleActive) : setBtnStyle(StyleNoActive)
      }
      if(actualList && prevList){
        actualList === list ? setBtnStyle(StyleActive) : setBtnStyle(StyleNoActive)
      }
      if(!actualList && !prevList) return
    }
  }, [user.username, prevList, actualList, list, StyleActive, StyleNoActive])

  const handleClick = async () =>{
    if(!user.username) return
    try {
      const res = await axios.patch('http://localhost:4000/user/lists', {
        list: list,
        userId: user.id,
        fileId: fileId,
        prevList: prevList
      })
      setUser({...user, lists: res.data})
      setActualList(list)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Button 
      aria-label={title} 
      size='medium'
      variant="contained" 
      style={buttonStyle}
      onClick={handleClick}
      >
      <Icon style={{color: color, fontSize: 'xx-large'}} />
      <span style={textStyle}>{title}</span>
    </Button>
  )
}
