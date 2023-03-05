import * as yup from 'yup'
import { Type } from '../../../../../interfaces'

export const createTaskSchema = () => {
    return yup.object().shape({
        description: yup
            .string()
            .required(' ')
            .max(20, 'Task description must be at most 20 characters'),
        deadline: yup.date().required(' ').nullable(false),
        workHours: yup.number().required(' '),
    })
}

export const createConstraintSchema = () => {
    return yup.object().shape({
        description: yup
            .string()
            .required(' ')
            .max(20, 'Constraint description must be at most 20 characters'),
        startTime: yup.date().required(' ').nullable(false),
        endTime: yup.date().required(' ').nullable(false),
        type: yup.string().required(' ').oneOf(Object.values(Type)),
    })
}
