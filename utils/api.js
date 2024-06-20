// utils/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor to handle token expiration
api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token) {
            const tokenExpiration = decodeJwt(token).exp * 1000;
            const now = Date.now();

            if (tokenExpiration < now + 5 * 60 * 1000) { // If token expires in less than 5 minutes
                const response = await axios.post('http://localhost:8000/api/accounts/refresh/', {
                    refresh: refreshToken,
                });

                localStorage.setItem('accessToken', response.data.access);
                config.headers['Authorization'] = `Bearer ${response.data.access}`;
            } else {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    error => Promise.reject(error)
);

// Function to decode JWT
function decodeJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export default api;
