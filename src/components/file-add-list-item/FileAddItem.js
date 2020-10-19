import React, { useContext } from 'react'
import axios from 'axios';

import { UserContext } from "../../hooks/userContext";

import './FileAddItem.css'
import Button from '@material-ui/core/Button';

export default function FileAddItem({Icon, list, title, color, fileId}) {
  const {user} = useContext(UserContext)
  const buttonStyle = {
    background: "transparent",
    color: "#bfbfbf",
    display: "inline-block",
    fontSize: "9px",
    width: "auto",
    fontWeight: "normal",
    boxShadow: 'none'
  };
  const textStyle = {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center'
  }

  const handleClick = async () =>{
    try {
      await axios.patch('http://localhost:4000/user/lists', {
        list: list,
        userId: user.id,
        fileId: fileId
      })
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
