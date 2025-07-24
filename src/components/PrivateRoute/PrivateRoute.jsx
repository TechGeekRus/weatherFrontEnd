import { Navigate } from "react-router-dom"
import checkIfUserIsAuth from "../../utils/checkIfUserIsAuth"

function PrivateRoute({children}) {

    if(checkIfUserIsAuth()){
        return children
    }else{
        return <Navigate to ='/login'/>
    }
}

export default PrivateRoute