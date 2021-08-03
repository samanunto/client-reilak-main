import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";


/************************************
 LISTAR CUMPLEAÑOS DEL DIA
**************************************/
export const birthdayStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await fetchConToken("birthday");
        const body = await resp.json();
        console.log(body);
        const birthday = body.users;
        console.log(body.users)
        dispatch(birthdayLoaded(birthday));
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  const birthdayLoaded = (birthday) => ({
    type: types.birthdayLoaded,
    payload: birthday,
  });

/************************************
 CREAR MENSAJE CUMPLEAÑOS DEL DIA
**************************************/
export const birthdayStartAddNew = (birthday) => {
  return async(dispatch,getState ) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConAxios("birthday", birthday, "POST");

      const body = await JSON.stringify(resp.data.birthday);
      // console.log(body)


      if (body) {
        birthday.id = body.id;
        birthday.user = {
          _id: uid,
          name: name,
        };
        // console.log(event);
        // dispatch(birthdayAddNew(birthday));
        Swal.fire('Se  envio un mensaje', '', 'success');
      }else{
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const birthdayAddNew = (birthday) => ({
  type: types.birthdayAddNew,
  payload: birthday,
});

/************************************
 LISTAR MESSAGE DEL DIA
**************************************/
export const messageBirthdayStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("birthday/message");
      const body = await resp.json();
      console.log(body);
      const birth = body.messageBirthday;
      console.log(body.messageBirthday)
      dispatch(messageBirthdayLoaded(birth));
    } catch (error) {
      console.log(error);
    }
  };
};

const messageBirthdayLoaded = (birth) => ({
  type: types.messageBirthdayLoaded,
  payload: birth,
});