import { Link } from "react-router";
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Settings,
} from 'lucide-react';

const SideBar = () => {

    const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true , redirect :"/" },
    { icon: FolderOpen, label: 'Projects', active: false , redirect :"/projects" },
    { icon: CheckSquare, label: 'Tasks', active: false , redirect :"/tasks" },
    { icon: Users, label: 'Members', active: false , redirect :"/members" },
    { icon: Settings, label: 'Profile', active: false , redirect :"/profile" }
  ];

  return (
        <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PT</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">
            ProjectTracker
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.redirect}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
