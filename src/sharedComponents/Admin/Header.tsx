import { Bell, Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div>
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                  <div className="flex items-center flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search..."
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
    </div>
  )
}

export default Header