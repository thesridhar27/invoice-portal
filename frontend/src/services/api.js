import axios from 'axios';

const api = axios.create({
    // Use the 127.0.0.1 IP that worked in your browser
    baseURL: 'http://127.0.0.1/invoice-portal/backend/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;