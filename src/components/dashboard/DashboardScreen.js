import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardHeard } from "./DashboardHeard";
import { DashboardReports } from "./DashboardReports";
import DataTable, { createTheme } from 'react-data-table-component';
import {eventStartLoading,} from "../../actions/events";

import {
  eventsStartLoading,
} from "../../actions/eventos";

createTheme('solarized', {
  text: {
    primary: '#ffffff',
    secondary: '#ffffff',
  },
  background: {
    default: '#4a484d',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});
export const DashboardScreen = () => {

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(eventStartLoading());

  }, [dispatch])
  useEffect(() => {
    dispatch(eventsStartLoading());

}, [dispatch])
  const { events } = useSelector(state => state.events);
  const { posts } = useSelector(state => state.calendar);

  const columnsPublicaciones = [
    {
      name: 'Titulo',
      selector: 'titulo',
    
    },
    {
      name: 'Publicacion',
      selector: 'contenido',

    },
    {
      name: 'Fecha',
      selector: 'fecha',

    },
  ];

  const columnsEventos = [
    
    {
      name: 'Titulo',
      selector: 'titulo',
    },
    {
      name: 'Descripcion',
      selector: 'descripcion',
    },
    {
      name: 'Fecha evento',
      selector: 'start',
    },

  ];
  
  return (
    <div className="main__home">
      <div className="dashboard__content">
        <DashboardHeard />
        <DashboardReports />
        <div className="dashboard__content-resume">
            <div className="dashboard__content-resume-left">
                <div className="dashboard__content-resume-left-list">
                <DataTable 
        title="Publicaciones"
        columns={columnsPublicaciones}
        data={posts}
        theme="solarized"
        pagination="true"
        paginationPerPage={3}
        />
                </div>
            </div>
            <div className="dashboard__content-resume-right">
                <div className="dashboard__content-resume-right-list">
                <DataTable
        title="Eventos"
        columns={columnsEventos}
        data={events}
        theme="solarized"
        pagination="true"
        paginationPerPage={3}
        />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
