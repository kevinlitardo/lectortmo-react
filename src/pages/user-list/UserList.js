import React, { useEffect, useState } from 'react'

import {useLocation, useHistory} from "react-router-dom";
export default function UserList() {
  // const [files, setFiles] = useState([])
  let location = useLocation();
  const page = location.pathname.split(/[/]/g)[3]

  useEffect(()=>{
    console.log(page)
  }, [location])

  return (
    <div>
      <h1>asd</h1>
    </div>
  )
}
