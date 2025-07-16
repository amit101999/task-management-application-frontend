import React, { useState } from 'react';
import { 
  FolderOpen,  
  Users, 
  Bell,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  FileText,
} from 'lucide-react';
import SideBar from '../sharedComponents/SideBar';

interface Project {
  id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  dueDate: string;
  assignedMembers: number;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Completed' | 'Upcoming'>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const projects: Project[] = [
    {
      id: '1',
      title: 'Mobile App Redesign',
      status: 'Active',
      dueDate: '2024-08-15',
      assignedMembers: 6,
      description: 'Complete redesign of the mobile application with new UI/UX',
      priority: 'High'
    },
    {
      id: '2',
      title: 'Website Overhaul',
      status: 'Active',
      dueDate: '2024-09-01',
      assignedMembers: 4,
      description: 'Modernize the company website with new features',
      priority: 'Medium'
    },
    {
      id: '3',
      title: 'Database Migration',
      status: 'Completed',
      dueDate: '2024-07-01',
      assignedMembers: 3,
      description: 'Migrate legacy database to new infrastructure',
      priority: 'High'
    },
    {
      id: '4',
      title: 'Customer Portal',
      status: 'Upcoming',
      dueDate: '2024-10-15',
      assignedMembers: 5,
      description: 'Build customer self-service portal',
      priority: 'Medium'
    },
    {
      id: '5',
      title: 'API Documentation',
      status: 'Active',
      dueDate: '2024-08-30',
      assignedMembers: 2,
      description: 'Create comprehensive API documentation',
      priority: 'Low'
    },
    {
      id: '6',
      title: 'Security Audit',
      status: 'Completed',
      dueDate: '2024-06-20',
      assignedMembers: 4,
      description: 'Complete security audit and vulnerability assessment',
      priority: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All' || project.status === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterCounts = {
    All: projects.length,
    Active: projects.filter(p => p.status === 'Active').length,
    Completed: projects.filter(p => p.status === 'Completed').length,
    Upcoming: projects.filter(p => p.status === 'Upcoming').length
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
     <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">John Doe</span>
              <button className="text-sm text-gray-500 hover:text-gray-700">Logout</button>
            </div>
          </div>
        </header>

        {/* Projects Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Projects Overview</h2>
              <p className="text-gray-600 mt-1">Manage and track all your projects</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex space-x-2">
              {(['All', 'Active', 'Completed', 'Upcoming'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter} ({filterCounts[filter]})
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                <div className="col-span-4">Project</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2">Members</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <div key={project.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Project Info */}
                    <div className="col-span-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{project.title}</h3>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{project.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{project.assignedMembers} members</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No projects found matching your criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Project</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Enter project name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter project description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select priority...</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;