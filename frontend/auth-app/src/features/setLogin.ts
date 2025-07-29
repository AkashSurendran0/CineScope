import {createSlice} from '@reduxjs/toolkit'

const setLoginSlice=createSlice({
    name:'setLogin',
    initialState:{
        login:true,
        signUp:false,
        forgotPass:false
    },
    reducers:{
        setLogin:(state, action)=>{
            const {field}=action.payload
            state.login=false
            state.signUp=false
            state.forgotPass=false
            if(field=='login') state.login=true
            if(field=='signUp') state.signUp=true
            if(field=='forgotPass') state.forgotPass=true
        }
    }
})

export const {setLogin}=setLoginSlice.actions
export default setLoginSlice.reducer