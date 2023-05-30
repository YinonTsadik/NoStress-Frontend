import React from 'react'

import { DeleteElementDialogProps } from '../../../../../interfaces'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux'

import { useTasks, useConstraints, useCalendars } from '../../../../../hooks'

import { Dialog, Container, Typography, Box, Button } from '@mui/material'

import useStyles from './DeleteElementDialogStyles'

const DeleteElementDialog: React.FC<DeleteElementDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, elementType, element } = props

    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const { handleDeleteTask } = useTasks()
    const { handleDeleteConstraint } = useConstraints()
    const { handleOptimize, handleSetEvents } = useCalendars()

    const onDelete = async () => {
        await handleDeleteElement(element.id)
        await handleOptimize(currentCalendar.id)
        await handleSetEvents(currentCalendar.id)
        handleCloseDialog()
    }

    const handleDeleteElement = async (id: string) => {
        if (elementType === 'Task') {
            await handleDeleteTask(id)
        } else if (elementType === 'Constraint') {
            await handleDeleteConstraint(id)
        }
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <Container className={classes.root}>
                <form>
                    <Typography align="center" className={classes.title}>
                        {`Delete a ${elementType.toLowerCase()}`}
                    </Typography>
                    <Typography
                        align="center"
                        color="black"
                        className={classes.subtitle}
                    >
                        {`Are you sure you want to delete this ${elementType.toLowerCase()}?`}
                    </Typography>
                    <Box className={classes.buttonsContainer}>
                        <Button
                            onClick={handleCloseDialog}
                            className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onDelete}
                            variant="contained"
                            color="error"
                            className={`${classes.cancelButton} ${classes.deleteButton}`}
                        >
                            Delete
                        </Button>
                    </Box>
                </form>
            </Container>
        </Dialog>
    )
}

export default DeleteElementDialog
