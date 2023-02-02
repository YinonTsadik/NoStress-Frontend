import useStyles from './AuthPageStyles'
import { SignInUpProps } from '../../interfaces'

import { Container } from '@mui/material'
import Copyright from '../../commons/Copyright'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

export default function AuthPage(props: SignInUpProps) {
    const { classes } = useStyles()

    const dispatch = useDispatch()
    const { signOut } = bindActionCreators(actionCreators, dispatch)
    signOut()

    const Page = props.component

    return (
        <Container className={classes.root}>
            <Page />
            <Copyright />
        </Container>
    )
}
