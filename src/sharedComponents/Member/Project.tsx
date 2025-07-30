import axios from 'axios'
import { Calendar, CheckCircle, Circle, Clock, Filter, Search, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { taskMapping } from '../../FieldMapping/taskMapping'


interface PropType{
    getProjectTasks : (projectId : string) => any
    selectedProject : ProjectType
}

const ProjectTask = ({getProjectTasks , selectedProject , } : PropType) => {
  const [tasks , setTasks] = useState<Task[]>()

useEffect(() => {

  const fetchProjectsByid = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/getProject/${selectedProject.id}`, { withCredentials: true });
      // dispatch({ type: 'projects/setProjects', payload: res.data.data });
      // console.log(res.data.data.tasks);
      
      const data = taskMapping(res.data.data.tasks)
      setTasks(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  fetchProjectsByid()
  
},[selectedProject , setTasks])


  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Done':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'In Progress':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

 const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (priority) {
      case 'High':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };


   const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
     <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-800">Project Tasks</h4>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search tasks..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                            <option value="All">All Status</option>
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {tasks?.map((task : Task) => (
                        <div
                          key={task.id}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h5 className="font-medium text-gray-800">{task.title}</h5>
                                {task.priority && (
                                  <span className={getPriorityBadge(task.priority)}>
                                    {task.priority}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Due: {task.dueDate}
                                </span>
                                <span className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {task.id}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className={getStatusBadge(task.status)}>
                                  {task.status}
                                </span>
                                
                                <div className="flex space-x-2">
                                  {task.status !== 'COLSED' && (
                                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                                      Mark Complete
                                    </button>
                                  )}
                                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                                    Update Status
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
  )
}

export default ProjectTask