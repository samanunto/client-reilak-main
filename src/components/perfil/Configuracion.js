import React from "react";
import { useSelector } from "react-redux";



// const {uid} = useSelector(state => state.auth)


//   const handleInputChange = ({ target }) => {

//     setFormValues({
//       ...formValues,
//       [target.name]: target.value,
//     });
//   };








export const Configuracion = () => {
  const {uid} = useSelector(state => state.auth)


  return (
    <div className="configuracion">
      <span className="configuracion__titulo">Ajustes de cuenta</span>
      <form className="form__ajuste">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Nueva contraseña
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label" >
            Añadir correo personal
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Cambiar numero de telefono
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        {/* <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Cambiar foto perfil
          </label>
          <input type="file" class="form-control" id="customFile" />
        </div> */}
{/* 
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
          Cumpleaños
          </label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Visible
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Oculto
            </label>
          </div>
        </div> */}

        <button type="submit" class="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
};
