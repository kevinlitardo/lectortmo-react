import React from "react";

import "./Item.css";
import Button from '@material-ui/core/Button';
import {useLocation, useHistory} from "react-router-dom";

export default function Item({ Icon, title, color }) {
  let location = useLocation();
  let history = useHistory();

  const textStyle ={
    display: 'inline-block',
    width: '100%',
    fontSize: "10px",
  }

  const handleClick = ()=>{
    if(location.pathname.includes('/user')){
      history.push(`${location.pathname}/${title}`)
    }
  }

  return (
    <Button 
      aria-label={title} 
      size='medium'
      variant="contained" 
      onClick={handleClick}
      >
      <Icon style={{color: color, fontSize: 'xx-large'}} />
      <span style={textStyle}>{title}</span>
    </Button>
  );
}
