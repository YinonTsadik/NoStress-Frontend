import * as yup from 'yup'
import { Type } from '../../../../../interfaces'

const noStartWithSpace = /^\S.*$/
const types = Object.values(Type)

export const createTaskSchema = () => {
    return yup.object().shape({
        description: yup
            .string()
            .required(' ')
            .max(20, 'Task description must be at most 20 characters')
            .matches(noStartWithSpace, 'Task description cannot start with a space'),
        deadline: yup.date().required(' ').nullable(false),
        workHours: yup.number().required(' '),
    })
}

export const createConstraintSchema = () => {
    return yup.object().shape({
        description: yup
            .string()
            .required(' ')
            .max(20, 'Constraint description must be at most 20 characters')
            .matches(
                noStartWithSpace,
                'Constraint description cannot start with a space'
            ),
        startTime: yup.date().required(' ').nullable(false),
        endTime: yup.date().required(' ').nullable(false),
        type: yup.string().required(' ').oneOf(types),
    })
}
