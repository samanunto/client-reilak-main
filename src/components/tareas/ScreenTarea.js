import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TareasMarcaUpdate,
  tareasSetActive,
  tareasStartAddNew,
  tareasStartDelete,
  tareasStartLoading,
  tareasStartUpdate,
} from "../../actions/tarea";
import moment from "moment";
import { eventSetActive } from "../../actions/events";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import es from "date-fns/locale/es";
import { CommentTareas } from "./CommentTareas";
import { MemberTareas } from "./MemberTareas";
import { fetchConAxios } from "../../helpers/fetch";
registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "2",
    margin: "2",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#18191A",
    color: "#ffffff",
  },
  overlay: {
    transition: "opacity .2s ease-in-out",
    backgroundColor: "rgba(53, 5, 5, 0.3)",
  },
};

const initEvent = {
  titulo: "",
  contenido: "",
  fecha: new Date(),
};
const initImg = {
  img: "",
};

export const ScreenTarea = () => {
  const [formValuesimg, setFormValuesimg] = useState(initImg);
  const [modalTerea, setModalTarea] = useState(false);
  const [modalCrearTerea, setModalCrearTarea] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tareasStartLoading());
  }, [dispatch]);

  const [formValues, setFormValues] = useState(initEvent);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const { activeTareas } = useSelector((state) => state.tareas);

  useEffect(() => {
    if (activeTareas) {
      setFormValues(activeTareas);
    } else {
      setFormValues(initEvent);
    }
  }, [activeTareas, setFormValues]);

  const { tareas } = useSelector((state) => state.tareas);
  const { uid } = useSelector((state) => state.auth);

  const handleCreateTareas = (e) => {
    e.preventDefault();

    setFormValues(initEvent);
    console.log();
    if (activeTareas) {
      dispatch(tareasStartUpdate(formValues));
      console.log("activo manito");
    } else {
      console.log("no funcuiona");
      dispatch(tareasStartAddNew(formValues));
    }
  };

  const editarTareas = (_id, titulo, contenido, fecha) => {
    const prueba = { _id, titulo, contenido, fecha };
    dispatch(tareasSetActive(prueba));
  };

  const eliminarTareas = (_id) => {
    dispatch(tareasStartDelete(_id));
  };

  /*
  const marcarTarea = (_id, titulo, contenido, fecha, marcar) => {
    const prueba = { id, titulo, contenido, fecha, marcar };
    dispatch(MarcarStartUpdate(prueba));
  }*/

  const [fechaTareas, setFechaTareas] = useState(initEvent.fecha);

  useEffect(() => {
    if (fechaTareas !== new Date()) {
      initEvent.fecha = fechaTareas;
      console.log(initEvent.fecha);
    }
  }, [fechaTareas]);

  const onChangeFecha = (date) => {
    setFechaTareas(date);
  };

  const tareasMarca = (id) => {
    const prueba = { id };

    dispatch(TareasMarcaUpdate(prueba));
  };

  const handleOpenModalTarea = (_id, titulo, contenido, fecha) => {
    setModalTarea(true);
    const prueba = { _id, titulo, contenido, fecha };
    dispatch(tareasSetActive(prueba));
  };
  const handleOpenModalCrearTarea = () => {
    setModalCrearTarea(true);
  };
  const handleCloseModal = () => {
    setModalTarea(false);
    setModalCrearTarea(false);
  };
   const handleChangeImg = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }

   };
   useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile.name);
      formValuesimg.img = selectedFile;
      console.log(selectedFile);
      
    }
  }, [selectedFile]);

  const guardarArchivo = async (e) => {
    e.preventDefault();
    if (formValuesimg.img) {
      const formData = new FormData();
      formData.set("img", formValuesimg.img);
      formData.set("usuario", uid);
      formData.set("tarea", activeTareas._id);
      try {
        const resp = await fetchConAxios("multimedias/tarea", formData, "POST");
        const body = await JSON.stringify(resp.data.multimedia);
        console.log("body", body);      
        const img = body.replace(/['"]+/g, "");
 
        return
      } catch (error) {
        console.log(error);
      }
      
    }

    


  };

  return (
    <div className="main__home">
      <div className="container_tarea">
        <div className="listar_tarea">
          <div className="header-tarea">
            <button
              type="submit"
              className="button_tareaa "
              onClick={() => {
                handleOpenModalCrearTarea();
              }}
            >
              Crear
            </button>
          </div>
          <div className="body-tarea">
            <div class="cards">
              {tareas.map(({ _id, titulo, contenido, fecha, estado }, i = 1) =>
                estado === false ? (
                  <div class="card">
                    <div
                      class="card__content"
                      onClick={() => {
                        handleOpenModalTarea(
                          _id,
                          titulo,
                          contenido,
                          fecha,
                          estado
                        );
                      }}
                    >
                      <p>{titulo}</p>
                      <p>{contenido}</p>
                      <p>{moment(fecha).format("DD-MM-YYYY")}</p>
                    </div>
                    <div class="card__info ">
                      <div>
                        {" "}
                        <i
                          class="far fa-edit iconos-eventos-ysm"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            handleOpenModalTarea(
                              _id,
                              titulo,
                              contenido,
                              fecha,
                              estado
                            );
                          }}
                        ></i>
                      </div>

                      <div>
                        <i
                          class="fas fa-times iconos-lu iconos-eventos-ysm"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            tareasMarca(_id);
                          }}
                        ></i>
                      </div>

                      <div>
                        <i
                          className="fas fa-trash iconos-eventos-ysm"
                          onClick={() => {
                            eliminarTareas(_id);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div class="card ">
                    <div class="card__content confirmado">
                      <p>{titulo}</p>
                      <p>{contenido}</p>
                      <p>{moment(fecha).format("DD-MM-YYYY")}</p>
                    </div>
                    <div class="card__info confirmado">
                      <div>
                        {" "}
                        <i
                          class="far fa-edit iconos-eventos-ysm"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            handleOpenModalTarea(
                              _id,
                              titulo,
                              contenido,
                              fecha,
                              estado
                            );
                          }}
                        ></i>
                      </div>

                      <div>
                        <i
                          class="fas fa-check iconos-lu iconos-eventos-ysm"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            tareasMarca(_id);
                          }}
                        ></i>
                      </div>

                      <div>
                        {" "}
                        <i
                          className="fas fa-trash iconos-eventos-ysm"
                          onClick={() => {
                            eliminarTareas(_id);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalTerea}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal__tarea">
          
            <div className="modal__tarea-body">
              <div className="modal__tarea-body-left">
              <form onSubmit={handleCreateTareas}>


                <div className="modal__tarea-head">
                  <i class="fas fa-pager"></i>

                  <span className="modal__tarea-head-titulo">
                    <input
                      className="input_tarea_editar"
                      type="text"
                      name="titulo"
                      onChange={handleInputChange}
                      autoComplete="off"
                      value={formValues.titulo}
                    />
                  </span>
                </div>
                <div className="modal__tarea-body-left-vencimiento">
                  <span>Vencimiento</span>

                  <DatePicker
                    selected={fechaTareas}
                    name="fecha"
                    ClassName="tarea_fecha_editar"
                    dateFormat="dd-MM-yyyy"
                    locale="es"
                    onChange={onChangeFecha}
                  />
                </div>

                <div className="modal__tarea-body-left-descripcion">
                  <div className="modal__tarea-body-left-descripcion-titulo">
                    <i class="fas fa-file-alt"></i> Descripcion{" "}
                  </div>
                  <div className="modal__tarea-body-left-descripcion-input">
                    {" "}
                    <textarea
                      className="input_tarea_editar"
                      type="text"
                      name="contenido"
                      onChange={handleInputChange}
                      value={formValues.contenido}
                    />{" "}
                  </div>
                </div>
                <button type="submit" className="button_tarea_editar">
                  Guardar
                </button>
                </form>

                <div className="modal__tarea-body-left-attached">
                  <div className="modal__tarea-body-left-attached-iteam">
                    <div className="modal__tarea-body-left-attached-iteam-left">
                      <img src="https://pm1.narvii.com/6827/fa6f9a2ffb86c5253579b43654a865b272b9fa76v2_hq.jpg" />
                    </div>
                    <div className="modal__tarea-body-left-attached-iteam-right">
                      <div className="modal__tarea-body-left-attached-iteam-right-title">
                        one piece.jpg
                      </div>

                      <div className="modal__tarea-body-left-attached-iteam-right-opt">
                        <span>añadido hace: 3 minutos</span>{" "}
                        <i className="fas fa-trash"></i>{" "}
                        <i
                          class="far fa-edit"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="modal__tarea-body-left-attached-iteam">
                    <div className="modal__tarea-body-left-attached-iteam-left">
                      <img src="https://pm1.narvii.com/6827/997b245a3d4b1201f76796e06e2ec57f36be0ec5v2_hq.jpg" />
                    </div>
                    <div className="modal__tarea-body-left-attached-iteam-right">
                      <div className="modal__tarea-body-left-attached-iteam-right-title">
                        one piece2.jpg
                      </div>

                      <div className="modal__tarea-body-left-attached-iteam-right-opt">
                        <span>añadido hace: 5 minutos</span>{" "}
                        <i className="fas fa-trash"></i>{" "}
                        <i
                          class="far fa-edit"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        ></i>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={guardarArchivo}>


                  <div className="modal__tarea-body-left-attached-upload">
                    <div className="modal__tarea-body-left-attached-upload-btn">
                      <input type="file" onChange={handleChangeImg}/>
                      <button type="submit" className="button_tarea_editar">
                        Guardar
                      </button>
                    </div>
                  </div>
                  </form>
                </div>

                <CommentTareas />
              </div>
              <div className="modal__tarea-body-right">
                <MemberTareas />
              </div>
            </div>
          
        </div>
      </Modal>
      <Modal
        isOpen={modalCrearTerea}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="crear_tarea">
          <form onSubmit={handleCreateTareas}>
            <h3 className="titulo_tarea">Crear tarea</h3>

            <div>
              <input
                className="input_tarea"
                placeholder="Titulo"
                type="text"
                name="titulo"
                onChange={handleInputChange}
                autoComplete="off"
                value={formValues.titulo}
              />
            </div>
            <div>
              <textarea
                className="input_tarea"
                placeholder="Descripcion"
                type="text"
                name="contenido"
                onChange={handleInputChange}
                value={formValues.contenido}
              />
            </div>
            <div>
              <DatePicker
                selected={fechaTareas}
                name="fecha"
                className="tarea_fecha"
                dateFormat="dd-MM-yyyy"
                locale="es"
                onChange={onChangeFecha}
              />
            </div>
            <div>
              <button type="submit" className="button_tarea">
                Crear
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
