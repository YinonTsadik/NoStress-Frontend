import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { RootState, actionCreators } from '../../redux'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { useQuery } from '@apollo/client'
import { GET_USER_CALENDARS } from '../../graphql'

import { Calendar } from '../../interfaces'

import BigCalendar from './BigCalendar'
import useStyles from './HomePageStyles'

const HomePage: React.FC = () => {
    const { classes } = useStyles()

    const userID = useSelector((state: RootState) => state.user.id)
    const { data } = useQuery(GET_USER_CALENDARS, { variables: { userID } })

    const dispatch = useDispatch()
    const { setCalendars } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (data) {
            const calendars: Calendar[] = data.userCalendars.map((calendar: any) => {
                const { __typename, ...rest } = calendar
                return rest as Calendar
            })

            setCalendars(calendars)
        }
    }, [data, setCalendars])

    const calendarExist = Boolean(
        useSelector((state: RootState) => state.calendars.length)
    )

    return (
        <div className={classes.root}>
            Home
            {calendarExist && <BigCalendar />}
        </div>
    )
}

export default HomePage
