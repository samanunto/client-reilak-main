import React, { useState } from "react";
import { ModalPublicacion } from "./ModalPublicacion";
import { ListaPublicaciones } from "./ListaPublicaciones";

import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';


export const Publicaciones = () => {


  const dispatch = useDispatch();

  const handleClickNew = () => {
      dispatch(uiOpenModal());
  }

  const {rol} = useSelector(state => state.auth)
  return (
    <div className="publicaciones">

{(rol==='Administrador') &&
      <button  className="btn__publicar" onClick={handleClickNew}><span><i class="fas fa-plus"></i> Crear publicacion</span></button>
}

      <ModalPublicacion />
      <ListaPublicaciones />
    </div>
  );
};
