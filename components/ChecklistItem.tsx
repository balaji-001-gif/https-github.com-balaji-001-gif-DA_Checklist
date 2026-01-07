import React from 'react';
import { Task, TaskStatus } from '../types';

interface ChecklistItemProps {
  task: Task;
  onUpdate: (newStatus: TaskStatus, newRemarks: string) => void;
}

const StatusButton: React.FC<{
    currentStatus: TaskStatus;
    targetStatus: TaskStatus;
    onClick: () => void;
    label: string;
    // FIX: Changed type from `JSX.Element` to `React.ReactElement` to fix "Cannot find namespace 'JSX'" error.
    icon: React.ReactElement;
    colorClasses: string;
}> = ({ currentStatus, targetStatus, onClick, label, icon, colorClasses }) => {
    const isActive = currentStatus === targetStatus;
    return (
        <button
            title={label}
            onClick={onClick}
            className={`flex-1 flex items-center justify-center p-2 rounded-md transition-all duration-200 ease-in-out text-sm font-semibold
                ${isActive ? colorClasses : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
            {icon}
        </button>
    );
};

const ChecklistItem: React.FC<ChecklistItemProps> = ({ task, onUpdate }) => {

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdate(newStatus, task.remarks);
  };
  
  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(task.status, e.target.value);
  };

  return (
    <li className="p-4 bg-white hover:bg-gray-50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <p className="flex-grow text-gray-700 mb-3 sm:mb-0 sm:mr-4">{task.id}. {task.description}</p>
        <div className="flex-shrink-0 w-full sm:w-auto grid grid-cols-3 gap-2">
            <StatusButton
                currentStatus={task.status}
                targetStatus={TaskStatus.DONE}
                onClick={() => handleStatusChange(TaskStatus.DONE)}
                label="Done"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                colorClasses="bg-green-500 text-white shadow-sm"
            />
            <StatusButton
                currentStatus={task.status}
                targetStatus={TaskStatus.NOT_DONE}
                onClick={() => handleStatusChange(TaskStatus.NOT_DONE)}
                label="Not Done"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
                colorClasses="bg-red-500 text-white shadow-sm"
            />
            <StatusButton
                currentStatus={task.status}
                targetStatus={TaskStatus.NA}
                onClick={() => handleStatusChange(TaskStatus.NA)}
                label="N/A"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3 10a7 7 0 1114 0 7 7 0 01-14 0z" /></svg>}
                colorClasses="bg-gray-500 text-white shadow-sm"
            />
        </div>
      </div>
      {task.status === TaskStatus.NOT_DONE && (
        <div className="mt-3">
          <textarea
            value={task.remarks}
            onChange={handleRemarksChange}
            placeholder="Add remarks for 'Not Done'..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            rows={2}
          ></textarea>
        </div>
      )}
    </li>
  );
};

export default ChecklistItem;
