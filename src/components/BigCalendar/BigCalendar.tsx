import { Container } from '@mui/material'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay , } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

import 'react-big-calendar/lib/css/react-big-calendar.css'
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

const events: Event[] = []

export default function BigCalendar() {
    const { classes } = useStyles()

    return (
        <Container className={classes.root}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                className={classes.calendar}
            />
        </Container>
    )
}
