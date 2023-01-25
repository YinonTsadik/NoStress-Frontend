// Form and validation
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signUpSchema from './validation'

// Interfaces
import { SignUpFormProps, SignUpFormValues } from '../../interfaces'

// Apollo and GraphQL
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql'

// Redux
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

// Pages navigation
import { useNavigate } from 'react-router-dom'

// State
import { useState } from 'react'

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

export default function SignUpForm(props: SignUpFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: yupResolver(signUpSchema(props.usernames)),
    })

    const [createUser] = useMutation(CREATE_USER)

    const dispatch = useDispatch()
    const { signIn } = bindActionCreators(actionCreators, dispatch)

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const onSubmit = (formData: SignUpFormValues) => {
        const { firstName, lastName, username, password } = formData
        createUser({
            variables: {
                input: {
                    firstName,
                    lastName,
                    username,
                    password,
                },
            },
        }).then(({ data }) => {
            if (data.createUser) {
                console.log(data.createUser)
                console.log('Signed up successfully!')
                signIn()
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
