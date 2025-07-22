import { Link } from "react-router";
 const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊", redirect: "/member/dashboard" },
    { id: "tasks", label: "My Tasks", icon: "✅", redirect: "/member/tasks" },
    { id: "projects",label: "Projects",icon: "📁",redirect: "/member/projects"} ,
    { id: "profile",label: "Profile",icon: "👤",redirect: "/member/profile", },
  ];

const Sidebar = () => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">ProjectTracker</h2>
      </div>
      <nav className="p-6">
        {navItems.map((item) => (
          <Link to={item.redirect}>
          <button
            key={item.id}
            className="w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200"
            >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
            </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar