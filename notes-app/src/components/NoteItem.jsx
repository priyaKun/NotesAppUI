import { useState } from 'react';
import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';
import NoteForm from './NoteForm';
import { format } from 'date-fns';

const NoteItem = ({ note, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = (updatedNote) => {
        onUpdate(note.id, updatedNote);
        setIsEditing(false);
    };

    return (
        <div className="note-item">
            {isEditing ? (
                <NoteForm
                    noteToEdit={note}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <>
                    <div className="note-header">
                        <h3>{note.title}</h3>
                        <div className="note-actions">
                            <button 
                                onClick={() => setIsEditing(true)}
                                aria-label="Edit note"
                            >
                                <FaEdit />
                            </button>
                            <button 
                                onClick={() => onDelete(note.id)}
                                aria-label="Delete note"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                    <p className="note-content">{note.content}</p>
                    <div className="note-footer">
                        <span>
                            <FaCalendarAlt /> {format(new Date(note.created_at), 'MMM d, yyyy')}
                        </span>
                        <span>
                            <FaClock /> {format(new Date(note.updated_at), 'h:mm a')}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default NoteItem;