import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://aircall-backend.onrender.com',
});

const http = axiosInstance;

http.interceptors.response.use(res => res.data);

export { http };