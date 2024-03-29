import axios from 'axios';

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create(axiosConfig);

export default api;
