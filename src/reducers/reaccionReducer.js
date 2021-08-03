
import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//    title: 'Cumpleaños del jefe',
//    start: moment().toDate(),
//    end: moment().add(2, 'hours').toDate(),
//    bgcolor: '#fafafa',
//    note: 'Comprar el pastel',
//    user: {
//        _id: '123',
//        name: 'Juan'
//    }
// }

const initialState = {
     reaccion: [],


};

export const reaccionReducer = (state = initialState, action) => {
    switch (action.type){

        case types.reaccionLoaded:
            return {
                ...state,
                reaccion: [...action.payload]
            }

        default:
            return state;
    }
}