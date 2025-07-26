import { Navigate } from "react-router-dom";

export const RedirectToHome = ({children}) =>{
    const token=localStorage.getItem('accessToken')
    if(token){
        return <Navigate to='/' replace/>
    }
    return children
}

export const RedirectToLogin = ({children}) =>{
    const token=localStorage.getItem('accessToken')
    if(!token){
        return <Navigate to='/login' replace/>
    }
    return children
}