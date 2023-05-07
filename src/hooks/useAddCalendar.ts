import { CreateCalendarFormValues, Calendar } from '../interfaces'

import { useMutation } from '@apollo/client'
import { CREATE_CALENDAR } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useAddCalendar = () => {
    const [createCalendar] = useMutation(CREATE_CALENDAR, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { addCalendar, setCurrentCalendar, setTasks, setConstraints, setEvents } =
        bindActionCreators(actionCreators, dispatch)

    const handleAddCalendar = async (formData: CreateCalendarFormValues) => {
        await createCalendar({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.createCalendar) {
                console.log('Calendar created successfully!')
                const { __typename, ...rest } = data.createCalendar

                addCalendar(rest as Calendar)
                setCurrentCalendar(rest as Calendar)
                setTasks([])
                setConstraints([])
                setEvents([])
            }
        })
    }

    return handleAddCalendar
}

export default useAddCalendar
