import React, { useEffect } from 'react'

import { AuthPageProps } from '../../interfaces'

import { Container } from '@mui/material'
import Copyright from '../../components/Copyright'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

import useStyles from './AuthPageStyles'

const AuthPage: React.FC<AuthPageProps> = (props) => {
    const { classes } = useStyles()

    const dispatch = useDispatch()
    const {
        signOut,
        clearCalendars,
        clearCurrentCalendar,
        clearTasks,
        clearConstraints,
        clearEvents,
    } = bindActionCreators(actionCreators, dispatch)

    // Handle sign out process
    useEffect(() => {
        signOut()
        clearCalendars()
        clearCurrentCalendar()
        clearTasks()
        clearConstraints()
        clearEvents()
    }, [
        signOut,
        clearCalendars,
        clearCurrentCalendar,
        clearTasks,
        clearConstraints,
        clearEvents,
    ])

    const { component: Page } = props

    return (
        <Container className={classes.root}>
            <Page />
            <Copyright />
        </Container>
    )
}

export default AuthPage
