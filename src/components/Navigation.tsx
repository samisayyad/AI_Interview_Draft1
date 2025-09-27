import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Home, BarChart3, BookOpen, Video } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/interview', icon: Video, label: 'Interview' },
    { path: '/feedback', icon: BarChart3, label: 'Feedback' },
    { path: '/practice', icon: BookOpen, label: 'Practice' },
    { path: '/chatbot', icon: MessageCircle, label: 'AI Assistant' },
  ];

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md shadow-2xl border-b border-purple-500/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="font-bold text-xl text-white">DevGent AI</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 shadow-lg border border-purple-500/40 backdrop-blur-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 hover:shadow-md'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;