import React, { useEffect, useState } from "react";
import axios from "axios";

import FileItem from "../../components/file-item/FileItem";
import LoaderButton from "../../components/loader-button/LoaderButton";
import Loading from "../../components/loading/Loading";

import "./MangasContainer.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function MangasContainer() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const req = await axios.get(
          // "https://lectortmo-api.herokuapp.com/manhwas"
          "http://localhost:4000/manhwas"
        );
        setData(req.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mangasContainer">
      {data.map((item) => (
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
      ))}

      <div className="mangasContainer__button">
        <LoaderButton />
      </div>
    </div>
  );
}
