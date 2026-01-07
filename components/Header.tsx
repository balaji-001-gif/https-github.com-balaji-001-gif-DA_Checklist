
import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onExport: (reportType: 'daily' | 'weekly' | 'monthly') => void;
  onReset: () => void;
  progress: number;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onExport, onReset, progress, showCompleted, setShowCompleted }) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportClick = (reportType: 'daily' | 'weekly' | 'monthly') => {
    onExport(reportType);
    setIsExportMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-slate-800">Daily Monitoring Checklist</h1>
            <p className="text-sm text-slate-500">For ERPNext Integration</p>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button
                onClick={onReset}
                title="Reset for Next Day"
                className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-full text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="flex items-center space-x-2">
                <label htmlFor="showCompletedToggle" className="text-sm font-medium text-gray-700">Show Completed</label>
                <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${showCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showCompleted ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
            </div>
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setIsExportMenuOpen(prev => !prev)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Export Report
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isExportMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => handleExportClick('daily')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Daily Report</button>
                    <button onClick={() => handleExportClick('weekly')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Weekly Report</button>
                    <button onClick={() => handleExportClick('monthly')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Monthly Report</button>
                  </div>
                </div>
              )}
            </div>
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
                <label htmlFor="showCompletedToggleMobile" className="text-sm font-medium text-gray-700">Show Completed</label>
                <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${showCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showCompleted ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
            </div>
            <div className="flex items-center space-x-2">
                 <button
                    onClick={onReset}
                    title="Reset for Next Day"
                    className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-full text-amber-700 bg-amber-100 hover:bg-amber-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="relative" ref={exportMenuRef}>
                  <button
                    onClick={() => setIsExportMenuOpen(prev => !prev)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Export...
                  </button>
                  {isExportMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={() => handleExportClick('daily')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Daily Report</button>
                        <button onClick={() => handleExportClick('weekly')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Weekly Report</button>
                        <button onClick={() => handleExportClick('monthly')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Monthly Report</button>
                      </div>
                    </div>
                  )}
                </div>
            </div>
      </div>
    </header>
  );
};

export default Header;
