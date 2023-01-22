import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    // The isLoggedIn state
    const isAuthenticated = true
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}
