import React from "react";
import Item from "../section-item/Item";

import "./ItemsSectionsContainer.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";

export default function ItemsSectionsContainer() {
  return (
    <div className="itemsSectionsContainer">
      <Item Icon={CheckCircleOutlineIcon} title="Leido" />
      <Item Icon={AccessTimeIcon} title="Pendiente" />
      <Item Icon={PlayCircleOutlineIcon} title="Siguiendo" />
      <Item Icon={FavoriteBorderIcon} title="Favorito" />
      <Item Icon={CheckBoxOutlinedIcon} title="Lo Tengo" />
      <Item Icon={ThumbDownOutlinedIcon} title="Abandonado" />
    </div>
  );
}
