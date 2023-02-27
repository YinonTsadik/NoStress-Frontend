import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'

import Task from './Task'
import Constraint from './Constraint'

import { Box, Button } from '@mui/material'
import useStyles from './TasksAndConstraintsStyles'

const TasksAndConstraints: React.FC = () => {
    const { classes } = useStyles()
    const [showTasks, setShowTasks] = useState(true)
    const tasks = useSelector((state: RootState) => state.tasks.data)
    const constraints = useSelector((state: RootState) => state.constraints.data)

    const toggleTasksAndConstraints = () => {
        setShowTasks((prevShowTasks) => !prevShowTasks)
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.button}>
                <Button onClick={toggleTasksAndConstraints}>
                    {showTasks ? 'Show Constraints' : 'Show Tasks'}
                </Button>
            </Box>
            <Box className={classes.content}>
                {showTasks ? (
                    <>
                        {tasks.map((task) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </>
                ) : (
                    <>
                        {constraints.map((constraint) => (
                            <Constraint
                                key={constraint.id}
                                constraint={constraint}
                            />
                        ))}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default TasksAndConstraints
