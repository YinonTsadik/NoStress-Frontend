import React from 'react'
import './Header.css'

import Profile from './Profile'
import { MdAlarmOn } from 'react-icons/md'

export default function Navbar() {
    return (
        <nav className="header">
            <MdAlarmOn className="header--logo" />
            <h3 className="header--title">NoStress</h3>
            <Profile />
        </nav>
    )
}
