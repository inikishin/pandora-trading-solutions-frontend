import axios from 'axios';

const adminApi = axios.create({
  baseURL: process.env.ADMIN_API_URL,
});

export default adminApi;
