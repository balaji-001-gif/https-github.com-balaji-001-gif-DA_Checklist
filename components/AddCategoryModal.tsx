
import React, { useState } from 'react';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(title);
        setTitle('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Add New Category</h2>
                <form onSubmit={handleSave}>
                    <label htmlFor="category-title" className="block text-sm font-medium text-gray-700">Category Title</label>
                    <input
                        type="text"
                        id="category-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g., 'End of Day Checks'"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        autoFocus
                    />
                    <div className="flex justify-end space-x-4 mt-6">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Save Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;
