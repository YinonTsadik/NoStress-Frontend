import React, { useState } from 'react'

import { TaskOrConstraintProps, Task, Constraint } from '../../../../interfaces'

import {
    Box,
    Typography,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
} from '@mui/material'
import { Edit } from '@mui/icons-material'

import useStyles from './TaskOrConstraintStyles'

const TaskOrConstraint: React.FC<TaskOrConstraintProps> = (props) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleEdit = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }
    const { classes } = useStyles()
    const { content } = props

    if ('deadline' in content) {
        const task = content as Task
        return (
            <>
                <Box
                    className={classes.root}
                    sx={{ backgroundColor: '#F5BC42', position: 'relative' }}
                >
                    <Typography variant="caption" className={classes.description}>
                        {task.description}
                    </Typography>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Typography variant="caption" className={classes.property}>
                        {new Date(task.deadline).toLocaleString()}
                    </Typography>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Typography variant="caption" className={classes.property}>
                        {task.workHours}
                    </Typography>
                    <IconButton
                        onClick={handleEdit}
                        size="small"
                        className={classes.iconButton}
                    >
                        <Edit />
                    </IconButton>
                </Box>
                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle>Edit Task</DialogTitle>
                </Dialog>
            </>
        )
    } else {
        const constraint = content as Constraint
        return (
            <>
                <Box
                    className={classes.root}
                    sx={{ backgroundColor: '#4CAF50', position: 'relative' }}
                >
                    <Typography variant="caption" className={classes.description}>
                        {constraint.description}
                    </Typography>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Typography variant="caption" className={classes.property}>
                        {new Date(constraint.startTime).toLocaleString()}
                    </Typography>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Typography variant="caption" className={classes.property}>
                        {new Date(constraint.endTime).toLocaleString()}
                    </Typography>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Typography variant="caption" className={classes.property}>
                        {constraint.type}
                    </Typography>
                    <IconButton
                        onClick={handleEdit}
                        size="small"
                        className={classes.iconButton}
                    >
                        <Edit />
                    </IconButton>
                </Box>
                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle>Edit Constraint</DialogTitle>
                </Dialog>
            </>
        )
    }
}

export default TaskOrConstraint
