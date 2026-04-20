import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mini-notes-qmrw.onrender.com/api',
});

export default api;
