import React from 'react'

import {
    AddElementDialogProps,
    CreateElementFormValues,
    CreateTaskFormValues,
    CreateConstraintFormValues,
} from '../../../../../interfaces'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createTaskSchema, createConstraintSchema } from './AddElementDialogSchema'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
    CREATE_TASK,
    CREATE_CONSTRAINT,
    OPTIMIZE,
    GET_CALENDAR_EVENTS,
} from '../../../../../graphql'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../../../../../redux'
import { bindActionCreators } from 'redux'

import { Dialog, Container, FormLabel, TextField, Box, Button } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

// import useStyles from './AddElementDialogStyles'

const AddElementDialog: React.FC<AddElementDialogProps> = (props) => {
    // const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, elementType } = props

    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const {
        control,
        register,
        setValue,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateTaskFormValues | CreateConstraintFormValues>({
        resolver: yupResolver(
            elementType === 'Task' ? createTaskSchema() : createConstraintSchema()
        ),
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

    const handleClose = () => {
        reset()
        handleCloseDialog()
    }

    type FormFields = 'description' | 'workHours'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = (formData: CreateElementFormValues) => {
        if (elementType === 'Task') {
            // const taskFormData = formData as CreateTaskFormValues
        } else {
            // const constraintFormData = formData as CreateConstraintFormValues
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container>
                <FormLabel>{`Add a ${elementType.toLowerCase()}`}</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            label="Description *"
                            {...register('description')}
                            name="description"
                            error={Boolean(errors.description)}
                            onChange={onChange}
                            helperText={
                                errors.description ? errors.description.message : ' '
                            }
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
                                            disableMaskedInput
                                            minutesStep={60}
                                            ampm={false}
                                            minDateTime={
                                                new Date(currentCalendar.startDate)
                                            }
                                            maxDateTime={
                                                new Date(currentCalendar.endDate)
                                            }
                                            value={value || null}
                                            onChange={(newValue) => {
                                                onChange(newValue)
                                                newValue &&
                                                    setValue('deadline', newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                            inputFormat="dd/MM/yyyy hh:mm"
                                            PopperProps={{ placement: 'auto' }}
                                        />
                                    )}
                                />
                                <TextField
                                    label="Work Hours *"
                                    type="number"
                                    {...register('workHours')}
                                    name="workHours"
                                    InputProps={{ inputProps: { min: 0 } }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={onChange}
                                    error={Boolean(
                                        'workHours' in errors && errors.workHours
                                    )}
                                    helperText={
                                        'workHours' in errors && errors.workHours
                                            ? errors.workHours.message
                                            : ' '
                                    }
                                    variant="filled"
                                />
                            </>
                        )}

                        {elementType === 'Constraint' && <></>}
                    </LocalizationProvider>
                    <Box>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            disabled={!isValid}
                            variant="contained"
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
