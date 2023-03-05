import React, { useState, useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import createCalendarSchema from './AddCalendarDialogSchema'

import {
    CreateCalendarProps,
    CreateCalendarFormValues,
    Calendar,
} from '../../../../interfaces'

import { useMutation } from '@apollo/client'
import { CREATE_CALENDAR } from '../../../../graphql'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../../../../redux'
import { bindActionCreators } from 'redux'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { Dialog, Container, FormLabel, TextField, Box, Button } from '@mui/material'
import useStyles from './AddCalendarDialogStyles'

const AddCalendarDialog: React.FC<CreateCalendarProps> = (props) => {
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
        defaultValues: { userID: user.id },
    })

    const [createCalendar] = useMutation(CREATE_CALENDAR)

    const dispatch = useDispatch()
    const { addCalendar, setCurrentCalendar, setTasks, setConstraints, setEvents } =
        bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        const isValidDates =
            startDate != null &&
            endDate != null &&
            startDate.getTime() < endDate.getTime()
        setValidDates(isValidDates)
    }, [startDate, endDate])

    const handleClose = () => {
        reset()
        setStartDate(null)
        setEndDate(null)
        handleCloseDialog()
    }

    type FormFields = 'name'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = (formData: CreateCalendarFormValues) => {
        createCalendar({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.createCalendar) {
                console.log('Calendar created successfully!')
                const { __typename, ...rest } = data.createCalendar

                addCalendar(rest as Calendar)
                setCurrentCalendar(rest as Calendar)
                setTasks([])
                setConstraints([])
                setEvents([])

                handleClose()
            }
        })
    }

    const nextDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
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
                            error={Boolean(errors.name)}
                            onChange={onChange}
                            helperText={errors.name ? errors.name.message : ' '}
                            variant="filled"
                        />
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="Start *"
                                    disablePast
                                    disableMaskedInput
                                    value={value || null}
                                    onChange={(date) => {
                                        onChange(date)
                                        date && setStartDate(date)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                    PopperProps={{ placement: 'auto' }}
                                    className={classes.field}
                                />
                            )}
                        />
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="End *"
                                    disablePast
                                    disableMaskedInput={true}
                                    disabled={startDate == null}
                                    minDate={startDate && nextDay(startDate)}
                                    value={value || null}
                                    onChange={(date) => {
                                        onChange(date)
                                        date && setEndDate(date)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                    PopperProps={{ placement: 'auto' }}
                                    className={classes.field}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <Box className={classes.buttonContainer}>
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
