import React, { useState } from 'react'

import { ElementProps, Task, Constraint } from '../../../../interfaces'

import { Box, Typography, Divider, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

import EditElementDialog from './EditElementDialog'

import useStyles from './ElementStyles'

const Element: React.FC<ElementProps> = (props) => {
    const { classes } = useStyles()
    const { element } = props

    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const MyDivider: React.FC = () => {
        return <Divider orientation="vertical" className={classes.divider} />
    }

    if ('deadline' in element) {
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
                        onClick={handleOpenDialog}
                        size="small"
                        className={classes.iconButton}
                    >
                        <Edit />
                    </IconButton>
                </Box>
                <EditElementDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
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
                        onClick={handleOpenDialog}
                        size="small"
                        className={classes.iconButton}
                    >
                        <Edit />
                    </IconButton>
                </Box>
                <EditElementDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    element={element as Constraint}
                />
            </>
        )
    }
}

export default Element
