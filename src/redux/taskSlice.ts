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
        getAllTask : (state, action : PayloadAction<Task[]>) => {
            state.tasks = action.payload
        } , 
        addTask : (state, action : PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        }

    }
})


export const { addTask , getAllTask } = taskSlice.actions
export default taskSlice.reducer