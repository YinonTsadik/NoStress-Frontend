import React from 'react'
import './Header.css'

import Profile from './Profile'

export default function Navbar() {
    return (
        <nav className="header">
            <img src="" alt="Logo" className="header--logo" />
            <h3 className="header--title">NoStress</h3>
            <Profile />
        </nav>
    )
}
