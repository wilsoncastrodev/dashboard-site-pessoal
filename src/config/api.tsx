import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});
