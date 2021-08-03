import { types } from "../types/types"

const initialState = {
    infoChat: false,
}

export const infoChatReducer = (state = initialState, action) => {

    switch (action.type){
        case types.infoChatOpen:
        return {
            ...state,
            infoChat: state
        }

        case types.infoChatClosed:
        return {
            ...state,
            infoChat: false
        }

        default: 
        return state;
    }
}