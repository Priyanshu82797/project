import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌉</div>
            <h1 className="text-2xl font-bold">Smart Bridge Digital Twin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm opacity-90">
              Real-time Structural Monitoring
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
