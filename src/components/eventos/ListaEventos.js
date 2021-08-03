import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { eventsStartLoading } from "../../actions/eventos";

export const ListaEventos = () => {

    const dispatch = useDispatch();

    const { events } = useSelector(state => state.events);

    useEffect(() => {
        dispatch(eventsStartLoading());
    }, [dispatch])

    return (
        <div id="demo" class="carousel slide" data-ride="carousel">


            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>


            <div class="carousel-inner ">
            {events.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
                <div class="carousel-item active">

                    <img className="carousel-card-imagen-ysm" 
                    src={(tipo == "Evento") ? 
                    "https://www.euroaula.com/sites/default/files/master%20organizacion%20de%20eventos_0.jpeg" 
                    : 
                    'https://www.tecnobits.net/wp-content/uploads/2020/05/como-grabar-una-reunion-de-zoom.jpg'
                    } alt="Los Angeles"></img>

                    <div class="carousel-caption">
                        <h3 className="titulo-card-fuente">{titulo}</h3>
                        <p>{moment(start).format("DD-MM-YYYY, h:mm a")} - {moment(end).format("DD-MM-YYYY, h:mm a")}</p>
                    </div>
                </div>
                )}
            </div>


            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>

        </div>
    )
}