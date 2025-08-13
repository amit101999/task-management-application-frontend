import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface projectType {
   projects : ProjectType[] ,
   loading : boolean,
   error : any ,
   selectedProjectId: ProjectType | null
   filteredProjects: ProjectType[] | null

}

const intitalState : projectType = {
    projects: [],
    loading: false,
    error: null,
    selectedProjectId:null,
    filteredProjects: null
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
            state.filteredProjects = action.payload; // Initialize filteredProjects with all projects
            state.loading = false
            state.error = null 
        },
        selectprojectById: (state, action: PayloadAction<string>) => {
            state.selectedProjectId = state.projects.find(project => project.id === action.payload) || null;
        } ,
        filterProjects: (state, action: PayloadAction<string>) => {
            if (action.payload === 'ALL') {
                state.filteredProjects = state.projects;
            } else {
                state.filteredProjects = state.projects.filter(project => project.status === action.payload);
            }
        }
    }
})

export default projectSlice.reducer
export const {addProject , addProjectError , getAllProject , selectprojectById , filterProjects} = projectSlice.actions
