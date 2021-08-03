import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
//DATE
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
//MODAL
import Modal from 'react-modal';
import { uiOpenModal, uiCloseModal } from '../../actions/ui';
//ALERTAS
import Swal from 'sweetalert2';
//Screens
//ACTIONS
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

export const CRUDEventos = () => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initEvent);
    const { uid } = useSelector(state => state.auth);
    const { modalOpen } = useSelector(state => state.ui);
    const { users } = useSelector(state => state.users);
    const { events, activeEvents } = useSelector(state => state.events);
    const [titleValid, setTitleValid] = useState(true);

    const [usersSelect, setUsersSelect] = useState([]);
    const [usersList, setUserList] = useState([]);
    useEffect(() => {
        setUserList(
            users.filter((user) => {
                return user.id !== uid;
            })
        );
    }, []);

    //STEPPER
    const {
        //Stepper
        stepActual = 1,
        eleccion,
        titulo,
        descripcion,
        start,
        end,
        tipo,
        usuariosevent
    } = formValues;

    useEffect(() => {
        if (activeEvents) {
            setFormValues(activeEvents);
        } else {
            setFormValues(initEvent);

        }
    }, [events, setFormValues])
    
    //HANDLES

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

    const handleUsuariosEvento = (id) => {
        function checkAdult(age) {
            return age == id;
        }
        const resultado = usuariosevent.find(checkAdult);
        console.log(resultado);
        function checkAdulti(ages) {
            return ages == id;
        }
        const resultadoindex = usuariosevent.findIndex(checkAdulti);
        if (resultado === id) {
            usuariosevent.splice(resultadoindex, 1);
            return "estaba";
        } else {
            usuariosevent.push(id);
            console.log(usuariosevent);
            setFormValues({
                ...formValues,
                usuariosevent: usuariosevent
            });
            return "noestaba";
        }

    };


    const handleInputChange = ({ target }) => {
        console.log("llegue aqui");
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleStepperEleccion = (valor) => {
        if (valor == "Evento") {
            setFormValues({
                ...formValues,
                tipo: valor,
                stepActual: stepActual + 1,
                eleccion: valor
            });
        } else if (valor == "Reunion") {
            setFormValues({
                ...formValues,
                tipo: valor,
                stepActual: stepActual + 1,
                eleccion: valor
            });
        }
    }

    const handleIntegrantesReunion = (valor) => {
        dispatch(uiOpenModal());
    }

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

    const handleSelectUser = (
        i,
        id,
        name,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        imgusuario
    ) => {
        setUsersSelect([
            ...usersSelect,
            {
                id: id,
                name: name,
                segundoNombre: segundoNombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                imgusuario: imgusuario,
            },
        ]);
        console.log(usersSelect);
        console.log(users);
        usersList.splice(i, 1);
    };

    const handleRemoveUser = (
        i,
        id,
        name,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        imgusuario
    ) => {
        setUserList([
            ...usersList,
            {
                id: id,
                name: name,
                segundoNombre: segundoNombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                imgusuario: imgusuario,
            },
        ]);
        usersSelect.splice(i, 1);
    };

    //MODAL
    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
    }

    return (
        <div className="contenedor-crud-eventos-ysm">
            {(stepActual == 1) ?
                <form className="form-eventos" onSubmit={handleSubmitForm}>
                    <div className="header-crud-eventos-ysm">
                        <div className="titulo-crud-eventos-ysm">Eleccion</div>
                    </div>
                    <div className="body-crud-eventos-ysm">

                        <div class="espacios-body-eventos-ysm">

                        </div>
                        <div class="contenedor-card-eleccion-ysm">
                            <div class="card card1-eleccion-ysm">
                                <div class="titulo-eleccion-ysm">
                                    <h4><b>Evento</b></h4>
                                </div>
                                <div class="icono-eleccion-ysm">
                                    <i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepperEleccion("Evento"); }} />
                                </div>
                            </div>
                            <div class="card card2-eleccion-ysm">
                                <div class="titulo-eleccion-ysm">
                                    <h4><b>Reunión</b></h4>
                                </div>
                                <div class="icono-eleccion-ysm">
                                    <i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepperEleccion("Reunion"); }} />
                                </div>
                            </div>
                        </div>
                        <div class="espacios-body-eventos-ysm">

                        </div>
                    </div>
                </form>
                :
                (stepActual == 2 && eleccion == "Evento") ?
                    <form className="form-eventos" onSubmit={handleSubmitForm}>
                        <div className="header-crud-eventos-ysm">
                            <div className="titulo-crud-eventos-ysm">{(activeEvents) ? 'Editar evento' : 'Nuevo evento'}</div>
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
                                    className="input-eventos-ysm"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleEndDateChange}
                                    value={dateEnd}
                                    minDate={dateStart}
                                    className="input-eventos-ysm"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <button class="button button2">{(activeEvents) ? 'Editar evento' : 'Nuevo evento'}</button>
                            </div>
                        </div>
                    </form>
                    :
                    (stepActual == 2 && eleccion == "Reunion") ?
                        <form className="form-eventos" onSubmit={handleSubmitForm}>
                            <div className="header-crud-eventos-ysm">
                                <div className="titulo-crud-eventos-ysm">{(activeEvents) ? 'Editar reunión' : 'Nueva reunión'}</div>
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
                                        className="input-eventos-ysm"
                                    />
                                </div>
                                <div className="input-contenedor-eventos-ysm">
                                    <DateTimePicker
                                        onChange={handleEndDateChange}
                                        value={dateEnd}
                                        minDate={dateStart}
                                        className="input-eventos-ysm"
                                    />
                                </div>
                                <div className="input-contenedor-eventos-ysm">
                                    <button class="button button2" onClick={() => { handleIntegrantesReunion("siguiente"); }}>{(activeEvents) ? 'Editar reunión' : 'Nueva reunión'}</button>
                                </div>
                            </div>
                            <Modal
                                isOpen={modalOpen}
                                //   onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                closeTimeoutMS={200}
                                className="modal-eventos-ysm"

                            >
                                <div className="titulo-modal-ysm">Integrantes</div>
                                <div className="agregados-modal-ysm">
                                    {usersSelect.map(({ id, name, segundoNombre, apellidoPaterno, apellidoMaterno, imgusuario }, i) =>
                                        <div className="si-integrante-modal-ysm" onClick={() => { handleRemoveUser(i, id, name, segundoNombre, apellidoPaterno, apellidoMaterno, imgusuario); }}>
                                            <div className="img-integrante-ysm">
                                                <img className="img-integrantes-eventos" src={imgusuario}></img>
                                            </div>
                                            <div className="nombre-integrante-ysm">
                                                {name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="lista-modal-ysm">
                                    {usersList.map(({ id, name, segundoNombre, apellidoPaterno, apellidoMaterno, imgusuario }, i) =>
                                        <div className="no-integrante-modal-ysm" onClick={() => { handleSelectUser(i, id, name, segundoNombre, apellidoPaterno, apellidoMaterno, imgusuario); }}>
                                            <div className="img-integrante-ysm">
                                                <img className="img-integrantes-eventos" src={imgusuario}></img>
                                            </div>
                                            <div className="nombre-integrante-ysm">
                                                {name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="button-modal-ysm">
                                    <button type="submit" className="btn__felicitar" onClick={() => { closeModal(); }}>
                                        Finalizar
                                    </button>
                                </div>
                            </Modal>
                        </form>
                        :
                        ""
            }

        </div>
    )
}