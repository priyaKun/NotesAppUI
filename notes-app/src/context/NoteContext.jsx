import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await api.getNotes();
            setNotes(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch notes. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createNote = async (note) => {
        try {
            const response = await api.createNote(note);
            setNotes([response.data, ...notes]);
            return response.data;
        } catch (err) {
            setError('Failed to create note. Please try again.');
            console.error(err);
            throw err;
        }
    };

    const updateNote = async (id, note) => {
        try {
            const response = await api.updateNote(id, note);
            setNotes(notes.map(n => n.id === id ? response.data : n));
            return response.data;
        } catch (err) {
            setError('Failed to update note. Please try again.');
            console.error(err);
            throw err;
        }
    };

    const deleteNote = async (id) => {
        try {
            await api.deleteNote(id);
            setNotes(notes.filter(note => note.id !== id));
        } catch (err) {
            setError('Failed to delete note. Please try again.');
            console.error(err);
            throw err;
        }
    };

    const searchNotes = (query) => {
        setSearchQuery(query);
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <NoteContext.Provider
            value={{
                notes: filteredNotes,
                loading,
                error,
                createNote,
                updateNote,
                deleteNote,
                searchNotes,
                setError,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within a NoteProvider');
    }
    return context;
};