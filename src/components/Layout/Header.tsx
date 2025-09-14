import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import type { User } from '../../types';

interface HeaderProps {
  user: User;
  onSignOut: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">NEXUS DRIVER'S ED</h1>
            <p className="text-xs text-teal-500 font-medium">LEARN FROM THE BEST</p>
          </div>
        </div>

        <nav className="flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
          <div className="flex items-center space-x-1">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Courses</a>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Blog</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <button 
                onClick={onSignOut}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}