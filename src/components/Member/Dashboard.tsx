import Sidebar from "../../sharedComponents/Member/Sidebar";
import Header from "../../sharedComponents/Member/Header";
import OverviewCard from "../../sharedComponents/Member/Cards";

const MemberDashboard: React.FC = () => {

  // Sample data
  const taskStats: TaskStats = {
    total: 24,
    inProgress: 5,
    completed: 19,
  };

  const recentTasks: MemberTask[] = [
    {
      id: 1,
      title: "Update user authentication system",
      project: "Project Alpha",
      due: "Tomorrow",
      status: "progress",
    },
  ];


  const getStatusStyles = (status: MemberTask["status"]): string => {
    switch (status) {
      case "progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: MemberTask["status"]): string => {
    switch (status) {
      case "progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="space-y-8">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Amit!</h1>
              <p className="text-lg opacity-90">
                You have {taskStats.inProgress} tasks in progress and{" "}
                {taskStats.completed} completed this week. Keep up the great
                work!
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <OverviewCard
                title="Total Tasks"
                value={taskStats.total}
                description="Assigned to you"
                icon="📋"
                iconBg="bg-blue-500"
              />
              <OverviewCard
                title="In Progress"
                value={taskStats.inProgress}
                description="Currently working on"
                icon="⏳"
                iconBg="bg-yellow-500"
                progress={Math.round(
                  (taskStats.inProgress / taskStats.total) * 100
                )}
              />
              <OverviewCard
                title="Completed"
                value={taskStats.completed}
                description="Tasks finished"
                icon="✅"
                iconBg="bg-green-500"
                progress={Math.round(
                  (taskStats.completed / taskStats.total) * 100
                )}
              />
            </div>

            {/* Recent Tasks */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Tasks
              </h3>
              <div className="space-y-0">
                {recentTasks.map((task) => (
                  <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {task.title}
                      </h4>
                      <div className="text-sm text-gray-600">
                        {task.project} • Due: {task.due}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusStyles(
                        task.status
                      )}`}
                    >
                      {getStatusLabel(task.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;
