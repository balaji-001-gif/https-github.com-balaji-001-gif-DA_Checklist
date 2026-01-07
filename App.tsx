
import React, { useState, useCallback, useEffect } from 'react';
import { ChecklistCategory, Task, TaskStatus } from './types';
import { INITIAL_CHECKLIST_DATA } from './constants';
import Header from './components/Header';
import ChecklistCategoryComponent from './components/ChecklistCategory';
import AddCategoryModal from './components/AddCategoryModal';

const APP_STORAGE_KEY = 'dailyChecklistData';

const App: React.FC = () => {
  const [checklistData, setChecklistData] = useState<ChecklistCategory[]>(() => {
    try {
        const savedData = localStorage.getItem(APP_STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : INITIAL_CHECKLIST_DATA;
    } catch (error) {
        console.error("Failed to parse checklist data from localStorage", error);
        return INITIAL_CHECKLIST_DATA;
    }
  });
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  useEffect(() => {
    try {
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(checklistData));
    } catch (error) {
        console.error("Failed to save checklist data to localStorage", error);
    }
  }, [checklistData]);

  const handleTaskUpdate = useCallback((categoryId: string, taskId: number, newStatus: TaskStatus, newRemarks: string) => {
    setChecklistData(prevData =>
      prevData.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map(task => {
              if (task.id === taskId) {
                const isCompleted = newStatus === TaskStatus.DONE || newStatus === TaskStatus.NA;
                const wasCompleted = task.status === TaskStatus.DONE || task.status === TaskStatus.NA;
                
                let completionDate = task.completionDate;
                if (isCompleted && !wasCompleted) {
                    completionDate = new Date().toISOString();
                } else if (!isCompleted) {
                    completionDate = undefined;
                }

                return { ...task, status: newStatus, remarks: newRemarks, completionDate };
              }
              return task;
            }),
          };
        }
        return category;
      })
    );
  }, []);

  const handleAddTask = useCallback((categoryId: string, description: string) => {
    if (!description.trim()) return;
    setChecklistData(prevData => prevData.map(category => {
        if (category.id === categoryId) {
            const newTask: Task = {
                id: Date.now(), // Use timestamp for a unique ID
                description,
                status: TaskStatus.PENDING,
                remarks: '',
            };
            return { ...category, tasks: [...category.tasks, newTask] };
        }
        return category;
    }));
  }, []);

  const handleAddCategory = useCallback((title: string) => {
    if (!title.trim()) return;
    const newCategory: ChecklistCategory = {
        id: title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
        title,
        tasks: []
    };
    setChecklistData(prevData => [...prevData, newCategory]);
  }, []);

  const handleResetChecklist = useCallback(() => {
    if (window.confirm("Are you sure you want to reset the checklist for the next day? This will clear all statuses and remarks.")) {
        setChecklistData(prevData => prevData.map(category => ({
            ...category,
            tasks: category.tasks.map(task => ({
                ...task,
                status: TaskStatus.PENDING,
                remarks: '',
                completionDate: undefined,
            })),
        })));
    }
  }, []);

  const handleExportCsv = useCallback((reportType: 'daily' | 'weekly' | 'monthly') => {
    const headers = ['Category', 'Task Description', 'Status', 'Remarks', 'Completion Date'];
    const today = new Date();
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    switch(reportType) {
        case 'weekly':
            startDate.setDate(today.getDate() - 7);
            break;
        case 'monthly':
            startDate.setMonth(today.getMonth() - 1);
            break;
        case 'daily':
        default:
            // Start date is already set to the beginning of today
            break;
    }

    const filteredTasks = checklistData.flatMap(category =>
        category.tasks
            .filter(task => {
                if (!task.completionDate) return false;
                const completionDate = new Date(task.completionDate);
                return completionDate >= startDate && completionDate <= today;
            })
            .map(task => ({ ...task, categoryTitle: category.title }))
    );

    const rows = filteredTasks.map(task => [
        `"${task.categoryTitle}"`,
        `"${task.description}"`,
        `"${task.status}"`,
        `"${task.remarks.replace(/"/g, '""')}"`,
        `"${task.completionDate ? new Date(task.completionDate).toISOString().slice(0, 10) : ''}"`
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const todayStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `${reportType}_checklist_report_${todayStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [checklistData]);

  const allTasks = checklistData.flatMap(c => c.tasks);
  const completedTasks = allTasks.filter(t => t.status === TaskStatus.DONE || t.status === TaskStatus.NA);
  const progress = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header 
        onExport={handleExportCsv} 
        onReset={handleResetChecklist}
        progress={progress} 
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklistData.map(category => (
            <ChecklistCategoryComponent
              key={category.id}
              category={category}
              onTaskUpdate={handleTaskUpdate}
              onAddTask={handleAddTask}
              showCompleted={showCompleted}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
            <button
                onClick={() => setIsAddCategoryModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Category
            </button>
        </div>
      </main>
      <AddCategoryModal 
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSave={handleAddCategory}
      />
    </div>
  );
};

export default App;
