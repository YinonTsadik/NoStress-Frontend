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
        setValue,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
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

    type FormFields = 'username' | 'password'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthError(false)

        const name = event.currentTarget.name as FormFields
        setValue(name, event.currentTarget.value)
        trigger(name)
    }

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

    return (
        <Container>
            <Typography>Sign in to NoStress</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Username"
                    {...register('username')}
                    name="username"
                    onChange={onChange}
                    error={Boolean(errors.username || authError)}
                    helperText={errors.username?.message}
                />
                <br />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...register('password')}
                    name="password"
                    onChange={onChange}
                    error={Boolean(errors.password || authError)}
                    helperText={errors.password?.message}
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
                <Button type="submit" variant="contained" disabled={!isValid}>
                    Sign In
                </Button>
            </form>
        </Container>
    )
}
