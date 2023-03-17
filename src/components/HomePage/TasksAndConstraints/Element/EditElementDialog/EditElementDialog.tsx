import React from 'react'

import {
    EditElementProps,
    EditElementFormValues,
    EditTaskFormValues,
    EditConstraintFormValues,
    Type,
    Task,
    Constraint,
    Event,
} from '../../../../../interfaces'

import { Dialog, Typography } from '@mui/material'

import useStyles from './EditElementDialogStyles'

const EditElementDialog: React.FC<EditElementProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, element } = props

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            {'deadline' in element ? (
                <Typography>Edit Task</Typography>
            ) : (
                <Typography>Edit Constraint</Typography>
            )}
        </Dialog>
    )
}

export default EditElementDialog