import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateHome: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    return user.id ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateHome
