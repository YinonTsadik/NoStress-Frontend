import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signUpSchema from './SignUpFormSchema'

import { SignUpFormValues } from '../../interfaces'

import { useQuery, useMutation } from '@apollo/client'
import { GET_USERNAMES, CREATE_USER } from '../../graphql'

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

export default function SignUpForm() {
    const { data } = useQuery(GET_USERNAMES)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: yupResolver(signUpSchema(data ? data.usernames : [])),
    })

    const [createUser] = useMutation(CREATE_USER)

    const dispatch = useDispatch()
    const { setUser } = bindActionCreators(actionCreators, dispatch)

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const onSubmit = (formData: SignUpFormValues) => {
        createUser({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.createUser) {
                console.log('Signed up successfully!')
                const { __typename, ...rest } = data.createUser
                setUser(rest)
                navigate('/')
            }
        })
    }

    return (
        <Container>
            <Typography>Sign up to NoStress</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="First Name"
                    {...register('firstName')}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName ? errors.firstName.message : ''}
                />
                <br />
                <TextField
                    label="Last Name"
                    {...register('lastName')}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName ? errors.lastName.message : ''}
                />
                <br />
                <TextField
                    label="Username"
                    {...register('username')}
                    error={Boolean(errors.username)}
                    helperText={errors.username ? errors.username.message : ''}
                />
                <br />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={Boolean(errors.password)}
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
                <Link href="/signin">
                    <Typography>Already have an account? Sign in.</Typography>
                </Link>
                <Button type="submit" variant="contained">
                    Sign Up
                </Button>
            </form>
        </Container>
    )
}
