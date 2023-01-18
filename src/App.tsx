import useStyles from './AppStyles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignIn, SignUp, Home } from './pages'

export default function App() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </Router>
        </div>
    )
}
