import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'

import TaskOrConstraint from './TaskOrConstraint'

import { Box, Switch, Typography } from '@mui/material'
import useStyles from './TasksAndConstraintsStyles'

const TasksAndConstraints: React.FC = () => {
    const { classes } = useStyles()
    const [showTasks, setShowTasks] = useState(true)
    const tasks = useSelector((state: RootState) => state.tasks.data)
    const constraints = useSelector((state: RootState) => state.constraints.data)

    const handleSwitchChange = () => {
        setShowTasks((prevShowTasks) => !prevShowTasks)
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.switchBox}>
                <Typography variant="caption" className={classes.switchLabel}>
                    Constraints
                </Typography>
                <Switch
                    checked={showTasks}
                    onChange={handleSwitchChange}
                    sx={{
                        '& .MuiSwitch-track': {
                            backgroundColor: showTasks ? '#F5BC42' : '#4CAF50',
                        },
                        '& .MuiSwitch-thumb': {
                            backgroundColor: showTasks ? '#F5BC42' : '#4CAF50',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: showTasks ? '#F5BC42' : '#4CAF50',
                        },
                        '& .MuiSwitch-switchBase + .MuiSwitch-track:hover': {
                            backgroundColor: showTasks ? '#F5BC42' : '#4CAF50',
                        },
                    }}
                    className={classes.switch}
                />
                <Typography variant="caption" className={classes.switchLabel}>
                    Tasks
                </Typography>
            </Box>
            <Typography variant="h5" align="center">
                {showTasks ? 'Your Tasks' : 'Your Constraints'}
            </Typography>
            <Box className={classes.content}>
                {showTasks ? (
                    <>
                        {/* <Typography variant="caption">Description</Typography>
                        <Typography variant="caption">Deadline</Typography>
                        <Typography variant="caption">Hours</Typography> */}
                        {tasks.map((task) => (
                            <TaskOrConstraint key={task.id} content={task} />
                        ))}
                    </>
                ) : (
                    <>
                        {/* <Typography variant="caption">Description</Typography>
                        <Typography variant="caption">Start</Typography>
                        <Typography variant="caption">End</Typography>
                        <Typography variant="caption">Type</Typography> */}
                        {constraints.map((constraint) => (
                            <TaskOrConstraint
                                key={constraint.id}
                                content={constraint}
                            />
                        ))}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default TasksAndConstraints
