import React from 'react'
import './Calendar.css'

import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import he from 'date-fns/locale/he'

const locales = {
    he: he,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export default function Calendar(props: any) {
    return (
        <div className="calendar">
            <BigCalendar
                localizer={localizer}
                events={props.events}
                startAccessor="start"
                endAccessor="end"
                style={{
                    width: '100%',
                    height: '70vh',
                }}
            />
        </div>
    )
}
