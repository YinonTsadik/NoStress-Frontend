import { EditCalendarFormValues, Calendar } from '../../interfaces'

import { useMutation } from '@apollo/client'
import { UPDATE_CALENDAR } from '../../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../redux'
import { bindActionCreators } from 'redux'

const useUpdateCalendar = () => {
    const [updateCalendar] = useMutation(UPDATE_CALENDAR, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { editCalendar } = bindActionCreators(actionCreators, dispatch)

    const handleUpdateCalendar = async (formData: EditCalendarFormValues) => {
        await updateCalendar({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.updateCalendar) {
                console.log('Calendar updated successfully!')
                const { __typename, ...rest } = data.updateCalendar
                editCalendar(rest as Calendar)
            }
        })
    }

    return handleUpdateCalendar
}

export default useUpdateCalendar
