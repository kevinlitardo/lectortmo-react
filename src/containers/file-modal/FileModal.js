import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import useColor from "../../hooks/useType";

import "./FileModal.css";
import { IconButton } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";

const fileModal = document.getElementById("fileModal");

const FileModal = ({ hideFile, props }) => {
  const IconStar = props.IconStar;
  const IconType = props.IconType;
  const title = props.title.replace(/\s+/g, "-");
  const type = props.type.toLowerCase();
  const [color, setColor] = useState("");

  const { typeColor, demographyColor } = useColor(props.type, props.demography);

  useEffect(() => {
    props.status === "En progreso" ? setColor("#51a351") : setColor("#bd362f");
  }, [props.type, props.status]);

  return createPortal(
    <div className="fileModal">
      <IconButton
        aria-label="close-file-modal"
        onClick={hideFile}
        className="fileModal__closeButton"
      >
        <CloseOutlined style={{ fontSize: "x-large" }} />
      </IconButton>

      <div className="fileModal__container">
        <div className="fileModal__type" style={{ background: typeColor }}>
          <span>{props.type}</span>
        </div>

        <div className="fileModal__image-container">
          <span>
            <IconStar className="mangaItem__header-icon" />
            {props.rating}
          </span>
          <img src={props.bg} alt={props.title} className="fileModal__image" />
          <div className="fileModal__demography">
            <span style={{ background: demographyColor }}>
              {props.demography === "Seinen" && <IconType />}
              {props.demography}
            </span>
          </div>
        </div>

        <div className="fileModal__title">
          <h2>{props.title}</h2>
        </div>

        <div className="fileModal__description">
          <p>{props.description}</p>
        </div>

        <div className="fileModal__tags">
          <h4>Géneros</h4>
          {props.tags.map((tag, _x) => (
            <span key={_x}>{tag}</span>
          ))}
        </div>

        <div className="fileModal__status">
          <h4>Estado</h4>
          <span>
            <FiberManualRecordIcon style={{ color: `${color}` }} />
            {props.status}
          </span>
        </div>

        <Link to={`/${type}s/${title}`}>Ver {props.type}</Link>
      </div>
    </div>,
    fileModal
  );
};

export default FileModal;
