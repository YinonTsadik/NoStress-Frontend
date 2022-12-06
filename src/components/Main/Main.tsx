import React from 'react'
import './Main.css'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import he from 'date-fns/locale/he'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

export default function Main() {
    return (
        <div className="main">
            {/* <DatePicker /> */}
            <Calendar
                localizer={localizer}
                // events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '65%', height: '83vh', border: '1px solid black' }}
            />
            <h1>Tasks List</h1>
        </div>
    )
}
