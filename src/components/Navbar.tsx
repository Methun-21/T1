
import { Bell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [notifications, setNotifications] = useState(2);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">LF</span>
          </div>
          <span className="font-bold text-xl">FindFlow</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
          <Link to="/search" className="text-gray-600 hover:text-primary transition-colors">Search</Link>
          <Link to="/report" className="text-gray-600 hover:text-primary transition-colors">Report</Link>
          
          <div className="relative">
            <Link to="/notifications" className="text-gray-600 hover:text-primary transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Link>
          </div>
          
          <Link to="/profile">
            <div className="w-8 h-8 rounded-full bg-purple-light flex items-center justify-center">
              <span className="text-purple-dark font-medium text-sm">JD</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
