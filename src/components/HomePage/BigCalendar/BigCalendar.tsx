import React from 'react'

import { Container } from '@mui/material'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'

import useStyles from './BigCalendarStyles'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const BigCalendar: React.FC = () => {
    const { classes } = useStyles()

    const events = useSelector((state: RootState) => state.events.data)
    const startDate = useSelector(
        (state: RootState) => state.currentCalendar.data.startDate
    )

    return (
        <Container className={classes.root}>
            <Calendar
                localizer={localizer}
                events={events}
                defaultDate={startDate}
                className={classes.calendar}
            />
        </Container>
    )
}

export default BigCalendar
