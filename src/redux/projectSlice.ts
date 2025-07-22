import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface projectType {
   projects : ProjectType[] ,
   loading : boolean,
   error : any

}

const intitalState : projectType = {
    projects: [],
    loading: false,
    error: null
}


const projectSlice = createSlice({
    name : "project",
    initialState : intitalState,
    reducers : {
        addProject : (state , action : PayloadAction<ProjectType>) =>{
            state.projects.push(action.payload)
            state.loading = false
            state.error = null 
        } ,
        addProjectError : (state)=>{
            state.loading = false
            state.error = null 
        },
        getAllProject : (state, action : PayloadAction<ProjectType[]>)=>{
            state.projects = action.payload
            state.loading = false
            state.error = null 
        }
    }
})

export default projectSlice.reducer
export const {addProject , addProjectError , getAllProject} = projectSlice.actions
