import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.26:8080',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
