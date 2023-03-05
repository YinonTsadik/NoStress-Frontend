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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// import useStyles from './AddElementDialogStyles'

const AddElementDialog: React.FC<AddElementDialogProps> = (props) => {
    // const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, elementType } = props

    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const {
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateElementFormValues>({
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

    const onSubmit = (formData: CreateElementFormValues) => {
        if (elementType === 'Task') {
            const taskFormData = formData as CreateTaskFormValues
        } else {
            const constraintFormData = formData as CreateConstraintFormValues
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container>
                <FormLabel>{`Add a ${elementType.toLowerCase()}`}</FormLabel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                    ></LocalizationProvider>
                    <Box>
                        <Button></Button>
                        <Button></Button>
                    </Box>
                </form>
            </Container>
        </Dialog>
    )
}

export default AddElementDialog
