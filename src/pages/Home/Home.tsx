import { useSelector } from 'react-redux'
import { RootState } from '../../redux'

export default function Home() {
    const user = useSelector((state: RootState) => state.user)
    return (
        <div>
            <h3>{`ID: ${user.id}`}</h3>
            <h3>{`First Name: ${user.firstName}`}</h3>
            <h3>{`Last Name: ${user.lastName}`}</h3>
            <h3>{`username: ${user.username}`}</h3>
            <h3>{`password: ${user.password}`}</h3>
        </div>
    )
}
