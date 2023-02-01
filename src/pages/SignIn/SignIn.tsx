import useStyles from './SignInStyles'
import { Container } from '@mui/material'
import SignInForm from '../../components/SignInForm'

export default function SignIn() {
    const { classes } = useStyles()
    return (
        <Container className={classes.root}>
            <SignInForm />
        </Container>
    )
}
