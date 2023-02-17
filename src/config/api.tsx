import axios from "axios";
import { getToken } from "../utils/token";

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_APP_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const fileApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_APP_BASE_URL,
    headers: { "Content-Type": "multipart/form-data" },
});

api.interceptors.request.use((request: any) => {
    const token = getToken();
    if (token) {
        request.headers.Authorization = "Bearer " + token;
    }

    return request;
});

fileApi.interceptors.request.use((request: any) => {
    const token = getToken();
    if (token) {
        request.headers.Authorization = "Bearer " + token;
    }

    return request;
});
