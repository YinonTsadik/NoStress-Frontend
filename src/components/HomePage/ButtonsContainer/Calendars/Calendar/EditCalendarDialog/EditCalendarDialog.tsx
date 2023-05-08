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

import useStyles from '../CalendarStyles'

const EditCalendarDialog: React.FC<EditCalendarDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, calendar } = props

    const {
        register,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EditCalendarFormValues>({
        resolver: yupResolver(editCalendarSchema()),
        defaultValues: { id: calendar.id },
    })

    const { handleUpdateCalendar } = useCalendars()

    type FormFields = 'name'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: EditCalendarFormValues) => {
        await handleUpdateCalendar(formData)
        handleCloseDialog()
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <Container>
                <FormLabel>Edit a calendar</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                </form>
                <Box>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={!isValid}>
                        Save
                    </Button>
                </Box>
            </Container>
        </Dialog>
    )
}

export default EditCalendarDialog
