import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';
import SearchBar from './SearchBar';
import Alert from './Alert';
import { useNotes } from '../context/NoteContext';

const NoteList = () => {
    const { notes, loading, error, createNote, updateNote, deleteNote, searchNotes, setError } = useNotes();
    const [showForm, setShowForm] = useState(false);

    const handleCreate = async (newNote) => {
        try {
            await createNote(newNote);
            setShowForm(false);
        } catch (err) {
            // Error is already set in the context
        }
    };

    const handleSearch = (query) => {
        searchNotes(query);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <div className="note-list-container">
            <div className="header">
                <h1>My Notes</h1>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className="btn-primary"
                >
                    <FaPlus /> {showForm ? 'Cancel' : 'New Note'}
                </button>
            </div>

            <SearchBar onSearch={handleSearch} />

            {error && <Alert message={error} onClose={clearError} />}

            {showForm && <NoteForm onSubmit={handleCreate} />}

            {loading ? (
                <div className="loading">Loading notes...</div>
            ) : notes.length === 0 ? (
                <div className="empty-state">
                    <p>No notes found. Create your first note!</p>
                </div>
            ) : (
                <div className="notes-grid">
                    {notes.map(note => (
                        <NoteItem
                            key={note.id}
                            note={note}
                            onUpdate={updateNote}
                            onDelete={deleteNote}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoteList;