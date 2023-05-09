import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signUpSchema from './SignUpFormSchema'

import { SignUpFormValues } from '../../interfaces'

import { useUsers, useCalendars } from '../../hooks'

import { useQuery } from '@apollo/client'
import { GET_USERNAMES } from '../../graphql'

import { useNavigate } from 'react-router-dom'

import {
    Container,
    FormLabel,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

import useStyles from './SignUpFormStyles'

const SignUpForm: React.FC = () => {
    const { classes } = useStyles()

    const { data } = useQuery(GET_USERNAMES)

    const {
        register,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignUpFormValues>({
        resolver: yupResolver(signUpSchema(data ? data.usernames : [])),
    })

    const { handleSignUp } = useUsers()
    const { initialize } = useCalendars()

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    type FormFields = 'firstName' | 'lastName' | 'username' | 'password'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: SignUpFormValues) => {
        const { isAuthenticated, userID } = await handleSignUp(formData)

        if (isAuthenticated) {
            await initialize(userID)
            navigate('/')
        }
    }

    return (
        <Container className={classes.root}>
            <FormLabel className={classes.formLabel}>Sign up to NoStress</FormLabel>

            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <TextField
                    label="First Name *"
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
                    {...register('username')}
                    name="username"
                    onChange={onChange}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message || ' '}
                    variant="filled"
                    className={classes.textField}
                />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password *"
                    {...register('password')}
                    name="password"
                    onChange={onChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message || ' '}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility}>
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="filled"
                    className={classes.textField}
                />
                <Link href="/signin" className={classes.link}>
                    <Typography align="center">
                        Already have an account? Sign in.
                    </Typography>
                </Link>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                    className={classes.button}
                >
                    Sign Up
                </Button>
            </form>
        </Container>
    )
}

export default SignUpForm
