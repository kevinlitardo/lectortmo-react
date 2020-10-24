import React from "react";
import Item from "../section-item/Item";

import "./ItemsSectionsContainer.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";

export default function ItemsSectionsContainer({setList, activeList}) {
  return (
    <section className="itemsSectionsContainer" style={{background: '#343a40'}}>
      <Item Icon={CheckCircleOutlineIcon} title="Leido" list='read' color='#51a351' setList={setList} activeList={activeList} />
      <Item Icon={AccessTimeIcon} title="Pendiente" list='pending' color='#f89406' setList={setList} activeList={activeList} />
      <Item Icon={PlayCircleOutlineIcon} title="Siguiendo" list='following' color='#2f96b4' setList={setList} activeList={activeList} />
      <Item Icon={FavoriteBorderIcon} title="Favorito" list='favorite' color='#bd362f' setList={setList} activeList={activeList} />
      <Item Icon={CheckBoxOutlinedIcon} title="Lo tengo" list='obtained' color='#0e67ef' setList={setList} activeList={activeList} />
      <Item Icon={ThumbDownOutlinedIcon} title="Abandonado" list='abandoned' color='#970047' setList={setList} activeList={activeList} />
    </section>
  );
}
