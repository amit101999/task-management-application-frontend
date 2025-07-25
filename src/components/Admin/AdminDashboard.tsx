import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SideBar from '../../sharedComponents/Admin/SideBar';
import Header from '../../sharedComponents/Admin/Header';
import { UsefetchUser } from '../../hooks/fetchUser';
import { UsefetchTask } from '../../hooks/getAllTask';

// Sample data for charts
const taskStatusData = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 30, color: '#3b82f6' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Blocked', value: 10, color: '#ef4444' }
];

const weeklyProgressData = [
  { day: 'Mon', completed: 12, inProgress: 8 },
  { day: 'Tue', completed: 15, inProgress: 6 },
  { day: 'Wed', completed: 18, inProgress: 9 },
  { day: 'Thu', completed: 22, inProgress: 7 },
  { day: 'Fri', completed: 25, inProgress: 5 },
  { day: 'Sat', completed: 8, inProgress: 3 },
  { day: 'Sun', completed: 6, inProgress: 2 }
];

const AdminDashboard = () => {
  // fetching all users in redux
  UsefetchUser()
  UsefetchTask()

  const overviewCards = [
    { title: 'Total Projects', value: '24', change: '+12%', color: 'bg-blue-50 border-blue-200' },
    { title: 'Total Members', value: '156', change: '+8%', color: 'bg-green-50 border-green-200' },
    { title: 'Tasks In Progress', value: '89', change: '+5%', color: 'bg-yellow-50 border-yellow-200' },
    { title: 'Completed Tasks', value: '342', change: '+23%', color: 'bg-purple-50 border-purple-200' }
  ];

  return (
      <div className="flex h-screen bg-gray-50">  
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
      <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hello, Admin 👋</h2>
            <p className="text-gray-600">Here's what's happening with your projects today.</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewCards.map((card, index) => (
              <div key={index} className={`bg-white rounded-xl border-2 ${card.color} p-6 transition-all hover:shadow-md`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                  <span className="text-xs font-medium text-green-600">{card.change}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Status Pie Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {taskStatusData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress Bar Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New project "Mobile App Redesign" created', time: '2 hours ago', user: 'Sarah Johnson' },
                { action: 'Task "User Authentication" completed', time: '4 hours ago', user: 'Mike Chen' },
                { action: 'Member "Alex Rodriguez" assigned to Design Team', time: '6 hours ago', user: 'Admin' },
                { action: 'Project "Website Overhaul" milestone reached', time: '1 day ago', user: 'Emily Davis' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
</div>   
  );
};

export default AdminDashboard;