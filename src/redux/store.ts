import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice.ts"
import  projectSlice  from "./projectSlice.ts"

export const store = configureStore({
    reducer: {
        user : userSlice , 
        projects : projectSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch