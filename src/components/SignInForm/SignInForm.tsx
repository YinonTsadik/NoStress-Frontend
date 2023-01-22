// Form and validation
import signInSchema from './validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Apollo and GraphQL
import { useLazyQuery } from '@apollo/client'
import { CHECK_AUTH_DEATAILS } from '../../graphql'

// Interface
import { SignInFormValues } from '../../interfaces'

// State
import { useState } from 'react'

// Pages navigation
import { useNavigate } from 'react-router-dom'

// Material components and icons
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
    const schema = signInSchema()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignInFormValues>({ resolver: yupResolver(schema) })

    const [checkAuthDeatails] = useLazyQuery(CHECK_AUTH_DEATAILS)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [authError, setAuthError] = useState<boolean>(false)

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const toggleAuthError = () => {
        setAuthError((prevAuthError) => !prevAuthError)
    }

    const onSubmit = (formData: SignInFormValues) => {
        checkAuthDeatails({
            variables: {
                username: formData.username,
                password: formData.password,
            },
        }).then(({ data }) => {
            if (!data.checkAuthDetails) {
                toggleAuthError()
            } else {
                toggleAuthError()
                reset()
                navigate('/')
                console.log(data.checkAuthDetails)
                console.log('Login successfully!')
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
                    <Typography variant="caption" color="error" align="center">
                        {'Incorrect username or password.'}
                    </Typography>
                )}
                <br />
                <Link href="/signup">
                    <Typography>New to NoStress? Create an account.</Typography>
                </Link>
                <br />
                <Button type="submit" variant="contained">
                    Sign In
                </Button>
            </form>
        </Container>
    )
}
