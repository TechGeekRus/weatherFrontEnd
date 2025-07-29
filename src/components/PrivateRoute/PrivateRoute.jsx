import { Navigate } from "react-router-dom"
import checkIfUserIsAuth from "../../utils/checkIfUserIsAuth"
import React from 'react'

function PrivateRoute({children}) {

    if(checkIfUserIsAuth()){
        return children
    }else{
        return <Navigate to ='/login'/>
    }
}

export default PrivateRoute