import * as yup from 'yup'

export default function registerSchema(existingUsernames: string[]) {
    return yup.object().shape({
        firstName: yup
            .string()
            .max(20, 'First name must be at most 20 characters')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .required('First name is a required field'),
        lastName: yup
            .string()
            .max(20, 'Last name must be at most 20 characters')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .required('Last name is a required field'),
        username: yup
            .string()
            .max(20, 'Username must be at most 20 characters')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .notOneOf(existingUsernames, 'Username already taken')
            .required('Username is a required field'),
        password: yup
            .string()
            .min(4, 'Password must be at least 4 characters')
            .max(20, 'Password must be at most 20 characters')
            .matches(/^\S*$/, 'No whitespaces allowed')
            .required('Password is a required field'),
    })
}
