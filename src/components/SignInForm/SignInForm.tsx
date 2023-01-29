import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signInSchema from './SignInFormSchema'

import { SignInFormValues } from '../../interfaces'

import { useLazyQuery } from '@apollo/client'
import { USER_AUTHENTICATION } from '../../graphql'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import {
    Container,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

export default function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({ resolver: yupResolver(signInSchema()) })

    const [checkAuthentication] = useLazyQuery(USER_AUTHENTICATION)

    const dispatch = useDispatch()
    const { setUser } = bindActionCreators(actionCreators, dispatch)

    const navigate = useNavigate()

    const [authError, setAuthError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    // After a valid form has been submitted, check the login details
    const onSubmit = (formData: SignInFormValues) => {
        checkAuthentication({
            variables: { ...formData },
        }).then(({ data }) => {
            if (data.user) {
                console.log('Logged in successfully!')
                const { __typename, ...rest } = data.user
                setUser(rest)
                navigate('/')
                setAuthError(false)
            } else {
                setAuthError(true)
                // reset() // Maybe
            }
        })
    }

    // Don't show form error(s) and a details error at the same time
    if ((errors.username || errors.password) && authError) {
        setAuthError(false)
    }

    return (
        <Container>
            <Typography>Sign in to NoStress</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Username"
                    {...register('username')}
                    error={Boolean(errors.username || authError)}
                    helperText={errors.username ? errors.username.message : ''}
                />
                <br />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={Boolean(errors.password || authError)}
                    helperText={errors.password ? errors.password.message : ''}
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
                />
                <br />
                {authError && (
                    <Typography variant="caption" color="error">
                        {'Incorrect username or password'}
                    </Typography>
                )}
                <Link href="/signup">
                    <Typography>New to NoStress? Create an account.</Typography>
                </Link>
                <Button type="submit" variant="contained">
                    Sign In
                </Button>
            </form>
        </Container>
    )
}
