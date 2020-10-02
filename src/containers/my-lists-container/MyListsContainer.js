import React from "react";

import ListsHandler from "./list-handler/ListsHandler";
import ItemsSectionsContainer from "./my-sections-container/ItemsSectionsContainer";

import "./MyListsContainer.css";

export default function MyListsContainer() {
  return (
    <div className="myListsContainer">
      <ListsHandler />
      <h2>Mis Capítulos Pendientes</h2>
      <ItemsSectionsContainer />
    </div>
  );
}
