import React from 'react'

import useStyles from './AppStyles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import PrivateHome from '../utils/PrivateHome'
import { SignIn, SignUp, Home, Test } from '../pages'

const App: React.FC = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.root}>
            <Router>
                <Header />
                <Routes>
                    <Route element={<PrivateHome />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
