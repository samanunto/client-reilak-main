import React, { useContext, useEffect, useMemo, useState } from "react";
import { ChatSearch } from "./ChatSearch";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { userStartLoading } from "../../actions/usuarios";
import { activarChat, chatStartAddNew } from "../../actions/chat";
import { SocketContext } from "../../context/SocketContext";
import { infoChatClosed, infoChatOpen } from "../../actions/ui";
import { fetchConToken, fetchConAxios } from "../../helpers/fetch";
import { types } from "../../types/types";
import { uiOpenModal } from "../../actions/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242526",
  },
  overlay: {
    transition: "opacity .2s ease-in-out",
    backgroundColor: "rgba(53, 5, 5, 0.3)",
  },
};

const initForm = {
  name: "",
  img: "",
  members: [],
  admin: "",
  descripcion: "",
  privacidad: "",
  tipo: "",
};
const initStep = {
  stepCurrent: 1,
};

export const ChatHeardLeft = () => {
  const { socket } = useContext(SocketContext);

  const [step, setStep] = useState(initStep);
  const [formValues, setFormValues] = useState(initForm);
  const [contenedorCrear, setContenedorCrear] = useState(false);
  const [contenedorOpt, setContenedorOpt] = useState(false);
  const [modalGrupo, setmodalGrupo] = useState(false);
  const [modalChanel, setModalChanel] = useState(false);
  
  const [searchUser, setSearchUser] = useState("");
  let [usersSelect, setUsersSelect] = useState([]);
  let [usersList, setUserList] = useState([]);
  const [imgData, setImgData] = useState(null);

  const { stepCurrent } = step;

  //Handles
  const handleStepActual = (valor) => {
    if (valor == "anterior") {
      setStep({
        ...step,
        stepCurrent: stepCurrent - 1,
      });
    } else if (valor == "siguiente") {
      setStep({
        ...step,
        stepCurrent: stepCurrent + 1,
      });
    }
  };

  const handleOpenCreateChat = () => {
    setContenedorCrear(!contenedorCrear);
    if (contenedorOpt) {
      setContenedorOpt(false);
    }
  };
  const handleOpenOptChat = () => {
    setContenedorOpt(!contenedorOpt);
    if (contenedorCrear) {
      setContenedorCrear(false);
    }
  };
  /***********************************************************
SUBIDA DE ARCHIVOS
**********************************************************/

  const [selectedFile, setSelectedFile] = useState("");

  const imageHandleChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile.name);
      formValues.img = selectedFile;
    }
  }, [selectedFile]);
  /************************************ */
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleOpenModal = () => {
    initForm.tipo = "grupo";
    initForm.privacidad = "privado";
    setmodalGrupo(true);
  };
  const handleOpenModalAddChanel = () => {
    initForm.privacidad = "publico";
    initForm.tipo = "canal";
    setModalChanel(true);
  };

  const closeModal = (e) => {
   
    setUsersSelect([]);
    setmodalGrupo(false);
    setModalChanel(false);
    setContenedorOpt(false);
    setStep(initStep);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userStartLoading());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);
  const { uid } = useSelector((state) => state.auth);

  // const userChat = users.filter((user) => {
  //   return user.id !== uid;
  // });
  useEffect(() => {
    setUserList(
      users.filter((user) => {
        return user.id !== uid;
      })
    );
  }, [users,dispatch,modalGrupo,modalChanel]);



  /************************************
   * FUNCION FILTRAR/BUCAR USUARIOS *
   ***********************************/
  const handlChangeUser = (e) => {
    e.preventDefault();
    setSearchUser(e.target.value);
  };
  const filteredUsers = useMemo(
    () =>
    users.filter((user) => {
  if(user.id !==uid){
    return `${user.name} ${user.segundoNombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`
    .toLowerCase()
    .includes(searchUser.toLowerCase());
  }
      }),
    [usersList, searchUser]
  );
