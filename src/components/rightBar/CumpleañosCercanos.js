import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { birthdayStartAddNew, birthdayStartLoading } from "../../actions/cumpleaños";
import Modal from "react-modal";

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

const initMessage = {
  message: "",
  felicitado: "",
};

export const CumpleañosCercanos = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initMessage);


  useEffect(() => {
    dispatch(birthdayStartLoading());
  }, []);
  const { birthday } = useSelector((state) => state.birthday);
  console.log(birthday);

  const [modal, setModal] = useState(false);

  const handleOpenModal = (id) => {
    setModal(true);
    formValues.felicitado=id;
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const handleCreateMessage = (e)=>{
   e.preventDefault();
    dispatch(birthdayStartAddNew(formValues));
    setModal(false);
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  return (
    <div className="cumpleaños">
      <div className="cumpleaños__header">
        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/hq-o6A7TPpe.png?_nc_eui2=AeGGU6A8aXOypIv04S6g_xh1IDgIyy_WVG8gOAjLL9ZUb6p6DkCMUcdiSXRkwm5okpLKOc7SM8byc76OqjwogCUI" />
        <div> cumpleaños del dia</div>
      </div>
      <div className="cumpleaños__body">
        {birthday != 0 ?
        birthday.map(
          (
            {
              name,
              segundoNombre,
              apellidoPaterno,
              apellidoMaterno,
              imgusuario,
              id,
            },
            i
          ) => (
            <div className="cumpleaños__body-item">
              <div className="cumpleaños__body-item-top">
                <img src={imgusuario} />
                <div>
                  {name} {segundoNombre} <br />
                  {apellidoPaterno} {apellidoMaterno}
                </div>
              </div>
              <div className="cumpleaños__body-item-bottom">
                <button className="btn__felicitar" onClick={()=>{handleOpenModal(id)}}>
                  Dedicar un mensaje
                </button>
              </div>
            </div>
          )
        )
        :
      (<div className="nobirthdays">
        Hoy no hay cumpleaños 
      </div>)
        }
      </div>

      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={1}
        // className="modal modal-publicacion"
        // overlayClassName="modal-fondo"
      >
        <form className="birthday__modal" onSubmit={handleCreateMessage}>
          <div className="birthday__modal-header">
            Dedicale unas palabras en su dia
          </div>
          <div className="birthday__modal-body">
            <input type="text" placeholder="Dedicale un mensaje" name="message" autoComplete="off" onChange={handleInputChange} />
          </div>
          <div className="birthday__modal-footer">
            <button type="submit" className="birthday__modal-btn">Enviar</button>
            <button className="birthday__modal-btn" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
