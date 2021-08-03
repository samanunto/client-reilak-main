import { types } from "../types/types";

const initialState = {
    checking: true,
    //uid: null
    //name: null
    logged: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type){

        case types.authLogin:
            return {
                ...state,
                checking: false,
                logged: true,
                ...action.payload
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }

        default:
            return state;
    }
}