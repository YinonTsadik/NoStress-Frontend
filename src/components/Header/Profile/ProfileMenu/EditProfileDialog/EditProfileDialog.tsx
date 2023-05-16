import React from 'react'

import {
    EditProfileDialogProps,
    EditProfileFormValues,
} from '../../../../../interfaces'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import editProfileSchema from './EditProfileDialogSchema'

import { useQuery } from '@apollo/client'
import { GET_USERNAMES } from '../../../../../graphql'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux'

import { useUsers } from '../../../../../hooks'

import { Dialog, Container, FormLabel, TextField, Box, Button } from '@mui/material'

import useStyles from './EditProfileDialogStyles'

const EditProfileDialog: React.FC<EditProfileDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog } = props

    const { data, refetch: refetchUsernames } = useQuery(GET_USERNAMES)
    const user = useSelector((state: RootState) => state.user)

    const {
        register,
        setValue,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EditProfileFormValues>({
        resolver: yupResolver(
            editProfileSchema(
                data
                    ? data.usernames.filter((name: string) => name !== user.username)
                    : []
            )
        ),
        defaultValues: { id: user.id },
    })

    const { handleUpdateUser } = useUsers()

    const handleClose = () => {
        reset()
        handleCloseDialog()
    }

    type FormFields = 'firstName' | 'lastName'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: EditProfileFormValues) => {
        await handleUpdateUser(formData)
        await refetchUsernames()
        handleCloseDialog()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Container className={classes.root}>
                <FormLabel className={classes.formLabel}>
                    Edit your profile
                </FormLabel>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        label="First Name *"
                        defaultValue={user.firstName}
                        {...register('firstName')}
                        name="firstName"
                        onChange={onChange}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName?.message || ' '}
                        variant="filled"
                        className={classes.textField}
                    />
                    <TextField
                        label="Last Name *"
                        defaultValue={user.lastName}
                        {...register('lastName')}
                        name="lastName"
                        onChange={onChange}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName?.message || ' '}
                        variant="filled"
                        className={classes.textField}
                    />
                    <TextField
                        label="Username *"
                        defaultValue={user.username}
                        {...register('username')}
                        name="username"
                        onChange={onChange}
                        error={Boolean(errors.username)}
                        helperText={errors.username?.message || ' '}
                        variant="filled"
                        className={classes.textField}
                    />
                    <Box className={classes.buttonContainer}>
                        <Button
                            onClick={handleClose}
                            className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isValid}
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

export default EditProfileDialog
