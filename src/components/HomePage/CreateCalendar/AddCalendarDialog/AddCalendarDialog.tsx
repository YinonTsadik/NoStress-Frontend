import React, { useState, useEffect } from 'react'

import {
    AddCalendarDialogProps,
    CreateCalendarFormValues,
} from '../../../../interfaces'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import createCalendarSchema from './AddCalendarDialogSchema'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux'

import { useCalendars } from '../../../../hooks'

import { Dialog, Container, FormLabel, TextField, Box, Button } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDatePicker } from '@mui/x-date-pickers'

import useStyles from './AddCalendarDialogStyles'

const AddCalendarDialog: React.FC<AddCalendarDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog } = props
    const user = useSelector((state: RootState) => state.user)

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [validDates, setValidDates] = useState<boolean>(false)

    const {
        control,
        register,
        setValue,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateCalendarFormValues>({
        resolver: yupResolver(createCalendarSchema()),
        defaultValues: { userID: user.id, endDate: null },
    })

    const { handleAddCalendar } = useCalendars()

    useEffect(() => {
        const isValidDates =
            startDate != null &&
            endDate != null &&
            startDate.getTime() < endDate.getTime()
        setValidDates(isValidDates)
    }, [startDate, endDate])

    const handleClose = () => {
        reset()
        setValue('startDate', null)
        setValue('endDate', null)

        setStartDate(null)
        setEndDate(null)
        setValidDates(false)

        handleCloseDialog()
    }

    type FormFields = 'name'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: CreateCalendarFormValues) => {
        await handleAddCalendar(formData)
        handleClose()
    }

    const nextDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }

    const prevDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    }

    const oneYearRange = (date: Date) => {
        return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container className={classes.root}>
                <FormLabel className={classes.formLabel}>Add a calendar</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            label="Calendar Name *"
                            {...register('name')}
                            name="name"
                            onChange={onChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message || ' '}
                            variant="filled"
                        />
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <MobileDatePicker
                                    label="Start *"
                                    showToolbar={false}
                                    disablePast
                                    value={value || null}
                                    onChange={(newValue) => {
                                        newValue && onChange(newValue)
                                        newValue && setStartDate(newValue)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                    closeOnSelect
                                    className={classes.field}
                                />
                            )}
                        />
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <MobileDatePicker
                                    label="End *"
                                    showToolbar={false}
                                    disablePast
                                    disabled={startDate == null}
                                    minDate={startDate && nextDay(startDate)}
                                    maxDate={startDate && oneYearRange(startDate)}
                                    defaultCalendarMonth={startDate || null}
                                    value={value && prevDay(value)}
                                    onChange={(newValue) => {
                                        newValue && onChange(nextDay(newValue))
                                        newValue && setEndDate(nextDay(newValue))
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                    closeOnSelect
                                    className={classes.field}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <Box className={classes.buttonsContainer}>
                        <Button
                            onClick={handleClose}
                            className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || !validDates}
                            variant="contained"
                            className={`${classes.cancelButton} ${classes.saveButton}`}
                        >
                            Add
                        </Button>
                    </Box>
                </form>
            </Container>
        </Dialog>
    )
}

export default AddCalendarDialog
