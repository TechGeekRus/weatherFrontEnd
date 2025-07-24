import Axios from "./Axios"

export const setAxiosAuthToken = (jwt) =>{
    Axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
}

export const removeAuthToken = () =>{
    delete Axios.defaults.headers.common.Authorization 
}