import Modal from "react-modal";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStartLoading } from "../../actions/usuarios";
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
export const MemberTareas = () => {

  const [modalGrupo, setmodalGrupo] = useState(false);
  let [usersSelect, setUsersSelect] = useState([]);
  const [modalTerea, setModalTarea] = useState(false);
  const [modalChanel, setModalChanel] = useState(false);
  const [contenedorOpt, setContenedorOpt] = useState(false);
  let [usersList, setUserList] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const handleOpenModalTarea = () => {
    setModalTarea(true);
    
    //dispatch(tareasSetActive(prueba));
  };
  const handleCloseModal = () => {
    setModalTarea(false);
  };
  const handleOpenModal = () => {

    setmodalGrupo(true);
  };
  const closeModal = (e) => {
   
    setUsersSelect([]);
    //setmodalGrupo(false);
    setModalChanel(false);
    setContenedorOpt(false);
    
  };
  const handleSelectUser = (j,user) => {
    setUsersSelect([...usersSelect, user]);
    for(let i=0;i<usersList.length;i++){
      if(usersList[i].id===user.id){
        usersList.splice(i, 1);
      }
    }
  };
  // /***************************************/
  const handleRemoveUser = (i,user) => {
    setUserList([...usersList, user]);
    usersSelect.splice(i, 1);
    console.log(i,'+',user);
  };
  const handlChangeUser = (e) => {
    e.preventDefault();
    setSearchUser(e.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userStartLoading());
  }, [dispatch]);
  const { uid } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

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
  return (
    <div className="modal__tarea-body-right-content">
      <div className="modal__tarea-body-right-content-title">Participantes</div>
      <div className="modal__tarea-body-right-content-btn">
        <button type="button"               onClick={() => {
                handleOpenModal();
              }}>
        <i class="fas fa-user-plus"></i> Añadir
        </button>
      </div>
      <div className="modal__tarea-body-right-content-list">
        <div className="modal__tarea-body-right-content-list-item">
          <div className="modal__tarea-body-right-content-list-item-img">
            <img src="https://memegenerator.net/img/images/10626113.jpg" />
          </div>
          <div className="modal__tarea-body-right-content-list-item-user">
            jose jara <br /> vidal gomez
          </div>
        </div>
        <div className="modal__tarea-body-right-content-list-item">
          <div className="modal__tarea-body-right-content-list-item-img">
            <img src="https://w7.pngwing.com/pngs/767/1020/png-transparent-anime-face-manga-k-on-4chan-anime-purple-face-black-hair.png" />
          </div>
          <div className="modal__tarea-body-right-content-list-item-user">
            jose ramon <br /> vidal naturana
          </div>
        </div>
      </div>
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
                   // onSubmit={handleCreateChat}
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
                         // handleStepActual("anterior");
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
    </div>
  );
};