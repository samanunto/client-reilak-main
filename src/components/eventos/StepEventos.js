import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

//ALERTAS
import Swal from 'sweetalert2';

import { stepsSetActive } from "../../actions/steps";
import {
  eventsStartUpdate,
  eventsStartAddNew,
} from "../../actions/eventos";

//CALENDARIO
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    titulo: '',
    descripcion: '',
    tipo: '',
    usuariosevent: [],
    start: now.toDate(),
    end: nowPlus1.toDate(),
    stepActual: 1,
    eleccion: ''
  }

  

  
export const StepEleccionEventos = () => {

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initEvent);

  const {
    stepActual,
    eleccion
  } = formValues;

  const handleStepperEleccion = (valor) => {
    if(valor == "Evento"){
        setFormValues({
            ...formValues,
            stepActual: stepActual + 1,     
            eleccion: valor
        });
        console.log("StepActual: "+stepActual)
        console.log("Eleccion: "+eleccion)
        const prueba = { stepActual, valor };
        dispatch(stepsSetActive(prueba));
        console.log(prueba);
    }else if (valor == "Reunion"){
        setFormValues({
            ...formValues,
            stepActual: stepActual + 1,  
            eleccion: "Reunion"    
        });
    }
}

    return (
        <div>
            <div className="body-crud-eventos-ysm">
                <div class="card card-eleccion-ysm"  >
                    <img src="img_avatar.png" alt="Avatar"></img>
                    <div class="container">
                        <h4><b>Evento</b></h4>
                        <Link to="/eventos"><i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepperEleccion("Evento"); }} /></Link>
                    </div>
                </div>
                <div class="card card-eleccion-ysm" onClick={() => { handleStepperEleccion("Reunion"); }}>
                    <img src="img_avatar.png" alt="Avatar"></img>
                    <div class="container">
                        <h4><b>Réunion</b></h4>
                        <p>Architect & Engineer</p>
                    </div>
                </div>
          </div>
        </div>
    )
}

export const StepCrearEvento = () => {
    const { events, activeEvents } = useSelector(state => state.events);
    const [titleValid, setTitleValid] = useState(true);

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initEvent);

  useEffect(() => {
    if (activeEvents) {
      setFormValues(activeEvents);
    } else {
      setFormValues(initEvent);

    }
  }, [events, setFormValues])

  const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleInputChange = ({ target }) => {
        console.log("llegue aqui");
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
    
        const momentStart = moment(start);
        const momentEnd = moment(end);
    
        if (momentStart.isSameOrAfter(momentEnd)) {
          return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }
        if (formValues.titulo == "") {
          return Swal.fire('Error', 'El titulo es obligatorio', 'error');
        }
        if (formValues.descripcion == "") {
          return Swal.fire('Error', 'La descripcion es obligatoria', 'error');
        }
        if (formValues.tipo == "") {
          return Swal.fire('Error', 'El tipo es obligatorio', 'error');
        }
    
        const formData = new FormData();
        formData.set('titulo', formValues.titulo);
        formData.set('descripcion', formValues.descripcion);
        formData.set('start', formValues.start);
        formData.set('end', formValues.end);
        formData.set('tipo', formValues.tipo);
        formData.set('reunion', formValues.usuariosevent);
        console.log(formValues.usuariosevent);
        if (activeEvents) {
          console.log(activeEvents.id);
          formData.set('id', activeEvents.id);
          dispatch(eventsStartUpdate(formData))
        } else {
    
          dispatch(eventsStartAddNew(formData));
        }
    
    
        setTitleValid(true);
    
      }


    const {
        titulo,
        descripcion,
        start,
        end,
        tipo,
        usuariosevent
      } = formValues;
    return (
        <form className="contenedor-crud-eventos-ysm" onSubmit={handleSubmitForm}>
                        <div className="header-crud-eventos-ysm">
                            <div className="titulo-crud-eventos-ysm">{(activeEvents) ? 'Editar evento' : 'Nuevo evento'}</div>
                        </div>
                        <div className="body-crud-eventos-ysm">
                            <div className="input-contenedor-eventos-ysm">
                                <input className="input-eventos-ysm" type="text" name="titulo" value={titulo} placeholder="Ingrese un título..."></input>
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <input className="input-eventos-ysm" type="text" name="descripcion" value={descripcion} placeholder="Ingrese una descripción..."></input>
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleStartDateChange}
                                    value={dateStart}
                                    className="form-control"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleEndDateChange}
                                    value={dateEnd}
                                    minDate={dateStart}
                                    className="form-control"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <button class="button button2">{(activeEvents) ? 'Editar evento' : 'Nuevo evento'}</button>
                            </div>
                        </div>
                    </form>
    )
    
}

export const StepCrearReunion = () => {
    const { events, activeEvents } = useSelector(state => state.events);
    const [titleValid, setTitleValid] = useState(true);

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initEvent);

  useEffect(() => {
    if (activeEvents) {
      setFormValues(activeEvents);
    } else {
      setFormValues(initEvent);

    }
  }, [events, setFormValues])

  const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleInputChange = ({ target }) => {
        console.log("llegue aqui");
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
    
        const momentStart = moment(start);
        const momentEnd = moment(end);
    
        if (momentStart.isSameOrAfter(momentEnd)) {
          return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }
        if (formValues.titulo == "") {
          return Swal.fire('Error', 'El titulo es obligatorio', 'error');
        }
        if (formValues.descripcion == "") {
          return Swal.fire('Error', 'La descripcion es obligatoria', 'error');
        }
        if (formValues.tipo == "") {
          return Swal.fire('Error', 'El tipo es obligatorio', 'error');
        }
    
        const formData = new FormData();
        formData.set('titulo', formValues.titulo);
        formData.set('descripcion', formValues.descripcion);
        formData.set('start', formValues.start);
        formData.set('end', formValues.end);
        formData.set('tipo', formValues.tipo);
        formData.set('reunion', formValues.usuariosevent);
        console.log(formValues.usuariosevent);
        if (activeEvents) {
          console.log(activeEvents.id);
          formData.set('id', activeEvents.id);
          dispatch(eventsStartUpdate(formData))
        } else {
    
          dispatch(eventsStartAddNew(formData));
        }
    
    
        setTitleValid(true);
    
      }


    const {
        titulo,
        descripcion,
        start,
        end,
        tipo,
        usuariosevent
      } = formValues;
    return (
        <form className="contenedor-crud-eventos-ysm" onSubmit={handleSubmitForm}>
                        <div className="header-crud-eventos-ysm">
                            <div className="titulo-crud-eventos-ysm">{(activeEvents) ? 'Editar réunion' : 'Nueva réunion'}</div>
                        </div>
                        <div className="body-crud-eventos-ysm">
                            <div className="input-contenedor-eventos-ysm">
                                <input className="input-eventos-ysm" type="text" name="titulo" value={titulo} onChange={handleInputChange} placeholder="Ingrese un título..."></input>
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <input className="input-eventos-ysm" type="text" name="descripcion" value={descripcion} onChange={handleInputChange} placeholder="Ingrese una descripción..."></input>
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleStartDateChange}
                                    value={dateStart}
                                    className="form-control"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleEndDateChange}
                                    value={dateEnd}
                                    minDate={dateStart}
                                    className="form-control"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <button class="button button2">{(activeEvents) ? 'Editar réunion' : 'Nuevo réunion'}</button>
                            </div>
                        </div>
                    </form>
    )  
}