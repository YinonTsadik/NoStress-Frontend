import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signInSchema from './SignInFormSchema'

import { SignInFormValues } from '../../interfaces'

import { useUsers } from '../../hooks'

import { useNavigate } from 'react-router-dom'

import {
    FormLabel,
    Container,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

import useStyles from './SignInFormStyles'

const SignInForm: React.FC = () => {
    const { classes } = useStyles()
    const {
        register,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInFormValues>({ resolver: yupResolver(signInSchema()) })

    const { handleSignIn } = useUsers()

    const navigate = useNavigate()
    const [authError, setAuthError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    type FormFields = 'username' | 'password'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthError(false)

        const name = event.currentTarget.name as FormFields
        const value = event.currentTarget.value
        setValue(name, value)
        trigger(name)
    }

    const onSubmit = async (formData: SignInFormValues) => {
        const isAuthenticated = await handleSignIn(formData)

        if (isAuthenticated) {
            navigate('/')
            setAuthError(false)
        } else {
            setAuthError(true)
        }
    }

    return (
        <Container className={classes.root}>
            <FormLabel className={classes.formLabel}>Sign in to NoStress</FormLabel>
            <Typography variant="caption" color="error">
                {authError ? 'Incorrect username or password' : '\u2800'}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <TextField
                    label="Username *"
                    {...register('username')}
                    name="username"
                    onChange={onChange}
                    error={Boolean(errors.username || authError)}
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
                    error={Boolean(errors.password || authError)}
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
                <Link href="/signup" className={classes.link}>
                    <Typography align="center">
                        New to NoStress? Create an account.
                    </Typography>
                </Link>
                <Button
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    className={classes.button}
                >
                    Sign In
                </Button>
            </form>
        </Container>
    )
}

export default SignInForm
