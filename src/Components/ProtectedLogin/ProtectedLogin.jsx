import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedLogin(props) {
    if (localStorage.getItem("token") !== null) {

        return <Navigate to={'/home'} />

    } else {

        return props.children 

    }
}
