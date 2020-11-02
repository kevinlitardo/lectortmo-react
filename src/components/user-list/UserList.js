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
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
    }
  }
}));

export function UserList({activeList, setList, id}) {
  const { user } = useContext(UserContext);
  const [list, setListData] = useState([])
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [page, setPage] = useState(1)
  const [totalPages, setTotal] = useState(0)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(`https://lectortmo-api.herokuapp.com/user/${id}/${activeList}?page=${page}&limit=12&order=rating`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': user.token
          }
        });
        setListData(req.data.results);
        setTotal(parseInt(req.data.page.page.split('/')[1]))
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [activeList, id, user.token, page]);

  const handleClick = ()=>{
    setList(null)
  }

  const handleChange = (_e, value) => {
    setPage(value);
  };

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

      {list.length !== 0 && <div className={classes.root}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>}
    </div>
  )
}

export function UserUploadList({activeUpload, setUpload, id}) {
  const { user } = useContext(UserContext);
  const [list, setListData] = useState([])
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false)
  const classes = useStyles();
  const [page, setPage] = useState(1)
  const [totalPages, setTotal] = useState(0)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(`https://lectortmo-api.herokuapp.com/user/uploads/${id}/${activeUpload}?page=${page}&limit=12`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': user.token
          }
        });
        setListData(req.data.results);
        setTotal(parseInt(req.data.page.page.split('/')[1]))
        setReload(false)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [activeUpload, id, user.token, reload, page]);

  const handleClick = ()=>{
    setUpload(null)
  }

  const handleChange = (_e, value) => {
    setPage(value);
  };

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

      {list.length !== 0 && <div className={classes.root}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>}
    </div>
  )
}
