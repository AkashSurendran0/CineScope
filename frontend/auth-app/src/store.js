import { configureStore } from "@reduxjs/toolkit";
import loginErrors from '../features/loginPageErrors'
import setLogin from '../features/setLogin'

export const store=configureStore({
    reducer:{
        loginErrors:loginErrors,
        setLogin:setLogin
    }
})