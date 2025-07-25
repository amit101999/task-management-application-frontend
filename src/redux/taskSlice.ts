import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface propType{
    tasks : Task[]
    selectedTask : Task
    loading : boolean
    error : string  
}

const intialState = {
    tasks: [] as Task[],
    selectTask : null,
    loading: false,
    error: null
}

const taskSlice = createSlice({
    name : "task",
    initialState : intialState,
    reducers : {
        addTask : (state, action : PayloadAction<Task[]>) => {
            state.tasks = action.payload
        } , 

    }
})


export const { addTask } = taskSlice.actions
export default taskSlice.reducer