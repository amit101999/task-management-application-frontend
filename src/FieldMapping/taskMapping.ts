export const taskMapping = (user : any) : Task[] =>{
    return user.map((item : any) => ({
         id: item.id,
  title: item.title ,
  assignedUsers: item.assignedTo?.name,
  status: item.task_status ,
  dueDate: item.dueDate.toString() ,
  projectName: item.project?.project_name, 
  priority: item.priority,
  description: item.description ,
  startDate : item.startdate
    }))
}