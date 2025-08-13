export const taskMapping = (tasks : any) : Task[] =>{
    return tasks.map((item : any) => ({
         id: item.id,
  title: item.title ,
  assignedUser: item.assignedTo?.name || item.userid,
  status: item.task_status ,
  dueDate: item.dueDate ,
  projectName: item.project?.project_name || item.projectId, 
  priority: item.priority,
  description: item.description ,
  startDate : item.startdate
    }))
}

export const SingleTaskMapping = (item : any) : Task =>{
  return {
     id: item.id,
  title: item.title ,
  assignedUser: item.assignedTo?.name,
  status: item.task_status ,
  dueDate: item.dueDate.toString() ,
  projectName: item.project?.project_name, 
  priority: item.priority,
  description: item.description ,
  startDate : item.startdate
  }
}
