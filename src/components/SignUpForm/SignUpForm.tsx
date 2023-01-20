import registerSchema from './validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button } from '@mui/material'

// Move to the interfaces folder
export interface SignUpFormProps {
    usernames: string[]
}

// Move to the interfaces folder
export interface SignUpFormValues {
    firstName: string
    lastName: string
    username: string
    password: string
}

export default function SignUpForm(props: SignUpFormProps) {
    const schema = registerSchema(props.usernames)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({ resolver: yupResolver(schema) })

    const onSubmit = (data: SignUpFormValues) => {
        console.log(data)
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="First Name"
                {...register('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message?.toString()}
            />
            <br />
            <TextField
                label="Last Name"
                {...register('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message?.toString()}
            />
            <br />
            <TextField
                label="Username"
                {...register('username')}
                error={Boolean(errors.username)}
                helperText={errors.username?.message?.toString()}
            />
            <br />
            <TextField
                label="Password"
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message?.toString()}
            />
            <br />
            <Button type="submit">Sign Up</Button>
        </form>
    )
}
