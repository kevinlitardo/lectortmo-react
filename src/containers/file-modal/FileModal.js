import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "./FileModal.css";
import { IconButton } from "@material-ui/core";
import { CloseOutlined, ThumbDownAlt, ThumbUpAlt } from "@material-ui/icons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
import useColor from "../../hooks/useType";

const fileModal = document.getElementById("fileModal");

const FileModal = ({ hideFile, props }) => {
  const IconStar = props.IconStar;
  const IconType = props.IconType;
  const title = props.title.replace(/\s+/g, "-").toLowerCase();
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

        <div className="fileModal__rating">
          <span>
            <IconStar className="mangaItem__header-icon" />
            {props.rating}
          </span>

          <div className="fileModal__rating--buttons">
            <IconButton
              aria-label="like-button"
              style={{ marginRight: "15px", background: "#51a351" }}
            >
              <ThumbUpAlt
                style={{
                  fontSize: "x-large",

                  color: "#f1f1f1",
                }}
              />
            </IconButton>
            <IconButton
              aria-label="dislike-button"
              style={{ background: "#bd362f" }}
            >
              <ThumbDownAlt
                style={{
                  fontSize: "x-large",

                  color: "#f1f1f1",
                }}
              />
            </IconButton>
          </div>
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

        <Link to={`/manhwas/${title}`}>Ver {props.type}</Link>
      </div>
    </div>,
    fileModal
  );
};

export default FileModal;
