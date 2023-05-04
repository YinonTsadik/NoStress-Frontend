import React from 'react'

import { EditElementProps } from '../../../../../interfaces'

import { Dialog, Typography } from '@mui/material'

import useStyles from './EditElementDialogStyles'

const EditElementDialog: React.FC<EditElementProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, elementType } = props

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            {elementType === 'Task' && <Typography>Edit Task</Typography>}
            {elementType === 'Constraint' && (
                <Typography>Edit Constraint</Typography>
            )}
        </Dialog>
    )
}

export default EditElementDialog
