import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

/************************************
 LISTAR REACCIONES
**************************************/
export const reaccionStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await fetchConToken("reaccion");
        const body = await resp.json();
        console.log(body);
        const reaccion = body.reaccion;
        console.log(body.reaccion)
        dispatch(reaccionLoaded(reaccion));
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  const reaccionLoaded = (events) => ({
    type: types.reaccionLoaded,
    payload: events,
  });
  