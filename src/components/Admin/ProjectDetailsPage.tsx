import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Users,
  FileText,
  Download,
  Eye,
  Upload,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  PauseCircle,
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import SideBar from '../../sharedComponents/Admin/SideBar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { selectprojectById } from '../../redux/projectSlice';
import { taskMapping } from '../../FieldMapping/taskMapping';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'png' | 'jpg' | 'xlsx';
  size: string;
  uploadDate: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  avatar: string;
}

const StatusBadge: React.FC<{ status: 'Active' | 'Completed' | 'On Hold' }> = ({ status }) => {
  const styles = {
    'Active': 'bg-green-100 text-green-800 border-green-200',
    'Completed': 'bg-blue-100 text-blue-800 border-blue-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const icons = {
    'Active': <CheckCircle className="w-3 h-3" />,
    'Completed': <CheckCircle className="w-3 h-3" />,
    'On Hold': <PauseCircle className="w-3 h-3" />
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Avatar: React.FC<{ name: string; size?: 'sm' | 'md' | 'lg'; isOnline?: boolean }> = ({
  name,
  size = 'md',
  isOnline
}) => {
  const sizeStyles = {
    'sm': 'w-6 h-6 text-xs',
    'md': 'w-8 h-8 text-sm',
    'lg': 'w-10 h-10 text-base'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
  const colorIndex = name.length % colors.length;

  return (
    <div className="relative">
      <div className={`${sizeStyles[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-medium`}>
        {initials}
      </div>
      {isOnline !== undefined && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
      )}
    </div>
  );
};

const FileIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconStyles = "w-5 h-5";

  switch (type) {
    case 'pdf':
      return <div className={`${iconStyles} bg-red-100 text-red-600 rounded flex items-center justify-center text-xs font-bold`}>PDF</div>;
    case 'docx':
      return <div className={`${iconStyles} bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs font-bold`}>DOC</div>;
    case 'png':
    case 'jpg':
      return <div className={`${iconStyles} bg-green-100 text-green-600 rounded flex items-center justify-center text-xs font-bold`}>IMG</div>;
    case 'xlsx':
      return <div className={`${iconStyles} bg-emerald-100 text-emerald-600 rounded flex items-center justify-center text-xs font-bold`}>XLS</div>;
    default:
      return <FileText className={iconStyles} />;
  }
};

export default function ProjectDetailsPage() {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();

  useEffect(() => {
  if (params.id) {
    dispatch(selectprojectById(params.id));
  }
}, [dispatch, params.id]);

  const { selectedProjectId } = useSelector((store: RootState) => store.projects)
  const teamMembers = selectedProjectId?.teamMembers
  const tasks = taskMapping(selectedProjectId?.tasks);
  
  const completedtask = tasks?.filter((task : Task) => task.status === "CLOSED")
  const inProgressTask = tasks?.filter((task : Task) => task.status === "INPROGRESS")
  const openTask = tasks?.filter((task : Task) => task.status === "OPEN")
  
  const progress = (completedtask.length/tasks.length) * 100

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Sarah Chen',
      message: 'Great progress on the authentication module! The security review looks good.',
      timestamp: '2 hours ago',
      avatar: 'SC'
    },
    {
      id: '2',
      user: 'Mike Johnson',
      message: 'Updated the database schema. Ready for the next sprint planning.',
      timestamp: '5 hours ago',
      avatar: 'MJ'
    }
  ]);


  const documents: Document[] = [
    { id: '1', name: 'Project Requirements.pdf', type: 'pdf', size: '2.4 MB', uploadDate: '2 days ago' },
    { id: '2', name: 'UI Mockups.png', type: 'png', size: '1.8 MB', uploadDate: '1 week ago' },
    { id: '3', name: 'Technical Specs.docx', type: 'docx', size: '856 KB', uploadDate: '3 days ago' },
    { id: '4', name: 'Budget Analysis.xlsx', type: 'xlsx', size: '1.2 MB', uploadDate: '5 days ago' }
  ];

  const activities: ActivityItem[] = [
    { id: '1', user: 'Mike Johnson', action: 'completed task "User Authentication"', timestamp: '2 hours ago', avatar: 'MJ' },
    { id: '2', user: 'Emily Rodriguez', action: 'uploaded new design mockups', timestamp: '4 hours ago', avatar: 'ER' },
    { id: '3', user: 'Sarah Chen', action: 'updated project timeline', timestamp: '6 hours ago', avatar: 'SC' },
    { id: '4', user: 'Alex Kim', action: 'commented on Payment Integration', timestamp: '1 day ago', avatar: 'AK' }
  ];

  const taskStatusData = [
    { name: 'Completed', value: completedtask.length, color: '#10B981' },
    { name: 'In Progress', value: inProgressTask.length, color: '#F59E0B' },
    { name: 'Open', value: openTask.length, color: '#6B7280' }
  ];

  const memberTaskData = teamMembers?.map(member => ({
    name: member.name.split(' ')[0],
    tasks: member.tasksAssigned || 0
  }));

  const burndownData = [
    { day: 'Week 1', ideal: 100, actual: 98 },
    { day: 'Week 2', ideal: 85, actual: 89 },
    { day: 'Week 3', ideal: 70, actual: 75 },
    { day: 'Week 4', ideal: 55, actual: 58 },
    { day: 'Week 5', ideal: 40, actual: 42 },
    { day: 'Week 6', ideal: 25, actual: 33 },
    { day: 'Week 7', ideal: 10, actual: 18 },
    { day: 'Week 8', ideal: 0, actual: 5 }
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        message: newComment,
        timestamp: 'Just now',
        avatar: 'YO'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

 const getUser = (id: string): string => {
  const user = teamMembers?.find(member => member.id === id);
  return user?.name || 'Unknown User';
}

  const getStatusBadge = (status: string) => {
    const styles = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'todo': 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{selectedProjectId?.name}</h1>
                <StatusBadge status={selectedProjectId?.status} />
              </div>
              <p className="text-base text-gray-600 mb-4">{selectedProjectId?.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Start: {selectedProjectId?.startDate.split("T")[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>End: {selectedProjectId?.dueDate.split("T")[0]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">Progress</span>
              <span className="text-gray-600">{progress.toFixed(2)}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-7 space-y-6">
            {/* Tasks Overview Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tasks Overview</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Task Name</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Assignee</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks?.map((task) => (
                      <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <span className="text-sm font-medium text-gray-900">{task?.title}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          {getStatusBadge(task?.status)}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {/* <Avatar name={task?.} size="sm" /> */}
                            <span className="text-sm text-gray-700">{getUser(task?.assignedUser)}</span>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{task?.dueDate.split('T')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Task Status Pie Chart */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Task Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
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

                {/* Member Tasks Bar Chart */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Tasks by Member</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={memberTaskData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="tasks" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Burndown Chart */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Burndown Chart</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={burndownData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="ideal" stroke="#6B7280" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="actual" stroke="#3B82F6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Activity Log Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar name={activity.user} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-3 space-y-6">
            {/* Team Members Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              </div>

              <div className="space-y-4">
                {teamMembers?.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* <Avatar name={member.name} isOnline={member.isOnline} /> */}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">hello</p>
                      <p className="text-xs text-gray-500">tasks</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileIcon type={doc.type} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Discussion</h2>

          {/* Comment Input */}
          <div className="flex gap-3 mb-6">
            <Avatar name="You" />
            <div className="flex-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar name={comment.user} />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}