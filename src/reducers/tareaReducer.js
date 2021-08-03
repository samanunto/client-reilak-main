import { types } from '../types/types';


const initialState = {
    tareas: [],
   activeTareas: null

};

export const tareaReducer = (state = initialState, action) => {


   switch (action.type){

    case types.tareasAddNew:
            return {
                ...state,
                tareas: [
                    ...state.tareas,
                    action.payload
                ]
            }

            case types.tareasUpdated:
                return {
                    ...state,
                    tareas: state.tareas.map(
                        e => (e.id === action.payload.id) ? action.payload : e
                    )
                }   
              
              
              case types.tareasSetActive:
                return {
                    ...state,
                    activeTareas: action.payload
                }

                case types.tareasDeleted:
                    return {
                        ...state,
                        activeTareas: null
                    }






       
 


       case types.tareasLoaded:
           return {
               ...state,
               tareas: [...action.payload]
           }

       default:
           return state;
   }
}
