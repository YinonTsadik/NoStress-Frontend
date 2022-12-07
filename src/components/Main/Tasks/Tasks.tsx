import React from 'react'
import './Tasks.css'

export default function Tasks(props: any) {
    return (
        <div className="tasks">
            {props.tasks.map((task: any) => (
                <h3>{task.title}</h3>
            ))}
        </div>
    )
}
