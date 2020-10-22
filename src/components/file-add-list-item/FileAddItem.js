import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';

import { UserContext } from "../../hooks/userContext";

import './FileAddItem.css'
import Button from '@material-ui/core/Button';

export default function FileAddItem({Icon, list, title, color, fileId, prevList}) {
  const {user, setUser} = useContext(UserContext)
  const StyleActive = {
    background: 'rgba(0, 0, 0, 0.5)'
  }
  const textStyle ={
    display: 'inline-block',
    width: '100%'
  }

  const handleClick = async () =>{
    if(!user.username) return
    try {
      const res = await axios.patch('https://lectortmo-api.herokuapp.com/user/lists', {
        list: list,
        userId: user.id,
        fileId: fileId,
        prevList: prevList
      })
      setUser({...user, lists: res.data})
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Button 
      aria-label={title} 
      size='medium'
      variant="contained" 
      onClick={handleClick}
      style={prevList === list ? StyleActive : null}
      id='listButtons'
      >
      <Icon style={{color: color, fontSize: 'xx-large'}} />
      <span style={textStyle}>{title}</span>
    </Button>
  )
}
