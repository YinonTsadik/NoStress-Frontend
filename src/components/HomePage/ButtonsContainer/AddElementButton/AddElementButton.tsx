import React, { useState } from 'react'

import { ElementType } from '../../../../interfaces'

import { Assignment, Event } from '@mui/icons-material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

import AddElementDialog from './AddElementDialog'
import useStyles from './AddElementButtonStyles'

const AddElementButton: React.FC = () => {
    const { classes } = useStyles()

    const [openDialog, setOpenDialog] = useState(false)
    const [elementType, setElementType] = useState<ElementType>('Task')

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleAddTask = () => {
        setElementType('Task')
        handleOpenDialog()
    }

    const handleAddConstraint = () => {
        setElementType('Constraint')
        handleOpenDialog()
    }

    const actions = [
        { icon: <Assignment />, name: 'Task', onClick: handleAddTask },
        { icon: <Event />, name: 'Constraint', onClick: handleAddConstraint },
    ]

    return (
        <>
            <SpeedDial
                ariaLabel="AddElementButton SpeedDial"
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
            <AddElementDialog
                open={openDialog}
                onClose={handleCloseDialog}
                elementType={elementType}
            />
        </>
    )
}

export default AddElementButton
