import React, { useState, useEffect } from "react";
import { Editor, convertToRaw } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { uiCloseModal } from "../../actions/ui";
import {
  eventSetActive, 
  eventClearActiveEvent,
  eventStartAddNew,
  eventUpdate,
  eventStartUpdate,
} from "../../actions/events";
import { convertToHTML } from "draft-convert";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const initEvent = {
  titulo: "",
  contenido: "",
  multimedia: "",

};

const fileName = {
  nameFile: ""
}

export const ModalPublicacion = () => {

/***********************************************************
TEXTO ENRIQUECIDO
**********************************************************/
  const [editorState, setEditorState] = useState(null);
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    

    convertContentToHTML();
  };
  useEffect(() => {
    setEditorState(() => EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(initEvent.contenido))),
    )
    // convertContentToHTML();
    
  }, [initEvent.contenido])

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    formValues.contenido = convertedContent
  };


// editorState, convertedContent
 useEffect(() => {
   if(editorState != null){
    convertContentToHTML();
   }
  

}, [convertedContent])

/***********************************************************
SUBIDA DE ARCHIVOS
**********************************************************/

  const [selectedFile, setSelectedFile] =  useState("");

  const imageHandleChange = (e) => {
    if(e.target.files){
      setSelectedFile(e.target.files[0]);
      const file = e.target.files[0];
      console.log(e.target.files[0]);

    }   
  };
  useEffect(() => {
    if(selectedFile){
      console.log(selectedFile.name)
      formValues.multimedia= selectedFile;
      console.log(selectedFile)
    }
  }, [selectedFile])

  
  fileName.nameFile = selectedFile.name;


  // const { events, activeEvent } = useSelector( state => state.calendar );  
  const onDoubleClick = (e) => {
    console.log(e);
    // dispatch( uiOpenModal() );
}

  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { titulo, contenido} = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
      initEvent.contenido=activeEvent.contenido

    } else {
      setFormValues(initEvent);
      initEvent.contenido=""
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,      
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
    setSelectedFile("");
    setEditorState(EditorState.createEmpty())

  };
  const cancelFile = () => {
    setSelectedFile("")
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('titulo', formValues.titulo);
    formData.set('contenido', formValues.contenido);
    formData.set('multimedia', formValues.multimedia);
    if (titulo.trim().length < 2) {
      return setTitleValid(false);
    }
    if (activeEvent) {
      formData.set('id', activeEvent.id);
      
      dispatch(eventStartUpdate(formData));
      
    } else {
      dispatch( eventStartAddNew(formData) );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal modal-publicacion"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? "Editar publicacion" : "Crear publicacion"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            className={`form-control form-modal ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="titulo"
            autoComplete="off"
            value={titulo}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <Editor
            
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            createFromText='hola'
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            localization={{
              locale: "es",
            }}
            toolbar={{
              options: [
                "inline",
                // "fontSize",
                // "fontFamily",
                "list",
                "textAlign",
                // "colorPicker",
                // "link",
                "emoji",
                "history",
              ],
              inline: {
                inDropdown: false,

                dropdownClassName: undefined,
                options: ["bold", "italic", "underline"],
              },
              fontSize: {
                options: [
                  "8",
                  9,
                  10,
                  11,
                  12,
                  14,
                  16,
                  18,
                  24,
                  "30",
                  36,
                  48,
                  60,
                  72,
                  96,
                ],
                className: "fontSize__textRich",
                component: undefined,
                dropdownClassName: undefined,
              },
              fontFamily: {
                options: [
                  "Arial",
                  "Georgia",
                  "Impact",
                  "Tahoma",
                  "Times New Roman",
                  "Verdana",
                ],
                className: "fontFamily__textRich",
                component: undefined,
                dropdownClassName: undefined,
              },
              link: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                dropdownClassName: undefined,
                showOpenOptionOnHover: true,
                defaultTargetOption: "_self",
                options: ["link", "unlink"],

                linkCallback: undefined,
              },
            }}
          />
        </div>
        <div className="modal-footer border-0 footer__crear-publicacion">
          <div className="subir__multimedia">
            <input
              
              type="file"
              name="file"
              id="file"
              onChange={imageHandleChange}
              accept=".img,.png,.mp4,.jpg,.jepg,.gif"
            />
            <div className="label-holder">
              <label htmlFor="file" className="label">
                <i class="fas fa-photo-video fa-lg"></i>
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      
          {
            (fileName.nameFile) && <div className="result"><p>Multimedia: {fileName.nameFile}</p><button onClick={cancelFile} className="btn btn-danger">X</button></div>
            
          }
          {
            (activeEvent) && <img src={activeEvent.multimedia} width="20%" height="20%" />
          }
        </div>
      </form>
      
    </Modal>
  );
};
