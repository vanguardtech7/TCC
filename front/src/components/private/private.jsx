import React, {useReact} from "react";

import {Navigate, Outlet} from 'react-router-dom'

export default function PrivateRoute(){
    const localStorageToken = localStorage.getItem('token')

    return localStorageToken ? <Outlet/> : <Navigate to='/login' replace/>
}