/*************************************** */
  const filteredUsersGC = useMemo(
    () =>
    usersList.filter((user) => {
  if(user.id !==uid){
    return `${user.name} ${user.segundoNombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`
    .toLowerCase()
    .includes(searchUser.toLowerCase());
  }

      }),
    [usersList,usersSelect, searchUser,]
  );

  /************************************
   * FUNCION BUSCAR/REMOVER USUARIOS *
   ***********************************/
   const handleSelectUser = (j,user) => {
    setUsersSelect([...usersSelect, user]);
    for(let i=0;i<usersList.length;i++){
      if(usersList[i].id===user.id){
        usersList.splice(i, 1);
      }
    }
  };
  /***************************************/
  const handleRemoveUser = (i,user) => {
    setUserList([...usersList, user]);
    usersSelect.splice(i, 1);
    console.log(i,'+',user);
  };

  /************************************
   PREACTIVAR CHAT PERSONAL
   ***********************************/
  const handlePreActiveChat = (preActiveUser) => {
    dispatch(infoChatClosed());
    console.log(preActiveUser);
    dispatch(activarChat(preActiveUser));
    setContenedorCrear(false);
  };
  /************************************
   CREAR SALA DE CHAT
   ***********************************/
  const handleCreateChat = async (e) => {
    formValues.members = [];
    e.preventDefault();
    const formData = new FormData();
    formData.set("img", formValues.img);
    usersSelect.forEach((user) => formValues.members.push(user.id));
    try {
      const resp = await fetchConAxios("multimedias", formData, "POST");
      const body = await JSON.stringify(resp.data.multimedia);
      if (body) {
        formValues.img = body.replace(/['"]+/g, "");
        formValues.admin = uid;
        formValues.members.push(uid);
      } else {
        // Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      }
    } catch (error) {
      console.log(error);
    }
    await socket.emit("create-sala-chat", {
      data: formValues,
    });
    closeModal();
    e.target = null;
  };


  return (
    <div className="chat__left-heard">
      <div className="chat__left-heard-left">
        <h4>Chats</h4>
      </div>
      <div className="chat__left-heard-right">
        <div
          className="chat__left-heard-right-icon"
          onClick={() => {
            handleOpenCreateChat();
          }}
        >
          <i class="fas fa-plus"></i>
        </div>
        {contenedorCrear && (
          <div className="contenedor__iniciar-chat">
            <div className="contenedor__iniciar-chat-header">Nuevo chat</div>
            <div className="contenedor__iniciar-chat-body">
              <div className="contenedor__iniciar-chat-body-search">
                <input
                  // style={{ textTransform: "lowercase" }}
                  type="text"
                  placeholder="Buscar"
                  onChange={handlChangeUser}
                  value={searchUser}
                />
              </div>
              <div className="contenedor__iniciar-chat-body-list">
                {filteredUsers.map((usersList) => (
                  <div
                    className="contenedor__iniciar-chat-body-item"
                    onClick={() => {
                      handlePreActiveChat(usersList);
                    }}
                  >
                    <div className="contenedor__iniciar-chat-body-item-left">
                      <img src={usersList.imgusuario} />
                    </div>
                    <div className="contenedor__iniciar-chat-body-item-right">
                      {usersList.name} {usersList.segundoNombre} <br />
                      {usersList.apellidoPaterno} {usersList.apellidoMaterno}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          className="chat__left-heard-right-icon"
          onClick={() => {
            handleOpenOptChat();
          }}
        >
          <i class="fas fa-ellipsis-h"></i>
        </div>
        {contenedorOpt && (
          <div className="contenedor__option-chat">
            <button
              className="contenedor__option-chat-btn"
              onClick={() => {
                handleOpenModal();
              }}
            >
              Crear nuevo grupo
            </button>
            <button
              className="contenedor__option-chat-btn"
              onClick={() => {
                handleOpenModalAddChanel();
              }}
            >
              Crear nuevo canal
            </button>

            <div>
              {stepCurrent == 1 ? (
                <Modal
                  isOpen={modalGrupo}
                  onRequestClose={closeModal}
                  style={customStyles}
                  closeTimeoutMS={1}
                  // className="modal modal-publicacion"
                  // overlayClassName="modal-fondo"
                >
                  <div className="creategrupo__modal">
                    <div className="creategrupo__modal-body">
                      <div className="creategrupo__modal-body-top">
                        {imgData ? (
                          <div className="creategrupo__modal-body-picture">
                            <img src={imgData} />
                          </div>
                        ) : (
                          <div className="creategrupo__modal-body-picture">
                            <input
                              type="file"
                              id="file"
                              name="file"
                              hidden
                              onChange={imageHandleChange}
                              accept=".img,.png,.mp4,.jpg,.jepg"
                            />
                            <label for="file">
                              <i class="fas fa-camera"></i>
                            </label>
                          </div>
                        )}
                        <div className="creategrupo__modal-body-name">
                          <input
                            type="text"
                            placeholder="nombre del grupo"
                            name="name"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="creategrupo__modal-footer">
                      <button
                        className="birthday__modal-btn"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        className="birthday__modal-btn"
                        type="button"
                        onClick={() => {
                          handleStepActual("siguiente");
                        }}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </Modal>
              ) : (
                <Modal
                  isOpen={modalGrupo}
                  onRequestClose={closeModal}
                  style={customStyles}
                  closeTimeoutMS={1}
                  // className="modal modal-publicacion"
                  // overlayClassName="modal-fondo"
                >
                  <form
                    className="createcanal__modal"
                    onSubmit={handleCreateChat}
                  >
                    <div className="createcanal__modal-header">
                      Añadir miembros
                    </div>
                    <div className="createcanal__modal-body">
                      <div className="chat__userlected">
                        {usersSelect.map((usersSelect,i) => (
                          <div
                            key={i}
                            className="chat__userlected-item"
                            onClick={() => {
                              handleRemoveUser(i,usersSelect);
                            }}
                          >
                            <img src={usersSelect.imgusuario} />
                            <div>{usersSelect.name} {i}</div>
                          </div>
                        ))}
                      </div>
                      <div className="createcanal__modal-body-search">
                        <input type="text" placeholder="Buscar" onChange={handlChangeUser} value={searchUser} />
                      </div>
                      <div className="createcanal__modal-body-users">
                        {filteredUsersGC.map((usersList,i) => (
                          <div
                            key={i}
                            className="contenedor__iniciar-chat-body-item"
                            onClick={() => {
                              handleSelectUser(i,usersList);
                            }}
                          >
                            <div className="contenedor__iniciar-chat-body-item-left">
                              <img src={usersList.imgusuario} />
                            </div>
                            <div className="contenedor__iniciar-chat-body-item-right">
                              {usersList.name} {usersList.segundoNombre} <br />
                              {usersList.apellidoPaterno}{" "}
                              {usersList.apellidoMaterno}  {i}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="creategrupo__modal-footer">
                      <button
                        className="birthday__modal-btn"
                        type="button"
                        onClick={() => {
                          handleStepActual("anterior");
                        }}
                      >
                        Volver
                      </button>
                      <button type="submit" className="birthday__modal-btn">
                        Crear
                      </button>
                    </div>
                  </form>
                </Modal>
              )}
            </div>

            <div>
              {stepCurrent == 1 ? (
                <Modal
                  isOpen={modalChanel}
                  onRequestClose={closeModal}
                  style={customStyles}
                  closeTimeoutMS={1}
                  // className="modal modal-publicacion"
                  // overlayClassName="modal-fondo"
                >
                  <div className="creategrupo__modal">
                    <div className="creategrupo__modal-body">
                      <div className="creategrupo__modal-body-top">
                        {imgData ? (
                          <div className="creategrupo__modal-body-picture">
                            <img src={imgData} />
                          </div>
                        ) : (
                          <div className="creategrupo__modal-body-picture">
                            <input
                              type="file"
                              id="file"
                              name="file"
                              hidden
                              onChange={imageHandleChange}
                              accept=".img,.png,.mp4,.jpg,.jepg"
                            />
                            <label for="file">
                              <i class="fas fa-camera"></i>
                            </label>
                          </div>
                        )}
                        <div className="creategrupo__modal-body-name">
                          <input
                            type="text"
                            placeholder="Nombre del canal"
                            name="name"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="creategrupo__modal-body-bottom">
                        <div className="creategrupo__modal-body-descripcion">
                          <input
                            type="text"
                            placeholder="Descripcion del canal"
                            name="descripcion"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="creategrupo__modal-footer">
                      <button
                        className="birthday__modal-btn"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        className="birthday__modal-btn"
                        type="button"
                        onClick={() => {
                          handleStepActual("siguiente");
                        }}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </Modal>
              ) : (
                <Modal
                  isOpen={modalChanel}
                  onRequestClose={closeModal}
                  style={customStyles}
                  closeTimeoutMS={1}
                  // className="modal modal-publicacion"
                  // overlayClassName="modal-fondo"
                >
                  <form
                    className="createcanal__modal"
                    onSubmit={handleCreateChat}
                  >
                    <div className="createcanal__modal-header">
                      Añadir miembros
                    </div>
                    <div className="createcanal__modal-body">
                      <div className="chat__userlected">
                        {usersSelect.map((usersSelect,i) => (
                          <div
                            key={i}
                            className="chat__userlected-item"
                            onClick={() => {
                              handleRemoveUser(i,usersSelect);
                            }}
                          >
                            <img src={usersSelect.imgusuario} />
                            <div>{usersSelect.name}</div>
                          </div>
                        ))}
                      </div>
                      <div className="createcanal__modal-body-search">
                        <input type="text" placeholder="Buscar" />
                      </div>
                      <div className="createcanal__modal-body-users">
                        {filteredUsersGC.map((usersList,i) => (
                          <div
                            key={i}
                            className="contenedor__iniciar-chat-body-item"
                            onClick={() => {
                              handleSelectUser(i,usersList);
                            }}
                          >
                            <div className="contenedor__iniciar-chat-body-item-left">
                              <img src={usersList.imgusuario} />
                            </div>
                            <div className="contenedor__iniciar-chat-body-item-right">
                              {usersList.name} {usersList.segundoNombre} <br />
                              {usersList.apellidoPaterno}{" "}
                              {usersList.apellidoMaterno}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="creategrupo__modal-footer">
                      <button
                        className="birthday__modal-btn"
                        type="button"
                        onClick={() => {
                          handleStepActual("anterior");
                        }}
                      >
                        Volver
                      </button>
                      <button type="submit" className="birthday__modal-btn">
                        Crear
                      </button>
                    </div>
                  </form>
                </Modal>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
