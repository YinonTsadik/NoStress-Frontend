import React, { useState, useEffect } from 'react'

import {
    AddElementDialogProps,
    CreateElementFormValues,
    CreateTaskFormValues,
    CreateConstraintFormValues,
    Type,
} from '../../../../../interfaces'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import createElementSchema from './AddElementDialogSchema'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux'

import { useTasks, useConstraints, useCalendars } from '../../../../../hooks'

import {
    Dialog,
    Container,
    FormLabel,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Button,
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDateTimePicker } from '@mui/x-date-pickers'

import useStyles from './AddElementDialogStyles'

const AddElementDialog: React.FC<AddElementDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, elementType } = props

    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const [startTime, setStartTime] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<Date | null>(null)
    const [validDates, setValidDates] = useState<boolean>(false)

    const {
        control,
        register,
        setValue,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateElementFormValues>({
        resolver: yupResolver(createElementSchema(elementType)()),
    })

    const { handleAddTask } = useTasks()
    const { handleAddConstraint } = useConstraints()
    const { handleOptimize, handleSetEvents } = useCalendars()

    useEffect(() => {
        const isValidDates =
            startTime != null &&
            endTime != null &&
            startTime.getTime() < endTime.getTime()
        setValidDates(isValidDates)
    }, [startTime, endTime])

    const types = Object.values(Type)

    const handleClose = () => {
        reset()

        setStartTime(null)
        setEndTime(null)
        setValidDates(false)

        handleCloseDialog()
    }

    type FormFields = 'description' | 'workHours' | 'type'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: CreateElementFormValues) => {
        await handleAddElement(formData)
        await handleOptimize(currentCalendar.id)
        await handleSetEvents(currentCalendar.id)
        handleClose()
    }

    const handleAddElement = async (formData: CreateElementFormValues) => {
        const calendarID = currentCalendar.id

        if (elementType === 'Task') {
            const { description, deadline, workHours } =
                formData as CreateTaskFormValues
            const taskFormData: CreateTaskFormValues = {
                calendarID,
                description,
                deadline,
                workHours,
            }
            await handleAddTask(taskFormData)
        } else if (elementType === 'Constraint') {
            const { description, startTime, endTime, type } =
                formData as CreateConstraintFormValues
            const constraintFormData: CreateConstraintFormValues = {
                calendarID,
                description,
                startTime,
                endTime,
                type,
            }
            await handleAddConstraint(constraintFormData)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container className={classes.root}>
                <FormLabel
                    className={classes.formLabel}
                >{`Add a ${elementType.toLowerCase()}`}</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            label="Description *"
                            {...register('description')}
                            name="description"
                            error={Boolean(errors.description)}
                            onChange={onChange}
                            helperText={errors.description?.message || ' '}
                            variant="filled"
                        />
                        {elementType === 'Task' && (
                            <>
                                <Controller
                                    name="deadline"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <MobileDateTimePicker
                                            label="Deadline *"
                                            showToolbar={false}
                                            disablePast
                                            minDateTime={
                                                new Date(currentCalendar.startDate)
                                            }
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
                                            }
                                            defaultCalendarMonth={
                                                new Date(currentCalendar.startDate)
                                            }
                                            minutesStep={60}
                                            ampm={false}
                                            value={value || null}
                                            onChange={(newValue) => {
                                                newValue && onChange(newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                            inputFormat="dd/MM/yyyy HH:mm"
                                            closeOnSelect
                                            className={classes.field}
                                        />
                                    )}
                                />
                                <TextField
                                    label="Work Hours *"
                                    type="number"
                                    {...register('workHours')}
                                    name="workHours"
                                    InputProps={{ inputProps: { min: 1 } }}
                                    onChange={onChange}
                                    error={Boolean(
                                        'workHours' in errors && errors.workHours
                                    )}
                                    variant="filled"
                                    className={classes.field}
                                />
                            </>
                        )}
                        {elementType === 'Constraint' && (
                            <>
                                <Controller
                                    name="startTime"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <MobileDateTimePicker
                                            label="Start *"
                                            showToolbar={false}
                                            disablePast
                                            minDateTime={
                                                new Date(currentCalendar.startDate)
                                            }
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
                                            }
                                            defaultCalendarMonth={
                                                new Date(currentCalendar.startDate)
                                            }
                                            minutesStep={60}
                                            ampm={false}
                                            value={value || null}
                                            onChange={(newValue) => {
                                                newValue && onChange(newValue)
                                                newValue && setStartTime(newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                            inputFormat="dd/MM/yyyy HH:mm"
                                            closeOnSelect
                                            className={classes.field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <MobileDateTimePicker
                                            label="End *"
                                            showToolbar={false}
                                            disablePast
                                            disabled={startTime == null}
                                            minDateTime={startTime || null}
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
                                            }
                                            defaultCalendarMonth={startTime || null}
                                            minutesStep={60}
                                            ampm={false}
                                            value={value || null}
                                            onChange={(newValue) => {
                                                newValue && onChange(newValue)
                                                newValue && setEndTime(newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                            inputFormat="dd/MM/yyyy HH:mm"
                                            closeOnSelect
                                            className={classes.field}
                                        />
                                    )}
                                />
                                <RadioGroup
                                    name="Type"
                                    onChange={onChange}
                                    className={classes.field}
                                >
                                    {types.map((type) => {
                                        return (
                                            <FormControlLabel
                                                key={type}
                                                name="type"
                                                label={type}
                                                value={type}
                                                control={<Radio />}
                                            />
                                        )
                                    })}
                                </RadioGroup>
                            </>
                        )}
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
                            disabled={
                                elementType === 'Task'
                                    ? !isValid
                                    : !isValid || !validDates
                            }
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

export default AddElementDialog
