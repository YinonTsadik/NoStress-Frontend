import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateHome() {
    const isSignedIn = useSelector((state: RootState) => state.userStatus)
    return isSignedIn ? <Outlet /> : <Navigate to="/signin" />
}
