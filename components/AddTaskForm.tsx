
import React, { useState } from 'react';

interface AddTaskFormProps {
    onSave: (description: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSave }) => {
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(description);
        setDescription('');
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <button 
                onClick={() => setIsEditing(true)} 
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Task
            </button>
        );
    }

    return (
        <form onSubmit={handleSave} className="space-y-2">
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="New task description..."
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                rows={3}
                required
            />
            <div className="flex justify-end space-x-2">
                <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Save Task
                </button>
            </div>
        </form>
    );
};

export default AddTaskForm;
