import React from 'react'

import { Assignment, Event } from '@mui/icons-material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

import useStyles from './AddElementButtonStyles'

const AddElementButton: React.FC = () => {
    const { classes } = useStyles()

    const handleAddTask = () => {
        console.log('handleAddTask')
    }

    const handleAddConstraint = () => {
        console.log('handleAddConstraint')
    }

    const actions = [
        { icon: <Assignment />, name: 'Task', onClick: handleAddTask },
        { icon: <Event />, name: 'Constraint', onClick: handleAddConstraint },
    ]

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            direction="left"
            icon={<SpeedDialIcon />}
            className={classes.root}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                />
            ))}
        </SpeedDial>
    )
}

export default AddElementButton
