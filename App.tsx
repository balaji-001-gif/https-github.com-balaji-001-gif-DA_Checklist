
import React, { useState, useCallback } from 'react';
import { ChecklistCategory, Task, TaskStatus } from './types';
import { INITIAL_CHECKLIST_DATA } from './constants';
import Header from './components/Header';
import ChecklistCategoryComponent from './components/ChecklistCategory';

const App: React.FC = () => {
  const [checklistData, setChecklistData] = useState<ChecklistCategory[]>(INITIAL_CHECKLIST_DATA);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const handleTaskUpdate = useCallback((categoryId: string, taskId: number, newStatus: TaskStatus, newRemarks: string) => {
    setChecklistData(prevData =>
      prevData.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map(task =>
              task.id === taskId ? { ...task, status: newStatus, remarks: newRemarks } : task
            ),
          };
        }
        return category;
      })
    );
  }, []);

  const handleExportCsv = useCallback(() => {
    const headers = ['Category', 'Task Description', 'Status', 'Remarks', 'Date'];
    
    const rows = checklistData.flatMap(category => 
        category.tasks.map(task => [
            `"${category.title}"`,
            `"${task.description}"`,
            `"${task.status}"`,
            `"${task.remarks.replace(/"/g, '""')}"`,
            `"${new Date().toLocaleDateString()}"`
        ])
    );

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const today = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `daily_checklist_report_${today}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [checklistData]);

  const progress = Math.round(
    (checklistData.flatMap(c => c.tasks).filter(t => t.status === TaskStatus.DONE || t.status === TaskStatus.NA).length /
     checklistData.flatMap(c => c.tasks).length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header 
        onExport={handleExportCsv} 
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
              showCompleted={showCompleted}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
