import React from 'react'

import { TaskProps } from '../../../../interfaces'
import { Box, Typography, Divider } from '@mui/material'
import useStyles from './TaskStyles'

const Task: React.FC<TaskProps> = (props) => {
    const { classes } = useStyles()
    const { task } = props

    return (
        <Box className={classes.root}>
            <Typography className={classes.description}>
                {task.description}
            </Typography>
            <Divider orientation="vertical" flexItem className={classes.divider} />
            <Typography className={classes.deadline}>
                {new Date(task.deadline).toLocaleString()}
            </Typography>
            <Divider orientation="vertical" flexItem className={classes.divider} />
            <Typography className={classes.workHours}>{task.workHours}</Typography>
        </Box>
    )
}

export default Task
