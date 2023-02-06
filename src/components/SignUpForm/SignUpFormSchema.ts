import * as yup from 'yup'

const signUpSchema = (existingUsernames: string[]) => {
    const onlyLetters = /^[a-zA-Z]+$/
    const noWhiteSpaces = /^\S*$/

    return yup.object().shape({
        firstName: yup
            .string()
            .required(' ')
            .matches(onlyLetters, 'Only letters allowed')
            .max(20, 'First name must be at most 20 characters'),
        lastName: yup
            .string()
            .required(' ')
            .matches(onlyLetters, 'Only letters allowed')
            .max(20, 'Last name must be at most 20 characters'),
        username: yup
            .string()
            .required(' ')
            .matches(noWhiteSpaces, 'No spaces allowed')
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters')
            .notOneOf(existingUsernames, 'Username already taken'),
        password: yup
            .string()
            .required(' ')
            .matches(noWhiteSpaces, 'No spaces allowed')
            .min(4, 'Password must be at least 4 characters')
            .max(20, 'Password must be at most 20 characters'),
    })
}

export default signUpSchema
