import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateHome() {
    const user = useSelector((state: RootState) => state.user)
    return user.id ? <Outlet /> : <Navigate to="/signin" />
}
