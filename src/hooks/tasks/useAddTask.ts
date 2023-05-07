import { CreateTaskFormValues, Task } from '../../interfaces'

import { useMutation } from '@apollo/client'
import { CREATE_TASK } from '../../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../redux'
import { bindActionCreators } from 'redux'

const useAddTask = () => {
    const [createTask] = useMutation(CREATE_TASK, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { addTask } = bindActionCreators(actionCreators, dispatch)

    const handleAddTask = async (formData: CreateTaskFormValues) => {
        await createTask({ variables: { input: { ...formData } } }).then(
            ({ data }) => {
                if (data.createTask) {
                    console.log('Task created successfully!')
                    const { __typename, ...rest } = data.createTask
                    addTask(rest as Task)
                }
            }
        )
    }

    return handleAddTask
}

export default useAddTask
