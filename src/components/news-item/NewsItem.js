import React from "react";

import "./NewsItem.css";

import VisibilityIcon from "@material-ui/icons/Visibility";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";

export default function NewsItem({
  title,
  message,
  views,
  author,
  date,
  background,
}) {
  return (
    <div className="newsItem" style={{backgroundImage: `url(${background})`}}>
      <div className="newsItem__title">
        <h3>{title}</h3>
      </div>
      <div className="newsItem__description">
        <p>{message}</p>
        <a href="/">Continuar leyendo...</a>
      </div>
      <div className="newsItem__footer">
        <span>
          <VisibilityIcon /> {views}
        </span>
        <a href="/">
          <AccountCircleOutlinedIcon /> {author}
        </a>
        <span>
          <DateRangeOutlinedIcon /> {date}
        </span>
      </div>
    </div>
  );
}
