
import React from 'react';

interface HeaderProps {
  onExport: () => void;
  progress: number;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onExport, progress, showCompleted, setShowCompleted }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-slate-800">Daily Monitoring Checklist</h1>
            <p className="text-sm text-slate-500">For ERPNext Integration</p>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
                <label htmlFor="showCompletedToggle" className="text-sm font-medium text-gray-700">Show Completed</label>
                <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${showCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showCompleted ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
            </div>
            <button
              onClick={onExport}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-50 border-t">
            <div className="flex items-center space-x-2">
                <label htmlFor="showCompletedToggle" className="text-sm font-medium text-gray-700">Show Completed</label>
                <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${showCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showCompleted ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
            </div>
            <button
              onClick={onExport}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Export Report
            </button>
      </div>
    </header>
  );
};

export default Header;
