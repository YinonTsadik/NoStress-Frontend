import React from 'react'

import { DeleteCalendarDialogProps } from '../../../../../../interfaces'

import { useCalendars } from '../../../../../../hooks'

import { Dialog, Container, Typography, Box, Button } from '@mui/material'

import useStyles from './DeleteCalendarDialogStyles'

const DeleteCalendarDialog: React.FC<DeleteCalendarDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, calendar } = props

    const { handleDeletecalendar } = useCalendars()

    const onDelete = async () => {
        await handleDeletecalendar(calendar.id)

        handleCloseDialog()
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <Container className={classes.root}>
                <form>
                    <Typography align="center" className={classes.title}>
                        Delete a Calendar
                    </Typography>
                    <Typography
                        align="center"
                        color="black"
                        className={classes.subtitle}
                    >
                        Are you sure you want to delete this calendar?
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        color="black"
                        className={classes.subtitle}
                    >
                        All the tasks and constraints in it will also deleted.
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

export default DeleteCalendarDialog
