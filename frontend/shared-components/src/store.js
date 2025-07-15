import { configureStore } from "@reduxjs/toolkit";
import toggleSidebar from './features/toggleSidebar'

const store=configureStore({
    reducer:{
        toggleSidebar:toggleSidebar
    }
})

export default store