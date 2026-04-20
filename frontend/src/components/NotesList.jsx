import NoteCard from './NoteCard';
import Loader from './Loader';

const NotesList = ({ notes, loading, onEdit, onDelete }) => {
    if (loading) {
        return <Loader />;
    }

    if (notes.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No notes found. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
                <NoteCard 
                    key={note._id} 
                    note={note} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
};

export default NotesList;
