import {combineReducers} from 'redux'
import { authReducer } from './authReducer'
import { calendarReducer } from './CalendarReducer'
import { reaccionReducer } from './reaccionReducer'
import { tareaReducer } from './tareaReducer'
import { uiReducer } from './uiReducer'
import { usuarioReducer } from './usuariosReducer'
import { notificacionReducer } from './notificacionReducer'
import { eventReducer } from './EventReducer'
import { infoChatReducer } from './infoChatReducer'
import { birthdayReducer } from './cumpleañosReducer'
import { chatReducer } from './ChatReducer'
import { dashboardReducer } from './dashboardReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    reaccion: reaccionReducer,
    users: usuarioReducer,
    tareas: tareaReducer,
    Notification: notificacionReducer,
    events: eventReducer,
    infoChat: infoChatReducer,
    birthday: birthdayReducer,
    chat:chatReducer, 
    dashboard: dashboardReducer,
       // todo: AuthReducer
    // todo: CalendarReducer
})

