import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Alert = ({ message, type = 'error', onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`alert ${type}`}>
            <span>{message}</span>
            <button onClick={onClose} className="close-btn">
                <FaTimes />
            </button>
        </div>
    );
};

export default Alert;