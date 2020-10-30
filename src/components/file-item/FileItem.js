import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import FileModal from "../../containers/file-modal/FileModal";
import useColor from "../../hooks/useType";
import { UserContext } from "../../hooks/userContext";

import "./FileItem.css";
import "./FileItem.css";
import "./EditForm.css";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

export function FileItem(props) {
  const IconStar = props.IconStar;
  const IconType = props.IconType;
  const [fileModal, setFileModal] = useState(false);
  const showFile = () => setFileModal(true);
  const hideFile = () => setFileModal(false);

  const { typeColor, demographyColor } = useColor(props.type, props.demography);

  return (
    <>
      {fileModal && <FileModal hideFile={hideFile} props={props} />}
      <div className="fileItem" onClick={showFile}>
        <div className="background" style={{ backgroundImage: `url(${props.bg})` }}>
          <div className="fileItem__header">
            <h3>{props.title}</h3>
            <span style={{ background: typeColor }}>{props.type}</span>
            <span>
              <IconStar className="fileItem__header-icon" />
              {props.rating}
            </span>
          </div>
          <div className="fileItem__footer" style={{ background: demographyColor }}>
            {props.demography === "Seinen" && <IconType />}
            <h3>{props.demography}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export function UploadItem (props) {
  const {user} = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  const [del, setDelete] = useState(false)

  const handleEdit=()=>{
    setEdit(true)
  }

  const handleDelete=()=>{
    setDelete(!del)
  }

  const onDelete =()=>{
    try {
      axios.delete(`https://lectortmo-api.herokuapp.com/api/${props.id}/${user.id}`, {
        headers:{
          'Content-Type': 'application/json',
          'auth_token': user.token
        }
      })
      props.reload(true)
    } catch (err) {
      console.log(err)
    }
  }
   
  return (
    <div className="itemThumbnail">
      <div className="itemData">
        <img src={props.bg} alt={props.title}/>
        <h4>{props.title}</h4>
      </div>
      <div className="itemButtons">
        <IconButton onClick={handleEdit} aria-label='edit' style={{background: '#2957ba', marginRight: '10px'}}>
          <EditIcon style={{color: '#f1f1f1', fontSize: 'large'}}/>
        </IconButton>
        <IconButton onClick={handleDelete} aria-label='delete' style={{background: '#bd362f'}}>
          <DeleteIcon style={{color: '#f1f1f1', fontSize: 'large'}}/>
        </IconButton>
      </div>
      {del && <div className="deleteOptions">
          <Button onClick={onDelete} style={{background: '#51a351', color: '#f1f1f1'}}>
            Borrar
          </Button>
          <Button onClick={handleDelete} style={{background: '#bd362f', color: '#f1f1f1'}}>
            Cancelar
          </Button>
        </div>}
      {edit && <UploadItemEditForm {...props} setEdit={setEdit} />}
    </div>
  )
}

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
    },
  },
}));

const tags = ["Acción", "Apocalíptico", "Artes Marciales", "Aventura", "Ciencia Ficción", "Comedia", "Cyberpunk", "Demonios", "Deporte", "Drama", "Ecchi", "Gore", "Harem", "Horror", "Isekai", "Magia", "Mecha", "Militar", "Misterio", "Psicológico", "Recuentos de vida", "Reencarnación", "Romance", "Samuraí", "Sobrenatural", "Superpoderes", "Supervivencia", "Tragedia", "Vida Escolar", "Webcomic"];

function UploadItemEditForm (props) {
  const {user}=useContext(UserContext)
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const [tagsName, setTagsName] = useState(props.tags.slice());
  const [formData, setFormData] = useState({
    title: props.title,
    description: props.description,
    imageURL: props.bg,
    type: props.type,
    status: props.status,
    demography: props.demography,
    tags: props.tags.slice(),
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
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
    if(success){
      setTimeout(() => {
        props.setEdit(false);
        props.reload(true)
      }, 5000);
    }
  }, [error, success, props]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `https://lectortmo-api.herokuapp.com/api/${props.id}/${user.id}`,
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
      setSuccess(true);
    } catch (err) {
      setError(true);
      console.log(err.response.data)
    }
  };

  if(success){
    return(
      <div className="uploadItem__editForm--success">
        <h1>Editado correctamente!</h1> <CheckIcon />
      </div>
    )
  }

  return (
    <div className="uploadItem__editForm">
      <div className="editForm__header">
        <h1>Editar</h1> 
        <CloseIcon onClick={()=>{props.setEdit(false)}}/>
      </div>
      {error && (
        <div className="editForm__errorMessage">
          <h3>¡Algo salio mal! Vuelve a intentarlo más tarde por favor</h3>
          <CloseIcon onClick={() => setError(false)} />
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
          className="editForm__uploadBtn"
          startIcon={<EditIcon />}
          type="submit"
        >
          Editar
        </Button>
      </form>
    </div>
  );
}






export default function UploadPage() {
  

  

  
}
