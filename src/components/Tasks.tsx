import React, { useState } from "react";
import {
  CheckSquare,
  Bell,
  Search,
  Plus,
  X,
  Calendar,
  FileText,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import SideBar from "../sharedComponents/SideBar";

interface Task {
  id: string;
  title: string;
  assignedUsers: { id: string; name: string; avatar: string }[];
  status: "To-do" | "In-progress" | "Done";
  dueDate: string;
  projectId: string;
  projectName: string;
  priority: "High" | "Medium" | "Low";
  description: string;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const TasksPage: React.FC = () => {
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    "All" | "To-do" | "In-progress" | "Done"
  >("All");
  const [activeMemberFilter, setActiveMemberFilter] = useState<string>("All");
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const members: Member[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9a5a2cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Designer",
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Developer",
    },
    {
      id: "3",
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Project Manager",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Developer",
    },
    {
      id: "5",
      name: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "QA Engineer",
    },
  ];

  const projects = [
    { id: "1", name: "Mobile App Redesign" },
    { id: "2", name: "Website Overhaul" },
    { id: "3", name: "Database Migration" },
    { id: "4", name: "Customer Portal" },
    { id: "5", name: "API Documentation" },
  ];

  const tasks: Task[] = [
    {
      id: "1",
      title: "Design user authentication flow",
      assignedUsers: [members[0]],
      status: "In-progress",
      dueDate: "2024-07-20",
      projectId: "1",
      projectName: "Mobile App Redesign",
      priority: "High",
      description: "Create wireframes and mockups for user authentication",
    },
    {
      id: "2",
      title: "Implement login API",
      assignedUsers: [members[1], members[3]],
      status: "To-do",
      dueDate: "2024-07-25",
      projectId: "1",
      projectName: "Mobile App Redesign",
      priority: "High",
      description: "Build secure login endpoint with JWT authentication",
    },
    {
      id: "3",
      title: "Database schema optimization",
      assignedUsers: [members[1]],
      status: "Done",
      dueDate: "2024-07-15",
      projectId: "3",
      projectName: "Database Migration",
      priority: "Medium",
      description: "Optimize database queries and indexes",
    },
    {
      id: "4",
      title: "User testing sessions",
      assignedUsers: [members[2], members[4]],
      status: "To-do",
      dueDate: "2024-07-30",
      projectId: "2",
      projectName: "Website Overhaul",
      priority: "Medium",
      description: "Conduct user testing for new website features",
    },
    {
      id: "5",
      title: "Mobile responsive design",
      assignedUsers: [members[0]],
      status: "In-progress",
      dueDate: "2024-07-22",
      projectId: "2",
      projectName: "Website Overhaul",
      priority: "High",
      description: "Ensure website is fully responsive on mobile devices",
    },
    {
      id: "6",
      title: "API documentation writing",
      assignedUsers: [members[3]],
      status: "To-do",
      dueDate: "2024-08-05",
      projectId: "5",
      projectName: "API Documentation",
      priority: "Low",
      description: "Write comprehensive API documentation",
    },
    {
      id: "7",
      title: "Security vulnerability assessment",
      assignedUsers: [members[1], members[4]],
      status: "Done",
      dueDate: "2024-07-10",
      projectId: "3",
      projectName: "Database Migration",
      priority: "High",
      description: "Assess and fix security vulnerabilities",
    },
    {
      id: "8",
      title: "Customer portal wireframes",
      assignedUsers: [members[0], members[2]],
      status: "In-progress",
      dueDate: "2024-07-28",
      projectId: "4",
      projectName: "Customer Portal",
      priority: "Medium",
      description: "Create wireframes for customer self-service portal",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To-do":
        return "bg-gray-100 text-gray-800";
      case "In-progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      activeStatusFilter === "All" || task.status === activeStatusFilter;
    const matchesMember =
      activeMemberFilter === "All" ||
      task.assignedUsers.some((user) => user.id === activeMemberFilter);
    const matchesProject =
      activeProjectFilter === "All" || task.projectId === activeProjectFilter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesMember && matchesProject && matchesSearch;
  });

  const statusCounts = {
    All: tasks.length,
    "To-do": tasks.filter((t) => t.status === "To-do").length,
    "In-progress": tasks.filter((t) => t.status === "In-progress").length,
    Done: tasks.filter((t) => t.status === "Done").length,
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
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
              <span className="text-sm font-medium text-gray-900">
                John Doe
              </span>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Tasks Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Task Management
              </h2>
              <p className="text-gray-600 mt-1">
                Track and manage all project tasks
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            {/* Status Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Filter by Status
              </h3>
              <div className="flex space-x-2">
                {(["All", "To-do", "In-progress", "Done"] as const).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setActiveStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activeStatusFilter === status
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {status} ({statusCounts[status]})
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Member and Project Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Member Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Filter by Member
                </h3>
                <div className="relative">
                  <select
                    value={activeMemberFilter}
                    onChange={(e) => setActiveMemberFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="All">All Members</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Project Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Filter by Project
                </h3>
                <div className="relative">
                  <select
                    value={activeProjectFilter}
                    onChange={(e) => setActiveProjectFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="All">All Projects</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                <div className="col-span-4">Task</div>
                <div className="col-span-2">Assigned To</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2">Project</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Task Info */}
                    <div className="col-span-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Users */}
                    <div className="col-span-2">
                      <div className="flex -space-x-2">
                        {task.assignedUsers.slice(0, 3).map((user) => (
                          <img
                            key={user.id}
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            title={user.name}
                          />
                        ))}
                        {task.assignedUsers.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">
                              +{task.assignedUsers.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="col-span-2">
                      <div
                        className={`flex items-center space-x-2 text-sm ${
                          isOverdue(task.dueDate)
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {isOverdue(task.dueDate) ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <Calendar className="w-4 h-4" />
                        )}
                        <span>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Project */}
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600 truncate">
                        {task.projectName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No tasks found matching your criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Task
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Enter task title..."
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
                  placeholder="Enter task description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                    <option value="">Select project...</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Assign Members */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {members.map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Due Date and Priority */}
              <div className="grid grid-cols-2 gap-4">
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
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
