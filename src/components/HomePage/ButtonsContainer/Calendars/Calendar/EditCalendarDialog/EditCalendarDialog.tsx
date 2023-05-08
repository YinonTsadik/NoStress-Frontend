import React from 'react'

import {
    EditCalendarDialogProps,
    EditCalendarFormValues,
} from '../../../../../../interfaces'

import { useCalendars } from '../../../../../../hooks'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import editCalendarSchema from './EditCalendarDialogSchema'

import { Dialog, Container, FormLabel, TextField, Box, Button } from '@mui/material'

import useStyles from './EditCalendarDialogStyles'

const EditCalendarDialog: React.FC<EditCalendarDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, calendar } = props

    const {
        register,
        setValue,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EditCalendarFormValues>({
        resolver: yupResolver(editCalendarSchema()),
        defaultValues: { id: calendar.id },
    })

    const { handleUpdateCalendar } = useCalendars()

    const handleClose = () => {
        reset()
        handleCloseDialog()
    }

    type FormFields = 'name'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: EditCalendarFormValues) => {
        await handleUpdateCalendar(formData)
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container className={classes.root}>
                <FormLabel className={classes.formLabel}>Edit a calendar</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        label="Calendar Name *"
                        defaultValue={calendar.name}
                        {...register('name')}
                        name="name"
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message || ' '}
                        variant="filled"
                    />
                    <Box className={classes.buttonsContainer}>
                        <Button
                            onClick={handleClose}
                            className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid}
                            variant="contained"
                            className={`${classes.cancelButton} ${classes.saveButton}`}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Container>
        </Dialog>
    )
}

export default EditCalendarDialog
