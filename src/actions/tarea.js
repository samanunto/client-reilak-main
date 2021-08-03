import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";


export const tareasStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await fetchConToken("tareas");
        const body = await resp.json();
        console.log(body);
        const tareas = body.tareas;
        console.log(body.tareas)
        dispatch(tareasLoaded(tareas));
      } catch (error) {
        console.log(error);
      }
    };
  };

  const tareasLoaded = (tareas) => ({
    type: types.tareasLoaded,
    payload: tareas,
  });



  //________________________________________________________________


  export const tareasStartAddNew = (tareas) => {
    console.log("no funcuiona",tareas)
    return async(dispatch,getState ) => {
      const { uid, name } = getState().auth;
      try {
        const resp = await fetchConAxios("tareas", tareas, "POST");
  
        const body = await JSON.stringify(resp.data.tareas);
        // console.log(body)
  
  
        if (body) {
          tareas.id = body.id;
          tareas.user = {
            _id: uid,
            name: name,
          };
          // console.log(event);
          dispatch(tareasAddNew(tareas));
          dispatch(tareasStartLoading());
          Swal.fire('tareas creada', '', 'success');
        }else{
          Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  const tareasAddNew = (tareas) => ({
    type: types.tareasAddNew,
    payload: tareas,
  });

  //___________________________________________________________________________

  export const tareasStartUpdate = (tareas)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios(`tareas/${tareas.id}`,tareas, "PUT");
        const body = await JSON.stringify(resp.data.tareas);
        console.log(body)
        if(body){
          console.log('ok')
          Swal.fire('tareas editada', '', 'success');
          dispatch(tareasUpdate(tareas));
          dispatch(tareasStartLoading());
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }
  const tareasUpdate = (tareas) => ({
    type: types.tareasUpdated,
    payload: tareas,
  });



  export const tareasSetActive = (tareas) => ({
    type: types.tareasSetActive,
    payload: tareas,
  });


  //____________________________________________________________________________________


  export const tareasStartDelete = (_id)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConToken(`tareas/${_id}`,{}, "DELETE");
        const body = await resp.json();
        console.log(body)
        if(body.ok){
          console.log('ok')
          Swal.fire('Tareas eliminada', '', 'success');
          dispatch(tareasDeleted());
          dispatch(tareasStartLoading());
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }
   const tareasDeleted = () => ({
    type: types.tareasDeleted,
  });

  //____

  export const TareasMarcaUpdate = (tareas)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios(`tareas/estado/${tareas.id}`,tareas, "PUT");
        const body = await JSON.stringify(resp.data.tareas);
        console.log(body)
        if(body){
          console.log('ok')
          // Swal.fire('Publicacion editada', '', 'success');
          // dispatch(eventUpdate(event));
          dispatch(tareasStartLoading());
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }