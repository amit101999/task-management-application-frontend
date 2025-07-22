import { Bell, LogOut } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [user, setUser] = useState<Member | null>(null);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hello, Amit 👋
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  Amit Kumar
                </span>
              </div>
            </>
          ) : (
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex space-x-2 ">
              <p className="font-semibold text-gray-900 text-2xl">Sign In</p>
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
