import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../../hooks/userContext";

import "./UploadPage.css";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInput-root": {
      background: "rgba(241, 241, 241, 0.1)",
      color: "#f1f1f1",
      fontSize: "medium",
      padding: "10px",
      borderRadius: "2px",
      outline: "none",
      border: "none",
      margin: "5px 0 10px 0",
    },
    "& .MuiSelect-root > div": {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      rowGap: '5px'
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#929a9e",
    },
    "& .MuiSelect-icon": {
      color: "#929a9e",
    },
    "& .MuiChip-root" : {
      borderRadius: '2px',
    }
  },
}));

const tags = ["Acción", "Apocalíptico", "Artes Marciales", "Aventura", "Ciencia Ficción", "Comedia", "Cyberpunk", "Demonios", "Deporte", "Drama", "Ecchi", "Erótico", "Gore", "Harem", "Horror", "Isekai", "Magia", "Mecha", "Militar", "Misterio", "Psicológico", "Recuentos de vida", "Reencarnación", "Romance", "Samuraí", "Sobrenatural", "Superpoderes", "Supervivencia", "Tragedia", "Vida Escolar", "Webcomic"];

export default function UploadPage() {
  const {user} = useContext(UserContext)
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [tagsName, setTagsName] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
    type: "",
    status: "",
    demography: "",
    tags: [],
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagsChange = (event) => {
    setTagsName(event.target.value);
    setFormData({ ...formData, tags: event.target.value });
  };

  useEffect(() => {
    if (error === true || uploaded === true) {
      setTimeout(() => {
        setError(false);
        setUploaded(false);
      }, 5000);
    }
  }, [error, uploaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://lectortmo-api.herokuapp.com/api/upload/${user.id}`,
        {
          title: formData.title,
          description: formData.description,
          imageURL: formData.imageURL,
          type: formData.type,
          status: formData.status,
          demography: formData.demography,
          tags: formData.tags,
        }, {
          headers: {
            "Content-Type": 'application/json',
            "auth_token": user.token
          }
        }
      );
      setTagsName([]);
      setFormData({
        title: "",
        description: "",
        imageURL: "",
        type: "",
        status: "",
        demography: "",
        tags: [],
      });

      setUploaded(true);
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (err) {
      window.scroll({ top: 0, behavior: "smooth" });
      setError(true);
      console.log(err.response.data)
    }
  };

  return (
    <div className="uploadPage">
      <h1>Subir Archivo</h1>
      {error && (
        <div className="uploadPage__errorMessage">
          <h3>¡Algo salio mal! Vuelve a intentarlo más tarde por favor</h3>
          <CloseIcon onClick={() => setError(false)} />
        </div>
      )}
      {uploaded && (
        <div className="uploadPage__uploadedMessage">
          <h3>¡Los datos se enviaron correctamente!</h3>
          <CloseIcon onClick={() => setUploaded(false)} />
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off" className={classes.root}>
        <InputLabel htmlFor="title">Inserta el título</InputLabel>
        <Input
          id="title"
          variant="filled"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <InputLabel htmlFor="description">Inserta la descripción</InputLabel>
        <Input
          id="description"
          variant="filled"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={5}
          rowsMax={5}
          required
        />

        <InputLabel htmlFor="imageURL">
          Inserta la imagen del archivo (URL)
        </InputLabel>
        <Input
          id="imageURL"
          variant="filled"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <InputLabel htmlFor="type">Escoje una clasificación</InputLabel>
        <Select
          id="type"
          name="type"
          onChange={handleInputChange}
          required
          transitioncomponent={Fade}
          value={formData.type}
          defaultValue=" "
        >
          <MenuItem value="Manga">Manga</MenuItem>
          <MenuItem value="Manhwa">Manhwa</MenuItem>
          <MenuItem value="Novela">Novela</MenuItem>
        </Select>

        <InputLabel htmlFor="demography">Escoje un género</InputLabel>
        <Select
          id="demography"
          name="demography"
          onChange={handleInputChange}
          required
          transitioncomponent={Fade}
          value={formData.demography}
        >
          <MenuItem value="Shounen">Shounen</MenuItem>
          <MenuItem value="Seinen">Seinen</MenuItem>
        </Select>

        <InputLabel htmlFor="tags">Inserta las etiquetas</InputLabel>
        <Select
          id="tags"
          variant="filled"
          multiple
          required
          transitioncomponent={Fade}
          value={tagsName}
          onChange={handleTagsChange}
          input={<Input />}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={value}/>
              ))}
            </div>
          )}
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag} className="MenuItem">
              {tag}
            </MenuItem>
          ))}
        </Select>

        <InputLabel htmlFor="status">Escoje su estado actual</InputLabel>
        <Select
          id="status"
          name="status"
          onChange={handleInputChange}
          required
          transitioncomponent={Fade}
          value={formData.status}
        >
          <MenuItem value="En progreso">En progreso</MenuItem>
          <MenuItem value="Terminado">Terminado</MenuItem>
          <MenuItem value="Abandonado">Abandonado</MenuItem>
        </Select>

        <Button
          variant="contained"
          className="uploadPage__uploadBtn"
          startIcon={<PublishIcon />}
          type="submit"
        >
          Subir
        </Button>
      </form>
    </div>
  );
}
