import useStyles from './AppStyles'
import { Container } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import PrivateHome from '../utils/PrivateHome'
import { SignIn, SignUp, Home } from '../pages'

export default function App() {
    const { classes } = useStyles()
    return (
        <Container className={classes.root}>
            <Router>
                <Header />
                <Routes>
                    <Route element={<PrivateHome />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </Container>
    )
}
