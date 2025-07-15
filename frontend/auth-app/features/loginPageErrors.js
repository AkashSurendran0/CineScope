import { createSlice } from "@reduxjs/toolkit";

const setLoginErrorsSlice=createSlice({
    name:'loginErrors',
    initialState:{
        signInEmail:'',
        signInPass:'',
        signUpName:'',
        emailPattern:'',
        signUpPass:'',
        signUpConfirmPass:'',
        forgotPassPass:'',
        forgotPassConfirmPass:''
    },
    reducers:{
        setError:(state, action)=>{ 
            const {field, message}=action.payload
            state[field]=message
        },
        removeErrors:(state)=>{
            Object.keys(state).forEach(key=>{
                state[key]=''
            })
        }
    }
})

export const {setError, removeErrors} = setLoginErrorsSlice.actions
export default setLoginErrorsSlice.reducer