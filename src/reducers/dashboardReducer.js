import { types } from '../types/types';

const initialState = {
    dashboard: 0,
    usuariosonline: 0,
    usuariosoffline: 0,
    publicaionessemanales: 0,
    eventossemanales: 0,
    conexionesdiarias: 0
};

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {


        case types.dashboardLoaded:
            return {
                ...state,
                dashboard: action.payload
            }

        case types.dashboardUsuariosOnline:
            return {
                ...state,
                usuariosonline: action.payload
            }

        case types.dashboardUsuariosOffline:
            return {
                ...state,
                usuariosoffline: action.payload
            }

        case types.dashboardPublicacionesSemanales:
            return {
                ...state,
                publicaionessemanales: action.payload
            }

        case types.dashboardEventosSemanales:
            return {
                ...state,
                eventossemanales: action.payload
            }

        case types.dashboardConexionesDiarias:
            return {
                ...state,
                conexionesdiarias: action.payload
            }

        default:
            return state;

    }

}