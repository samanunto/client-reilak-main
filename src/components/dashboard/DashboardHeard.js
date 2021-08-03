import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardEOTW, dashboardPOTW, dashboardUsersCount, dashboardUsersOnline } from "../../actions/dashboard";

const u = "";

export const DashboardHeard = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(dashboardUsersCount());
      dispatch(dashboardUsersOnline());
      dispatch(dashboardPOTW());
      dispatch(dashboardEOTW());
    }, [dispatch])

    const {dashboard, usuariosonline, publicaionessemanales, eventossemanales} = useSelector(state => state.dashboard);

    return (
        <div className="dashboard__content-heard">
        <div className="dashboard__content-heard-card">
            <div className="dashboard__content-heard-card-icon">
            <i class="fas fa-users fa-3x"></i>
            </div>
            <div className="dashboard__content-heard-card-number">
            {dashboard}
            </div>
            <div className="dashboard__content-heard-card-text">
                Usuarios Registrados
            </div>
        </div>
        <div className="dashboard__content-heard-card">
            <div className="dashboard__content-heard-card-icon">
            <i class="fas fa-signal fa-3x"></i>
            </div>
            <div className="dashboard__content-heard-card-number">
                {usuariosonline}
            </div>
            <div className="dashboard__content-heard-card-text">
                Usuarios en linea
            </div>
        </div>
        <div className="dashboard__content-heard-card">
            <div className="dashboard__content-heard-card-icon">
            <i class="fas fa-cloud-upload-alt fa-3x"></i>
            </div>
            <div className="dashboard__content-heard-card-number">
                {publicaionessemanales}
            </div>
            <div className="dashboard__content-heard-card-text">
                Publicaciones esta semana
            </div>
        </div>
        <div className="dashboard__content-heard-card">
            <div className="dashboard__content-heard-card-icon">
            <i class="fas fa-calendar-alt fa-3x"></i>
            </div>
            <div className="dashboard__content-heard-card-number">
                {eventossemanales}
            </div>
            <div className="dashboard__content-heard-card-text">
                Eventos esta semana
            </div>
        </div>
    </div>
    )
}
