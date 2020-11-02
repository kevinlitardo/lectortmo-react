import React, { useEffect, useState } from "react";
import axios from "axios";

import {FileItem} from "../../components/file-item/FileItem";
import Loading from "../../components/loading/Loading";

import "./FilesMainContainer.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from "@material-ui/core";
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

export default function FilesMainContainer({search}) {
  const classes = useStyles();
  const [page, setPage] = useState(1)

  let url;
  if(search !== 'trending'){
    url = `https://lectortmo-api.herokuapp.com/api/demo/${search}?page=${page}&limit=12&order=rating`
  } else {
    url = `https://lectortmo-api.herokuapp.com/api/trending?page=${page}&limit=12`
  }
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalPages, setTotal] = useState(0)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(url);
        setData(req.data.results);
        setTotal(parseInt(req.data.page.page.split('/')[1]))
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [search, url, page]);

  const handleChange = (_e, value) => {
    setPage(value);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mangasContainer">
      <Grid container spacing={2}>
          {data.map((item, x) => (
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

      <div className={classes.root}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}
