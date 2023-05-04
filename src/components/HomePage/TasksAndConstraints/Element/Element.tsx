import React, { useState } from 'react'

import { ElementProps, Task, Constraint } from '../../../../interfaces'

import { Box, Typography, Divider, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

import EditElementDialog from './EditElementDialog'

import useStyles from './ElementStyles'

const Element: React.FC<ElementProps> = (props) => {
    const { classes } = useStyles()
    const { elementType, element } = props

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    }

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const MyDivider: React.FC = () => {
        return <Divider orientation="vertical" className={classes.divider} />
    }

    if (elementType === 'Task') {
        const task = element as Task
        return (
            <>
                <Box className={classes.root} sx={{ backgroundColor: '#F5BC42' }}>
                    <Typography variant="caption" className={classes.description}>
                        {task.description}
                    </Typography>
                    <MyDivider />
                    <Typography variant="caption" className={classes.property}>
                        {new Date(task.deadline).toLocaleString()}
                    </Typography>
                    <MyDivider />
                    <Typography variant="caption" className={classes.property}>
                        {task.workHours}
                    </Typography>
                    <IconButton
                        onClick={handleOpenEditDialog}
                        size="small"
                        className={classes.editButton}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={handleOpenDeleteDialog}
                        size="small"
                        className={classes.deleteButton}
                    >
                        <Delete />
                    </IconButton>
                </Box>
                <EditElementDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    elementType="Task"
                    element={element as Task}
                />
            </>
        )
    } else {
        const constraint = element as Constraint
        return (
            <>
                <Box className={classes.root} sx={{ backgroundColor: '#4CAF50' }}>
                    <Typography variant="caption" className={classes.description}>
                        {constraint.description}
                    </Typography>
                    <MyDivider />
                    <Typography variant="caption" className={classes.property}>
                        {new Date(constraint.startTime).toLocaleString()}
                    </Typography>
                    <MyDivider />
                    <Typography variant="caption" className={classes.property}>
                        {new Date(constraint.endTime).toLocaleString()}
                    </Typography>
                    <MyDivider />
                    <Typography variant="caption" className={classes.property}>
                        {constraint.type}
                    </Typography>
                    <IconButton
                        onClick={handleOpenEditDialog}
                        size="small"
                        className={classes.editButton}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={handleOpenDeleteDialog}
                        size="small"
                        className={classes.deleteButton}
                    >
                        <Delete />
                    </IconButton>
                </Box>
                <EditElementDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    elementType="Constraint"
                    element={element as Constraint}
                />
            </>
        )
    }
}

export default Element
