
import React from 'react';
import { ChecklistCategory, Task, TaskStatus } from '../types';
import ChecklistItem from './ChecklistItem';

interface ChecklistCategoryProps {
  category: ChecklistCategory;
  onTaskUpdate: (categoryId: string, taskId: number, newStatus: TaskStatus, newRemarks: string) => void;
  showCompleted: boolean;
}

const ChecklistCategoryComponent: React.FC<ChecklistCategoryProps> = ({ category, onTaskUpdate, showCompleted }) => {
  
  const filteredTasks = showCompleted ? category.tasks : category.tasks.filter(task => task.status === TaskStatus.PENDING || task.status === TaskStatus.NOT_DONE);

  if (filteredTasks.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-slate-700 p-4">
        <h2 className="text-xl font-semibold text-white">{category.title}</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredTasks.map((task: Task) => (
          <ChecklistItem
            key={task.id}
            task={task}
            onUpdate={(newStatus, newRemarks) => onTaskUpdate(category.id, task.id, newStatus, newRemarks)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChecklistCategoryComponent;
