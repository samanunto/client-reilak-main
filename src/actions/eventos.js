import Swal from 'sweetalert2';
import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventsStartAddNew = (event) => {
    //post
    return async(dispatch, getState) => {

        const { uid, name } = getState().auth;
        try {
            const resp = await fetchConAxios("event", event, "POST");
            console.log(resp);
            const body = await JSON.stringify(resp.data.eventos);
            if (body.ok) {
                event.id = body.eid;
                event.user = {
                    _id: uid,
                    name: name
                };
                dispatch(eventsAddNew(event));
                dispatch(eventsStartLoading());
                Swal.fire('Evento creado', '', 'success');
            } else {
                Swal.fire('Hubo un error contacte con el administrador', '', 'error');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventsAddNew = (event) => ({
    type: types.userAddNew,
    payload: event,
});

export const eventsSetActive = (event) => ({
    type: types.eventsSetActive,
    payload: event,
});

export const eventsClearActiveEvent = () => ({
    type: types.eventsClearActiveEvent,
});

export const eventsUpdate = (event) => ({
    type: types.userUpdated,
    payload: event,
});

export const eventsStartUpdate = (event) => {
    return async(dispatch) => {
        try {
            for (var pair of event.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            const resp = await fetchConAxios(`event/${ event.id }`, event, "PUT");
            const body = await JSON.stringify(resp.data.eventos);

            if (body.ok) {
                Swal.fire('Evento Editado', '', 'success');
                dispatch(eventsUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventsUpdated = (event) => ({
    type: types.eventsUpdated,
    payload: event
});

export const eventsStartDelete = (id) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`event/${id}`, {}, "DELETE");
            const body = await resp.json();
            console.log(body)
            if (body.ok) {
                console.log('ok')
                Swal.fire('Evento eliminado', '', 'success');
                dispatch(eventsDeleted());
                dispatch(eventsLoaded());
            }

        } catch (error) {
            Swal.fire('Hubo un error contacte con el administrador', '', 'error');
            console.log(error)
        }
    }
}
const eventsDeleted = () => ({
    type: types.eventsDeleted,
});

export const eventsStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken("event");
            const body = await resp.json();
            const users = body.eventos;
            dispatch(eventsLoaded(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventsCercanosStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken("event/eventoscercanos/");
            const body = await resp.json();
            const users = body.eventos;
            dispatch(eventsLoaded(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const buscarStartLoading = (event) => {
    console.log(event);
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`event/buscar/${event}`);
            const body = await resp.json();
            const users = body.eventos;
            dispatch(eventsLoaded(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const eventsLoaded = (users) => ({
    type: types.eventsLoaded,
    payload: users,
});