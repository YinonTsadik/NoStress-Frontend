// Form and validation
import signInSchema from './validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Apollo and GraphQL
import { useLazyQuery } from '@apollo/client'
import { USER_AUTHENTICATION } from '../../graphql'

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

    const [checkAuthentication] = useLazyQuery(USER_AUTHENTICATION)

    const navigate = useNavigate()

    const [authError, setAuthError] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    // After a valid form has been submitted, check the login details
    const onSubmit = (formData: SignInFormValues) => {
        const { username, password } = formData
        checkAuthentication({
            variables: {
                username,
                password,
            },
        }).then(({ data }) => {
            if (!data.user) {
                setAuthError(true)
                // reset() // Maybe
            } else {
                console.log(data.user)
                console.log('Logged in successfully!')
                setAuthError(false)
                reset()
                navigate('/')
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
