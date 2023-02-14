import React, { useState } from 'react'

import { Dialog, Container, FormLabel, TextField, Box, Button } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import createCalendarSchema from './CreateCalendarDialogSchema'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux'

import {
    CreateCalendarProps,
    CreateCalendarFormValues,
} from '../../../../interfaces'
// import useStyles from './CreateCalendarDialogStyles'

const CreateCalendarDialog: React.FC<CreateCalendarProps> = (props) => {
    // const { classes } = useStyles()
    const { open, handleClose: handleCloseDialog } = props
    const user = useSelector((state: RootState) => state.user)
    const [minEndDate, setMinEndDate] = useState<Date | null>(null)

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<CreateCalendarFormValues>({
        resolver: yupResolver(createCalendarSchema()),
        defaultValues: { userID: user.id },
    })

    const handleSetMinEndDate = (date: Date | null) => {
        setMinEndDate(
            date
                ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
                : null
        )
    }

    const handleClose = () => {
        reset()
        setMinEndDate(null)
        handleCloseDialog()
    }

    const onSubmit = (formData: CreateCalendarFormValues) => {
        console.log(`userID: ${formData.userID}`)
        console.log(`name: ${formData.name}`)
        console.log(`startDate: ${formData.startDate.toLocaleString()}`)
        console.log(`endDate: ${formData.endDate.toLocaleString()}`)
        // handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container>
                <FormLabel>Add A Calendar</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        localeText={{ start: 'Start Date' }}
                    >
                        <TextField
                            label="Calendar Name *"
                            {...register('name')}
                            name="name"
                            error={Boolean(errors.name)}
                            variant="filled"
                        />
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="Start Date"
                                    disablePast
                                    value={value || null}
                                    onChange={(date) => {
                                        onChange(date)
                                        handleSetMinEndDate(date)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="End Date"
                                    disablePast
                                    disabled={minEndDate == null}
                                    minDate={minEndDate}
                                    value={value || null}
                                    onChange={(date) => onChange(date)}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <Box>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isValid}
                        >
                            Add Caledar
                        </Button>
                    </Box>
                </form>
            </Container>
        </Dialog>
    )
}

export default CreateCalendarDialog
