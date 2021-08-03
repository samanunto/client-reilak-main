import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export const PerfilScreen = () => {
  const {name,uid,email,segundoNombre,apellidoPaterno,apellidoMaterno,area,fono,nacimiento,ingreso,rol,permisos,empresa,cargo,rut,imgusuario} = useSelector(state => state.auth);
  return (
    <div className="main__home">
      <div className="perfil">
        <div className="perfil__contacto">
          <div className="perfil__contacto-foto">
            <div className="foto">
              <i className="fas fa-user-circle perfil-foto"></i>
            </div>
            <div className="nombre">
              <p className="nombre-perfil">{name} {segundoNombre}</p>
              <p className="nombre-perfil">{apellidoPaterno} {apellidoMaterno}</p>
            </div>
            <hr />
            <div className="rut">
              <i class="fas fa-barcode"><span> {rut}</span></i>
              <p>20234985-4</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
              <i class="fas fa-birthday-cake"> <span> Cumpleaños</span></i>
              <p>{moment(nacimiento).format("DD-MM-YYYY")}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <i class="fas fa-envelope"><span> Mail personal</span></i>
              <p>{email}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <i class="fas fa-envelope"><span> Mail corporativo</span></i>
              <p>{email}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <i class="fas fa-mobile"><span> Fono</span></i>
              <p> {fono}</p>
            </div>
          </div>
          
        </div>
        <div className="perfil__empresa">
            <h3>Resumen</h3>
            <br />
            <div className="cumpleaños__perfil">
            <p>Cargo</p>
              <p>{cargo}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <p>Area</p>
              <p>{area}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <p>Empresa</p>
              <p>{empresa}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <p>Fecha ingreso compañia</p>
              <p>{moment(ingreso).format("DD-MM-YYYY")}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <p>Rol</p>
              <p>{rol}</p>
            </div>
            <hr />
            <div className="cumpleaños__perfil">
            <p>Permisos</p>
              <p></p>
            </div>
       
            
        </div>
      </div>
    </div>
  );
};