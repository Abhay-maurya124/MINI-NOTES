import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const NoteCard = ({ note, onEdit, onDelete }) => {
    const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 break-words pr-4">{note.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => onEdit(note)} 
                        className="p-1.5 text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit"
                    >
                        <FiEdit2 />
                    </button>
                    <button 
                        onClick={() => onDelete(note._id)} 
                        className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap break-words text-sm line-clamp-3">
                {note.description}
            </p>
            <div className="text-xs text-gray-400 font-medium">
                {formattedDate}
            </div>
        </div>
    );
};

export default NoteCard;
