import { useMutation } from '@apollo/client'
import { OPTIMIZE } from '../graphql'

const useOptimize = (calendarID: string) => {
    const [optimize] = useMutation(OPTIMIZE, {
        fetchPolicy: 'network-only',
    })

    const handleOptimize = async () => {
        await optimize({ variables: { calendarID } }).then(({ data }) => {
            if (data.optimize) {
                console.log('Optimized successfully!')
            }
        })
    }

    return handleOptimize
}

export default useOptimize
