import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const NoteForm = ({ onSave, editingNote, setEditingNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setDescription(editingNote.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            toast.error('Title and description are required');
            return;
        }

        try {
            await onSave({ title, description }, editingNote?._id);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Save error', error);
        }
    };

    const handleCancel = () => {
        setEditingNote(null);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 transition-all">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {editingNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Note Description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
                ></textarea>
            </div>
            <div className="flex justify-end gap-3">
                {editingNote && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm font-medium"
                >
                    {editingNote ? 'Update Note' : 'Save Note'}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
