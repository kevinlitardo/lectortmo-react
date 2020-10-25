import React, { useEffect, useState } from "react";
import axios from "axios";

import FileItem from "../../components/file-item/FileItem";
import LoaderButton from "../../components/loader-button/LoaderButton";
import Loading from "../../components/loading/Loading";

import "./FilesMainContainer.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from "@material-ui/core";

export default function FilesMainContainer({search}) {
  let url;
  if(search !== 'trending'){
    url = `https://lectortmo-api.herokuapp.com/api/demo/${search}`
  } else {
    url = `https://lectortmo-api.herokuapp.com/api/trending`
  }
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(url);
        setData(req.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [search, url]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mangasContainer">
      <Grid container justify='space-evenly' spacing={1} style={{margin: '0', width: 'auto'}}>
          {data.map((item, x) => (
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

      <div className="mangasContainer__button">
        <LoaderButton />
      </div>
    </div>
  );
}
