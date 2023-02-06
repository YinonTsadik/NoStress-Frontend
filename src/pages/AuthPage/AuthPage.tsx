import { useEffect } from 'react'
import { AuthPageProps } from '../../interfaces'

import { Container } from '@mui/material'
import Copyright from '../../components/Copyright'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

import useStyles from './AuthPageStyles'

export default function AuthPage(props: AuthPageProps) {
    const { classes } = useStyles()

    const dispatch = useDispatch()
    const { signOut } = bindActionCreators(actionCreators, dispatch)

    // Handle sign out process
    useEffect(() => {
        signOut()
    }, [signOut])

    const { component: Page } = props

    return (
        <Container className={classes.root}>
            <Page />
            <Copyright />
        </Container>
    )
}
