import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const Login = () => {

  const dispatch = useDispatch();

const [ formLoginValues, handleLoginInputChange ] = useForm( {
  lEmail: '',
  lPassword: '',

} );

const {lEmail, lPassword} = formLoginValues;


const handleLogin = (e) => {
  e.preventDefault();

  dispatch(startLogin(lEmail, lPassword));
}

  return (
    <div className="login">
      <div className="caja">
        <form className="formulario" onSubmit={handleLogin}>
          <h3 className="titulo">Reilak</h3>

          <div>

            <span>
            <i class="fas fa-user"></i>
               <input
              className="texto"
              type="text"
              placeholder="Email"
              name="lEmail"
              value={lEmail}
              onChange={handleLoginInputChange}
            /></span>
          </div>

          <div>

            <span>
            <i class="fas fa-lock"></i>
               <input
              className="texto"
              type="password"
              placeholder="Password"
              name="lPassword"
              value={lPassword}
              onChange={handleLoginInputChange}
            /></span>
          </div>

          <button className="boton" type="submit">

              Iniciar sesion

          </button>

          <div className="foterlogin">
            <h1 className="recuperarClave">

              <a href="getPassword" className="link">
                {" "}
                ¿No tienes tu clave?{" "}
              </a>{" "}
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};