import * as yup from 'yup'
import { Type, ElementType } from '../../../../../interfaces'

const noStartWithSpace = /^\S.*$/
const types = Object.values(Type)

const editTaskSchema = () => {
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

const editConstraintSchema = () => {
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

const editElementSchema = (elementType: ElementType) => {
    switch (elementType) {
        case 'Task':
            return editTaskSchema
        case 'Constraint':
            return editConstraintSchema
    }
}

export default editElementSchema
