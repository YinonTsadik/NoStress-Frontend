import * as yup from 'yup'

export default function signInSchema() {
    const noWhiteSpaces = /^\S*$/

    return yup.object().shape({
        username: yup
            .string()
            .required(' ')
            .matches(noWhiteSpaces, 'No spaces allowed')
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters'),
        password: yup
            .string()
            .required(' ')
            .matches(noWhiteSpaces, 'No spaces allowed')
            .min(4, 'Password must be at least 4 characters')
            .max(20, 'Password must be at most 20 characters'),
    })
}
