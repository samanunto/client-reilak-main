import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListaEventos } from '../eventos/ListaEventos';
import { MantenedorEvento } from '../eventos/MantenedorEvento';

export const EventosScreen = () => {

  const useractual = useSelector(state => state.auth);

  return (
    <div className="main__home">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="container_tareas rounded border border-secondary">
                    {(useractual.rol == "Administrador" || "Jefatura") ?
                      <div className="col-6">
                        <div className="row-top">
                        </div>
                        <div className="row">
                          <MantenedorEvento />
                        </div>
                        <div className="row-bot">
                        </div>
                      </div>
                      :
                      ""}
                    <div className="col">
                      <div className="row-top">
                      </div>
                      <div className="col col-tabla">
                        <div className="lista">
                          <h1 className="titulo-tarea2">Lista Eventos</h1>
                          <div>
                            <ListaEventos />
                          </div>
                        </div>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </div>
                </div>
                <div className="row-bot">
                </div>
              </div>
              <div className="col">
              </div>
            </div>
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}