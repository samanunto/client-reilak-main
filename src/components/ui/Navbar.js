import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import {
  notificacionStartLoading,
  notificacionStartUpdate,
} from "../../actions/events";
import moment from "moment";

export const Navbar = () => {
  const { name, uid, imgusuario } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  let aquamarina = [];
  let visto = [];
  const { notificacion } = useSelector((state) => state.Notification);
  const notificationIds = notificacion.map(
    (notificacion) => notificacion.vistopor
  );
  const green = notificacion[0];
  if (green) {
    aquamarina = green.id;
    visto = green.vistopor;
  }

  const handleVerNotificacion = (uid, aquamarina) => {

    const prueba = { uid, aquamarina };

    dispatch(notificacionStartUpdate(aquamarina));
  };
  useEffect(() => {
    dispatch(notificacionStartLoading());
  }, []);
  return (
    <div class="topnav" id="myTopnav">
      <a classname="titulo-navbar-ysm" href="/" class="active">Reilak</a>
      <div class="topnav-right">
        <a href="#news"><img src={imgusuario} height="30px" width='30px' style={{borderRadius:'50%'}} /></a>
        <a href="/perfil">{name}</a>
        <a href="#"
          class="nav-item dropdown"
          activeClassName="active"
          className="nav-item nav-link "
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => {
            handleVerNotificacion(uid, aquamarina);
          }}
        >

          {
            visto != "" ? (
              visto.includes(uid) ? (
                <i
                  className="fas fa-bell navbar-iconos"
                  style={{ color: "$iconos" }}
                ></i>
              ) : (
                <i
                  className="fas fa-bell navbar-iconos"
                  style={{ color: "red" }}
                ></i>
              )
            ) : (
              <i
                className="fas fa-bell navbar-iconos"
                style={{ color: "$iconos" }}
              ></i>
            )
          }

          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <h6 class="dropdown-header nombre">Notificaciones</h6>

            <div className="dropdown-divider"></div>
            {notificacion.map(({ descripcion, fecha }, i) => (
              <a
                className="dropdown-item rounded border border-secondary"
                href="/"
              >
                {" "}
                {descripcion} el{" "}
                {moment(fecha).format("DD-MM-YYYY, h:mm a")}
              </a>
            ))}
          </div>

        </a>
        <a href="/configuracion"><i class="fas fa-cog navbar-iconos"></i></a>
        <a href="#"><i class="fas fa-sign-out-alt navbar-iconos" onClick={handleLogout}></i></a>
      </div>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
    </div>

  )
}