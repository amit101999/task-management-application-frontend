import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice.ts"
import  projectSlice  from "./projectSlice.ts"
import  taskSlice  from "./taskSlice.ts"

export const store = configureStore({
    reducer: {
        user : userSlice , 
        projects : projectSlice,
        tasks : taskSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch