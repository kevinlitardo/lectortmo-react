import React, { useEffect, useState } from "react";
import axios from "axios";

import useColor from "../../hooks/useType";

import "./FilePage.css";
import { IconButton } from "@material-ui/core";
import { ThumbDownAlt, ThumbUpAlt } from "@material-ui/icons";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import GetAppIcon from "@material-ui/icons/GetApp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LoaderButton from "../../components/loader-button/LoaderButton";
import Loading from "../../components/loading/Loading";

export default function FilePage(props) {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState([]);
  const [color, setColor] = useState("");

  const { typeColor, demographyColor } = useColor(file.type, file.demography);
  const type = props.match.params.type;
  const title = props.match.params.title.replace("-", " ");

  useEffect(() => {
    const fetcher = async () => {
      // const res = await axios.get(`https://lectortmo-api.herokuapp.com/${type}/${name}`)
      const res = await axios.get(`http://localhost:4000/${type}/${title}`);
      setFile(res.data);
      setLoading(false);
    };

    fetcher();

    file.status === "En progreso" ? setColor("#51a351") : setColor("#bd362f");
  }, [type, title, file.status]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="filePage__container">
      <div className="filePage__type" style={{ background: typeColor }}>
        <span>{file.type}</span>
      </div>

      <div className="filePage__image-container">
        <img src={file.imageURL} alt={file.title} className="filePage__image" />
        <div className="filePage__demography">
          <span style={{ background: demographyColor }}>
            {file.demography === "Seinen" && <FavoriteIcon />}
            {file.demography}
          </span>
        </div>
      </div>

      <div className="filePage__title">
        <h2>{file.title}</h2>
      </div>

      <div className="filePage__rating">
        <span>
          <StarIcon className="mangaItem__header-icon" />
          {file.rating}
        </span>

        <div className="filePage__rating--buttons">
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

      <div className="filePage__description">
        <p>{file.description}</p>
      </div>

      <div className="filePage__tags">
        <h4>Géneros</h4>
        {file.tags.map((tag, _x) => (
          <span key={_x}>{tag}</span>
        ))}
      </div>

      <div className="filePage__status">
        <h4>Estado</h4>
        <span>
          <FiberManualRecordIcon style={{ color: `${color}` }} />
          {file.status}
        </span>
      </div>

      <div className="filePage__caps">
        <h4>Capítulos</h4>
        <div className="filePage__caps--container">
          <div className="cap">
            <span>Capítulo sdaflh sadfh kjlshdf sadfjk</span>
            <div className="buttons">
              <GetAppIcon />
              <PlayArrowIcon />
            </div>
          </div>
          <LoaderButton />
        </div>
      </div>
    </div>
  );
}
