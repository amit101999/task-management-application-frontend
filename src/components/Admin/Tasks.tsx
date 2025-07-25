import React, { useState } from "react";
import {
  CheckSquare,
  Plus,
  Calendar,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import SideBar from "../../sharedComponents/Admin/SideBar";
import Header from "../../sharedComponents/Admin/Header";
import CreateTask from "./CreateTask";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";



const TasksPage: React.FC = () => {
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    "All" | "OPEN" | "INPROGRESS" | "CLOSED"
  >("All");
  const [activeMemberFilter, setActiveMemberFilter] = useState<string>("All");
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { users } = useSelector((state: RootState) => state.user);
  const { projects } = useSelector((state: RootState) => state.projects);

  const tasks: Task[] = [
    {
      id: "1",
      title: "Design user authentication flow",
      assignedUsers: [{id : "1" , name: "amit" , email:"amit@gmil.com" , avatar:"ass" , role:"admin" }],
      status: "INPROGRESS",
      dueDate: "2024-07-20",
      projectId: "1",
      projectName: "Mobile App Redesign",
      priority: "High",
      description: "Create wireframes and mockups for user authentication",
    },
   
   
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-gray-100 text-gray-800";
      case "INPROGRESS":
        return "bg-blue-100 text-blue-800";
      case "CLOSED":
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

  // const statusCounts = {
  //   All: tasks.length,
  //   "To-do": tasks.filter((t) => t.status === "To-do").length,
  //   "In-progress": tasks.filter((t) => t.status === "In-progress").length,
  //   Done: tasks.filter((t) => t.status === "Done").length,
  // };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <Header />

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
                {(["All", "OPEN", "INPROGRESS", "CLOSED"] as const).map(
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
                      {/* {status} ({statusCounts[status]}) */}
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
                    {users?.map((member) => (
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
              {filteredTasks?.map((task) => (
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
                        {/* {task.assignedUsers.slice(0, 3).map((user) => (
                          <img
                            key={user.id}
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            title={user.name}
                          />
                        ))} */}
                        {/* {task.assignedUsers.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">
                              +{task.assignedUsers.length - 3}
                            </span>
                          </div>
                        )} */}
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
            {/* {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No tasks found matching your criteria
                </p>
              </div>
            )} */}
          </div>
        </main>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
       <CreateTask users={users} projects={projects} setShowCreateModal={setShowCreateModal} />
      )}
    </div>
  );
};

export default TasksPage;
