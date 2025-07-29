import {createSlice} from '@reduxjs/toolkit'

const toggleSidebar=createSlice({
    name:'toggleSidebar',
    initialState:{
        value:false
    },
    reducers:{
        setSidebar:(state)=>{
            state.value=!state.value
        }
    }
})

export default toggleSidebar.reducer
export const {setSidebar}=toggleSidebar.actions