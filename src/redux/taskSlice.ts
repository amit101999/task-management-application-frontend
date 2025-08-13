import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const intialState = {
  filterTasks: [] as Task[],
  tasks: [] as Task[],
  selectTask: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: intialState,
  reducers: {
    getAllTask: (state, action: PayloadAction<Task[]>) => {
      state.filterTasks = action.payload;
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.filterTasks.push(action.payload);
      state.tasks.push(action.payload);
    },
    filterProjectByName: (state, action: PayloadAction<string>) => {
      state.filterTasks = state.tasks.filter((tasks) =>
        tasks.projectName.toLowerCase().includes(action.payload)
      );
    },
    filterByName: (state, action: PayloadAction<string>) => {
      state.filterTasks = state.tasks.filter((tasks) =>
        tasks.assignedUser.toLowerCase().includes(action.payload)
      );
    },
    filterByStatus: (state, action: PayloadAction<string>) => {
      state.filterTasks = state.tasks.filter((tasks) =>
        tasks.status.includes(action.payload)
      );
    },
    clearFilter: (state) => {
      state.filterTasks = state.tasks;
    },
  },
});

export const {
  addTask,
  getAllTask,
  filterProjectByName,
  clearFilter,
  filterByName,
  filterByStatus
} = taskSlice.actions;
export default taskSlice.reducer;
