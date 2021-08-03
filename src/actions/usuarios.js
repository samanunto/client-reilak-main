import Swal from 'sweetalert2';
import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const userStartAddNew = (event) => {
    //post
    return async(dispatch, getState) => {

        try {
            const resp = await fetchConAxios("user", event, "POST");

            const body = await JSON.stringify(resp.data.usuarios);
            if (body.ok) {

                dispatch(userAddNew(event));
                Swal.fire('Usuario creado', '', 'success');
            } else {
                Swal.fire('Hubo un error contacte con el administrador', '', 'error');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const userAddNew = (event) => ({
    type: types.userAddNew,
    payload: event,
});

export const userSetActive = (event) => ({
    type: types.userSetActive,
    payload: event,
});

export const userClearActiveEvent = () => ({
    type: types.userClearActiveEvent,
});


export const userStartUpdate = (event) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConAxios(`user/${ event.id }`, event, "PUT");
            console.log(resp)
            const body = await JSON.stringify(resp.data.usuarios);

            if (body) {
                Swal.fire('Usuario Editado', '', 'success');
                dispatch(userUpdated(event));
                userClearActiveEvent();

            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const userUpdated = (event) => ({
    type: types.userUpdated,
    payload: event
});

export const userStartDelete = (event) => {
    return async(dispatch) => {
        try {

            const resp = await fetchConToken(`user/${ event.id }`, event, 'PUT');
            const body = await resp.json();
            console.log(body)
            if (body.ok) {
                dispatch(userUpdated(event));
                dispatch(userLoaded(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const userDeleted = () => ({
    type: types.userDeleted,
});

export const userStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken("user");
            const body = await resp.json();
            const users = body.usuario;
            console.log(users);
            dispatch(userLoaded(users));
        } catch (error) {
            console.log(error)
        }
    }
}

//Filtros


const userLoaded = (users) => ({
    type: types.userLoaded,
    payload: users,
});