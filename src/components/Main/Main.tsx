import React from 'react'
import './Main.css'

import Calendar from './Calendar/Calendar'
import Tasks from './Tasks/Tasks'

import { fakeConstraints, fakeTasks } from '../../fakeData'

export default function Main() {
    return (
        <div className="main">
            <Calendar events={fakeConstraints} />
            <Tasks tasks={fakeTasks} />
        </div>
    )
}
