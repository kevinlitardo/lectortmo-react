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
      <Item Icon={CheckCircleOutlineIcon} title="Leido" color='#51a351' />
      <Item Icon={AccessTimeIcon} title="Pendiente" color='#f89406' />
      <Item Icon={PlayCircleOutlineIcon} title="Siguiendo" color='#2f96b4' />
      <Item Icon={FavoriteBorderIcon} title="Favorito" color='#bd362f' />
      <Item Icon={CheckBoxOutlinedIcon} title="Lo tengo" color='#0e67ef' />
      <Item Icon={ThumbDownOutlinedIcon} title="Abandonado" color='#970047' />
    </div>
  );
}
