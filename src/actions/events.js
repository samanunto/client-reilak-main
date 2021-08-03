import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

/************************************
 CREAR PUBLICACION
**************************************/
export const eventStartAddNew = (event) => {
  return async(dispatch,getState ) => {
    const { uid, name } = getState().auth;
    try {
      let load = false;
      if(!load){
        Swal.fire('Espere mientras carga');
        Swal.showLoading()
      }
      const resp = await fetchConAxios("posts", event, "POST");
      
      const body = await JSON.stringify(resp.data.ok);
      console.log(body)
      

      if (body) {
        load=true;
        event.id = body.id;
        event.user = {
          _id: uid,
          name: name,
        };
        // console.log(event);
        dispatch(eventAddNew(event));
        dispatch(eventStartLoading());
        dispatch(notificacionStartLoading());
        Swal.fire('Publicacion creada', '', 'success');
      }else{
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});
/************************************
PUBLICACION ACTIVA
**************************************/
export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});
/************************************
 ACTUALIZAR PUBLICACION
**************************************/
export const eventStartUpdate = (event)=>{
  return async (dispatch) =>{
    try {
      let load = false;
      if(!load){
        Swal.fire('Espere mientras carga');
        Swal.showLoading()
      }
      const resp = await fetchConAxios(`posts/${event.id}`,event, "PUT");
      const body = await JSON.stringify(resp.data.publicacion);
      console.log(body)
      if(body){
        load=true;
        console.log('ok')
        Swal.fire('Publicacion editada', '', 'success');
        dispatch(eventUpdate(event));
        dispatch(eventStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}
const eventUpdate = (event) => ({
  type: types.eventUpdated,
  payload: event,
});
/************************************
 REACCIONAR PUBLICACION
**************************************/
export const ReaccionStartUpdate = (event)=>{
  return async (dispatch) =>{
    try {
      const resp = await fetchConAxios(`posts/reaccion/${event.id}`,event, "PUT");
      const body = await JSON.stringify(resp.data.publicacion);
      console.log(body)
      if(body){
        console.log('ok')
        // Swal.fire('Publicacion editada', '', 'success');
        // dispatch(eventUpdate(event));
        dispatch(eventStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}


/************************************
 ELIMINAR PUBLICACION
**************************************/
export const eventStartDelete = (id)=>{
  return async (dispatch) =>{
    try {
      const resp = await fetchConToken(`posts/${id}`,{}, "DELETE");
      const body = await resp.json();
      console.log(body)
      if(body.ok){
        console.log('ok')
        Swal.fire('Publicacion eliminada', '', 'success');
        dispatch(eventDeleted());
        dispatch(eventStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}
 const eventDeleted = () => ({
  type: types.eventDeleted,
});
/************************************
 LISTAR PUBLICACION
**************************************/
export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("posts");
      const body = await resp.json();
      console.log(body);
      const events = body.publicaciones;
      console.log(body.publicaciones)
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
/************************************
 LISTAR NOTIFICACION
**************************************/
export const notificacionStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("posts/notificacion/");
      const body = await resp.json();
      console.log(body);
      const notificacion = body.notificacion;
      console.log(body.notificacion)
      dispatch(notificacionLoaded(notificacion));
    } catch (error) {
      console.log(error);
    }
  };
};

const notificacionLoaded = (notificacion) => ({
  type: types.notificacionLoaded,
  payload: notificacion,
});

/************************************
 REACCIONAR PUBLICACION
**************************************/
export const notificacionStartUpdate = (id)=>{
  return async (dispatch) =>{
    try {
      const resp = await fetchConAxios(`posts/notificacion/`,{id}, "PUT");
      const body = await JSON.stringify(resp.data);
      console.log(body)
      if(body){
        console.log('ok')
        // Swal.fire('Publicacion editada', '', 'success');
        // dispatch(eventUpdate(event));
        dispatch(notificacionStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}