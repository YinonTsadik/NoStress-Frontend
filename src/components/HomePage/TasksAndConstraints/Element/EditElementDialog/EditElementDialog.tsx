import React, { useState, useEffect } from 'react'

import {
    EditElementProps,
    EditElementFormValues,
    EditTaskFormValues,
    EditConstraintFormValues,
    Type,
} from '../../../../../interfaces'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import editElementSchema from './EditElementDialogSchema'

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

import useStyles from './EditElementDialogStyles'

const EditElementDialog: React.FC<EditElementProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, elementType, element } = props

    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const [startTime, setStartTime] = useState<Date | null>(
        ('startTime' in element && new Date(element.startTime)) || null
    )
    const [endTime, setEndTime] = useState<Date | null>(
        ('endTime' in element && new Date(element.endTime)) || null
    )
    const [validDates, setValidDates] = useState<boolean>(true)

    const {
        control,
        register,
        setValue,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EditElementFormValues>({
        resolver: yupResolver(editElementSchema(elementType)()),
        defaultValues:
            'deadline' in element
                ? {
                      id: element.id,
                      description: element.description,
                      deadline: element.deadline,
                      workHours: element.workHours,
                  }
                : {
                      id: element.id,
                      description: element.description,
                      startTime: element.startTime,
                      endTime: element.endTime,
                      type: element.type,
                  },
    })

    const { handleUpdateTask } = useTasks()
    const { handleUpdateConstraint } = useConstraints()
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

    const onSubmit = async (formData: EditElementFormValues) => {
        await handleEditElement(formData)
        await handleOptimize(currentCalendar.id)
        await handleSetEvents(currentCalendar.id)
        handleCloseDialog()
    }

    const handleEditElement = async (formData: EditElementFormValues) => {
        const id = element.id

        if (elementType === 'Task') {
            const { description, deadline, workHours } =
                formData as EditTaskFormValues
            const taskFormData: EditTaskFormValues = {
                id,
                description,
                deadline,
                workHours,
            }
            await handleUpdateTask(taskFormData)
        } else if (elementType === 'Constraint') {
            const { description, startTime, endTime, type } =
                formData as EditConstraintFormValues
            const constraintFormData: EditConstraintFormValues = {
                id,
                description,
                startTime,
                endTime,
                type,
            }
            await handleUpdateConstraint(constraintFormData)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container className={classes.root}>
                <FormLabel
                    className={classes.formLabel}
                >{`Edit a ${elementType.toLowerCase()}`}</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            label="Description *"
                            defaultValue={element.description}
                            {...register('description')}
                            name="description"
                            error={Boolean(errors.description)}
                            onChange={onChange}
                            helperText={errors.description?.message || ' '}
                            variant="filled"
                        />
                        {'deadline' in element && (
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
                                            minutesStep={60}
                                            ampm={false}
                                            value={value}
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
                                    defaultValue={element.workHours}
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
                        {'startTime' in element && (
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
                                            minutesStep={60}
                                            ampm={false}
                                            value={value}
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
                                            minutesStep={60}
                                            ampm={false}
                                            value={value}
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
                                    defaultValue={
                                        ('type' in element && element.type) || null
                                    }
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
                            Save
                        </Button>
                    </Box>
                </form>
            </Container>
        </Dialog>
    )
}

export default EditElementDialog
