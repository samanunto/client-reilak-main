import Swal from 'sweetalert2';
import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const userFiltroEstado = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`filtros/${ event }`, event, 'GET');
            console.log(resp)
            const body = await resp.json();
            console.log(body)
            const users = body.estadoBuscado;
            console.log(users)
            if (body.ok) {
                dispatch(userLoaded(users));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const userFiltroRol = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`filtros/rol/${ event }`, event, 'GET');
            console.log(resp)
            const body = await resp.json();
            console.log(body)
            const users = body.estadoBuscado;
            console.log(users)
            if (body.ok) {
                dispatch(userLoaded(users));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const userBuscar = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`filtros/buscar/${ event }`, event, 'GET');
            console.log(resp)
            const body = await resp.json();
            console.log(body)
            const users = body.estadoBuscado;
            console.log(users)
            if (body.ok) {
                dispatch(userLoaded(users));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const userLoaded = (users) => ({
    type: types.userLoaded,
    payload: users,
});