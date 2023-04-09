import * as yup from 'yup'
import { Type, ElementType } from '../../../../../interfaces'

const noStartWithSpace = /^\S.*$/
const types = Object.values(Type)

const createCalendarSchema = () => {
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

const createTaskSchema = () => {
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

const createConstraintSchema = () => {
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

const createElementSchema = (elementType: ElementType) => {
    switch (elementType) {
        case 'Calendar':
            return createCalendarSchema
        case 'Task':
            return createTaskSchema
        case 'Constraint':
            return createConstraintSchema
    }
}

export default createElementSchema
