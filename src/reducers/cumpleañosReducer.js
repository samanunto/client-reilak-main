import { types } from '../types/types';

const initialState = {
    birthday: [],
    message: []

};

export const birthdayReducer = (state = initialState, action) => {

    switch (action.type) {


        case types.birthdayAddNew:
            return {
                ...state,
                birthday: [
                    ...state.birthday,
                    action.payload
                ]
            }
            
        case types.birthdayLoaded:
            return {
                ...state,
                birthday: [...action.payload]
            }
            case types.messageBirthdayLoaded:
                return {
                    ...state,
                    message: [...action.payload]
                }



        default:
            return state;


    }

}