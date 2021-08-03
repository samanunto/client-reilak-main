import { types } from '../types/types';

const initialState = {
    events: [],
    activeEvents: null

};

export const eventReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.eventsSetActive:
            return {
                ...state,
                activeEvents: action.payload
            }

        case types.eventsAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventsUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.eventsDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvents.id)
                ),
                activeEvents: null
            }

        case types.eventsLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventsClearActiveEvent:
            return {
                ...state,
                activeEvents: null
            }

        default:
            return state;


    }

}