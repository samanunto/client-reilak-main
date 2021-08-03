import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import Modal from "react-modal";

import { uiCloseModal } from "../../actions/ui";
import {
  eventsClearActiveEvent,
  eventsStartAddNew,
  eventsStartUpdate,
} from "../../actions/eventos";

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

const now = moment().minutes(0).seconds(0).add(1, "hours"); // 3:00:00
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  titulo: "",
  descripcion: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { events, activeEvents } = useSelector((state) => state.events);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

  const [formValues, setFormValues] = useState(initEvent);

  const { descripcion, titulo, start, end } = formValues;

  useEffect(() => {
    if (activeEvents) {
      setFormValues(activeEvents);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvents, setFormValues]);

  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal());
    dispatch(eventsClearActiveEvent());
    setFormValues(initEvent);
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
      <h1> Descripcion de evento </h1> <hr />
      <div className="form-group">
        <label> Fecha y hora inicio </label> <br> </br>{" "}
        {moment(start).format("DD-MM-YYYY, h:mm a")}{" "}
      </div>
      <div className="form-group">
        <label> Fecha y hora fin </label> <br> </br>{" "}
        {moment(end).format("DD-MM-YYYY, h:mm a")}{" "}
      </div>
      <hr />
      <br> </br>{" "}
      <div className="form-group">
        <h3> {titulo} </h3>{" "}
      </div>{" "}
      <br> </br> <br> </br>{" "}
      <div className="form-group">
        <label rows="5" name="notes">
          {descripcion}{" "}
        </label>
      </div>{" "}
    </Modal>
  );
};
