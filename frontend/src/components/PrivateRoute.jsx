import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'



export const PrivateRoute = () => {

    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    }

    return (
        <>
            {loggedIn ? <Outlet /> : <Navigate to='/login' />}


        </>
    )
}
