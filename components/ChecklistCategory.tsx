
import React from 'react';
import { ChecklistCategory, Task, TaskStatus } from '../types';
import ChecklistItem from './ChecklistItem';
import AddTaskForm from './AddTaskForm';

interface ChecklistCategoryProps {
  category: ChecklistCategory;
  onTaskUpdate: (categoryId: string, taskId: number, newStatus: TaskStatus, newRemarks: string) => void;
  onAddTask: (categoryId: string, description: string) => void;
  showCompleted: boolean;
}

const ChecklistCategoryComponent: React.FC<ChecklistCategoryProps> = ({ category, onTaskUpdate, onAddTask, showCompleted }) => {
  
  const filteredTasks = showCompleted ? category.tasks : category.tasks.filter(task => task.status === TaskStatus.PENDING || task.status === TaskStatus.NOT_DONE);

  if (!showCompleted && filteredTasks.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="bg-slate-700 p-4">
        <h2 className="text-xl font-semibold text-white">{category.title}</h2>
      </div>
      <div className="flex-grow">
        {filteredTasks.length > 0 ? (
            <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task: Task) => (
              <ChecklistItem
                key={task.id}
                task={task}
                onUpdate={(newStatus, newRemarks) => onTaskUpdate(category.id, task.id, newStatus, newRemarks)}
              />
            ))}
          </ul>
        ) : (
            <p className="text-center text-gray-500 p-6">No tasks yet. Add one below!</p>
        )}
      </div>
      <div className="p-4 bg-gray-50 border-t mt-auto">
        <AddTaskForm onSave={(description) => onAddTask(category.id, description)} />
      </div>
    </div>
  );
};

export default ChecklistCategoryComponent;
