import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { chatStartMembers } from "../../actions/chat";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    margin: "0",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#18191A",
  },
  overlay: {
    transition: "opacity .2s ease-in-out",
    backgroundColor: "rgba(53, 5, 5, 0.3)",
  },
};

export const ChatInfo = () => {
  const dispatch = useDispatch();
  const [accordion, setAccordion] = useState(false);
  const [modalGrupo, setmodalGrupo] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalImg, setModalImg] = useState(false);

  const [visible, setVisible] = useState(6);

  const handleShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };
  const handlehideMoreItems = () => {
    setVisible(5);
  };

  const { chatActivo } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatStartMembers(chatActivo.id));
  }, [chatActivo]);

  const { miembros } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);
  console.log(miembros);
  console.log("lenght", miembros.length);

  const handleEditChat = (chatActivo) => {
    setmodalGrupo(true);
  };
  const closeModal = (e) => {
    setmodalGrupo(false);
  };
  const closeModalAdmin = (e) => {
    setModalAdmin(false);
  };
  const handleOpenModalAdmins = () => {
    setModalAdmin(true);
  };
  const handleOpenModalChatImages = () => {
    setModalImg(true);
  };
  const closeModalImg = (e) => {
    setModalImg(false);
  };
  return (
    <div className="chat__info">
      {
        <div className="chat__info-heard">
          <div className="chat__info-heard-photo">
            <img src={chatActivo.img?chatActivo.img:chatActivo.user?chatActivo.user[0].imgusuario:chatActivo.imgusuario} />
          </div>
          <div className="chat__info-heard-info">
            {chatActivo.name}{" "}
{chatActivo.user!==[]?  chatActivo.admin.includes(uid)&&
        <i
        class="fas fa-pencil-alt"
        onClick={() => {
          handleEditChat(chatActivo);
        }}
      ></i>
      :''
}
      

          </div>
          <div className="chat__info-heard-info">
            <span>
              {chatActivo.tipo==='grupo'?'Grupo creado':chatActivo.tipo==='canal'?'Canal creado':'Conversacion iniciada'} el {moment(chatActivo.fecha).format("DD-MM-YYYY")}
            </span>
          </div>
          {chatActivo.tipo==="canal"&&
          <div className="chat__info-heard-info-description">
            <div className="chat__info-heard-info-description-icon">
              <i class="fas fa-info-circle"></i>
            </div>
            <div className="chat__info-heard-info-description-data">
              {chatActivo.descripcion}
            </div>
          </div>
        }
        </div>
      }
      <div className="chat__info-body">
        <div className="chat__info-body-multimedias">
          <div
            className="chat__info-body-multimedias-btn"
            onClick={() => {
              handleOpenModalChatImages(chatActivo);
            }}
          >
            <i class="fas fa-images"></i>
            <span>Imagenes</span>
          </div>
          <div className="chat__info-body-multimedias-btn">
            <i class="fas fa-video"></i>
            <span>Videos</span>
          </div>

          <Modal
            isOpen={modalGrupo}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={1}
            // className="modal modal-publicacion"
            // overlayClassName="modal-fondo"
          >
            <div className="updatechat__modal">
              <div className="updatechat__modal-picture">
                <img src={chatActivo.img} />
                <div className="chat__info-heard-photo-update">
                  <i class="fas fa-camera"></i>
                </div>
              </div>
              <div className="updatechat__modal-data-update">
                <div className="updatechat__modal-form">
                  <input
                    className="updatechat__modal-form-input"
                    type="text"
                    placeholder=" "
                    value={chatActivo.name}
                  />
                  <label for="" class="for__modal-form-input">
                    Nombre
                  </label>
                </div>
                <div className="updatechat__modal-form">
                  <input
                    className="updatechat__modal-form-input"
                    type="text"
                    placeholder=" "
                    value={chatActivo.descripcion}
                  />
                  <label for="" class="for__modal-form-input">
                    Descripcion
                  </label>
                </div>
                <div className="updatechat__modal-info-update-type">
                  <div className="updatechat__modal-info-update-type-left">
                    Tipo
                  </div>
                  <div className="updatechat__modal-info-update-type-right">
                    {chatActivo.privacidad === "privado" ? (
                      <select>
                        <option value="privado">{chatActivo.privacidad}</option>
                        <option value="publico">Publico</option>
                      </select>
                    ) : (
                      <select>
                        <option value="publico">{chatActivo.privacidad}</option>
                        <option value="privado">Privado</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className="updatechat__modal-info-update-members">
                <div
                  className="updatechat__modal-info-update-members-admins"
                  onClick={() => {
                    handleOpenModalAdmins(chatActivo);
                  }}
                >
                  <i class="fas fa-shield-virus"></i>
                  <span>Administradores</span>
                </div>
                <div
                  className="updatechat__modal-info-update-members-admins"
                  onClick={() => {
                    handleOpenModalAdmins(chatActivo);
                  }}
                >
                  <i class="fas fa-user-friends"></i>
                  <span>Usuarios</span>
                </div>
              </div>
              <div className="updatechat__modal-btn">
                <button
                  className="updatechat__modal-btn-opt"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button className="updatechat__modal-btn-opt">Guardar</button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalAdmin}
            onRequestClose={closeModalAdmin}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <div className="modal__users-admin">
              <div className="modal__users-admin-header">
                <div className="modal__users-admin-header-title">
                  Administradores
                </div>
                <div className="modal__users-admin-header-search">
                  <i class="fas fa-search"></i>
                  <input type="text" />
                </div>
              </div>
              <div className="modal__users-admin-body">list-item</div>
              <div className="modal__users-admin-btn">
                <button
                  className="modal__users-admin-btn-opt"
                  onClick={closeModalAdmin}
                >
                  Listo
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={modalImg}
            onRequestClose={closeModalImg}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <div className="modal__chat-images">Aqui van imagenes</div>
          </Modal>

          {/* <div className="chat__info-body-btn">
            <h4>Multimedias adjuntos</h4>
          </div>
          <div className="chat__info-body-medias">
            <div className="chat__info-body-medias-item">
              <img src="https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg" />
            </div>
            <div className="chat__info-body-medias-item">
              <img src="https://i.pinimg.com/originals/c4/76/27/c476278504682e622fabe9b0932098c3.jpg" />
            </div>
            <div className="chat__info-body-medias-item">
              <img src="https://i.pinimg.com/236x/94/40/3b/94403b5f525f63925822e4b329984606--beautiful-gardens-beautiful-things.jpg" />
            </div>
            <div className="chat__info-body-medias-item">
              <ReactPlayer
                url="https://res.cloudinary.com/reilak/video/upload/v1622210036/tye5oigubggkeh5zuu9f.mp4"
                width="100%"
                height="100%"
                controls={true}
                pip="true"
                volume="0.8"
              />
            </div>
          </div> */}
        </div>
{(chatActivo.tipo!=="personal")&&
        <div className="chat__info-body-users">
          <div className="chat__info-body-users-title">
            <div className="chat__info-body-users-title-left">
              <i class="fas fa-user-friends"></i> Participantes
            </div>
            <div className="chat__info-body-users-title-right">
              <i class="fas fa-search"></i> 
              {chatActivo.admin.includes(uid)&&
              <i class="fas fa-user-plus"></i>
              }
              

            </div>
          </div>
          <div className="chat__info-body-users-list">
            {miembros.slice(0, visible).map((miembros, i) => (
              <div className="chat__info-body-users-list-item">
                <div className="chat__info-body-users-list-item-photo">
                  <img src={miembros.imgusuario} />
                  {miembros.online === true && (
                    <span className="chat__info-body-users-list-item-photo-online"></span>
                  )}
                </div>
                <div className="chat__info-body-users-list-item-info">
                  <div className="chat__info-body-users-list-item-info-nombre">
                    {miembros.name} {miembros.segundoNombre} <br />
                    {miembros.apellidoPaterno} {miembros.apellidoMaterno}
                  </div>
                  {miembros.admin.includes(miembros.idusuario) && (
                    <span>Administrador</span>
                  )}
                </div>
              </div>
            ))}
            {miembros.length >= 7 &&
              (miembros.length <= visible ? (
                <div className="btn__show-more" onClick={handlehideMoreItems}>
                  Ocultar datos
                </div>
              ) : (
                <div className="btn__show-more" onClick={handleShowMoreItems}>
                  Mostrar mas...
                </div>
              ))}
          </div>
        </div>
      }
      </div>
    </div>
  );
};
