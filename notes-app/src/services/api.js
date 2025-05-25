import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding token or other headers
api.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

const noteApi = {
    getNotes: () => api.get('/notes'),
    getNote: (id) => api.get(`/notes/${id}`),
    createNote: (note) => api.post('/notes', note),
    updateNote: (id, note) => api.put(`/notes/${id}`, note),
    deleteNote: (id) => api.delete(`/notes/${id}`),
    searchNotes: (query) => api.get(`/notes?search=${query}`),
};

export default noteApi;
