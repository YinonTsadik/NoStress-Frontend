import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import editProfileSchema from './EditProfileDialogSchema'

import {
    EditProfileProps,
    EditProfileFormValues,
    User,
} from '../../../../../interfaces'

import { useQuery, useMutation } from '@apollo/client'
import { GET_USERNAMES, UPDATE_USER } from '../../../../../graphql'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../../../../../redux'
import { bindActionCreators } from 'redux'

import { Dialog, FormLabel, Container, TextField, Box, Button } from '@mui/material'
import useStyles from './EditProfileDialogStyles'

const EditProfileDialog: React.FC<EditProfileProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog } = props

    const { data, refetch: refetchUsernames } = useQuery(GET_USERNAMES)
    const user = useSelector((state: RootState) => state.user)

    const {
        register,
        setValue,
        trigger,
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
    })

    const [updateUser] = useMutation(UPDATE_USER)

    const dispatch = useDispatch()
    const { signIn: editUser } = bindActionCreators(actionCreators, dispatch)

    type FormFields = 'firstName' | 'lastName'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = (formData: EditProfileFormValues) => {
        updateUser({
            variables: { input: { id: user.id, ...formData } },
        }).then(({ data }) => {
            if (data.updateUser) {
                console.log('User updated successfully!')
                const { __typename, ...rest } = data.updateUser
                editUser(rest as User)
                refetchUsernames()
                handleCloseDialog()
            }
        })
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <Container className={classes.root}>
                <FormLabel className={classes.formLabel}>
                    Edit Your Profile
                </FormLabel>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        label="First Name *"
                        defaultValue={user.firstName}
                        {...register('firstName')}
                        name="firstName"
                        onChange={onChange}
                        error={Boolean(errors.firstName)}
                        helperText={
                            errors.firstName ? errors.firstName.message : ' '
                        }
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
                        helperText={errors.lastName ? errors.lastName.message : ' '}
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
                        helperText={errors.username ? errors.username.message : ' '}
                        variant="filled"
                        className={classes.textField}
                    />
                    <Box className={classes.buttonContainer}>
                        <Button
                            onClick={handleCloseDialog}
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
