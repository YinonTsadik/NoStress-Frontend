import * as yup from 'yup'

export default function signInSchema() {
    return yup.object().shape({
        username: yup
            .string()
            .required('Username is a required field')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters'),
        password: yup
            .string()
            .required('Password is a required field')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .min(4, 'Password must be at least 4 characters')
            .max(20, 'Password must be at most 20 characters'),
    })
}
