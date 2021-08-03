import React from 'react'

//Screens
import { CRUDEventos } from './CRUDEventos';
import { ListaDeEventos, ListaDeReuniones } from './ListasEventos';


export const EventosScreen2 = () => {

    return (
        <div className="main__home">
            {/* CONTENEDOR CRUD */} 
            <CRUDEventos/>
            {/* CONTENEDOR LISTA EVENTOS */}
            <ListaDeEventos/>
            {/* CONTENEDOR LISTA REUNIONES*/}
            <ListaDeReuniones/>
        </div>
    )
}