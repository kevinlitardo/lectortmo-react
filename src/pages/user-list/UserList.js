import React, { useEffect, useState } from 'react'
import axios from 'axios'

import FileItem from "../../components/file-item/FileItem";
import Loading from "../../components/loading/Loading";
import Button from '@material-ui/core/Button';

import './UserList.css'
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from '@material-ui/core';

export default function UserList({activeList, id, setList}) {
  const [list, setListData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(`https://lectortmo-api.herokuapp.com/user/${id}/${activeList}`);
        setListData(req.data.lists[activeList]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [activeList, id]);

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
      <Grid container justify='space-evenly' spacing={1} style={{margin: '0', width: 'auto'}}>
        {list.length === 0 ? <h1>No data prro</h1> : 
          list.map((item, x) => (
          <Grid item xs={6} key={x}>
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
