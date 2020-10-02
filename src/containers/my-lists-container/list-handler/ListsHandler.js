import React, { useContext } from "react";

import SectionButton from "../../../components/section-button/SectionBotton";
import { LoadedSectionContext } from "../../../hooks/loadedSectionContext";

import "./ListsHandler.css";

export default function ListsHandler() {
  const { myListSection } = useContext(LoadedSectionContext);
  const [myListSections, setMyListSections] = myListSection;

  const bottonActive = (title) => {
    setMyListSections(
      myListSections.map((section) =>
        section.title === title
          ? { ...section, active: true }
          : { ...section, active: false }
      )
    );
  };

  const activeStyles = {
    backgroundStyle: { background: "#2957ba" },
    textStyle: { color: "#f1f1f1" },
    iconStyle: { color: "#f1f1f1" },
  };

  return (
    <div className="listsHandler">
      {myListSections.map((section, _x) =>
        section.active === true ? (
          <SectionButton
            key={_x}
            Icon={section.Icon}
            title={section.title}
            bottonActive={bottonActive}
            {...activeStyles}
            active={section.active}
          />
        ) : (
          <SectionButton
            key={_x}
            Icon={section.Icon}
            title={section.title}
            bottonActive={bottonActive}
            active={section.active}
          />
        )
      )}
    </div>
  );
}
