import { useState } from 'react';
import { Search, Calendar, CheckCircle, ChevronRight, Users, Target, ArrowLeft } from 'lucide-react';
import Header from '../../sharedComponents/Member/Header';
import Sidebar from '../../sharedComponents/Member/Sidebar';
import ProjectTask from '../../sharedComponents/Member/Project';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';

interface Task {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done';
  dueDate: string;
  project: string;
  projectId: string;
  assignee?: string;
  priority?: 'Low' | 'Medium' | 'High';
}



const MemberProjects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  // const {projects} = useSelector((store : RootState ) => store.projects) 

  const { user } = useSelector((store : RootState ) => store.user)
  const [ tasks , setTasks] = useState<Task[]>()
  
  const projects = user?.projects

  const getProjectTasks = (projectId: string) => {
    return tasks?.filter(task => task.projectId === projectId);
  };
 const getProjectStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Active':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'On Hold':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <Header />

        {/* Page Content */}
        <main className="p-6">
            <div className="space-y-6">
              {!selectedProject ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">My Projects</h3>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {projects?.map((project : ProjectType) => (
                      <div
                        key={project.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-medium text-gray-800">{project.name}</h4>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="text-gray-600 mb-3">{project.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <span className={getProjectStatusBadge(project.status)}>
                                {project.status}
                              </span>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-1" />
                                Due: {project.dueDate}
                              </div>
                              
                              {/* <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-1" />
                                {project.teamMembers.length} members
                              </div>
                               */}
                              <div className="flex items-center text-sm text-gray-600">
                                <Target className="w-4 h-4 mr-1" />
                                {project.completedTasks}/{project.totalTasks} tasks
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-800">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          {/* <div className="flex -space-x-2">
                            {project.teamMembers.slice(0, 3).map((member, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                              >
                                {member.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                            {project.teamMembers.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                                +{project.teamMembers.length - 3}
                              </div>
                            )}
                          </div> */}
                          
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Project Details Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedProject.name}</h3>
                      <p className="text-gray-600">{selectedProject.description}</p>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <span className={getProjectStatusBadge(selectedProject.status)}>
                            {selectedProject.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <p className="text-lg font-bold text-gray-800">{selectedProject.progress}%</p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Target className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Tasks</p>
                          <p className="text-lg font-bold text-gray-800">{selectedProject.completedTasks}/{selectedProject.totalTasks}</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Team</p>
                          <p className="text-lg font-bold text-gray-800">{selectedProject.teamMembers?.length}</p>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Tasks */}
                 <ProjectTask getProjectTasks={getProjectTasks} selectedProject={selectedProject}  />
                </>
              )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default MemberProjects;