import React, { useState, useEffect } from 'react'

import {
    AddElementDialogProps,
    CreateElementFormValues,
    CreateCalendarFormValues,
    CreateTaskFormValues,
    CreateConstraintFormValues,
    Type,
    Task,
    Constraint,
    Event,
} from '../../../../../interfaces'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import createElementSchema from './AddElementDialogSchema'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
    CREATE_CALENDAR,
    CREATE_TASK,
    CREATE_CONSTRAINT,
    OPTIMIZE,
    GET_CALENDAR_EVENTS,
} from '../../../../../graphql'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../../../../../redux'
import { bindActionCreators } from 'redux'

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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

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
    } = useForm<CreateTaskFormValues | CreateConstraintFormValues>({
        resolver: yupResolver(createElementSchema(elementType)()),
        defaultValues: { calendarID: currentCalendar.id },
    })

    const [createTask] = useMutation(CREATE_TASK)
    const [createConstraint] = useMutation(CREATE_CONSTRAINT)
    const [optimize] = useMutation(OPTIMIZE)
    const [getEvents] = useLazyQuery(GET_CALENDAR_EVENTS)

    const dispatch = useDispatch()
    const { addTask, addConstraint, setEvents } = bindActionCreators(
        actionCreators,
        dispatch
    )

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
        await handleOptimize()
        handleClose()
    }

    const handleAddElement = async (formData: CreateElementFormValues) => {
        if (elementType === 'Task') {
            const taskFormData = formData as CreateTaskFormValues
            await createTask({ variables: { input: { ...taskFormData } } }).then(
                ({ data }) => {
                    if (data.createTask) {
                        console.log('Task created successfully!')
                        const { __typename, ...rest } = data.createTask
                        addTask(rest as Task)
                    }
                }
            )
        } else {
            const constraintFormData = formData as CreateConstraintFormValues
            await createConstraint({
                variables: { input: { ...constraintFormData } },
            }).then(({ data }) => {
                if (data.createConstraint) {
                    console.log('Constraint created successfully!')
                    const { __typename, ...rest } = data.createConstraint
                    addConstraint(rest as Constraint)
                }
            })
        }
    }

    const handleOptimize = async () => {
        // await optimize({ variables: { calendarID: currentCalendar.id } }).then(
        //     ({ data }) => {
        //         if (data.optimize) {
        //             console.log('Optimized successfully!')
        //         }
        //     }
        // )

        await getEvents({ variables: { calendarID: currentCalendar.id } }).then(
            ({ data }) => {
                if (data.calendarEvents) {
                    const events: Event[] = data.calendarEvents.map((event: any) => {
                        const { description, startTime, endTime } = event

                        const formattedEvent: Event = {
                            title: description,
                            start: new Date(startTime),
                            end: new Date(endTime),
                        }

                        return formattedEvent
                    })

                    setEvents(events)
                }
            }
        )
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
                                        <DateTimePicker
                                            label="Deadline *"
                                            disablePast
                                            disableMaskedInput
                                            minDateTime={
                                                new Date(currentCalendar.startDate)
                                            }
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
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
                                            PopperProps={{ placement: 'auto' }}
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
                                        <DateTimePicker
                                            label="Start *"
                                            disablePast
                                            disableMaskedInput
                                            minDateTime={
                                                new Date(currentCalendar.startDate)
                                            }
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
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
                                            PopperProps={{ placement: 'auto' }}
                                            className={classes.field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            label="End *"
                                            disablePast
                                            disableMaskedInput={true}
                                            disabled={startTime == null}
                                            minDateTime={startTime || null}
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
                                            }
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
                                            PopperProps={{ placement: 'auto' }}
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
                    <Box className={classes.buttonContainer}>
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
