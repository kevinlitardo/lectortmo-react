import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import {FileItem, UploadItem} from "../file-item/FileItem";
import Loading from "../loading/Loading";
import Button from '@material-ui/core/Button';

import { UserContext } from "../../hooks/userContext";

import './UserList.css'
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from '@material-ui/core';

export function UserList({activeList, setList, id}) {
  const { user } = useContext(UserContext);
  const [list, setListData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(`https://lectortmo-api.herokuapp.com/user/${id}/${activeList}?page=1&limit=10&order=rating`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': user.token
          }
        });
        setListData(req.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [activeList, id, user.token]);

  const handleClick = ()=>{
    setList(null)
  }

  if (loading) {
    return (
      <div className='userProfileListsContainer'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='userProfileListsContainer'>
      <Button variant="contained" onClick={handleClick}>
        Cerrar lista
      </Button>
      <Grid container spacing={2}>
        {list.length === 0 ? <div className="emptyList"><h3>Aún no has agrado nada a tu lista!</h3></div> : 
          list.map((item, x) => (
          <Grid item key={x} xs={6} sm={3} md={2}>
            <FileItem
              IconStar={StarIcon}
              IconType={FavoriteIcon}
              key={item._id}
              title={item.title}
              type={item.type}
              rating={item.rating}
              demography={item.demography}
              bg={item.imageURL}
              id={item._id}
              description={item.description}
              tags={item.tags}
              status={item.status}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export function UserUploadList({activeUpload, setUpload, id}) {
  const { user } = useContext(UserContext);
  const [list, setListData] = useState([])
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(`https://lectortmo-api.herokuapp.com/user/uploads/${id}/${activeUpload}?page=1&limit=10`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': user.token
          }
        });
        setListData(req.data.results);
        setReload(false)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [activeUpload, id, user.token, reload]);

  const handleClick = ()=>{
    setUpload(null)
  }

  if (loading) {
    return (
      <div className='userProfileListsContainer'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='userProfileUploadsListsContainer'>
      <Button variant="contained" onClick={handleClick}>
        Cerrar lista
      </Button>
        {list.length === 0 ? <div className="emptyList"><h3>No tienes archivos subidos en esta categoría!</h3></div> : 
          list.map((item) => (
            <UploadItem
              key={item._id}
              title={item.title}
              type={item.type}
              rating={item.rating}
              demography={item.demography}
              bg={item.imageURL}
              id={item._id}
              description={item.description}
              tags={item.tags}
              status={item.status}
              reload={setReload}
            />
        ))}
    </div>
  )
}
