import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmailStartAddNew } from "../../actions/correo";
import { useForm } from "../../hooks/useForm";

// or




export const GetPassword = () => {
  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm( {
    lEmail: ''
    
  } );
  
  const {lEmail} = formLoginValues;
  

  const handleCreateCorreo = (e) => {
    e.preventDefault();

    
    console.log();

      dispatch(sendEmailStartAddNew(lEmail));
    
  };
  return (
    <div className="getPassword1">
      <div className="caja1">
        <form className="formulario1" onSubmit={handleCreateCorreo}>
          <h3 className="titulo1">Recuperar clave</h3>
          <h3 className="indicacion1">Ingresa tu correo y te enviaremos las instrucciones para cambiar tu contraseña</h3>



          <div>
            <i class="fas fa-user"></i>
            <span>
              {" "}
              <input
                className="texto1"
                type="email"
                placeholder="Email"
                name="lEmail"
                onChange={handleLoginInputChange}
              />
            </span>
          </div>

          <button className="boton1" type="submit" >
           
           Recuperar Clave
        
          </button>


        </form>
      </div>
    </div>
  );
};
