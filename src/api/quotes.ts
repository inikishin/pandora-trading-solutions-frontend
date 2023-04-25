import axios from 'axios';

const quotesApi = axios.create({
  baseURL: process.env.QUOTES_API_URL,
});

export default quotesApi;
