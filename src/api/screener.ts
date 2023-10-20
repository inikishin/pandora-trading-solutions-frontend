 import axios from 'axios';

const screenerApi = axios.create({
  baseURL: process.env.SCREENER_API_URL,
});

export default screenerApi;
