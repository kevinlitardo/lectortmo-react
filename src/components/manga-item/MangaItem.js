import React, { useState } from "react";

import FileModal from "../../containers/file-modal/FileModal";
import useColor from "../../hooks/useType";

import "./MangaItem.css";

export default function MangaItem(props) {
  const IconStar = props.IconStar;
  const IconType = props.IconType;
  const [fileModal, setFileModal] = useState(false);
  const showFile = () => setFileModal(true);
  const hideFile = () => setFileModal(false);

  const { typeColor, demographyColor } = useColor(props.type, props.demography);

  return (
    <>
      {fileModal && <FileModal hideFile={hideFile} props={props} />}
      <div
        className="mangaItem"
        style={{ backgroundImage: `url(${props.bg})` }}
        onClick={showFile}
      >
        <div className="mangaItem__header">
          <h3>{props.title}</h3>
          <span style={{ background: typeColor }}>{props.type}</span>
          <span>
            <IconStar className="mangaItem__header-icon" />
            {props.rating}
          </span>
        </div>
        <div
          className="mangaItem__footer"
          style={{ background: demographyColor }}
        >
          {props.demography === "Seinen" && <IconType />}
          <h3>{props.demography}</h3>
        </div>
      </div>
    </>
  );
}
