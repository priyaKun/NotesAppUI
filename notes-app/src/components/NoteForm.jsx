import { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const NoteForm = ({ noteToEdit, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
        }
    }, [noteToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        
        onSubmit({ title, content });
        if (!noteToEdit) {
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className={`note-form ${noteToEdit ? 'edit-mode' : ''}`}>
            <h2>{noteToEdit ? 'Edit Note' : 'New Note'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        <FaSave /> Save
                    </button>
                    {noteToEdit && (
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            <FaTimes /> Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default NoteForm;