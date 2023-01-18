import useStyles from './styles'
import { useNavigate } from 'react-router-dom'

export default function SignIn(props: any) {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <div>
            <h1>SignIn</h1>
        </div>
    )
}
