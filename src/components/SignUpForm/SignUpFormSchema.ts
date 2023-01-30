import * as yup from 'yup'

export default function signUpSchema(existingUsernames: string[]) {
    return yup.object().shape({
        firstName: yup
            .string()
            .required('First name is a required field')
            .matches(/^[a-zA-Z]+$/, 'Only letters allowed')
            .max(20, 'First name must be at most 20 characters'),
        lastName: yup
            .string()
            .required('Last name is a required field')
            .matches(/^[a-zA-Z]+$/, 'Only letters allowed')
            .max(20, 'Last name must be at most 20 characters'),
        username: yup
            .string()
            .required('Username is a required field')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters')
            .notOneOf(existingUsernames, 'Username already taken'),
        password: yup
            .string()
            .required('Password is a required field')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .min(4, 'Password must be at least 4 characters')
            .max(20, 'Password must be at most 20 characters'),
    })
}
