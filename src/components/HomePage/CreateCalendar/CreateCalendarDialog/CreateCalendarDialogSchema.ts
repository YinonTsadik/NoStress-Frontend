import * as yup from 'yup'

const createCalendarSchema = () => {
    const noStartWithSpace = /^\S.*$/
    return yup.object().shape({
        name: yup
            .string()
            .required(' ')
            .max(20, 'Calendar name must be at most 20 characters')
            .matches(noStartWithSpace, 'Calendar name cannot start with a space'),
        startDate: yup.date().required(' ').nullable(false),
        endDate: yup.date().required(' ').nullable(false),
    })
}

export default createCalendarSchema
