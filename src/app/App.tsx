// import useStyles from './utils/AppStyles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateHome from '../utils/PrivateHome'
import { SignIn, SignUp, Home } from '../pages'

export default function App() {
    // const classes = useStyles()
    return (
        <Router>
            <Routes>
                <Route element={<PrivateHome />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )
}
