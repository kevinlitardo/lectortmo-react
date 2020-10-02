import React, { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";

import WhatshotIcon from "@material-ui/icons/Whatshot";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

export const LoadedSectionContext = createContext();

export function LoadedSectionProvider(props) {
  const [activeSection, setActiveSection] = useState([
    {
      Icon: WhatshotIcon,
      title: "Populares",
      active: false,
    },
    {
      Icon: FavoriteIcon,
      title: "Seinen",
      active: true,
    },
    {
      Icon: FavoriteIcon,
      title: "Shounen",
      active: false,
    },
  ]);

  const [activeTrending, setActiveTrending] = useState([
    {
      Icon: FlashOnIcon,
      title: "Trending",
      active: true,
    },
    {
      Icon: FavoriteIcon,
      title: "T. Seinen",
      active: false,
    },
    {
      Icon: FavoriteIcon,
      title: "T. Shounen",
      active: false,
    },
  ]);

  const [myListSections, setMyListSections] = useState([
    {
      Icon: LibraryBooksIcon,
      title: "Listas de programación",
      active: false,
    },
    {
      Icon: QueryBuilderIcon,
      title: "Mis Capítulos Pendientes",
      active: true,
    },
  ]);

  return (
    <LoadedSectionContext.Provider
      value={{
        activeSections: [activeSection, setActiveSection],
        activeTrendings: [activeTrending, setActiveTrending],
        myListSection: [myListSections, setMyListSections],
      }}
    >
      {props.children}
    </LoadedSectionContext.Provider>
  );
}
