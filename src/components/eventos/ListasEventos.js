import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import {
    eventsStartLoading,
    eventsStartDelete, 
    eventsSetActive 
} from "../../actions/eventos";

//LISTAR EVENTOS

export const ListaDeEventos = () => {
    //Handles
    const eliminarEvento = (id) => {
        dispatch(eventsStartDelete(id));
    };

    const editarUsuario = (id, titulo, descripcion, fecha) => {
        const prueba = { id, titulo, descripcion, fecha };
        dispatch(eventsSetActive(prueba));
    };
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(eventsStartLoading());

    }, [dispatch])
    const { events } = useSelector(state => state.events);
    return (
        <div className="contenedor-lista-eventos-ysm">
            <div className="header-crud-eventos-ysm">
                <div className="titulo-crud-eventos-ysm">Lista Eventos</div>
            </div>
            <div className="body-listaeventos-eventos-ysm">
                {events.map(({ titulo, tipo, id, descripcion, start, end }, i) =>
                    (tipo == "Evento") ?
                        <div className="contenedor-card-listaeventos-eventos-ysm">
                            <div class="card card-eventos-ysm">
                                <div class="header-card-eventos-ysm ">
                                    <h4>{titulo}</h4>
                                </div>
                                <div class="body-card-eventos-ysm">
                                    <p>{descripcion}</p>
                                </div>
                                <div class="footer-card-eventos-ysm ">
                                    <div class="izquierda-footer-card-eventos-ysm ">
                                        <i className="fas fa-trash iconos-lu iconos-eventos-ysm" onClick={() => { eliminarEvento(id); }}></i>
                                    </div>
                                    <div class="mitad-footer-card-eventos-ysm ">
                                        <div class="fechainicio-mitad-footer-eventos-ysm ">
                                            {moment(start).format("DD-MM-yy")}
                                        </div>
                                        <div class="fechafin-footer-card-eventos-ysm ">
                                            {moment(end).format("DD-MM-yy")}
                                        </div>
                                    </div>
                                    <div class="derecha-footer-card-eventos-ysm ">
                                        <i className="fas fa-pencil-alt iconos-lu iconos-eventos-ysm"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        :
                        ""
                )}
            </div>
        </div>
    )
}

export const ListaDeReuniones = () => {

    //Handles
    const eliminarEvento = (id) => {
        dispatch(eventsStartDelete(id));
    };

    const editarUsuario = (id, titulo, descripcion, fecha) => {
        const prueba = { id, titulo, descripcion, fecha };
        dispatch(eventsSetActive(prueba));
    };

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(eventsStartLoading());

    }, [dispatch])
    const { events } = useSelector(state => state.events);
    return (
        <div className="contenedor-lista-eventos-ysm">
            <div className="header-crud-eventos-ysm">
                <div className="titulo-crud-eventos-ysm">Lista Reuniones</div>
            </div>
            <div className="body-listaeventos-eventos-ysm">
                {events.map(({ titulo, tipo, id, descripcion, start, end }, i) =>
                    (tipo == "Reunion") ?
                        <div className="contenedor-card-listaeventos-eventos-ysm">
                            <div class="card card-eventos-ysm">
                                <div class="header-card-eventos-ysm ">
                                    <h4>{titulo}</h4>
                                </div>
                                <div class="body-card-eventos-ysm">
                                    <p>{descripcion}</p>
                                </div>
                                <div class="footer-card-eventos-ysm ">
                                    <div class="izquierda-footer-card-eventos-ysm ">
                                        <i className="fas fa-trash iconos-lu iconos-eventos-ysm" onClick={() => { eliminarEvento(id); }}></i>
                                    </div>
                                    <div class="mitad-footer-card-eventos-ysm ">
                                        <div class="fechainicio-mitad-footer-eventos-ysm ">
                                            {moment(start).format("DD-MM-yy")}
                                        </div>
                                        <div class="fechafin-footer-card-eventos-ysm ">
                                            {moment(end).format("DD-MM-yy")}
                                        </div>
                                    </div>
                                    <div class="derecha-footer-card-eventos-ysm ">
                                        <i className="fas fa-pencil-alt iconos-lu iconos-eventos-ysm" onClick={() => { editarUsuario(id, titulo, descripcion, start, end); }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : (tipo != "Reunion") ?
                            ""
                            : (events.length == 0) ?
                                <div className="contenedor-card-listaeventos-eventos-ysm">
                                    <i class="far fa-calendar-times icono-lu"></i>
                                </div>
                                :
                                ""
                )}
            </div>
        </div>
    )
}