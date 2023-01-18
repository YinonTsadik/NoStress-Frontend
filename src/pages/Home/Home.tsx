import useStyles from './styles'
import { useNavigate } from 'react-router-dom'

export default function Home(props: any) {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
