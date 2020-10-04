import React from "react";

import FileItem from "../../components/file-item/FileItem";

import "./TrendingContainer.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

const bg = "url(https://otakuteca.com/images/books/cover/5df593e5569dc.jpg)";

export default function TrendingMangasContainer() {
  return (
    <div className="trendingContainer">
      <h2>Trending</h2>
      <FileItem
        title="Sister Neighbors"
        IconStar={StarIcon}
        type="Manhwa"
        rating="10.00"
        IconType={FavoriteIcon}
        demography="Seinen"
        bg={bg}
      />
    </div>
  );
}
