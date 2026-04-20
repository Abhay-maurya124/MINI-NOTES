import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import NotesList from './components/NotesList';
import api from './api';

function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNote, setEditingNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNotes = useCallback(async (query = '') => {
        setLoading(true);
        try {
            const endpoint = query ? `/notes/search?q=${query}` : '/notes';
            const { data } = await api.get(endpoint);
            setNotes(data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchNotes(searchQuery);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, fetchNotes]);

    const handleSaveNote = async (noteData, id) => {
        try {
            if (id) {
                const { data } = await api.put(`/notes/${id}`, noteData);
                setNotes(notes.map(note => note._id === id ? data : note));
                setEditingNote(null);
                toast.success('Note updated successfully');
            } else {
                const { data } = await api.post('/notes', noteData);
                setNotes([data, ...notes]);
                toast.success('Note created successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving note');
            throw error;
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
            toast.success('Note deleted successfully');
            if (editingNote && editingNote._id === id) {
                setEditingNote(null);
            }
        } catch (error) {
            toast.error('Failed to delete note');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Toaster position="top-right" />
            <Navbar />
            
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <NoteForm 
                                onSave={handleSaveNote} 
                                editingNote={editingNote} 
                                setEditingNote={setEditingNote} 
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <SearchBar onSearch={setSearchQuery} />
                        <NotesList 
                            notes={notes} 
                            loading={loading} 
                            onEdit={setEditingNote} 
                            onDelete={handleDeleteNote} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
