import React, { useEffect, useState } from "react";
import axios from "axios";

import MangaItem from "../../components/manga-item/MangaItem";
import LoaderButton from "../../components/loader-button/LoaderButton";

import "./MangasContainer.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function MangasContainer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(
          "https://lectortmo-api.herokuapp.com/manhwas"
        );
        setData(req.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, []);

  return (
    <div className="mangasContainer">
      {data.map((item) => (
        <MangaItem
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
      ))}
      {/* <MangaItem
        title="Sister Neighbors"
        IconStar={StarIcon}
        type="Manhwa"
        rating="10.00"
        IconType={FavoriteIcon}
        demography="Seinen"
        styles={styles}
      /> */}
      <div className="mangasContainer__button">
        <LoaderButton />
      </div>
    </div>
  );
}
