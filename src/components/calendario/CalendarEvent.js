import React from 'react'
import moment from 'moment';

export const CalendarEvent = ({ event }) => {
    const { titulo, start, end } = event;

    return (
        <div>
            <strong> { titulo } 
            <br/>
            <h6 className="fecha-evento-calendario" >{moment(start).format("h:mm a")} - {moment(end).format("h:mm a")}</h6>
            </strong>
        </div>
    )
}