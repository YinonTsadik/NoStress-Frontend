import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    const isAuthenticated = false
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}
